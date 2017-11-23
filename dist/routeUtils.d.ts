import { PlainRoute, RouterState } from 'react-router';
export interface Route {
    component: Promise<Component>;
    path?: string;
    children?: Route[];
}
export interface Component {
    default: any;
}
export interface RouteModule {
    default: PlainRoute;
}
export declare function childRoutesUtil(arr: Route[]): (next: RouterState, cb: Function) => void;
export declare function indexRouteUtil(per: Route): (next: RouterState, cb: Function) => void;
export declare function componentsUtil(per: Promise<Component>): (next: RouterState, cb: Function) => void;
