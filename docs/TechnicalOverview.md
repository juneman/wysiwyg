# Technical Overview

The goal of this page is to guide you in understanding the code and maintaining this Wysiwyg Editor.

## Architecture

  * Uses React and Redux - the main export is a React component
  * Written in ES6, compiling down with Babel
  * Leverages [immutable.js](https://facebook.github.io/immutable-js/) throughout
  * Webpack Dev Server is used for local development
  * Webpack is used for compiling the `/dist/index.js` file that can be imported as a `<script>` tag
  * Uses Babel to compile the `/lib/*` folder of ES5 code that can be imported into another project as a dependent library.

## Main Component Layout

In the `components` folder are the main React components necessary to render the UI.
They break down like this:

```jsx
<Wysiwyg>
  <Canvas>
    <AddButtonArea />
    <EditorSelector />
    <FullAddElement>
      <ImageUploader />
    </FullAddElement>
    <RowContainer>
      <Row>
        <Zone>
          { ... editors and toolbars load here }
        </Zone>
      </Row>
    </RowContainer>
  </Canvas>
</Wysiwyg>
```

## Folder Structure

  * `actions` - Contains Redux actions that you can call from the components
  * `components` - The main layout components such as the `Row` and `Zone`
  * `editor-actions` - These are self-contained toolbar actions such as `Bold` or `FontColor`
  * `editors` - Contains a folder for each of the available editors (e.g. `RichText`). Each folder contains the editor component (`RichTextEditor.js`) and toolbar (`RichTextToolbar.js`)
  * `helpers` - Misc helper files with shared functionality.
  * `icons` - Contains one file for each SVG icon used - each one wraps `IconButton.js`
  * `reducers` - Contains the Redux reducers

## Zone -> Editor Interaction

The `<Zone />` component is the main container of the editors, and what ties everything together. It works by doing a `switch` on the type of Editor the `<EditorSelector />` has selected. From there it passes the same props to all editors and toolbars, and render one Editor and one Toolbar at a time.

### State

There are two main variables that are kept in sync between editors, editor actions, and toolbars:

  * `persistedState` (`Immutable<Map>`) - This is part of the `zone` data and is saved up the chain
  * `localState` (`Immutable<Map>`) - This is for local rendering only and will not be saved permanently. It should contain any data necessary for rendering the UI, but not necessary to be persisted. An example is the Draft.js `editorState`, which is just the current state of the editor before the user clicks the Save button.

### Editors

An editor should be designed in such a way as to minimize the need for an underlying WYSIWYG editor (Draft.js). For example, with the `Button` editor, most attributes can be set without touching Draft at all, such as the background color or action of the button.

By minimizing the necessity of Draft, we're:

  * Less dependant on it's quirkiness and issues
  * More like to be able to replace it with a better WYSIWYG in the future if one presents iself

Each editor must:

 * Have an instance method: `generateHTML(persistentState: <Map>)`
 * Have an instance method: `focus()`
 * By default render the content **as-is**, without any additional DOM
 * Render their edit mode when the `isEditing` prop is passed in `true`

The `generateHTML` method must be able to generate the correct HTML for that editor type based on the `persistentState` that is passed in. As an editor makes and saves changes, the `persistentState` is updated (and bubbled up to potentially be persisted), and new HTML is generated using this function.

The `focus` method is there to make sure the Draft.js editor stays focused even when buttons are clicked.

### Toolbars

Each toolbar must:

  * Pass an array of `editor-actions` to the Toolbar renderer

That's it for toolbars. Most of the logic in the toolbars is in each individual editor action. A toolbar is therefore just a collection of Editor Actions specific to one Editor type.

### Editor Actions

Editor Actions (e.g. Bold, FontStyle, etc) are responsible for both rendering an icon button to the toolbar as well as potentially rendering any secondary menu items. So each editor action is a completely self-contained set of functionality.

#### Example: Font Color

The Font Color editor action leverages the `react-color` library to generate a color picker when the user clicks the main Font Color icon. It must do the following:

  1. By default render just the `FontColorButton` with an `onClick` event
  2. `onClick` bubble up the `onToggleActive` action for Redux
  3. Redux will send back down that this component is now `isActive`
  4. Render the secondary menu containing the color picker
  5. On the `onChangeComplete` of the color picker, update the color of the selected text in Draft. This is done by updating the `localState.editorState` and calling `onChange({persistedState, localState})`.

Due to the complexity of updating `editorState`, the main save function looks like this:

```javascript
handleColor(color) {
  const { localState, persistedState, onChange } = this.props;
  const editorState = localState.get('editorState');
  const toggledColor = color.hex;

  // Get the current inline style applied to the selected text
  const styles = editorState.getCurrentInlineStyle().toJS();

  // For each style applied to the selected text, remove any existing ones that are colors
  let nextEditorState = styles.reduce((state, styleKey) => {
    if (styleKey.startsWith(CUSTOM_STYLE_PREFIX_COLOR)) {
      return RichUtils.toggleInlineStyle(state, styleKey);
    }
    return state;
  }, editorState);

  // Turn on the style for this color
  nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, CUSTOM_STYLE_PREFIX_COLOR + toggledColor);

  // Update the localState with this updated editorState
  const newLocalState = localState.set('editorState', nextEditorState);

  // Push the changes back up, including the unchanged persistedState
  onChange({
    localState: newLocalState,
    persistedState
  });
}
```

#### Example: Background Color

The Background Color editor action also leverages the `react-color` library.

Interactions 1-4 will match what happens here as well. The main difference then is Step #5, since `backgroundColor` is not a property that is set within Draft. Instead this is saved immediately to the `persistedState` of the zone data.

Therefore the save function looks more like this:

```javascript
handleColor(color) {
  const { localState, persistedState, onChange } = this.props;
  const toggledColor = color.hex;

  // Updated the persisted state with this new backgroundColor value
  const newPersistedState = persistedState.set('backgroundColor', toggledColor);

  // Push the changes back up, including the unchanged localState
  onChange({
    localState,
    persistedState: newPersistedState
  });
}
```

Notice it does not touch `localState` or `editorState`. The editor knows how to use the `backgroundColor` property to change the color when rendering.

## Draft Editor

In the editor where it's necessary to edit text (both rich text and plaintext), [Draft.js](https://draftjs.org/docs/overview.html) is used to render that editable area.

I found it beneficial to watch the [intro video from React Conf 2016](https://www.youtube.com/watch?v=feUYwoLhE_4) that's featured on their homepage. I think it helps get your head around how Draft thinks about building a WYSIWYG editor.

### Editor State

The main way that you interact with Draft is through `editorState`, which is an immutable object first created by an Editor (e.g. `RichText`) when it's mounted. From there it is saved to `localState` and passed back and forth between the Editor, Toolbar, and Editor Actions.

The documentation and StackOverlow are all that will save you here:
[https://draftjs.org/docs/api-reference-editor-state.html](https://draftjs.org/docs/api-reference-editor-state.html)

### Convert to/from HTML

The editor leverages [draft-convert](https://github.com/HubSpot/draft-convert) from Hubspot to help when converting Draft.js data to HTML and vice versa. Draft doesn't do this by default, so the conversion library helps this along.

Some conversion is done by the library, but `helpers/draft/convert.js` and the other files in the `helpers/draft` folder are additional options written to make sure the HTML converts correctly.