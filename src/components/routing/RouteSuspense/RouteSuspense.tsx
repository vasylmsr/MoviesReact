import React, { ReactNode } from 'react';
import FullSizeProgress from '../../ui/UiFullSizeProgress/UiFullSizeProgress';

type RouteSuspenseProps = {
  children: ReactNode;
};

const RouteSuspense: React.FC<RouteSuspenseProps> = ({
  children,
}: RouteSuspenseProps): JSX.Element => {
  return <React.Suspense fallback={<FullSizeProgress />}>{children}</React.Suspense>;
};

export default RouteSuspense;
