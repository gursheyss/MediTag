<script lang="ts">
	export let data;
</script>

<header class="flex items-center rounded-lg bg-white p-4 shadow">
	<div class="h-16 w-16 overflow-hidden rounded-full">
		<img src={data.profile_picture_url} alt="Avatar" class="h-full w-full object-cover" />
	</div>
	<div class="ml-4">
		<h2 class="text-lg font-bold">{data.name}</h2>
		<p class="text-sm text-gray-600">{data.sex}</p>
		<p class="text-sm text-gray-600">{data.dateofbirth}</p>
	</div>
</header>
