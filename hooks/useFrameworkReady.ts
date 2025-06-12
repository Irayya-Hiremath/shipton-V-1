import { useEffect } from 'react';

export function useFrameworkReady() {
  useEffect(() => {
    // This hook is now a no-op for React Native compatibility
    // The original window.frameworkReady functionality is not needed in React Native
  }, []);
}