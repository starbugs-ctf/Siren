# Siren

Siren is a Attack & Defense CTF dashboard
developed by team StarBugs for DEF CON CTF 2021 Finals.
Siren is a frontend for our exploit management system.
For backend side, check [fireball](https://github.com/starbugs-ctf/fireball).

![screenshot](./Screenshot.png)

## Initial Setup

Install [node.js](https://nodejs.org/en/download/).

```
# Install yarn
npm install --global yarn

# Install blitz
yarn global add blitz
```

You might need to add yarn bin path to your environment variable.
Use `yarn global bin` command to get the directory location.

### Environment Variables

Ensure the `.env.local` file has required environment variables
(`cp .env .env.local` then add this line):

```
DATABASE_URL="file:./db.sqlite"
```

Ensure the `.env.test.local` file has required environment variables:

```
DATABASE_URL="file:./db_test.sqlite"
```

## Development Guides

### Useful Commands

```
# Run your app in the development mode.
# Open http://localhost:3000 with your browser to see the result.
blitz dev

# Reset DB & populate with test data
# Initialized by `db/seeds.ts`
blitz prisma migrate reset -f && blitz db seed

# Explore and manipulate data through a webapp
blitz prisma studio
```

### Useful Links

- [Tailwind UI](https://tailwindui.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Hero Icons](https://heroicons.com/)

### Tests

Runs your tests using Jest.

```
yarn test
```

Blitz comes with a test setup using [Jest](https://jestjs.io/) and [react-testing-library](https://testing-library.com/).

## Commands

Blitz comes with a powerful CLI that is designed to make development easy and fast. You can install it with `npm i -g blitz`

```
  blitz [COMMAND]

  dev       Start a development server
  build     Create a production build
  start     Start a production server
  export    Export your Blitz app as a static application
  prisma    Run prisma commands
  generate  Generate new files for your Blitz project
  console   Run the Blitz console REPL
  install   Install a recipe
  help      Display help for blitz
  test      Run project tests
```

You can read more about it on the [CLI Overview](https://blitzjs.com/docs/cli-overview) documentation.

## Directory Structure

Siren uses blitz.js and follows its directory structure.

- The `app/` folder is a container for most of your project. This is where you’ll put any pages or API routes.

- `db/` is where your database configuration goes. If you’re writing models or checking migrations, this is where to go.

- `public/` is a folder where you will put any static assets. If you have images, files, or videos which you want to use in your app, this is where to put them.

- `integrations/` is a folder to put all third-party integrations like with Stripe, Sentry, etc.

- `test/` is a folder where you can put test utilities and integration tests.

- `package.json` contains information about your dependencies and devDependencies. If you’re using a tool like `npm` or `yarn`, you won’t have to worry about this much.

- `tsconfig.json` is our recommended setup for TypeScript.

- `.babelrc.js`, `.env`, etc. ("dotfiles") are configuration files for various bits of JavaScript tooling.

- `blitz.config.js` is for advanced custom configuration of Blitz. It extends [`next.config.js`](https://nextjs.org/docs/api-reference/next.config.js/introduction).

- `jest.config.js` contains config for Jest tests. You can [customize it if needed](https://jestjs.io/docs/en/configuration).

You can read more about it in the [File Structure](https://blitzjs.com/docs/file-structure) section of the documentation.

### Tools included

Blitz comes with a set of tools that corrects and formats your code, facilitating its future maintenance. You can modify their options and even uninstall them.

- **ESLint**: It lints your code: searches for bad practices and tell you about it. You can customize it via the `.eslintrc.js`, and you can install (or even write) plugins to have it the way you like it. It already comes with the [`blitz`](https://github.com/blitz-js/blitz/tree/canary/packages/eslint-config) config, but you can remove it safely. [Learn More](https://eslint.org).
- **Husky**: It adds [githooks](https://git-scm.com/docs/githooks), little pieces of code that get executed when certain Git events are triggerd. For example, `pre-commit` is triggered just before a commit is created. You can see the current hooks inside `.husky/`. If are having problems commiting and pushing, check out ther [troubleshooting](https://typicode.github.io/husky/#/?id=troubleshoot) guide. [Learn More](https://typicode.github.io/husky).
- **Prettier**: It formats your code to look the same everywhere. You can configure it via the `.prettierrc` file. The `.prettierignore` contains the files that should be ignored by Prettier; useful when you have large files or when you want to keep a custom formatting. [Learn More](https://prettier.io).

## Learn more

Read the [Blitz.js Documentation](https://blitzjs.com/docs/getting-started) to learn more.

The Blitz community is warm, safe, diverse, inclusive, and fun! Feel free to reach out to us in any of our communication channels.

- [Website](https://blitzjs.com/)
- [Discord](https://discord.blitzjs.com/)
- [Report an issue](https://github.com/blitz-js/blitz/issues/new/choose)
- [Forum discussions](https://github.com/blitz-js/blitz/discussions)
- [How to Contribute](https://blitzjs.com/docs/contributing)
- [Sponsor or donate](https://github.com/blitz-js/blitz#sponsors-and-donations)
