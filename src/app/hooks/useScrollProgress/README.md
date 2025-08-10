# useScrollProgress Hook

A custom React hook that tracks the user's scroll progress on the page.

## Usage

```tsx
import useScrollProgress from '../../hooks/useScrollProgress';

function MyComponent() {
  // Get the current scroll progress (0-100)
  const scrollProgress = useScrollProgress();

  return (
    <div>
      <p>You've scrolled {scrollProgress.toFixed(0)}% of the page</p>
      {/* Use scrollProgress for animations, progress bars, etc. */}
    </div>
  );
}
```

## Return Value

The hook returns a number between 0 and 100 representing the percentage of the page that has been scrolled.

## Implementation Details

- Automatically adds and removes scroll event listeners
- Calculates scroll percentage based on document height and scroll position
- Updates in real-time as the user scrolls
- Performs initial calculation on mount
