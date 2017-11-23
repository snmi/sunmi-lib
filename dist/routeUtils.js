export function childRoutesUtil(arr) {
    return function (next, cb) {
        cb(null, arr.map(function (item) { return ({
            path: item.path,
            getComponents: componentsUtil(item.component),
        }); }));
    };
}
export function indexRouteUtil(per) {
    return function (next, cb) {
        cb(null, {
            getComponents: componentsUtil(per.component)
        });
    };
}
export function componentsUtil(per) {
    return function (next, cb) {
        per.then(function (route) {
            cb(null, route.default);
        });
    };
}
