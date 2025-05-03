import { RouteObject } from "react-router";

// 定义路由菜单类型
interface RouteMenu {
  name: string;
  icon: string;
}

// 扩展路由 handle 类型
declare module "react-router" {
  interface RouteObject {
    handle?: {
      menu?: RouteMenu;
    };
  }

    interface UIMatch<Data = unknown, Handle = { menu?: RouteMenu }> {
    handle: Handle;
  }
}