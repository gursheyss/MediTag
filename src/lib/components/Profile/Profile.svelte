<script lang="ts">
	import Appointments from './Appointments.svelte';
	import Header from './Header.svelte';
	import MedicalHistory from './MedicalHistory.svelte';
	import Prescriptions from './Prescriptions.svelte';
	export let data;
</script>

<Header data={data.profile} />
<Appointments data={data.appointments} />
<Prescriptions data={data.prescriptions} />
<MedicalHistory data={data.medical} />
