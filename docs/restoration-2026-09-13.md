# September 2026 restoration

The repository's `main` branch did not include the `scholar` theme or the SEO
customizations used by the production site. Those components were recovered from
the site's public JavaScript bundle, then converted back into module imports and
JSX. They preserve deployed behavior; they are reconstructed source, not the
original uncompiled files.

- Source repository base: `c2bb787f4cd82b72f2e6bbef62d1ae241b164bb0`.
- Production reference: `dpl_6K94YVyHLB7ob9umnRRCYQ7uppvk`.
- Production build ID: `C30-T5m9JX8otqbuFrZMZ`.
- Public reference bundle: `/_next/static/chunks/pages/_app-e508cdcbf2ad8d5c.js`.

## Data repair

Production logs showed Notion's private API returning HTTP 403. Current responses
also wrap records one level deeper than the existing metadata readers and
renderer expect. The repair uses `notion-client` 7.12.1 with the current API host
and an explicit User-Agent, and normalizes record-map responses at the client
boundary. The existing renderer is retained to limit changes to article display.

Failed or incomplete database refreshes and exhausted article retries now throw.
Next.js ISR can therefore keep serving the last successful page instead of
replacing it with an empty list or missing article body.

Robots and RSS files are generated during builds. A normal server deployment uses
the existing dynamic sitemap route; only static exports generate a sitemap file.
Runtime page regeneration does not attempt to write into Vercel's read-only
filesystem. RSS remains a build-time snapshot.

Static generation uses two workers to reduce Notion request bursts. The first
full build hit HTTP 429 responses; the client correctly waited before retrying.
An imported attachment in `3-paradigms-of-llm4rec` also contained a bare file
identifier instead of a usable URL. The renderer handles unavailable attachments
without taking down the rest of an article or the entire build.

## Local verification

Use Node.js 22 and the checked-in Yarn lockfile:

```sh
yarn install --frozen-lockfile
node --test tests/*.test.mjs
VERCEL_ENV=production yarn build
yarn start
```

The public Notion database ID, current theme, language, and site domain are
defaults in `blog.config.js`. Environment variables still override them. Keep
credentials in local environment files or the deployment provider's settings.

Before replacing production, verify the home page, an existing article,
category/tag navigation, `/sitemap.xml`, `/rss/feed.xml`, and runtime Notion
requests in the target Vercel project. A successful local fetch alone does not
establish that requests from Vercel are healthy.
