// @ts-check
import { defineConfig, envField } from 'astro/config';
import sentry from '@sentry/astro';

// https://astro.build/config
// https://docs.astro.build/en/guides/environment-variables/
export default defineConfig({
  site: 'https://links.jonathan.com.ar',
  env: {
    schema: {
      SENTRY_AUTH_TOKEN: envField.string({
        context: "server", optional: false,
        access: 'secret'
      }),
    }
  },
  integrations: [sentry({
    dsn: "https://a80e056db50a348719874ab38e1dbdcb@o4505914092093440.ingest.us.sentry.io/4508824451678208",
    environment: import.meta.env.PROD ? "prod" : "unreleased",
    release: process.env.npm_package_version,
    sourceMapsUploadOptions: {
      project: "jd-links",
      telemetry: false,
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }
  })],
});