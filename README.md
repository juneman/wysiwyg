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

## Usage

The main export of this library is a `<Canvas />` react component. You can see some example usage by opening up the `/demo/index.html` file.

In addition, there is currently a `/demo/canvas.css` file with some basic styles that would need to be shared between both this editor and the client rendering.

### Sample Component
```jsx
<Canvas
  width="100%"
  height="300px"
  onSave={(content) => { // do something } }
  rows={
    [
      {
        "id": "17477d46-de5c-4bce-80c7-913eba1cbb3b",
        "zones": [
          {
            "id": "1515a32c-49ba-4219-baca-4972e9efec50",
            "type": "PlainText",
            "content": "Top Left Text"
          },
          {
            "id": "a1f35283-d18d-450e-a739-ef7300249279",
            "type": "Button",
            "content": "Top Right Button"
          }
        ]
      },
      {
        "id": "836951fd-de87-40c0-9050-7394fdc945b2",
        "zones": [
          {
            "id": "57d72c28-1f8d-4e97-b734-2532f18afcdd",
            "type": "Button",
            "content": "Bottom Left Button"
          },
          {
            "id": "a95cac65-e119-4c88-9871-6e6dae340f82",
            "type": "PlainText",
            "content": "Bottom Right Text"
          }
        ]
      }
    ]
  }
/>
```

More details coming later as APIs start to become more finalized.

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