"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const car_1 = require("../../service/car");
const profile_1 = require("../../service/profile");
const rental_pb_1 = require("../../service/proto_gen/rental/rental_pb");
const trip_1 = require("../../service/trip");
const routing_1 = require("../../utils/routing");
const defaultAvatar = '/resources/car.png';
const initialLat = 29.761267625855936;
const initialLng = 121.87264654736123;
Page({
    isPageShowing: false,
    socket: undefined,
    data: {
        avatarURL: '',
        setting: {
            skew: 0,
            rotate: 0,
            showLocation: true,
            showScale: true,
            subKey: '',
            layerStyle: -1,
            enableZoom: true,
            enableScroll: true,
            enableRotate: false,
            showCompass: false,
            enable3D: false,
            enableOverlooking: false,
            enableSatellite: false,
            enableTraffic: false,
        },
        location: {
            latitude: initialLat,
            longitude: initialLng,
        },
        scale: 16,
        markers: [],
    },
    onLoad() {
        return __awaiter(this, void 0, void 0, function* () {
            const userInfo = yield getApp().globalData.userInfo;
            this.setData({
                avatarURL: userInfo.avatarUrl,
            });
        });
    },
    onMyLocationTap() {
        wx.getLocation({
            type: 'gcj02',
            success: res => {
                this.setData({
                    location: {
                        latitude: res.latitude,
                        longitude: res.longitude,
                    },
                });
            },
            fail: () => {
                wx.showToast({
                    icon: 'none',
                    title: '请前往设置页授权',
                });
            }
        });
    },
    onScanTap() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const trips = yield trip_1.TripService.getTrips(rental_pb_1.rental.v1.TripStatus.IN_PROGRESS);
            if ((((_a = trips.trips) === null || _a === void 0 ? void 0 : _a.length) || 0) > 0) {
                yield this.selectComponent('#tripModal').showModal();
                wx.navigateTo({
                    url: routing_1.routing.drving({
                        trip_id: trips.trips[0].id,
                    }),
                });
                return;
            }
            wx.scanCode({
                success: () => __awaiter(this, void 0, void 0, function* () {
                    const carID = '60af01e5a21ead3dccbcd1d8';
                    const lockURL = routing_1.routing.lock({
                        car_id: carID,
                    });
                    const prof = yield profile_1.ProfileService.getProfile();
                    if (prof.identityStatus === rental_pb_1.rental.v1.IdentityStatus.VERIFIED) {
                        wx.navigateTo({
                            url: lockURL,
                        });
                    }
                    else {
                        yield this.selectComponent('#licModal').showModal();
                        wx.navigateTo({
                            url: routing_1.routing.register({
                                redirectURL: lockURL,
                            })
                        });
                    }
                }),
                fail: console.error,
            });
        });
    },
    onShow() {
        this.isPageShowing = true;
        if (!this.socket) {
            this.setData({
                markers: []
            }, () => {
                this.setupCarPosUpdater();
            });
        }
    },
    onHide() {
        this.isPageShowing = false;
        if (this.socket) {
            this.socket.close({
                success: () => {
                    this.socket = undefined;
                }
            });
        }
    },
    onMyTripsTap() {
        wx.navigateTo({
            url: routing_1.routing.mytrips(),
        });
    },
    setupCarPosUpdater() {
        const map = wx.createMapContext("map");
        const markersByCarID = new Map();
        let translationInProgress = false;
        const endTranslation = () => {
            translationInProgress = false;
        };
        this.socket = car_1.CarService.subscribe(car => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
            if (!car.id || translationInProgress || !this.isPageShowing) {
                console.log('dropped');
                return;
            }
            const marker = markersByCarID.get(car.id);
            if (!marker) {
                const newMarker = {
                    id: this.data.markers.length,
                    iconPath: ((_b = (_a = car.car) === null || _a === void 0 ? void 0 : _a.driver) === null || _b === void 0 ? void 0 : _b.avatarUrl) || defaultAvatar,
                    latitude: ((_d = (_c = car.car) === null || _c === void 0 ? void 0 : _c.position) === null || _d === void 0 ? void 0 : _d.latitude) || initialLat,
                    longitude: ((_f = (_e = car.car) === null || _e === void 0 ? void 0 : _e.position) === null || _f === void 0 ? void 0 : _f.longitude) || initialLng,
                    height: 20,
                    width: 20,
                };
                markersByCarID.set(car.id, newMarker);
                this.data.markers.push(newMarker);
                translationInProgress = true;
                this.setData({
                    markers: this.data.markers,
                }, endTranslation);
                return;
            }
            const newAvatar = ((_h = (_g = car.car) === null || _g === void 0 ? void 0 : _g.driver) === null || _h === void 0 ? void 0 : _h.avatarUrl) || defaultAvatar;
            const newLat = ((_k = (_j = car.car) === null || _j === void 0 ? void 0 : _j.position) === null || _k === void 0 ? void 0 : _k.latitude) || initialLat;
            const newLng = ((_m = (_l = car.car) === null || _l === void 0 ? void 0 : _l.position) === null || _m === void 0 ? void 0 : _m.longitude) || initialLng;
            if (marker.iconPath !== newAvatar) {
                marker.iconPath = newAvatar;
                marker.latitude = newLat;
                marker.longitude = newLng;
                translationInProgress = true;
                this.setData({
                    markers: this.data.markers,
                }, endTranslation);
                return;
            }
            if (marker.latitude !== newLat || marker.longitude !== newLng) {
                translationInProgress = true;
                map.translateMarker({
                    markerId: marker.id,
                    destination: {
                        latitude: newLat,
                        longitude: newLng,
                    },
                    autoRotate: false,
                    rotate: 0,
                    duration: 80,
                    animationEnd: endTranslation,
                });
            }
        });
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUNBLDJDQUE4QztBQUM5QyxtREFBc0Q7QUFDdEQsd0VBQWlFO0FBQ2pFLDZDQUFnRDtBQUNoRCxpREFBNkM7QUFXN0MsTUFBTSxhQUFhLEdBQUcsb0JBQW9CLENBQUE7QUFDMUMsTUFBTSxVQUFVLEdBQUcsa0JBQWtCLENBQUE7QUFDckMsTUFBTSxVQUFVLEdBQUcsa0JBQWtCLENBQUE7QUFFckMsSUFBSSxDQUFDO0lBQ0gsYUFBYSxFQUFFLEtBQUs7SUFDcEIsTUFBTSxFQUFFLFNBQXFEO0lBRTdELElBQUksRUFBRTtRQUNKLFNBQVMsRUFBRSxFQUFFO1FBQ2IsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLENBQUM7WUFDUCxNQUFNLEVBQUUsQ0FBQztZQUNULFlBQVksRUFBRSxJQUFJO1lBQ2xCLFNBQVMsRUFBRSxJQUFJO1lBQ2YsTUFBTSxFQUFFLEVBQUU7WUFDVixVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQ2QsVUFBVSxFQUFFLElBQUk7WUFDaEIsWUFBWSxFQUFFLElBQUk7WUFDbEIsWUFBWSxFQUFFLEtBQUs7WUFDbkIsV0FBVyxFQUFFLEtBQUs7WUFDbEIsUUFBUSxFQUFFLEtBQUs7WUFDZixpQkFBaUIsRUFBRSxLQUFLO1lBQ3hCLGVBQWUsRUFBRSxLQUFLO1lBQ3RCLGFBQWEsRUFBRSxLQUFLO1NBQ3JCO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsUUFBUSxFQUFFLFVBQVU7WUFDcEIsU0FBUyxFQUFFLFVBQVU7U0FDdEI7UUFDRCxLQUFLLEVBQUUsRUFBRTtRQUNULE9BQU8sRUFBRSxFQUFjO0tBQ3hCO0lBRUssTUFBTTs7WUFDVixNQUFNLFFBQVEsR0FBRyxNQUFNLE1BQU0sRUFBYyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUE7WUFDL0QsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDWCxTQUFTLEVBQUUsUUFB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SUFBSSxNQUFNLENBQUMsUUFBUSxLQUFLLE1BQU0sSUFBSSxNQUFNLENBQUMsU0FBUyxLQUFLLE1BQU0sRUFBRTtnQkFFN0QscUJBQXFCLEdBQUcsSUFBSSxDQUFBO2dCQUM1QixHQUFHLENBQUMsZUFBZSxDQUFDO29CQUNsQixRQUFRLEVBQUUsTUFBTSxDQUFDLEVBQUU7b0JBQ25CLFdBQVcsRUFBRTt3QkFDWCxRQUFRLEVBQUUsTUFBTTt3QkFDaEIsU0FBUyxFQUFFLE1BQU07cUJBQ2xCO29CQUNELFVBQVUsRUFBRSxLQUFLO29CQUNqQixNQUFNLEVBQUUsQ0FBQztvQkFDVCxRQUFRLEVBQUUsRUFBRTtvQkFDWixZQUFZLEVBQUUsY0FBYztpQkFDN0IsQ0FBQyxDQUFBO2FBQ0g7UUFDSCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJQXBwT3B0aW9uIH0gZnJvbSBcIi4uLy4uL2FwcG9wdGlvblwiXG5pbXBvcnQgeyBDYXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvY2FyXCJcbmltcG9ydCB7IFByb2ZpbGVTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvcHJvZmlsZVwiXG5pbXBvcnQgeyByZW50YWwgfSBmcm9tIFwiLi4vLi4vc2VydmljZS9wcm90b19nZW4vcmVudGFsL3JlbnRhbF9wYlwiXG5pbXBvcnQgeyBUcmlwU2VydmljZSB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL3RyaXBcIlxuaW1wb3J0IHsgcm91dGluZyB9IGZyb20gXCIuLi8uLi91dGlscy9yb3V0aW5nXCJcblxuaW50ZXJmYWNlIE1hcmtlciB7XG4gIGljb25QYXRoOiBzdHJpbmdcbiAgaWQ6IG51bWJlclxuICBsYXRpdHVkZTogbnVtYmVyXG4gIGxvbmdpdHVkZTogbnVtYmVyXG4gIHdpZHRoOiBudW1iZXJcbiAgaGVpZ2h0OiBudW1iZXJcbn1cblxuY29uc3QgZGVmYXVsdEF2YXRhciA9ICcvcmVzb3VyY2VzL2Nhci5wbmcnXG5jb25zdCBpbml0aWFsTGF0ID0gMjkuNzYxMjY3NjI1ODU1OTM2XG5jb25zdCBpbml0aWFsTG5nID0gMTIxLjg3MjY0NjU0NzM2MTIzXG5cblBhZ2Uoe1xuICBpc1BhZ2VTaG93aW5nOiBmYWxzZSxcbiAgc29ja2V0OiB1bmRlZmluZWQgYXMgV2VjaGF0TWluaXByb2dyYW0uU29ja2V0VGFzayB8IHVuZGVmaW5lZCxcblxuICBkYXRhOiB7XG4gICAgYXZhdGFyVVJMOiAnJyxcbiAgICBzZXR0aW5nOiB7XG4gICAgICBza2V3OiAwLFxuICAgICAgcm90YXRlOiAwLFxuICAgICAgc2hvd0xvY2F0aW9uOiB0cnVlLFxuICAgICAgc2hvd1NjYWxlOiB0cnVlLFxuICAgICAgc3ViS2V5OiAnJyxcbiAgICAgIGxheWVyU3R5bGU6IC0xLFxuICAgICAgZW5hYmxlWm9vbTogdHJ1ZSxcbiAgICAgIGVuYWJsZVNjcm9sbDogdHJ1ZSxcbiAgICAgIGVuYWJsZVJvdGF0ZTogZmFsc2UsXG4gICAgICBzaG93Q29tcGFzczogZmFsc2UsXG4gICAgICBlbmFibGUzRDogZmFsc2UsXG4gICAgICBlbmFibGVPdmVybG9va2luZzogZmFsc2UsXG4gICAgICBlbmFibGVTYXRlbGxpdGU6IGZhbHNlLFxuICAgICAgZW5hYmxlVHJhZmZpYzogZmFsc2UsXG4gICAgfSxcbiAgICBsb2NhdGlvbjoge1xuICAgICAgbGF0aXR1ZGU6IGluaXRpYWxMYXQsXG4gICAgICBsb25naXR1ZGU6IGluaXRpYWxMbmcsXG4gICAgfSxcbiAgICBzY2FsZTogMTYsXG4gICAgbWFya2VyczogW10gYXMgTWFya2VyW10sXG4gIH0sXG5cbiAgYXN5bmMgb25Mb2FkKCkge1xuICAgIGNvbnN0IHVzZXJJbmZvID0gYXdhaXQgZ2V0QXBwPElBcHBPcHRpb24+KCkuZ2xvYmFsRGF0YS51c2VySW5mb1xuICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICBhdmF0YXJVUkw6IHVzZXJJbmZvLmF2YXRhclVybCxcbiAgICB9KVxuICB9LFxuXG4gIG9uTXlMb2NhdGlvblRhcCgpIHtcbiAgICB3eC5nZXRMb2NhdGlvbih7XG4gICAgICB0eXBlOiAnZ2NqMDInLFxuICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICBsb2NhdGlvbjoge1xuICAgICAgICAgICAgbGF0aXR1ZGU6IHJlcy5sYXRpdHVkZSxcbiAgICAgICAgICAgIGxvbmdpdHVkZTogcmVzLmxvbmdpdHVkZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgfSwgXG4gICAgICBmYWlsOiAoKSA9PiB7XG4gICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgIHRpdGxlOiAn6K+35YmN5b6A6K6+572u6aG15o6I5p2DJyxcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9KVxuICB9LFxuXG4gIGFzeW5jIG9uU2NhblRhcCgpIHtcbiAgICBjb25zdCB0cmlwcyA9IGF3YWl0IFRyaXBTZXJ2aWNlLmdldFRyaXBzKHJlbnRhbC52MS5UcmlwU3RhdHVzLklOX1BST0dSRVNTKVxuICAgIGlmICgodHJpcHMudHJpcHM/Lmxlbmd0aCB8fCAwKSA+IDApIHtcbiAgICAgIGF3YWl0IHRoaXMuc2VsZWN0Q29tcG9uZW50KCcjdHJpcE1vZGFsJykuc2hvd01vZGFsKClcbiAgICAgIHd4Lm5hdmlnYXRlVG8oe1xuICAgICAgICB1cmw6IHJvdXRpbmcuZHJ2aW5nKHtcbiAgICAgICAgICB0cmlwX2lkOiB0cmlwcy50cmlwcyFbMF0uaWQhLFxuICAgICAgICB9KSxcbiAgICAgIH0pXG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgd3guc2NhbkNvZGUoe1xuICAgICAgc3VjY2VzczogYXN5bmMgKCkgPT4ge1xuICAgICAgLy8gVE9ETzogZ2V0IGNhciBpZCBmcm9tIHNjYW4gcmVzdWx0XG4gICAgICBjb25zdCBjYXJJRD0nNjBhZjAxZTVhMjFlYWQzZGNjYmNkMWQ4J1xuICAgICAgY29uc3QgbG9ja1VSTCA9IHJvdXRpbmcubG9jayh7XG4gICAgICAgIGNhcl9pZDogY2FySUQsXG4gICAgICB9KVxuICAgICAgY29uc3QgcHJvZiA9IGF3YWl0IFByb2ZpbGVTZXJ2aWNlLmdldFByb2ZpbGUoKVxuICAgICAgaWYgKHByb2YuaWRlbnRpdHlTdGF0dXMgPT09IHJlbnRhbC52MS5JZGVudGl0eVN0YXR1cy5WRVJJRklFRCkge1xuICAgICAgd3gubmF2aWdhdGVUbyh7XG4gICAgICB1cmw6IGxvY2tVUkwsXG4gICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgIGF3YWl0IHRoaXMuc2VsZWN0Q29tcG9uZW50KCcjbGljTW9kYWwnKS5zaG93TW9kYWwoKVxuICAgICAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgICAgICB1cmw6IHJvdXRpbmcucmVnaXN0ZXIoe1xuICAgICAgICAgICAgIHJlZGlyZWN0VVJMOiBsb2NrVVJMLFxuICAgICAgICAgIH0pXG4gICAgICAgICB9KVxuICAgIH1cbiAgICAgfSxcbiAgICAgIGZhaWw6IGNvbnNvbGUuZXJyb3IsXG4gICAgfSlcbiAgfSxcblxuICBvblNob3coKSB7XG4gICAgdGhpcy5pc1BhZ2VTaG93aW5nID0gdHJ1ZTtcbiAgICBpZiAoIXRoaXMuc29ja2V0KSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBtYXJrZXJzOiBbXVxuICAgICAgfSwgKCkgPT4ge1xuICAgICAgICB0aGlzLnNldHVwQ2FyUG9zVXBkYXRlcigpXG4gICAgICB9KVxuICAgIH1cbiAgfSxcbiAgXG4gIG9uSGlkZSgpIHtcbiAgICB0aGlzLmlzUGFnZVNob3dpbmcgPSBmYWxzZTtcbiAgICBpZiAodGhpcy5zb2NrZXQpIHtcbiAgICAgIHRoaXMuc29ja2V0LmNsb3NlKHtcbiAgICAgICAgc3VjY2VzczogKCkgPT4ge1xuICAgICAgICAgIHRoaXMuc29ja2V0ID0gdW5kZWZpbmVkXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgfVxuICB9LFxuXG4gIG9uTXlUcmlwc1RhcCgpIHtcbiAgICB3eC5uYXZpZ2F0ZVRvKHtcbiAgICAgIHVybDogcm91dGluZy5teXRyaXBzKCksXG4gICAgfSlcbiAgfSxcblxuICBzZXR1cENhclBvc1VwZGF0ZXIoKSB7XG4gICAgY29uc3QgbWFwID0gd3guY3JlYXRlTWFwQ29udGV4dChcIm1hcFwiKVxuICAgIGNvbnN0IG1hcmtlcnNCeUNhcklEID0gbmV3IE1hcDxzdHJpbmcsIE1hcmtlcj4oKVxuICAgIGxldCB0cmFuc2xhdGlvbkluUHJvZ3Jlc3MgPSBmYWxzZVxuICAgIGNvbnN0IGVuZFRyYW5zbGF0aW9uID0gKCkgPT4ge1xuICAgICAgdHJhbnNsYXRpb25JblByb2dyZXNzID0gZmFsc2VcbiAgICB9XG4gICAgdGhpcy5zb2NrZXQgPSBDYXJTZXJ2aWNlLnN1YnNjcmliZShjYXIgPT4ge1xuICAgICAgaWYgKCFjYXIuaWQgfHwgdHJhbnNsYXRpb25JblByb2dyZXNzIHx8ICF0aGlzLmlzUGFnZVNob3dpbmcpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2Ryb3BwZWQnKVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cbiAgICAgIGNvbnN0IG1hcmtlciA9IG1hcmtlcnNCeUNhcklELmdldChjYXIuaWQpXG4gICAgICBpZiAoIW1hcmtlcikge1xuICAgICAgICAvLyBJbnNlcnQgbmV3IG1hcmtlci5cbiAgICAgICAgY29uc3QgbmV3TWFya2VyOiBNYXJrZXIgPSB7XG4gICAgICAgICAgaWQ6IHRoaXMuZGF0YS5tYXJrZXJzLmxlbmd0aCxcbiAgICAgICAgICBpY29uUGF0aDogY2FyLmNhcj8uZHJpdmVyPy5hdmF0YXJVcmwgfHwgZGVmYXVsdEF2YXRhcixcbiAgICAgICAgICBsYXRpdHVkZTogY2FyLmNhcj8ucG9zaXRpb24/LmxhdGl0dWRlIHx8IGluaXRpYWxMYXQsXG4gICAgICAgICAgbG9uZ2l0dWRlOiBjYXIuY2FyPy5wb3NpdGlvbj8ubG9uZ2l0dWRlIHx8IGluaXRpYWxMbmcsXG4gICAgICAgICAgaGVpZ2h0OiAyMCxcbiAgICAgICAgICB3aWR0aDogMjAsXG4gICAgICAgIH1cbiAgICAgICAgbWFya2Vyc0J5Q2FySUQuc2V0KGNhci5pZCwgbmV3TWFya2VyKVxuICAgICAgICB0aGlzLmRhdGEubWFya2Vycy5wdXNoKG5ld01hcmtlcilcbiAgICAgICAgdHJhbnNsYXRpb25JblByb2dyZXNzID0gdHJ1ZVxuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIG1hcmtlcnM6IHRoaXMuZGF0YS5tYXJrZXJzLFxuICAgICAgICB9LCBlbmRUcmFuc2xhdGlvbilcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG5ld0F2YXRhciA9IGNhci5jYXI/LmRyaXZlcj8uYXZhdGFyVXJsIHx8IGRlZmF1bHRBdmF0YXJcbiAgICAgIGNvbnN0IG5ld0xhdCA9IGNhci5jYXI/LnBvc2l0aW9uPy5sYXRpdHVkZSB8fCBpbml0aWFsTGF0XG4gICAgICBjb25zdCBuZXdMbmcgPSBjYXIuY2FyPy5wb3NpdGlvbj8ubG9uZ2l0dWRlIHx8IGluaXRpYWxMbmdcbiAgICAgIGlmIChtYXJrZXIuaWNvblBhdGggIT09IG5ld0F2YXRhcikge1xuICAgICAgICAvLyBDaGFuZ2UgaWNvblBhdGggYW5kIHBvc3NpYmx5IHBvc2l0aW9uLlxuICAgICAgICBtYXJrZXIuaWNvblBhdGggPSBuZXdBdmF0YXJcbiAgICAgICAgbWFya2VyLmxhdGl0dWRlID0gbmV3TGF0XG4gICAgICAgIG1hcmtlci5sb25naXR1ZGUgPSBuZXdMbmdcbiAgICAgICAgdHJhbnNsYXRpb25JblByb2dyZXNzID0gdHJ1ZVxuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgIG1hcmtlcnM6IHRoaXMuZGF0YS5tYXJrZXJzLFxuICAgICAgICB9LCBlbmRUcmFuc2xhdGlvbilcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGlmIChtYXJrZXIubGF0aXR1ZGUgIT09IG5ld0xhdCB8fCBtYXJrZXIubG9uZ2l0dWRlICE9PSBuZXdMbmcpIHtcbiAgICAgICAgLy8gTW92ZSBtYXJrZXIuXG4gICAgICAgIHRyYW5zbGF0aW9uSW5Qcm9ncmVzcyA9IHRydWVcbiAgICAgICAgbWFwLnRyYW5zbGF0ZU1hcmtlcih7XG4gICAgICAgICAgbWFya2VySWQ6IG1hcmtlci5pZCxcbiAgICAgICAgICBkZXN0aW5hdGlvbjoge1xuICAgICAgICAgICAgbGF0aXR1ZGU6IG5ld0xhdCxcbiAgICAgICAgICAgIGxvbmdpdHVkZTogbmV3TG5nLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgYXV0b1JvdGF0ZTogZmFsc2UsXG4gICAgICAgICAgcm90YXRlOiAwLFxuICAgICAgICAgIGR1cmF0aW9uOiA4MCxcbiAgICAgICAgICBhbmltYXRpb25FbmQ6IGVuZFRyYW5zbGF0aW9uLFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH0pXG4gIH0sXG59KVxuIl19