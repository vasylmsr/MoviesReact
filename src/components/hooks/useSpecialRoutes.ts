import { useMemo } from 'react';
import routes, { ISingleRoute } from '../../routes';

export function useSpecialRoutes(getRoutesCallback: (route: ISingleRoute) => boolean) {
  const specialRoutes = useMemo(
    () => routes.filter((route: ISingleRoute) => getRoutesCallback(route)),
    [getRoutesCallback],
  );
  const specialRoutesPaths: Array<string> = useMemo(
    () => specialRoutes.map((route: ISingleRoute) => route.path),
    [specialRoutes],
  );

  return { specialRoutes, specialRoutesPaths };
}
