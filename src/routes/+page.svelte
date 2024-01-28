<script>
    import { readable } from 'svelte/store';
    import { tick } from 'svelte';
    import Scanner from '$lib/components/Scanner.svelte';
  
    let scannerState = 'idle';
    let patientData = null;
    let roomData = null;
    let validationMessage = '';
    let showScanner = true;
    let showProceedButton = false;
    let nextRoute = null;
  
    async function handleScan(data) {
    let d = JSON.parse(data.detail);
    console.log(d); 

    showScanner = false;
    showProceedButton = true;

    if (scannerState === 'idle') {
      patientData = d.patient;
      scannerState = 'scannedPatient';
      validationMessage = 'Scanned room QR code.';
    } else if (scannerState === 'scannedPatient') {
      roomData = d.patient;
      scannerState = 'idle';

    //   const response = await fetch('/api/checkUser', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ id: roomData.id })
    //   });
    //   const { exists } = await response.json();

    //   if (!exists) {
    //     validationMessage = 'Not a valid QR code.';
    //     return;
    //   }

    if (validate(patientData, roomData)) {
        validationMessage = 'Access granted.';
        nextRoute = '/patient/' + patientData.id;
      } else {
        validationMessage = 'Access denied.';
        nextRoute = '';
      }

      await tick();

      patientData = null;
      roomData = null;
    }
  }
  
    function proceedToNextScan() {
      showScanner = true;
      showProceedButton = false;
  
      if (scannerState === 'idle') {
        validationMessage = 'Please scan the room QR code.';
      } else if (scannerState === 'scannedPatient') {
        validationMessage = 'Please scan the patient badge.';
      }
    }
  
    function validate(patientData, roomData) {
      return patientData.id === roomData.id && patientData.name === roomData.name;
    }

    let isAccessGranted = false;
    let isAccessDenied = false;

    $: {
        if (validationMessage === 'Access granted.') {
        isAccessGranted = true;
        isAccessDenied = false;
        } else if (validationMessage === 'Access denied.') {
        isAccessGranted = false;
        isAccessDenied = true;
        } else {
        isAccessGranted = false;
        isAccessDenied = false;
        }
    }

  </script>
  
  <div class="min-h-screen flex flex-col items-center justify-center transition-colors duration-500 
  {isAccessGranted ? 'bg-green-400' : ''} 
  {isAccessDenied ? 'bg-red-400' : ''}">
  {#if showScanner}
    <div class="p-6 bg-white rounded shadow">
      <Scanner on:scan={handleScan} />
    </div>
  {/if}

<div class="mt-4 text-center text-xl font-bold {isAccessGranted || isAccessDenied ? 'text-white' : ''}">
    {validationMessage}
</div>

{#if nextRoute}
    <a href={nextRoute} class="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition-colors duration-200">Proceed to Patient</a>
{:else if showProceedButton}
    <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition-colors duration-200" on:click={proceedToNextScan}>
        Proceed to next scan
    </button>
{/if}
</div>


<style>

</style>