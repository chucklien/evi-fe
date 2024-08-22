import { useEffect, useRef } from 'react';

/**
 * Custom hook to store the previous value of a variable.
 * @param value - The current value to be tracked.
 * @returns The previous value before the current render.
 */
function usePrevious<T>(value: T): T | undefined {
  // Create a ref to store the previous value
  const ref = useRef<T>();

  // Use useEffect to update the ref after every render
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only update the ref if the value changes

  // Return the previous value (stored in ref.current)
  return ref.current;
}

export default usePrevious;
