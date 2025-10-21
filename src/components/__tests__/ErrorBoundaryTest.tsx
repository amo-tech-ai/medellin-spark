import { useState } from 'react';

/**
 * Test component for ErrorBoundary
 *
 * To test error boundary in development:
 * 1. Import this component in any page
 * 2. Click the "Throw Error" button
 * 3. Verify ErrorBoundary fallback UI appears
 * 4. Verify "Try again" and "Go to homepage" buttons work
 *
 * Example usage:
 * import { ErrorBoundaryTest } from '@/components/__tests__/ErrorBoundaryTest';
 * <ErrorBoundaryTest />
 */
export function ErrorBoundaryTest() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error('Test error: ErrorBoundary is working correctly!');
  }

  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
      <p className="text-sm text-yellow-800 mb-2">
        <strong>Error Boundary Test Component</strong> (dev mode only)
      </p>
      <button
        onClick={() => setShouldThrow(true)}
        className="px-3 py-1 text-sm bg-destructive text-destructive-foreground rounded hover:bg-destructive/90"
      >
        Throw Error
      </button>
    </div>
  );
}
