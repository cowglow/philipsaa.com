<script lang="ts">
	export let iconSrc: string;
	export let href: string;
	export let alt: string;
</script>

<a class="cta" {href} rel="noreferrer noopener" target="_blank">
	<img src={iconSrc} {alt} />
	<slot />
</a>

<style>
	.cta {
		font-size: 14px;
		text-transform: uppercase;
		border: 1px solid var(--text-color);
		background-color: #333;
		border-radius: 6px;
		padding: 6px 24px;
		margin: 68px 0;
		display: flex;
		cursor: pointer;
		color: var(--text-color);
		text-decoration: none;
	}

	.cta:hover {
		border-color: var(--text-color-highlight);
		background-color: #666;
		color: var(--text-color-highlight);
	}

	.cta:active {
		background-color: var(--text-color);
	}

	.cta img {
		padding-right: 14px;
	}
</style>
