import { defineConfig } from 'astro/config';
import installedIntegration from '@astrojs/vue';
// https://astro.build/config
export default defineConfig({

    integrations: [
        // 1. Imported from an installed npm package
        installedIntegration(), 
    ],
    outDir: './directory',
    build: {
        // Example: Generate `page.html` instead of `page/index.html` during build.
        format: 'file'
      }

});
