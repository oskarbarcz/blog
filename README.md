# Astro Starter Kit: Basics

```sh
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src/
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

---

## 🚢 Deployment: GitHub Pages (Actions)

This project is configured to deploy to GitHub Pages via GitHub Actions.

Repository: `oskarbarcz/blog`

### What’s included

- Workflow: `.github/workflows/deploy.yml` builds the site and deploys to the `github-pages` environment on every push to `main`.
- Astro config sets `site: "https://blog.barcz.me"` to generate canonical URLs for your future custom domain.

### One-time setup in GitHub UI

1. Push the workflow to the `main` branch (already in this repo once you commit).
2. In GitHub → Settings → Pages:
   - Source: “GitHub Actions”.
   - Ensure Pages is enabled; first deploy will appear after the workflow runs.

### Custom domain (later)

When you’re ready to use `blog.barcz.me`:

1. In your DNS provider, create a CNAME record:
   - Host: `blog`
   - Value: `oskarbarcz.github.io.`
2. In GitHub → Settings → Pages → “Custom domain”: enter `blog.barcz.me` and save.
3. Optionally add a `public/CNAME` file with the single line:
   ```
   blog.barcz.me
   ```
   Commit to persist the domain in the repository (prevents accidental resets).

Notes:

- Until the custom domain is active, GitHub Pages will preview under `https://oskarbarcz.github.io/blog/`.
- Because `astro.config.mjs` uses `site = https://blog.barcz.me`, canonical URLs will already point to your future domain; this is fine during transition.

### Local development

Nothing changes:

```
npm install
npm run dev
npm run build
```

### Troubleshooting

- If deployment fails with “pages deployment not enabled”, visit Settings → Pages and click “Enable”.
- If assets 404 on the GitHub Pages preview URL, ensure the workflow completed successfully. With `site` pointing to a custom domain, asset paths are still relative and should work; open devtools network to confirm.
- DNS changes for the custom domain may take time (TTL). Use `nslookup blog.barcz.me` to verify.
