# Atlas Alpine Expedition — Codex project instructions

## Project context
- This is the Atlas Alpine Expedition website, built with Jekyll and deployed to GitHub Pages via GitHub Actions.
- Current verified local environment: Ruby 3.3.x, Bundler 2.6.9, Jekyll 3.10.0, Liquid 4.0.4, `github-pages` gem.
- The website's existing design, content, navigation, styling, images, metadata, and links must be preserved unless the task explicitly asks to change them.

## Scope and efficiency
- Before editing, identify the exact page, component, and files relevant to the request.
- Read only the necessary files and nearby dependencies. Do not recursively scan the entire repository unless a task genuinely requires it.
- Prefer the smallest focused patch. Do not restructure unrelated files, rename assets, or reformat whole files for a small change.
- When information is missing, report assumptions. Explain proposed changes before large refactors.

## Jekyll conventions
- Respect YAML front matter, Liquid tags, layouts, includes, collections, and `_config.yml`.
- Keep paths compatible with GitHub Pages and Jekyll `relative_url` / `absolute_url` filters where appropriate.
- Preserve SEO metadata, accessible markup, responsive behavior, and existing visual design.
- Do not edit generated `_site/` output or commit it; edit the source files instead.
- Do not upgrade Ruby, Jekyll, Liquid, Bundler, gems, or the lockfile unless explicitly requested.
- Do not change the custom domain or deployment workflow unless asked.

## Local verification
- Preferred local commands (from repository root):
  - `bundle _2.6.9_ check`
  - `bundle _2.6.9_ exec jekyll build`
  - `bundle _2.6.9_ exec jekyll serve`
- After modifications, run the most relevant available checks; run a Jekyll build for changes affecting site output.
- Inspect the actual build errors and distinguish warnings from failures.
- If checks cannot run, state why and what remains unverified.

## Git safety and deployment
- Never run `git push --force`, destructive reset/clean, or discard local changes.
- Before Git operations, check `git status` and avoid overwriting unrelated work.
- Never commit, push, deploy, modify Actions settings, or change DNS without explicit user approval.
- For changes to `.github/workflows/`, inspect existing workflows first to avoid competing deployments.
- After a task, summarize files changed, checks run, remaining issues, and whether deployment is pending.

## Workflow with the user
- For small, well-defined changes, implement directly with a concise summary.
- For potentially destructive or site-wide changes, provide a short plan and get approval first.
- Keep implementation minimal, editorial, responsive, and consistent with the existing Atlas Alpine Expedition aesthetic rather than inventing a new template.
