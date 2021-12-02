<script>
	import Loader from '$lib/components/loader.svelte';
</script>

<div class="root">
	<header>
		<Loader />
	</header>
	<main>
		<slot />
	</main>
</div>

<style>
	.root {
		height: calc(100vh);
		display: flex;
	}

	@media screen and (max-width: 940px) {
		.root {
			height: auto;
			flex-direction: column;
		}
	}
</style>
