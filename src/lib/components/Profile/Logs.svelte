<script lang="ts">
	export let data;
</script>

<section>
	<h1 class="mb-4 text-2xl font-bold">Medical Logs</h1>
	{#each data as log (log.id)}
		<article
			class={`mb-4 flex flex-col rounded-lg border-2 bg-white p-4 ${log.level === 3 ? 'border-red-500' : log.level === 2 ? 'border-yellow-500' : ''}`}
		>
			<h2 class="text-lg font-bold">{log.label} by {log.doctor}</h2>
			<p class="text-sm text-gray-600">Description: {log.description}</p>
			<p class="text-sm text-gray-600">
				{new Date(log.created_at).toLocaleString()}
			</p>
		</article>
	{/each}
</section>
