import { useRef, useEffect, useCallback } from 'react';

// Vertex shader - simple passthrough
const VERT = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  v_uv.y = 1.0 - v_uv.y;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

// Fragment shader - samples video texture with ripple distortion
const FRAG = `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_video;
uniform sampler2D u_ripple;
uniform vec2 u_resolution;

void main() {
  // Sample the ripple height map
  float rippleVal = texture2D(u_ripple, v_uv).r;

  // Calculate distortion from neighboring ripple values
  float dx = texture2D(u_ripple, v_uv + vec2(1.0/u_resolution.x, 0.0)).r - rippleVal;
  float dy = texture2D(u_ripple, v_uv + vec2(0.0, 1.0/u_resolution.y)).r - rippleVal;

  // Distort UV coordinates
  vec2 distortedUV = v_uv + vec2(dx, dy) * 0.04;
  distortedUV = clamp(distortedUV, 0.0, 1.0);

  vec4 color = texture2D(u_video, distortedUV);

  // Add slight caustic highlight
  float highlight = (dx + dy) * 1.5;
  color.rgb += highlight * 0.15;

  gl_FragColor = color;
}`;

const SIM_WIDTH = 256;
const SIM_HEIGHT = 256;
const DAMPING = 0.97;
const RIPPLE_RADIUS = 6;
const RIPPLE_STRENGTH = 0.7;
const AUTO_INTERVAL = 2500;
const AUTO_STRENGTH = 0.4;

function createShader(gl, type, source) {
  const s = gl.createShader(type);
  gl.shaderSource(s, source);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

function createProgram(gl, vert, frag) {
  const p = gl.createProgram();
  gl.attachShader(p, vert);
  gl.attachShader(p, frag);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(p));
    gl.deleteProgram(p);
    return null;
  }
  return p;
}

const VideoRipple = ({ videoSrc = '/Assets/Sea.mp4' }) => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const glRef = useRef(null);
  const rafRef = useRef(null);
  const rippleCurrent = useRef(new Float32Array(SIM_WIDTH * SIM_HEIGHT));
  const ripplePrev = useRef(new Float32Array(SIM_WIDTH * SIM_HEIGHT));
  const autoTimerRef = useRef(null);

  // Propagate ripple simulation (CPU-side height map)
  const stepRipple = useCallback(() => {
    const curr = rippleCurrent.current;
    const prev = ripplePrev.current;
    const w = SIM_WIDTH;
    const h = SIM_HEIGHT;

    for (let y = 1; y < h - 1; y++) {
      for (let x = 1; x < w - 1; x++) {
        const i = y * w + x;
        const val =
          (curr[i - 1] + curr[i + 1] + curr[i - w] + curr[i + w]) * 0.5 -
          prev[i];
        prev[i] = val * DAMPING;
      }
    }

    // Swap buffers
    rippleCurrent.current = prev;
    ripplePrev.current = curr;
  }, []);

  // Drop a ripple at normalized coordinates (0-1)
  const dropRipple = useCallback((nx, ny, strength = RIPPLE_STRENGTH) => {
    const curr = rippleCurrent.current;
    const cx = Math.floor(nx * SIM_WIDTH);
    const cy = Math.floor(ny * SIM_HEIGHT);

    for (let dy = -RIPPLE_RADIUS; dy <= RIPPLE_RADIUS; dy++) {
      for (let dx = -RIPPLE_RADIUS; dx <= RIPPLE_RADIUS; dx++) {
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > RIPPLE_RADIUS) continue;
        const px = cx + dx;
        const py = cy + dy;
        if (px < 0 || px >= SIM_WIDTH || py < 0 || py >= SIM_HEIGHT) continue;
        const falloff = 1 - dist / RIPPLE_RADIUS;
        curr[py * SIM_WIDTH + px] += strength * falloff;
      }
    }
  }, []);

  // Auto-generate random ripples
  useEffect(() => {
    autoTimerRef.current = setInterval(() => {
      const rx = 0.2 + Math.random() * 0.6;
      const ry = 0.2 + Math.random() * 0.6;
      dropRipple(rx, ry, AUTO_STRENGTH);
    }, AUTO_INTERVAL);

    return () => clearInterval(autoTimerRef.current);
  }, [dropRipple]);

  // WebGL setup and render loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false });
    if (!gl) return;
    glRef.current = gl;

    // Shaders
    const vs = createShader(gl, gl.VERTEX_SHADER, VERT);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = createProgram(gl, vs, fs);
    if (!prog) return;

    gl.useProgram(prog);

    // Full-screen quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uVideo = gl.getUniformLocation(prog, 'u_video');
    const uRipple = gl.getUniformLocation(prog, 'u_ripple');
    const uRes = gl.getUniformLocation(prog, 'u_resolution');

    // Video texture
    const videoTex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, videoTex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.uniform1i(uVideo, 0);

    // Ripple texture (R channel = height)
    const rippleTex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, rippleTex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.uniform1i(uRipple, 1);

    // Resize handler
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, SIM_WIDTH, SIM_HEIGHT);
    };
    resize();
    window.addEventListener('resize', resize);

    // Pixel buffer for ripple upload
    const pixelBuf = new Uint8Array(SIM_WIDTH * SIM_HEIGHT * 4);

    const render = () => {
      // Step simulation
      stepRipple();

      // Upload video frame
      if (video.readyState >= 2) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, videoTex);
        gl.texImage2D(
          gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video
        );
      }

      // Upload ripple height map as texture
      const curr = rippleCurrent.current;
      for (let i = 0; i < curr.length; i++) {
        const v = Math.min(255, Math.max(0, (curr[i] + 1) * 128));
        const pi = i * 4;
        pixelBuf[pi] = v;
        pixelBuf[pi + 1] = v;
        pixelBuf[pi + 2] = v;
        pixelBuf[pi + 3] = 255;
      }
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, rippleTex);
      gl.texImage2D(
        gl.TEXTURE_2D, 0, gl.RGBA,
        SIM_WIDTH, SIM_HEIGHT, 0,
        gl.RGBA, gl.UNSIGNED_BYTE, pixelBuf
      );

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };

    // Start rendering once video is ready
    const startRender = () => {
      rafRef.current = requestAnimationFrame(render);
    };

    if (video.readyState >= 2) {
      startRender();
    } else {
      video.addEventListener('canplay', startRender, { once: true });
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [stepRipple]);

  // Mouse interaction
  const handleMouseMove = useCallback(
    (e) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      dropRipple(nx, ny, RIPPLE_STRENGTH * 0.5);
    },
    [dropRipple]
  );

  const handleClick = useCallback(
    (e) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      dropRipple(nx, ny, RIPPLE_STRENGTH * 1.5);
    },
    [dropRipple]
  );

  return (
    <div
      style={{ position: 'relative', width: '100%', height: '100%' }}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* Hidden video source */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        style={{ display: 'none' }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* WebGL canvas renders the distorted video */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'block',
        }}
      />
    </div>
  );
};

export default VideoRipple;
