[Try it on preview](https://cat-fact-phi.vercel.app/) 

## Dev-guide

### Launch dev-stand

```
$ pnpm i                    # install dependencies
$ pnpm run dev              # launch stand
```

### Launch tests

```
$ pnpm playwright           # E2E tests
$ pnpm vitest               # unit tests
$ pnpm lint                 # linters tests
```

### Chakra Theme CodeGen

```
$ pnpm theme                   # generate types for work with custom theme - once
$ pnpm theme --watch           # generate types for work with custom theme - watch-mode
```

## VSCode

Plugins list for better **DX**

> There is a required base config for all of these

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint) - Autofix on save, testing from linters
- [Playwright](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright) -  UI for running the playwright testing
- [Vitest](https://vitest.dev/) -  UI for running the Vitest testing

## Technology stack

- **UI**: `react`, `chakra-ui`
- **Lang**: `typescript (5.0.2+)`

1.  **Fetching**: `react-query`
2.  **State management**: `react-query`
3.  **Tests**: `eslint`, `prettier`, `vitest`, `playwright`

- **CI/CD**: `github-actions`

## TODO
- [ ] Add code documentation
- [ ] Consolidate the business features, entities/domain objects, and update the architecture accordingly.
- [ ] Config path alias for a more pleasant import path looking?
- [ ] Set up the protected branch and add contribution guidelines.
- [ ] Update E2E to test against the deploy preview
- [ ] Update integration & unit tests' report on CI 
- [ ] Add logging service?
