<script lang="ts">
	import CtaButton from '$lib/components/cta-button.svelte';
	import EducationDetails from '$lib/components/education-details.svelte';
	import ExternalLinks from '$lib/components/external-links.svelte';
</script>

<section>
	<h1>Philip Saa</h1>
	<h2>
		MULTIMEDIA SPECIALIST <br />
		<div class="location">IN BAVARIA, GERMANY</div>
	</h2>
	<CtaButton href="https://cowglow.com" alt="website link" iconSrc="images/world.svg">
		Visit my Website
	</CtaButton>
	<p>
		I like to call myself a Multimedia Specialist. Currently located in southern Germany. My
		interests range from music theory to film making. I am also interested in programming and Drum
		and bass.
	</p>
	<p>
		I'm <a href="https://twitter.com/cowglow" rel="noreferrer noopener" target="_blank">
			@cowglow
		</a> on Twitter. DM me!
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
