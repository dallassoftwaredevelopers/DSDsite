This is a slimmer version of the `useMediaQuery` hook from [useHooks-ts](https://usehooks-ts.com/react-hook/use-media-query)

This hook uses the [`matchMedia()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) method of the `Window` object to check for matching conditions against a media query passed into the hook.

`useMediaQuery` takes a media query argument passed as a string:

`useMediaQuery('(max-width: 750px)')`
