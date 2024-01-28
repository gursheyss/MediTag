<script>
	import { onMount, onDestroy } from 'svelte';

	let qrScanner;
	let videoElem;
	let QrScanner;

	onMount(async () => {
		QrScanner = (await import('qr-scanner')).default;
		qrScanner = new QrScanner(videoElem, (result) => {
			console.log(result);
		});
		qrScanner.start();
	});

	onDestroy(() => {
		if (qrScanner) {
			qrScanner.stop();
		}
	});
</script>

<video bind:this={videoElem}></video>

<style>
	video {
		width: 100%;
		max-width: 400px; /* Adjust as necessary */
		border: 1px solid #ccc;
		border-radius: 4px;
	}
</style>
