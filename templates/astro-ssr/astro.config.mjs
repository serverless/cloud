import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import serverlessCloud from '@serverless/cloud/astro';

// https://astro.build/config
export default defineConfig({
	integrations: [serverlessCloud(), svelte()],
});
