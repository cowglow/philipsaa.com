<script lang="ts">
	let display = true;

	setTimeout(() => {
		display = false;
	}, 2000);
</script>

{#if display}
	<div class="root">
		<img src="/images/svelte-logo.svg" alt="loading" />
	</div>
{/if}

<style>
	.root {
		width: 100%;
		height: 100%;
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;
		background-color: rgba(40, 44, 52, 0.8);
	}

	img {
		width: 81%;
		height: 81%;
		pointer-events: none;
	}

	@media (prefers-reduced-motion: no-preference) {
		img {
			animation: App-logo-spin infinite 13.3s linear;
		}
	}

	@keyframes App-logo-spin {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}
</style>
