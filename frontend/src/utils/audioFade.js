/**
 * Fades in audio from 0 to target volume
 * @param {HTMLAudioElement} audioElement - The audio element
 * @param {number} duration - Fade duration in ms
 * @param {number} targetVolume - Target volume (0-1)
 * @returns {Promise} Resolves when fade is complete
 */
export function fadeIn(audioElement, duration = 200, targetVolume = 0.7) {
  return new Promise((resolve) => {
    if (!audioElement) {
      resolve();
      return;
    }

    const startVolume = 0;
    audioElement.volume = startVolume;

    const startTime = Date.now();

    function animate() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      audioElement.volume = startVolume + (targetVolume - startVolume) * progress;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        resolve();
      }
    }

    requestAnimationFrame(animate);
  });
}

/**
 * Fades out audio from current volume to 0
 * @param {HTMLAudioElement} audioElement - The audio element
 * @param {number} duration - Fade duration in ms
 * @returns {Promise} Resolves when fade is complete
 */
export function fadeOut(audioElement, duration = 200) {
  return new Promise((resolve) => {
    if (!audioElement) {
      resolve();
      return;
    }

    const startVolume = audioElement.volume;
    const startTime = Date.now();

    function animate() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      audioElement.volume = startVolume * (1 - progress);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        audioElement.pause();
        resolve();
      }
    }

    requestAnimationFrame(animate);
  });
}
