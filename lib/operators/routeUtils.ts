import { PlainRoute, RouterState } from 'react-router'

export interface Route {
  breadcrumbName:string
  component: Promise<Component>
  path?: string
  index?: Route,
  children?: Route[]
}

export interface Component {
  default: any;// tslint:disable-line
}

export interface RouteModule {
  default: PlainRoute
}

export function childRoutesUtil(arr: Route[]) {
  return function (next: RouterState, cb: Function) {
    cb(null, arr.map(item => ({
      breadcrumbName: item.breadcrumbName || '',
      path: item.path,
      getComponents: componentsUtil(item.component),
      getIndexRoute: item.index ? indexRouteUtil(item.index) : undefined,
      getChildRoutes: item.children ? childRoutesUtil(item.children) : undefined
    })))
  }
}

export function indexRouteUtil(per: Route) {
  return function (next: RouterState, cb: Function) {
    cb(null, {
      breadcrumbName:per.breadcrumbName || '',
      getComponents: componentsUtil(per.component)
    })
  }
}

export function componentsUtil(per: Promise<Component>) {
  return function (next: RouterState, cb: Function) {
    per.then((route) => {
      cb(null, route.default)
    })
  }
}
