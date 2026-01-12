import { matchPath, useLocation } from "react-router-dom";
import { ROUTES } from "./routeConfig";

const routeList = Object.values(ROUTES);

export function useRouteTitle() {
  const { pathname } = useLocation();

  const matched = routeList.find((r) =>
    matchPath({ path: r.path, end: true }, pathname)
  );

  return matched?.title ?? "";
}
