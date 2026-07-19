# media-prefers-reduced-motion

Require certain styles if the animation or transition in media features.

Safari 10.1 [introduced](https://webkit.org/blog/7551/responsive-design-for-motion/) the Reduced Motion Media Query. It is a non-vendor-prefixed declaration that allows developers to "create styles that avoid large areas of motion for users that specify a preference for reduced motion in System Preferences."

The `--fix` option on the command line can automatically fix all of the problems reported by this rule.

## Options

### true

The following pattern is considered a violation:

```css
.foo {
  animation: 1s ease-in;
}
```

```css
.bar {
  animation-name: skew;
}
@media screen and (prefers-reduced-motion) {
  .bar {
    transition: none;
  }
}
```

The following patterns are _not_ considered violations:

```css
div {
  transition: none;
}
```

```css
.foo {
  transition: none;
}
@media screen and (prefers-reduced-motion: reduce) {
  .foo {
    transition: none;
  }
}
```

```css
.bar {
  animation: none;
}
@media screen and (prefers-reduced-motion) {
  .bar {
    animation: none;
  }
}
```

## Optional secondary options

### `customMedia: "--custom-media-name" | ["--custom-media-name", ...]`

Name(s) of [custom media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/@custom-media) that should be treated as a `prefers-reduced-motion` media query:

```json
{
  "a11y/media-prefers-reduced-motion": [true, { "customMedia": "--motionReduce" }]
}
```

```css
@custom-media --motionReduce screen and (prefers-reduced-motion: reduce);
```

With this option the following pattern is _not_ considered a violation:

```css
.foo {
  transition: all 0.2s ease;
}
@media (--motionReduce) {
  .foo {
    transition: none;
  }
}
```

The `--fix` option will use the first custom media name for the inserted media query.
