<script>
    import Scanner from '$lib/components/Scanner.svelte';

    function handleScan(result) {
        console.log('Scanned QR Code:', result);
        // Handle the QR code result here (e.g., navigate to a specific route)
    }
</script>

<template>
    <h1>Welcome to the QR Code Scanner</h1>
    <Scanner onScan={handleScan} />
</template>

