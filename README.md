# Appcues Editor

## Demo

There is a demo included which uses [Webpack Dev Server](https://webpack.github.io/docs/webpack-dev-server.html) to compile the component code on the fly and render an HTML page with various examples of editors. This demo page is also a good environment for doing development.

### Starting the Demo Server

 1. Make sure you're on a recent version of [node.js](https://nodejs.org/en/). There is an `.nvmrc` file in the project root, allowing you to type `nvm use` if you have [nvm](https://github.com/creationix/nvm) installed. That will reference the version of node that this library was authored with.
 1. `npm install`
 2. `npm run dev`
 3. Open [http://localhost:8080/](http://localhost:8080/)

### How the Demo Works

To see what the demo is doing in order to get example usage of the component, open `/demo/index.html`.

 * React and React-DOM are loaded as scripts from a CDN, so the webpack build does not need to compile them constantly.
 * [Babel Standalone](https://github.com/babel/babel-standalone) is used so that we can use JSX within the demo HTML page and not have to include a separate build process just for the demo page.

## Development

### Installation

Follow the instructions in the Demo section at the top.

### Unit Tests

This library uses the following frameworks for unit testing:

 * [Mocha](https://mochajs.org/)
 * [Chai](http://chaijs.com/) (using the `expect` format)
 * [Enzyme](http://airbnb.io/enzyme/)
 * [Chai-Enzyme](https://github.com/producthunt/chai-enzyme)
 * [Istanbul](https://istanbul.js.org/) for test coverage

To run the unit tests:

 * `npm test`

To run test coverage with HTML output:

 * `npm run coverage-report`
 * Open the HTML page `/coverage/index.html` in a web browser

### Linting

Linting is done with [ESLint](http://eslint.org/). It uses the same lint configuration as the SDK.

To run the lint:

 * `npm run lint`

This will also be done at the completion of running the unit tests.

## Usage

[Usage Guide](docs/Usage.md)

## Data Migration

[Data Migration Guide](docs/DataMigration.md)