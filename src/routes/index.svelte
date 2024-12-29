<script lang="ts">
	import CtaButton from '$lib/components/cta-button.svelte';
	import EducationDetails from '$lib/components/education-details.svelte';
	import ExternalLinks from '$lib/components/external-links.svelte';
	import labelData from '$lib/fixtures/titles.json';

	type label = {
		label: string;
		msg: string;
	};

	const labels: label[] = [...labelData];
	const randomLabel = labels[Math.floor(Math.random() * labels.length)];
</script>

<section>
	<h1>Philip Saa</h1>
	<h2>
		{randomLabel.label.toUpperCase()} <br />
		<span class="location">IN BAVARIA, GERMANY</span>
	</h2>
	<CtaButton href="https://cowglow.com" alt="website link" iconSrc="images/world.svg">
		Visit my Website
	</CtaButton>
	<p>
		{randomLabel.msg} Currently located in southern Germany. My interests range from music theory to
		film making. I am currently working as a remote developer, programming with JavaScript.
	</p>
</section>

<EducationDetails />
<ExternalLinks />

<style>
	.location {
		font-size: 16px;
	}

	p:last-child {
		margin-bottom: 42px;
	}
</style>
