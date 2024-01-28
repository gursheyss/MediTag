<script>
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { writable } from 'svelte/store';
  import jsQR from 'jsqr';

  let videoElement;
  let scanInterval;
  let isFlipped = writable(true);
  const dispatch = createEventDispatcher();

  function toggleFlip() {
      isFlipped.update(n => !n);
  }

  onMount(() => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        videoElement.srcObject = stream;
        scanInterval = setInterval(scanQRCode, 100);
      })
      .catch((err) => {
        console.error("Error accessing the webcam: ", err);
      });
  });

  onDestroy(() => {
    clearInterval(scanInterval);
  });

  function scanQRCode() {
    // Assuming you have a canvas and context for drawing the video frame
    let canvas = document.createElement('canvas');
    let context = canvas.getContext('2d');
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    let imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    let code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code) {
      dispatch('scan', code.data);
    }
  }
</script>

<div class="camera-container">
  <video bind:this={videoElement} autoplay playsinline class:flipped={$isFlipped}></video>
  <div class="qr-border"></div>
</div>
<button on:click={toggleFlip}>Toggle Flip</button>

<style>
  .camera-container {
    position: relative;
  }
  video {
    display: block;
    max-width: 100%;
  }
  .flipped {
    transform: scaleX(-1);
  }
</style>
