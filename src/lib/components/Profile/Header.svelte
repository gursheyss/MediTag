<script lang="ts">
	export let data;
	let dob = new Date(data.dateofbirth);
	let formattedDob = `${dob.getMonth() + 1}/${dob.getDate()}/${dob.getFullYear()}`;
	let age = new Date().getFullYear() - dob.getFullYear();
	let m = new Date().getMonth() - dob.getMonth();
	if (m < 0 || (m === 0 && new Date().getDate() < dob.getDate())) {
		age--;
	}
</script>

<header class="mb-4 flex items-center rounded-lg bg-white p-4 shadow">
	<div class="h-16 w-16 overflow-hidden rounded-full">
		<img src={data.profile_picture_url} alt="Avatar" class="h-full w-full object-cover" />
	</div>
	<div class="ml-4">
		<h2 class="text-lg font-bold">{data.name}</h2>
		<p class="text-sm text-gray-600">{data.sex}</p>
		<p class="text-sm text-gray-600">DOB: {formattedDob} (Age: {age})</p>
	</div>
</header>
