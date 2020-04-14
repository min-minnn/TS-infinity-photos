import React, { useState, useEffect } from 'react';

export const useIntersection = (
    ref: React.RefObject<HTMLElement>,
    options: IntersectionObserverInit
  ): IntersectionObserverEntry | null => {
    const [
      intersectionObserverEntry,
      setIntersectionObserverEntry,
    ] = useState<IntersectionObserverEntry | null>(null);
  
    useEffect(() => {
      if (ref.current) {
        const handler = (entries: IntersectionObserverEntry[]) => {
          setIntersectionObserverEntry(entries[0]);
        };
  
        const observer = new IntersectionObserver(handler, options);
        observer.observe(ref.current);
  
        return () => {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          if (ref.current) {
            observer.disconnect();
          }
        };
      }
      return () => {};
    }, [ref, options.threshold, options.root, options.rootMargin, options]);
  
    return intersectionObserverEntry;
  };