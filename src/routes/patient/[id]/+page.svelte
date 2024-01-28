<script lang="ts">
	import { enhance } from '$app/forms';
	import Profile from '$lib/components/Profile/Profile.svelte';
	export let data;
</script>

<Profile {data} />
