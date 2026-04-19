# AGENTS Notes

## Local-First Debug Workflow

1. Verify the active theme before patching UI.
   Read `blog.config.js` and any `NEXT_PUBLIC_THEME` override first.
   In this repo the default theme is `heo`, not `hexo`.

2. Do not deploy before local proof.
   Use this sequence:
   - inspect raw Notion API shape with a small `notion-client` script
   - run a single local `next dev`
   - run a local `next build`
   - optionally run local `next start`
   - deploy only after local homepage and a known article slug both render real data

3. Only run one Next.js dev server per repo at a time.
   Multiple dev servers sharing the same `.next` directory create noisy cache and manifest errors.

4. When the blog falls back to `NotionNext BLOG` or `无法获取Notion数据`, check the raw Notion response shape before blaming config.
   Notion can return nested records like:
   - `block[id].value.value`
   - `collection[id].value.value`
   - `collection_view[id].value.value`
   The legacy parser in older NotionNext versions expects `block[id].value.type`.

5. Do not assume Clerk is the root cause.
   Treat auth as unrelated unless:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is enabled
   - logs point to Clerk-specific failures
   In this repo, the main outage was Notion response-shape drift plus theme fallback rendering bugs.

6. Compare against upstream before large refactors.
   The useful order is:
   - identify the exact failing layer locally
   - inspect the latest upstream files for that layer
   - backport the smallest proven fix
   - consider a full rebase only after the app works locally again

## Project-Specific Findings

- Upstream `NotionNext` has newer Notion compatibility logic that normalizes nested `value.value` records.
- `heo` theme components need to tolerate posts without `href` so fallback states do not crash SSR.
- `themes/heo/components/InfoCard.js` must tolerate missing greetings config.
- Build-time `MemoryCache` is not enough for Next.js static generation because workers do not share memory; use file-backed cache when verifying production builds locally.
- If a production-style build starts hammering Notion for tag/category/search/dashboard routes, shrink `getStaticPaths()` first and let those routes render with `fallback: 'blocking'`.
- Good local success checks for this repo:
  - homepage HTML contains `siteInfo.title":"Life, The Universe, and Everything`
  - homepage HTML contains a real slug like `mental-model-ii-cognitive`
  - homepage HTML does not contain `NotionNext BLOG`
