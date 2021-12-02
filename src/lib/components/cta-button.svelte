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
		border: 1px solid #34731a;
		background-color: #34731a;
		border-radius: 6px;
		padding: 6px 24px;
		margin: 68px 0;
		display: flex;
		cursor: pointer;
		color: #ffffff;
		text-decoration: none;
	}

	.cta:hover {
		background-color: #308e2d;
		color: #ffffff;
	}

	.cta:active {
		background-color: #34731a;
		border-color: #308e2d;
	}

	.cta img {
		padding-right: 14px;
	}
</style>
