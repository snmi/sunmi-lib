import { PlainRoute, RouterState } from 'react-router';

export interface Route {
    component: Promise<Component>;
    path?: string;
    children?: Route[];
}

export interface Component {
    default: any;// tslint:disable-line
}

export interface RouteModule {
    default: PlainRoute;
}

export function childRoutesUtil(arr: Route[]) {
    return function (next: RouterState, cb: Function) {
        cb(null, arr.map(item => ({
            path: item.path,
            getComponents: componentsUtil(item.component),
            // getChildRoutes: childRoutesUtil(item.children)
        })));
    };
}

export function indexRouteUtil(per: Route) {
    return function (next: RouterState, cb: Function) {
        cb(null, {
            getComponents: componentsUtil(per.component)
        });
    };
}

export function componentsUtil(per: Promise<Component>) {
    return function (next: RouterState, cb: Function) {
        per.then((route) => {
            cb(null, route.default);
        });
    };
}
