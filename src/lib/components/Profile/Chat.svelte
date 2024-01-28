<script lang="ts">
	import { enhance } from '$app/forms';
	import { Chat } from 'phosphor-svelte';
	import { createDialog, melt } from '@melt-ui/svelte';
	import { X } from 'lucide-svelte';
	import { fade } from 'svelte/transition';
	export let message;

	const {
		elements: { trigger, overlay, content, title, description, close, portalled },
		states: { open }
	} = createDialog({
		forceVisible: true
	});

	export let data;
	let messages = [];
	let newMessage = '';

	$: message;

	let loading = false;
</script>

<div
	class="fixed bottom-4 right-4 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-red-500 text-white shadow-lg"
	use:melt={$trigger}
>
	<Chat size={32} />
</div>

<div class="" use:melt={$portalled}>
	{#if $open}
		<div
			use:melt={$overlay}
			class="fixed inset-0 z-50 bg-black/50"
			transition:fade={{ duration: 150 }}
		/>
		<div
			class="fixed left-[50%] top-[50%] z-50 max-h-[85vh] w-[90vw]
              max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-xl bg-white
              p-6 shadow-lg"
			use:melt={$content}
		>
			<h2 use:melt={$title} class="m-0 text-lg font-medium text-black">Ava</h2>
			<p use:melt={$description} class="mb-5 mt-2 leading-normal text-zinc-600">
				Ask Ava any questions you have about the patient - she will try her best to answer them.
			</p>

			<form
				method="POST"
				use:enhance={() => {
					return ({ result }) => {
						if (result.type === 'success') {
							console.log('message:' + message);
							loading = false;
							messages = [...messages, message.summary];
						}
					};
				}}
			>
				<input type="hidden" name="data" value={JSON.stringify(data)} />

				<div class="mb-4 flex flex-col gap-5">
					<div class="flex flex-col gap-2">
						<!-- Chat messages would go here. You can use a Svelte each block to render messages from an array -->
						{#each messages as message (message.id)}
							<div class={message.sender === 'user' ? 'text-right' : 'text-left'}>
								<span class="inline-block rounded bg-gray-300 px-3 py-2 text-black"
									>{message.text}</span
								>
							</div>
						{/each}
					</div>
					<div class="flex gap-2">
						<input
							class="flex-grow rounded border px-3 py-2"
							bind:value={newMessage}
							name="prompt"
							placeholder="Type a message..."
						/>
						<button
							class="rounded-md bg-red-500 px-4 py-2 text-white ${loading === true
								? 'disabled cursor-not-allowed bg-opacity-50'
								: ''}"
							type="submit"
							on:click={() => (loading = true)}
						>
							Ask
						</button>
					</div>
				</div>
			</form>
			<button
				use:melt={$close}
				aria-label="close"
				class="text-magnum-800 hover:bg-magnum-100 focus:shadow-magnum-400 absolute right-4 top-4 inline-flex
                  h-6 w-6 appearance-none items-center justify-center
                  rounded-full p-1"
			>
				<X class="square-4" />
			</button>
		</div>
	{/if}
</div>
