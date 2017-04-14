# Data Migration

This document compares the old editor format to the new format used in this libary and outlines the steps necessary to make the migration.

## Row / Zone Format

In Firebase, components are currently arranged like this:

```json
{
  "id": "KH0MU56wxb7_xDInjZi",
  "components": [
    {
      "componentType": "editor",
      "html": "<h1 style=\"text-align: center;\">Try this Out!</h1>"
    },
    {
      "componentType": "image",
      "src": "https://res.cloudinary.com/dnjrorsut/image/upload/123.jpg"
    }
  ],
  "nextText": "Try It Out!",
  "stepType": "components",
  "content": "<h1 style=\"text-align: center;\">Try this Out!</h1><img src=\"...\" />"
}
```

This is how the same thing would be output using this new library:

```json
{
  "rows": [
    {
      "id": "a46e5cee-4991-498a-85f2-b187df198a25",
      "zones": [
        {
          "id": "2be64035-0523-448e-94bb-ce0ea5abde16",
          "componentType": "RichText",
          "persistedState": {
            "content": "<h1 style=\"text-align: center;\">Try this Out!</h1>"
          }
        }
      ]
    },
    {
      "id": "eeb81d39-b76f-43dd-a6f8-86df1de8ed2d",
      "zones": [
        {
          "id": "111127fe-273d-4460-bd8a-ccc2a30ef253",
          "componentType": "Image",
          "persistedState": {
            "src": "https://res.cloudinary.com/dnjrorsut/image/upload/123.jpg"
          }
        }
      ]
    }
  ],
  "html": "SEE BELOW",
  "ast": "REALLY LONG OBJECT FROM html-parse-stringify2"
}
```

The HTML outputted from the library would look like this:

```html
<div class="canvas">
  <div class="row">
    <div class="zone-container">
      <div class="zone">
        <div class="content">
          <div>
            <div>
              <h1 style=\"text-align: center;\">Try this Out!</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>,
  <div class="row">
    <div class="zone-container">
      <div class="zone">
        <div class="content">
          <div>
            <div>
              <img src=\"https://res.cloudinary.com/dnjrorsut/image/upload/123.jpg\" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

## Component Types

** Coming Soon **

