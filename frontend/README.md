# Mindbridge | Browser client

## Setup

```
npm i
```

## Run

```
npm start
```

## API configuration

To configure API address you need to change the `src/setupProxy.js` and set the correct port.

## Environment variables

To use Environment variables you need to create a file `.env` in the root of `frontend` folder and add your variable

```
VAR=value
```

To use Environment variable in the application you need to extend `src/env.ts` file

```
import { getOsEnv } from 'helpers/path.helper';

export const env = {
  value: getOsEnv('VALUE')
};

```

## Code scaffolding

To create boilerplate code use plopjs in terminal.

```
frontend> plop
```

And follow the prompts in console. Sample output below:

```
mindbridge\frontend>plop
? [PLOP] Please choose a generator. (Use arrow keys)
> component - TS functional react component with props interface
  screen - TS functional react & redux & saga screen section with props interface and redux connection
  routine - A routine to go
```

## Code structure

Each screen has the following structure:

- a root catalog that has the name in pascale case. (For example `BrowseSpaces`);
- a root page that is located inside the `containers` folder and has the name like `BrowseSpacesPage` with the
  `Page` prefix;
- a root reducer and root saga inside their according folders;
- a page-related saga and reducer inside the page folder with `Page` prefix described above;

Sometimes we may want to group screens and route them in a specific way. This is when `plopjs`
in `Code scaffolding` paragraph comes to hand. It has the instructions for nested screens. An example of such a screen
is `NeedsDashboard`. It contains the root catalog `NeedsDashboard`, the root routing container
`Root` and nested screens that are linked to the `Root` container.
