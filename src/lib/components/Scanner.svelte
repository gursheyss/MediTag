<script>
    import { onMount, onDestroy } from 'svelte';
    import { writable } from 'svelte/store';
    import jsQR from 'jsqr';
  
    let videoElement;
    let scanInterval;
    let isFlipped = writable(true);
  
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
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: "dontInvert",
      });
  
      if (code) {
        console.log("Found QR Code:", code.data);
        clearInterval(scanInterval); // Stop scanning once QR code is found
        // Handle the QR code result here
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
  