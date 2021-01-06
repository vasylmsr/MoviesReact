import React from 'react';
import { FullSizeProgress } from 'components/ui';

export const RouteSuspense: React.FC = ({ children }) => {
  return <React.Suspense fallback={<FullSizeProgress />}>{children}</React.Suspense>;
};
