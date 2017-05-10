# WYSIWYG Usage

The main export of this library is a `<Wysiwyg />` react component. You can see some example usage by opening up the `/demo/index.html` file.

## CSS

Styling for the WYSIWYG editor is in 3 separate areas:

 * When possible, styling for things that are specific only to the editor are done with React inline styling
 * Some styles will be needed in both the editor **AND** the rendered content on the final page. Those styles that overlap are in `/demo/shared.css`
 * There is additional styling that should probably be added to both areas as well. While optional, they make the output look a little bit better. Those styles are in `/demo/custom.css` 

## Sample Component
```jsx
<Wysiwyg
  width={100}
  height={300}
  onSave={(content) => { // do something } }
  rows={
    [
      {
        "id": "17477d46-de5c-4bce-80c7-913eba1cbb3b",
        "zones": [
          {
            "id": "1515a32c-49ba-4219-baca-4972e9efec50",
            "type": "RichText",
            "persistedState": {
              "content": "<p>Top Text</p>"
            }
          }
        ]
      },
      {
        "id": "836951fd-de87-40c0-9050-7394fdc945b2",
        "zones": [
          {
            "id": "a95cac65-e119-4c88-9871-6e6dae340f82",
            "type": "RichText",
            "persistedState": {
              "content": "<p>Bottom Text</p>"
            }
          }
        ]
      }
    ]
  }
/>
```

## Component Properties

| Property | Is Required | Data Type | Default Value |
| --- | --- | --- | --- |
| `cloudinary` | `true` | `Object` | - |
| `rows` | `false` | `Array<Row>` | - |
| `onSave` | `false` | `Function` | - |
| `style` | `false` | `React Style Object` | - |
| `userProperties` | `false` | `Array<k,v>` | - |
| `disableAddButton` | `false` | `Boolean` | `false` |
| `startEditable` | `false` | `Boolean` | `false` |
| `maxRows` | `false` | `Number` | Unlimited |
| `aceEditorConfig` | `false` | `Object` | See below |
| `allowedEditorTypes` | `false` | `Array<string>` | All Values Allowed |

### Cloudinary Format

In order for Cloudinary integration to work (which is required), you must supply a `cloudinary` property to the component with the following properties:

```javascript
{
  accountId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  uploadUrl: PropTypes.string.isRequired,
  apiKey: PropTypes.string.isRequired
}
```

See the `demo/index.html` for a sample of what this data looks like.

### Row Format

Row data is passed in through the `rows` property to the `<Wysiwyg />` component.

 * Each `Row` contains:
   * A unique `id` (guid)
   * An array of `Zone` objects
 * Each `Zone` object contains:
   * A unique `id` (guid)
   * A `type` property that is one of the Editor types below
   * A `persistedState` object representing data specific to the `type` of `Zone`

### Allowed Editor Types

You can see all the Editor Types in `/components/EditorSelector.js`.

 * `RichText`
 * `Image`
 * `Video`
 * `Hero`
 * `HTML`
 * `Form`
 * `Button`
 * `TextInput`
 * `TextAreaInput`
 * `SelectionField` - Supports checkbox, radio buttons, and dropdown lists

Note that the `EditorSelector.js` file also has other types that show up in the list of options (e.g. `Rating`),
but those additional types are composed from the basic Editor Types above.

### User Properties

Custom user properties that can be inserted into the HTML content are supported if a `userProperties` array is
passed to the component. Each array item is a `name` / `value` pair.

```javascript
[
  {
    name: 'First Name',
    value: '{{firstname}}'
  },
  {
    name: 'Last Name',
    value: '{{lastname}}'
  }
];
```

### Ace Editor Options

See here: [https://github.com/securingsincity/react-ace](https://github.com/securingsincity/react-ace)

You can pass any options from the `react-ace` page into the `aceEditorConfig` property.

Defaults are:

```javascript
{
  name: 'code-editor',
  editorProps: { $blockScrolling: true },
  showGutter: false,
  showPrintMargin: false,
  width: '400px',
  height: '150px'
}
```

### Close All

To trigger a close of the editable zones and the menus, you can call an instance
method on the `<Wysiwyg />` component. You would do that like this:

```jsx
let editor;
ReactDOM.render(
  <Wysiwyg ref={(el) => editor = el} />
, document.getElementById('app'));
editor.closeAll();
```

### Drag and Drop Context

The wysiwyg uses react-dnd for drag and drop functionality. Since this might conflict
with the parent page using the same library, the `<Wysiwyg />` component exports an
instance method `getManager()` so that you can reuse the same backend. More info here:
[https://react-dnd.github.io/react-dnd/docs-drag-drop-context.html](https://react-dnd.github.io/react-dnd/docs-drag-drop-context.html)

```jsx
let editor;
ReactDOM.render(
  <Wysiwyg ref={(el) => editor = el} />
, document.getElementById('app'));
editor.getManger();
```