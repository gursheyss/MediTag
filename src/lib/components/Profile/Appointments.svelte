<script lang="ts">
	export let data;
</script>

<section>
	<h1 class="mb-4 text-2xl font-bold">Appointments</h1>
	{#each data as appointment (appointment.id)}
		<article class="mb-4 flex flex-col rounded-lg bg-white p-4 shadow">
			<h2 class="text-lg font-bold">Appointment with {appointment.doctor}</h2>
			<p class="text-sm text-gray-600">Reason: {appointment.reason}</p>
			<p class="text-sm text-gray-600">
				Created at: {new Date(appointment.created_at).toLocaleString()}
			</p>
		</article>
	{/each}
</section>
