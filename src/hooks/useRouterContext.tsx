import { UIMatch } from "react-router-dom";
import { useMatches } from "react-router-dom";
import { RouteMenu } from "./react-router";


export function useRouterContext() {
  const matches = useMatches();

  // 类型安全的菜单路由过滤
  const menuRoutes = matches
    .flatMap((match) => {
      const { handle } = match as UIMatch<unknown, { menu?: RouteMenu }>;
      return handle?.menu
        ? [
            {
              path: match.pathname,
              ...handle.menu,
            },
          ]
        : []
    })

  return { menuRoutes };
}