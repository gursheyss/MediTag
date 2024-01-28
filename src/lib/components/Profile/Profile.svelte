<script lang="ts">
	import Chat from './Chat.svelte';
	import Header from './Header.svelte';
	import Logs from './Logs.svelte';
	import MedicalHistory from './MedicalHistory.svelte';
	import Prescriptions from './Prescriptions.svelte';
	export let data;
	export let message;
	$: message;
</script>

<div class="p-6">
	<Header data={data.profile} />
	<Logs data={data.logs} />
	<Prescriptions data={data.prescriptions} />
	<MedicalHistory data={data.medical} />
	<Chat {data} {message} />
</div>
