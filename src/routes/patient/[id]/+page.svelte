<script lang="ts">
	import { enhance } from '$app/forms';
	import Profile from '$lib/components/Profile/Profile.svelte';
	export let data;
</script>

<Profile {data} />
<form
	method="POST"
	use:enhance={() => {
		return async ({ result }) => {};
	}}
>
	<input type="hidden" name="data" value={JSON.stringify(data)} />
	<button>test</button>
</form>
