"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routing = void 0;
var routing;
(function (routing) {
    function drving(o) {
        return `/pages/driving/driving?trip_id=${o.trip_id}`;
    }
    routing.drving = drving;
    function lock(o) {
        return `/pages/lock/lock?car_id=${o.car_id}`;
    }
    routing.lock = lock;
    function register(p) {
        const page = '/pages/register/register';
        if (!p) {
            return page;
        }
        return `${page}?redirect=${encodeURIComponent(p.redirectURL)}`;
    }
    routing.register = register;
    function mytrips() {
        return '/pages/mytrips/mytrips';
    }
    routing.mytrips = mytrips;
})(routing = exports.routing || (exports.routing = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJvdXRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsSUFBaUIsT0FBTyxDQW9DdkI7QUFwQ0QsV0FBaUIsT0FBTztJQUtwQixTQUFnQixNQUFNLENBQUMsQ0FBYztRQUNqQyxPQUFPLGtDQUFrQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDeEQsQ0FBQztJQUZlLGNBQU0sU0FFckIsQ0FBQTtJQU1ELFNBQWdCLElBQUksQ0FBQyxDQUFXO1FBQzVCLE9BQU8sMkJBQTJCLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQTtJQUNoRCxDQUFDO0lBRmUsWUFBSSxPQUVuQixDQUFBO0lBVUQsU0FBZ0IsUUFBUSxDQUFDLENBQWtCO1FBQ3ZDLE1BQU0sSUFBSSxHQUFHLDBCQUEwQixDQUFBO1FBQ3ZDLElBQUksQ0FBQyxDQUFDLEVBQUU7WUFDSixPQUFPLElBQUksQ0FBQTtTQUNkO1FBQ0QsT0FBTyxHQUFHLElBQUksYUFBYSxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQTtJQUNsRSxDQUFDO0lBTmUsZ0JBQVEsV0FNdkIsQ0FBQTtJQUVELFNBQWdCLE9BQU87UUFDbkIsT0FBTyx3QkFBd0IsQ0FBQTtJQUNuQyxDQUFDO0lBRmUsZUFBTyxVQUV0QixDQUFBO0FBQ0wsQ0FBQyxFQXBDZ0IsT0FBTyxHQUFQLGVBQU8sS0FBUCxlQUFPLFFBb0N2QiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBuYW1lc3BhY2Ugcm91dGluZyB7XG4gICAgZXhwb3J0IGludGVyZmFjZSBEcml2aW5nT3B0cyB7XG4gICAgICAgIHRyaXBfaWQ6IHN0cmluZ1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBkcnZpbmcobzogRHJpdmluZ09wdHMpIHtcbiAgICAgICAgcmV0dXJuIGAvcGFnZXMvZHJpdmluZy9kcml2aW5nP3RyaXBfaWQ9JHtvLnRyaXBfaWR9YFxuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgTG9ja09wdHMge1xuICAgICAgICBjYXJfaWQ6IHN0cmluZ1xuICAgIH1cblxuICAgIGV4cG9ydCBmdW5jdGlvbiBsb2NrKG86IExvY2tPcHRzKSB7XG4gICAgICAgIHJldHVybiBgL3BhZ2VzL2xvY2svbG9jaz9jYXJfaWQ9JHtvLmNhcl9pZH1gXG4gICAgfVxuXG4gICAgZXhwb3J0IGludGVyZmFjZSBSZWdpc3Rlck9wdHMge1xuICAgICAgICByZWRpcmVjdD86IHN0cmluZ1xuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgUmVnaXN0ZXJQYXJhbXMge1xuICAgICAgICByZWRpcmVjdFVSTDogc3RyaW5nXG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHJlZ2lzdGVyKHA/OiBSZWdpc3RlclBhcmFtcykge1xuICAgICAgICBjb25zdCBwYWdlID0gJy9wYWdlcy9yZWdpc3Rlci9yZWdpc3RlcidcbiAgICAgICAgaWYgKCFwKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFnZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgJHtwYWdlfT9yZWRpcmVjdD0ke2VuY29kZVVSSUNvbXBvbmVudChwLnJlZGlyZWN0VVJMKX1gXG4gICAgfVxuXG4gICAgZXhwb3J0IGZ1bmN0aW9uIG15dHJpcHMoKSB7XG4gICAgICAgIHJldHVybiAnL3BhZ2VzL215dHJpcHMvbXl0cmlwcydcbiAgICB9XG59XG4iXX0=