import { useEffect, RefObject, useCallback } from 'react';

interface UseScrollEffectOptions {
  onScrollPositionChange?: (currentScrollPositionInPixels: number) => void;
  parallaxElementsContainer?: RefObject<HTMLElement>;
  scrollThresholdInPixelsForEffects?: number;
}

export function useScrollEffect({
  onScrollPositionChange,
  parallaxElementsContainer,
  scrollThresholdInPixelsForEffects = 50,
}: UseScrollEffectOptions = {}) {
  const createThrottledScrollHandlerWithRequestAnimationFrame =
    useCallback(() => {
      let isAnimationFrameRequested = false;

      return () => {
        if (!isAnimationFrameRequested) {
          requestAnimationFrame(() => {
            const currentScrollPositionInPixels = window.scrollY;

            onScrollPositionChange?.(currentScrollPositionInPixels);

            if (parallaxElementsContainer?.current) {
              const elementsWithDataSpeedAttribute =
                parallaxElementsContainer.current.querySelectorAll(
                  '[data-speed]'
                );
              elementsWithDataSpeedAttribute.forEach((elementFromQuery) => {
                const htmlElementWithDataSpeed =
                  elementFromQuery as HTMLElement;
                const parallaxSpeedFromDataAttribute = parseFloat(
                  htmlElementWithDataSpeed.dataset.speed || '0.5'
                );
                const parallaxMovementInPixels =
                  currentScrollPositionInPixels *
                  parallaxSpeedFromDataAttribute;
                htmlElementWithDataSpeed.style.transform = `translateY(${parallaxMovementInPixels}px)`;
              });
            }

            isAnimationFrameRequested = false;
          });
          isAnimationFrameRequested = true;
        }
      };
    }, [onScrollPositionChange, parallaxElementsContainer]);

  useEffect(() => {
    const throttledScrollHandlerFunction =
      createThrottledScrollHandlerWithRequestAnimationFrame();

    window.addEventListener('scroll', throttledScrollHandlerFunction, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', throttledScrollHandlerFunction);
    };
  }, [createThrottledScrollHandlerWithRequestAnimationFrame]);

  return {
    scrollThresholdInPixelsForEffects,
  };
}
