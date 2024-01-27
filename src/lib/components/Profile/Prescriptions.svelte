<script lang="ts">
	export let data;
</script>

<section>
	<h1 class="mb-4 text-2xl font-bold">Prescriptions</h1>
	{#each data as prescription (prescription.id)}
		<article class="mb-4 flex flex-col rounded-lg bg-white p-4 shadow">
			<h2 class="text-lg font-bold">Medication: {prescription.medication}</h2>
			<p class="text-sm text-gray-600">Dosage: {prescription.dosage}mg</p>
			<p class="text-sm text-gray-600">Frequency: {prescription.frequency} times a day</p>
			<p class="text-sm text-gray-600">
				Prescribed on: {new Date(prescription.created_at).toLocaleString()}
			</p>
		</article>
	{/each}
</section>
