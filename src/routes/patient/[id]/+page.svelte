<script lang="ts">
	import Profile from '$lib/components/Profile/Profile.svelte';
	export let data;
	export let form;
	let resp = form?.resp;
	$: resp = form?.resp;
	$: console.log(resp);
</script>

<Profile {data} message={resp} />
