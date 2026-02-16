import { useRef, useEffect, useCallback, useState } from 'react';

const VERT = `
attribute vec2 a_position;
varying vec2 v_uv;
void main() {
  v_uv = a_position * 0.5 + 0.5;
  v_uv.y = 1.0 - v_uv.y;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAG = `
precision mediump float;
varying vec2 v_uv;
uniform sampler2D u_video;
uniform sampler2D u_ripple;
uniform vec2 u_resolution;

void main() {
  float rippleVal = texture2D(u_ripple, v_uv).r;
  float dx = texture2D(u_ripple, v_uv + vec2(1.0/u_resolution.x, 0.0)).r - rippleVal;
  float dy = texture2D(u_ripple, v_uv + vec2(0.0, 1.0/u_resolution.y)).r - rippleVal;
  vec2 distortedUV = clamp(v_uv + vec2(dx, dy) * 0.04, 0.0, 1.0);
  vec4 color = texture2D(u_video, distortedUV);
  color.rgb += (dx + dy) * 0.2;
  gl_FragColor = color;
}`;

const SIM_W = 256;
const SIM_H = 256;
const DAMPING = 0.97;
const R_RADIUS = 6;
const R_STRENGTH = 0.7;
const AUTO_MS = 2500;
const AUTO_STR = 0.4;

function mkShader(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error('Shader error:', gl.getShaderInfoLog(s));
    gl.deleteShader(s);
    return null;
  }
  return s;
}

function mkProgram(gl, vs, fs) {
  const p = gl.createProgram();
  gl.attachShader(p, vs);
  gl.attachShader(p, fs);
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error('Program error:', gl.getProgramInfoLog(p));
    gl.deleteProgram(p);
    return null;
  }
  return p;
}

const VideoRipple = ({ videoSrc = '/Assets/Sea.mp4' }) => {
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const rafRef = useRef(null);
  const rippleA = useRef(new Float32Array(SIM_W * SIM_H));
  const rippleB = useRef(new Float32Array(SIM_W * SIM_H));
  const pixelBuf = useRef(new Uint8Array(SIM_W * SIM_H * 4));
  const [glReady, setGlReady] = useState(false);

  const stepRipple = useCallback(() => {
    const curr = rippleA.current;
    const prev = rippleB.current;
    for (let y = 1; y < SIM_H - 1; y++) {
      for (let x = 1; x < SIM_W - 1; x++) {
        const i = y * SIM_W + x;
        prev[i] = (curr[i - 1] + curr[i + 1] + curr[i - SIM_W] + curr[i + SIM_W]) * 0.5 - prev[i];
        prev[i] *= DAMPING;
      }
    }
    rippleA.current = prev;
    rippleB.current = curr;
  }, []);

  const dropRipple = useCallback((nx, ny, str = R_STRENGTH) => {
    const curr = rippleA.current;
    const cx = Math.floor(nx * SIM_W);
    const cy = Math.floor(ny * SIM_H);
    for (let dy = -R_RADIUS; dy <= R_RADIUS; dy++) {
      for (let dx = -R_RADIUS; dx <= R_RADIUS; dx++) {
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d > R_RADIUS) continue;
        const px = cx + dx, py = cy + dy;
        if (px < 0 || px >= SIM_W || py < 0 || py >= SIM_H) continue;
        curr[py * SIM_W + px] += str * (1 - d / R_RADIUS);
      }
    }
  }, []);

  // Auto ripples
  useEffect(() => {
    const id = setInterval(() => {
      dropRipple(0.2 + Math.random() * 0.6, 0.2 + Math.random() * 0.6, AUTO_STR);
    }, AUTO_MS);
    return () => clearInterval(id);
  }, [dropRipple]);

  // WebGL setup
  useEffect(() => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!canvas || !video) return;

    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, premultipliedAlpha: false });
    if (!gl) {
      console.warn('WebGL not available');
      return;
    }

    const vs = mkShader(gl, gl.VERTEX_SHADER, VERT);
    const fs = mkShader(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = mkProgram(gl, vs, fs);
    if (!prog) return;

    gl.useProgram(prog);

    // Quad
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

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

    // Ripple texture
    const rippleTex = gl.createTexture();
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, rippleTex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.uniform1i(uRipple, 1);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, SIM_W, SIM_H);
    };
    resize();
    window.addEventListener('resize', resize);

    let running = false;

    const render = () => {
      stepRipple();

      // Upload video frame
      if (video.readyState >= 2 && !video.paused) {
        try {
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, videoTex);
          gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);
        } catch (e) {
          // Skip frame on error
        }
      }

      // Upload ripple map
      const curr = rippleA.current;
      const pb = pixelBuf.current;
      for (let i = 0; i < curr.length; i++) {
        const v = Math.min(255, Math.max(0, (curr[i] + 1) * 128)) | 0;
        const p = i * 4;
        pb[p] = v;
        pb[p + 1] = v;
        pb[p + 2] = v;
        pb[p + 3] = 255;
      }
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, rippleTex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, SIM_W, SIM_H, 0, gl.RGBA, gl.UNSIGNED_BYTE, pb);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };

    const tryStart = () => {
      if (running) return;
      if (video.readyState >= 2) {
        running = true;
        setGlReady(true);
        rafRef.current = requestAnimationFrame(render);
      }
    };

    // Try multiple events to catch when video is actually ready
    video.addEventListener('canplay', tryStart);
    video.addEventListener('playing', tryStart);
    video.addEventListener('loadeddata', tryStart);
    // Also poll in case events already fired
    const pollId = setInterval(() => {
      if (video.readyState >= 2) {
        tryStart();
        clearInterval(pollId);
      }
    }, 100);

    tryStart();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
      video.removeEventListener('canplay', tryStart);
      video.removeEventListener('playing', tryStart);
      video.removeEventListener('loadeddata', tryStart);
      clearInterval(pollId);
    };
  }, [stepRipple]);

  const handleMouseMove = useCallback((e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    dropRipple(
      (e.clientX - rect.left) / rect.width,
      (e.clientY - rect.top) / rect.height,
      R_STRENGTH * 0.5
    );
  }, [dropRipple]);

  const handleClick = useCallback((e) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    dropRipple(
      (e.clientX - rect.left) / rect.width,
      (e.clientY - rect.top) / rect.height,
      R_STRENGTH * 1.5
    );
  }, [dropRipple]);

  return (
    <div
      style={{ position: 'relative', width: '100%', height: '100%' }}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {/* Video - kept visible but behind canvas as fallback, also needed for browser to decode frames */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
        }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* WebGL canvas on top - renders the ripple-distorted video */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          opacity: glReady ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      />
    </div>
  );
};

export default VideoRipple;
