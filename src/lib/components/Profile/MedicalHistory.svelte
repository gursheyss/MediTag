<script lang="ts">
	export let data;
</script>

<section>
	<h1 class="mb-4 text-2xl font-bold">Medical History</h1>
	{#each data as medicalHistory (medicalHistory.id)}
		<article class="mb-4 flex flex-col rounded-lg bg-white p-4 shadow">
			<h2 class="text-lg font-bold">{medicalHistory.classification}</h2>
			<p class="text-sm text-gray-600">Description: {medicalHistory.description}</p>
			<p class="text-sm text-gray-600">
				Date: {new Date(medicalHistory.date).toLocaleDateString()}
			</p>
			<p class="text-sm text-gray-600">
				Record created on: {new Date(medicalHistory.created_at).toLocaleString()}
			</p>
		</article>
	{/each}
</section>
