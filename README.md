# definer
<i>Load and (re)define multiple web components from a single script using URL query parameters.</i>

## Demos
- Live Test: https://definer.netlify.app/demo/
- Live CodePen Demo: https://codepen.io/nonsalant/pen/bNbKjZR?editors=1010

In the pen above multiple web components are being imported as modules from the pen's own JS tab along with some other components from a different source.

## Usage Examples

### 1. Components from a local folder

```html
<script type="module" src="../definer.js?load=my-component.js,my-other-component.js">
</script>
```

```html
<my-component></my-component>
<my-other-component></my-other-component>
```

### 2. With renamed tags

```html
<script type="module" src="../definer.js?load=
    my-component.js|component-one,
    my-other-component.js|component-two,
"></script>
```
```html
<component-one></component-one>
<component-two></component-two>
```

### 3. Components from external URL's
```html
<script type="module" src="../definer.js?load=
    https://web-component-definer.netlify.app/my-component.js,
    https://web-component-definer.netlify.app/my-other-component.js,
"></script>
```
```html
<my-component></my-component>
<my-other-component></my-other-component>
```

### 4. From external URL's with renamed tags and a `base` parameter
```html
<script type="module" src="../definer.js?load=
    my-component.js|external-component,
    my-other-component.js|other-external-component,
&base=https://web-component-definer.netlify.app
"></script>
```
```html
<external-component></external-component>
<other-external-component></other-external-component>
```

### 5. External and local combined + base parameter
Note: the `base` parameter never affects URL's that start with `http://` or `https://`
```html
<script type="module" src="../definer.js?load=
    my-component.js,
    https://web-component-definer.netlify.app/my-other-component.js,
    my-other-component.js|renamed-component,
&base=scripts/components
"></script>
```
```html
<my-component></my-component>
<my-other-component></my-other-component>
<renamed-component></renamed-component>
```

## Options for the web component files which are being loaded

1. Components should export their classes, and their class names should be PascalCase versions of the tag names (e.g. `MyComponent` for the tag `my-component`); see the `.js` files in the demo folder for examples.

<hr>

2. If you need to specify the class name (if it’s not a PascalCase version of the component-name) you can do so using a second pipe delimiter, eg:

`definer.js?load=filename.js|component-name|ClassName`

This can also allow you to import multiple classes exported from the same file. See this CodePen for an example of multiple components being imported from classes in the JS tab of the pen: https://codepen.io/nonsalant/pen/bNbKjZR?editors=1011

<hr>

3. There's no need to do this anymore:
```javascript
customElements.define('my-component', MyComponent)
```
…unless you want to, in which case you’ll need to add `|false` to the corresponding tag in the `load` parameter, e.g:

```html
<script type="module" src="../definer.js?load=my-component.js|false"></script>
```

(See example 2 above — it's as if you're renaming the tag to `false`)


## Notes
- Trailing commas are allowed in the `load` parameter.
- Trailing slashes are allowed in the `base` parameter.
- Whitespace (for readability) is allowed anywhere in the parameter values, but not between the `?` sign and the first `=` or the `&` sign and the next `=`.

## Credits
The `WebComponent` class is based on code from [this post](https://til.jakelazaroff.com/html/define-a-custom-element/) by Jake Lazaroff, which is in turn based on code from [this post](https://mayank.co/blog/defining-custom-elements/) by Mayank and [an idea](https://knowler.dev/blog/to-define-custom-elements-or-not-when-distributing-them) about using `import.meta.url` and search params from Nathan Knowler.
