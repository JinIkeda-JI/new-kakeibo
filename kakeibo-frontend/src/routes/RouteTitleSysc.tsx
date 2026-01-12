import { useEffect } from "react";
import { useRouteTitle } from "./useRouteTitle";

export default function RouteTitleSync() {
  const title = useRouteTitle();

  useEffect(() => {
    if (title) document.title = title;
  }, [title]);

  return null;
}
