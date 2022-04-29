---
title: CLI Reference
menuText: CLI Reference
description: CLI commands reference to develop, manage, and deploy Serverless Cloud applications.
menuOrder: 7
---

# CLI Reference

The Serverless Cloud CLI is an auto-updating command-line interface (CLI) that provides a simple, unified interface to Serverless Cloud. The CLI has multiple modes to optimize the experience for different contexts:

- **Cloud Shell**: The interactive Cloud Shell allows developers to connect to their developer sandbox from their local IDE, auto sync code changes, stream logs, and run common commands and pre-defined scripts to manage their full-stack development workflow.
- **Standard Mode**: Standard mode allows developers to run commands from your terminal without having to open an interactive session. Login is still required.
- **Headless Mode**: Headless mode allows developers to run commands from [CI/CD](/cloud/docs/workflows/cicd) systems using an Access Token.

The CLI automatically updates to the latest version to ensure that users have access to the latest features and fixes. This includes auto-updates of the package locally installed in a project.

**Current CLI Version:** ![Serverless Cloud Latest Version](https://img.shields.io/npm/v/@serverless/cloud.svg)

**PLEASE NOTE:** The CLI requires Node.js v16 or higher. You can check your current Node.js version by running `node -v`.

## Cloud Shell

The interactive Cloud Shell allows developers to connect to their **developer sandbox** from their local IDE, auto sync code changes, stream logs, and run common commands to manager their development workflow.

To enter the interactive Cloud Shell, run the `cloud` command from your terminal. If you do not have the `@serverless/cloud` NPM package installed globally, you can also run `npx @serverless/cloud`.

Additional flags can be passed to the `cloud` command to configure the behavior of the Cloud Shell.

- `--seed`: Seed data from your `data.json` file on initialization.
- `--reseed`: Enable automatic data reseeding when the `data.json` file is updated.
- `--org`: Overwrites the organization of the project in your current directory.
- `--app`: Overwrites the app of the project in your current directory.
- `--template`: Initiate a new project from a template in the [templates repository](https://github.com/serverless/cloud/tree/main/templates). E.g. `--template=sveltekit-ts`.

To exit the interactive Cloud Shell, type `exit`.

![Serverless Cloud interactive Cloud Shell](https://user-images.githubusercontent.com/2053544/135511480-748cd463-9ff1-43a8-ab62-88ac78d2d75d.png)

### `dev`

Starts the local development server in a child process, if a script named `cloud:dev` is defined in `package.json`.

### `share [NAME]`

Deploys the **code AND data** from your **developer sandbox** to a **preview instance** named `NAME`. If no `NAME` is provided, a randomly generated name will be created for you.

A **preview instance** is an ephermeral instance that you can use to easily share your work with others. Preview instances allow you to create a stable snapshots of your **developer sandbox** so that you can get feedback while continuing to make changes to your own version.

If a script named `cloud:build` is defined in `package.json`, it will be run before deploying.

### `deploy [STAGE]`

Deploys the **code** from your **developer sandbox** to the provided `STAGE`. If no `STAGE` is provided, it will prompt you to enter a `STAGE`.

A `STAGE` is a long-lived instance/environment that hosts your app. Common names for `STAGE`s are `prod`, `staging`, `qa`, and `dev`.

If a script named `cloud:build` is defined in `package.json`, it will be run before deploying.

### `delete [STAGE]`

Deletes the instance named `[STAGE]`. Warning: this is a destructive action.

### `promote [from] [to]`

Deploys code from one stage to another stage. If `from` and `to` are not provided, it will prompt you to enter the `from` and `to` stages.

### `import [FILENAME] [--overwrite] `

Seeds data from the `FILENAME` in your local directory to your **developer sandbox**. If no `FILENAME` is provided, it will default to `data.json`. By default, the data will be merged with existing data. If you specify the `-o` or `--overwrite` flag, all data will be cleared and reseeded.

### `export [FILENAME] [--overwrite] `

Exports data from your **developer sandbox** to a JSON file named `FILENAME` in your current working directoy. If no `FILENAME` is provided, it will default to `data.json`. If the `FILENAME` already exists, you can specify the `-o` or `--overwrite` flag to overwrite the existing file.

### `test [PATTERN] [--workers <n>]`

Runs defined tests against your connected developer sandbox. Please note that this will use and (depending on your tests) potentially modify data in your developer sandbox. To run these tests on an isolated instance, exit the shell and run `cloud test`.

If `[PATTERN]` is specified, only test files that match the pattern will be run. The pattern is a regular expression that is matched against the test file path.

If `--workers <n>` is specified, up to `<n>` workers will be used to run tests in parallel. Note that for this to work, your tests must be independent of each other and not rely on any shared data.

### `install [PACKAGENAME]`

Installs the specified npm package into your application, and syncs your developer sandbox once it's done. If you did not provide a package name, it'll simply install all your app's dependencies listed in `package.json`.

### `uninstall [PACKAGENAME]`

Uninstalls the specified npm package from your application, and syncs your developer sandbox once it's done.

### `version`

Displays the current running version of the CLI.

### `url`

Displays the current URL of your **developer sandbox**.

### `open`

Opens the dashboard to the current app in your default browser.

### `docs`

Opens the Serverless Cloud documentation in your default browser.

### `quit` / `exit` or _Ctrl/Cmd+C_

Terminates the interactive cloud shell and disconnects from your **developer sandbox**.

### `clear`

Clears the terminal screen.

### `help`

Displays a simple help screen that shows all the available commands and their options.

## Standard Mode

Standard mode allows developers to run commands from your terminal without having to open an interactive session. Login is still required.

### `cloud login`

Logs the user in via the browser

### `cloud logout`

Logs the user out of the current session

### `cloud test`

Deploys code from the current directory and run tests in an isolated instance. After tests are complete, the instance is automatically terminated.

### `cloud share [NAME]`

Deploys the **code AND data** from your **developer sandbox** to a **preview instance** named `NAME`. If no `NAME` is provided, a randomly generated name will be created for you.

A **preview instance** is an ephermeral instance that you can use to easily share your work with others. Preview instances allow you to create a stable snapshots of your **developer sandbox** so that you can get feedback while continuing to make changes to your own version.

### `cloud deploy [STAGE]`

Deploys the **code** from your local directory to the provided `STAGE`. If no `STAGE` is provided, it will prompt you for a `STAGE` name.

A `STAGE` is a long-lived instance/environment that hosts your app. Common names for `STAGE`s are `prod`, `staging`, `qa`, and `dev`.

### `cloud delete [STAGE]`

Deletes the instance named `[STAGE]`. Warning: this is a destructive action.

### `cloud install [PACKAGENAME]`

Installs the specified npm package into your application. If you did not provide a package name, it'll simply install all your app's dependencies listed in `package.json`.

### `cloud uninstall [PACKAGENAME]`

Uninstalls the specified npm package from your application.

### `cloud clone [@ORG_NAME/APP_NAME/INSTANCE_NAME] [-overwrite]`

Copies **code** AND **data** from `INSTANCE_NAME` of service `APP_NAME` of org `ORG_NAME` to your local directory and your **developer sandbox**. If `ORG_NAME` is not specified it will clone from the logged in organization. Note that you should have access to the given org name otherwise the operation fails. `INSTANCE_NAME` can specify either a stage (like `prod` or `dev`), or a preview instance. If your current directory is not empty, you can use the optional `--overwrite` (or `-o`) flag. If no `APP_NAME` is specified, it will default to the app in your current directory. If not `INSTANCE_NAME` is specified, it will display a list of available instance to choose from.

### `cloud promote [from] [to]`

Deploys code from one stage to another stage. If `from` and `to` are not provided, it will prompt you to enter the `from` and `to` stages.

### `cloud import [FILENAME] [--overwrite] `

Seeds data from the `FILENAME` in your local directory to your **developer sandbox**. If no `FILENAME` is provided, it will default to `data.json`. By default, the data will be merged with existing data. If you specify the `--overwrite` flag, all data will be cleared and reseeded.

### `cloud export [FILENAME] [--overwrite] `

Exports data from your **developer sandbox** to a JSON file named `FILENAME` in your current working directoy. If no `FILENAME` is provided, it will default to `data.json`. If the `FILENAME` already exists, you can specify the `--overwrite` flag to overwrite the existing file.

### `cloud version`

Displays the running version of the CLI.

### `cloud url`

Displays the current URL of your **developer sandbox**.

### `cloud open`

Opens the dashboard to the current app in your default browser.

### `cloud docs`

Opens the Serverless Cloud documentation in your default browser.

### `cloud help`

Displays a help screen that shows all the available commands and their options.

## Headless Mode

Headless mode allows developers to run commands from [CI/CD](/cloud/docs/workflows/cicd) systems using an Access Token. If the CLI detects a `SERVERLESS_ACCESS_KEY` environment variable and there is no active login, the CLI will run in headless mode.

The following commands are supported in headless mode:

### `cloud test [PATTERN] [--workers <n>]`

Deploys code from the current directory and run tests in an isolated instance. After tests are complete, the instance is automatically terminated.

If `[PATTERN]` is specified, only test files that match the pattern will be run. The pattern is a regular expression that is matched against the test file path.

If `--workers <n>` is specified, up to `<n>` workers will be used to run tests in parallel. Note that for this to work, your tests must be independent of each other and not rely on any shared data.

### `cloud deploy {STAGE}`

Deploys **code** from the local directory to the specified `STAGE`. `STAGE` is required.
