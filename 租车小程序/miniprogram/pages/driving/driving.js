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
const rental_pb_1 = require("../../service/proto_gen/rental/rental_pb");
const trip_1 = require("../../service/trip");
const format_1 = require("../../utils/format");
const routing_1 = require("../../utils/routing");
const updateIntervalSec = 5;
const initialLat = 30;
const initialLng = 120;
function durationStr(sec) {
    const dur = format_1.formatDuration(sec);
    return `${dur.hh}:${dur.mm}:${dur.ss}`;
}
Page({
    timer: undefined,
    tripID: '',
    data: {
        location: {
            latitude: initialLat,
            longitude: initialLng,
        },
        scale: 12,
        elapsed: '00:00:00',
        fee: '0.00',
        markers: [
            {
                iconPath: "/resources/car.png",
                id: 0,
                latitude: initialLat,
                longitude: initialLng,
                width: 20,
                height: 20,
            },
        ],
    },
    onLoad(opt) {
        const o = opt;
        this.tripID = o.trip_id;
        this.setupLocationUpdator();
        this.setupTimer(o.trip_id);
    },
    onUnload() {
        wx.stopLocationUpdate();
        if (this.timer) {
            clearInterval(this.timer);
        }
    },
    setupLocationUpdator() {
        wx.startLocationUpdate({
            fail: console.error,
        });
        wx.onLocationChange(loc => {
            this.setData({
                location: {
                    latitude: loc.latitude,
                    longitude: loc.longitude,
                },
            });
        });
    },
    setupTimer(tripID) {
        return __awaiter(this, void 0, void 0, function* () {
            const trip = yield trip_1.TripService.getTrip(tripID);
            if (trip.status !== rental_pb_1.rental.v1.TripStatus.IN_PROGRESS) {
                console.error('trip not in progress');
                return;
            }
            let secSinceLastUpdate = 0;
            let lastUpdateDurationSec = trip.current.timestampSec - trip.start.timestampSec;
            const toLocation = (trip) => {
                var _a, _b, _c, _d;
                return ({
                    latitude: ((_b = (_a = trip.current) === null || _a === void 0 ? void 0 : _a.location) === null || _b === void 0 ? void 0 : _b.latitude) || initialLat,
                    longitude: ((_d = (_c = trip.current) === null || _c === void 0 ? void 0 : _c.location) === null || _d === void 0 ? void 0 : _d.longitude) || initialLng,
                });
            };
            const location = toLocation(trip);
            this.data.markers[0].latitude = location.latitude;
            this.data.markers[0].longitude = location.longitude;
            this.setData({
                elapsed: durationStr(lastUpdateDurationSec),
                fee: format_1.formatFee(trip.current.feeCent),
                location,
                markers: this.data.markers,
            });
            this.timer = setInterval(() => {
                secSinceLastUpdate++;
                if (secSinceLastUpdate % updateIntervalSec === 0) {
                    trip_1.TripService.getTrip(tripID).then(trip => {
                        lastUpdateDurationSec = trip.current.timestampSec - trip.start.timestampSec;
                        secSinceLastUpdate = 0;
                        const location = toLocation(trip);
                        this.data.markers[0].latitude = location.latitude;
                        this.data.markers[0].longitude = location.longitude;
                        this.setData({
                            fee: format_1.formatFee(trip.current.feeCent),
                            location,
                            markers: this.data.markers,
                        });
                    }).catch(console.error);
                }
                this.setData({
                    elapsed: durationStr(lastUpdateDurationSec + secSinceLastUpdate),
                });
            }, 1000);
        });
    },
    onEndTripTap() {
        trip_1.TripService.finishTrip(this.tripID).then(() => {
            wx.redirectTo({
                url: routing_1.routing.mytrips(),
            });
        }).catch(err => {
            console.error(err);
            wx.showToast({
                title: '结束行程失败',
                icon: 'none',
            });
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJpdmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRyaXZpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3RUFBaUU7QUFDakUsNkNBQWdEO0FBQ2hELCtDQUE4RDtBQUM5RCxpREFBNkM7QUFFN0MsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLENBQUE7QUFDM0IsTUFBTSxVQUFVLEdBQUcsRUFBRSxDQUFBO0FBQ3JCLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQTtBQUV0QixTQUFTLFdBQVcsQ0FBQyxHQUFXO0lBQzVCLE1BQU0sR0FBRyxHQUFHLHVCQUFjLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDL0IsT0FBTyxHQUFHLEdBQUcsQ0FBQyxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUE7QUFDMUMsQ0FBQztBQUVELElBQUksQ0FBQztJQUNELEtBQUssRUFBRSxTQUE2QjtJQUNwQyxNQUFNLEVBQUUsRUFBRTtJQUVWLElBQUksRUFBRTtRQUNGLFFBQVEsRUFBRTtZQUNOLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFNBQVMsRUFBRSxVQUFVO1NBQ3hCO1FBQ0QsS0FBSyxFQUFFLEVBQUU7UUFDVCxPQUFPLEVBQUUsVUFBVTtRQUNuQixHQUFHLEVBQUUsTUFBTTtRQUNYLE9BQU8sRUFBRTtZQUNMO2dCQUNJLFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLEVBQUUsRUFBRSxDQUFDO2dCQUNMLFFBQVEsRUFBRSxVQUFVO2dCQUNwQixTQUFTLEVBQUUsVUFBVTtnQkFDckIsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsTUFBTSxFQUFFLEVBQUU7YUFDYjtTQUNKO0tBQ0o7SUFFRCxNQUFNLENBQUMsR0FBOEI7UUFDakMsTUFBTSxDQUFDLEdBQXdCLEdBQUcsQ0FBQTtRQUNsQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUE7UUFDdkIsSUFBSSxDQUFDLG9CQUFv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IHJlbnRhbCB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL3Byb3RvX2dlbi9yZW50YWwvcmVudGFsX3BiXCJcbmltcG9ydCB7IFRyaXBTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvdHJpcFwiXG5pbXBvcnQgeyBmb3JtYXREdXJhdGlvbiwgZm9ybWF0RmVlIH0gZnJvbSBcIi4uLy4uL3V0aWxzL2Zvcm1hdFwiXG5pbXBvcnQgeyByb3V0aW5nIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3JvdXRpbmdcIlxuXG5jb25zdCB1cGRhdGVJbnRlcnZhbFNlYyA9IDVcbmNvbnN0IGluaXRpYWxMYXQgPSAzMFxuY29uc3QgaW5pdGlhbExuZyA9IDEyMFxuXG5mdW5jdGlvbiBkdXJhdGlvblN0cihzZWM6IG51bWJlcikge1xuICAgIGNvbnN0IGR1ciA9IGZvcm1hdER1cmF0aW9uKHNlYylcbiAgICByZXR1cm4gYCR7ZHVyLmhofToke2R1ci5tbX06JHtkdXIuc3N9YFxufVxuXG5QYWdlKHtcbiAgICB0aW1lcjogdW5kZWZpbmVkIGFzIG51bWJlcnx1bmRlZmluZWQsXG4gICAgdHJpcElEOiAnJyxcblxuICAgIGRhdGE6IHtcbiAgICAgICAgbG9jYXRpb246IHtcbiAgICAgICAgICAgIGxhdGl0dWRlOiBpbml0aWFsTGF0LFxuICAgICAgICAgICAgbG9uZ2l0dWRlOiBpbml0aWFsTG5nLFxuICAgICAgICB9LFxuICAgICAgICBzY2FsZTogMTIsXG4gICAgICAgIGVsYXBzZWQ6ICcwMDowMDowMCcsXG4gICAgICAgIGZlZTogJzAuMDAnLFxuICAgICAgICBtYXJrZXJzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWNvblBhdGg6IFwiL3Jlc291cmNlcy9jYXIucG5nXCIsXG4gICAgICAgICAgICAgICAgaWQ6IDAsXG4gICAgICAgICAgICAgICAgbGF0aXR1ZGU6IGluaXRpYWxMYXQsXG4gICAgICAgICAgICAgICAgbG9uZ2l0dWRlOiBpbml0aWFsTG5nLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAyMCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDIwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICB9LFxuXG4gICAgb25Mb2FkKG9wdDogUmVjb3JkPCd0cmlwX2lkJywgc3RyaW5nPikge1xuICAgICAgICBjb25zdCBvOiByb3V0aW5nLkRyaXZpbmdPcHRzID0gb3B0XG4gICAgICAgIHRoaXMudHJpcElEID0gby50cmlwX2lkXG4gICAgICAgIHRoaXMuc2V0dXBMb2NhdGlvblVwZGF0b3IoKVxuICAgICAgICB0aGlzLnNldHVwVGltZXIoby50cmlwX2lkKVxuICAgIH0sXG5cbiAgICBvblVubG9hZCgpIHtcbiAgICAgICAgd3guc3RvcExvY2F0aW9uVXBkYXRlKClcbiAgICAgICAgaWYgKHRoaXMudGltZXIpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy50aW1lcilcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzZXR1cExvY2F0aW9uVXBkYXRvcigpIHtcbiAgICAgICAgd3guc3RhcnRMb2NhdGlvblVwZGF0ZSh7XG4gICAgICAgICAgICBmYWlsOiBjb25zb2xlLmVycm9yLFxuICAgICAgICB9KVxuICAgICAgICB3eC5vbkxvY2F0aW9uQ2hhbmdlKGxvYyA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIGxvY2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIGxhdGl0dWRlOiBsb2MubGF0aXR1ZGUsXG4gICAgICAgICAgICAgICAgICAgIGxvbmdpdHVkZTogbG9jLmxvbmdpdHVkZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgYXN5bmMgc2V0dXBUaW1lcih0cmlwSUQ6IHN0cmluZykge1xuICAgICAgICBjb25zdCB0cmlwID0gYXdhaXQgVHJpcFNlcnZpY2UuZ2V0VHJpcCh0cmlwSUQpXG4gICAgICAgIGlmICh0cmlwLnN0YXR1cyAhPT0gcmVudGFsLnYxLlRyaXBTdGF0dXMuSU5fUFJPR1JFU1MpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ3RyaXAgbm90IGluIHByb2dyZXNzJylcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGxldCBzZWNTaW5jZUxhc3RVcGRhdGUgPSAwXG4gICAgICAgIGxldCBsYXN0VXBkYXRlRHVyYXRpb25TZWMgPSB0cmlwLmN1cnJlbnQhLnRpbWVzdGFtcFNlYyEgLSB0cmlwLnN0YXJ0IS50aW1lc3RhbXBTZWMhXG4gICAgICAgIGNvbnN0IHRvTG9jYXRpb24gPSAodHJpcDogcmVudGFsLnYxLklUcmlwKSA9PiAoe1xuICAgICAgICAgICAgbGF0aXR1ZGU6IHRyaXAuY3VycmVudD8ubG9jYXRpb24/LmxhdGl0dWRlIHx8IGluaXRpYWxMYXQsXG4gICAgICAgICAgICBsb25naXR1ZGU6IHRyaXAuY3VycmVudD8ubG9jYXRpb24/LmxvbmdpdHVkZSB8fCBpbml0aWFsTG5nLFxuICAgICAgICB9KVxuICAgICAgICBjb25zdCBsb2NhdGlvbiA9IHRvTG9jYXRpb24odHJpcClcbiAgICAgICAgdGhpcy5kYXRhLm1hcmtlcnNbMF0ubGF0aXR1ZGUgPSBsb2NhdGlvbi5sYXRpdHVkZVxuICAgICAgICB0aGlzLmRhdGEubWFya2Vyc1swXS5sb25naXR1ZGUgPSBsb2NhdGlvbi5sb25naXR1ZGVcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIGVsYXBzZWQ6IGR1cmF0aW9uU3RyKGxhc3RVcGRhdGVEdXJhdGlvblNlYyksXG4gICAgICAgICAgICBmZWU6IGZvcm1hdEZlZSh0cmlwLmN1cnJlbnQhLmZlZUNlbnQhKSxcbiAgICAgICAgICAgIGxvY2F0aW9uLFxuICAgICAgICAgICAgbWFya2VyczogdGhpcy5kYXRhLm1hcmtlcnMsXG4gICAgICAgIH0pXG5cbiAgICAgICAgdGhpcy50aW1lciA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgICAgIHNlY1NpbmNlTGFzdFVwZGF0ZSsrXG4gICAgICAgICAgICBpZiAoc2VjU2luY2VMYXN0VXBkYXRlICUgdXBkYXRlSW50ZXJ2YWxTZWMgPT09IDApIHtcbiAgICAgICAgICAgICAgICBUcmlwU2VydmljZS5nZXRUcmlwKHRyaXBJRCkudGhlbih0cmlwID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGFzdFVwZGF0ZUR1cmF0aW9uU2VjID0gdHJpcC5jdXJyZW50IS50aW1lc3RhbXBTZWMhIC0gdHJpcC5zdGFydCEudGltZXN0YW1wU2VjIVxuICAgICAgICAgICAgICAgICAgICBzZWNTaW5jZUxhc3RVcGRhdGUgPSAwXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvY2F0aW9uID0gdG9Mb2NhdGlvbih0cmlwKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGEubWFya2Vyc1swXS5sYXRpdHVkZSA9IGxvY2F0aW9uLmxhdGl0dWRlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YS5tYXJrZXJzWzBdLmxvbmdpdHVkZSA9IGxvY2F0aW9uLmxvbmdpdHVkZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZmVlOiBmb3JtYXRGZWUodHJpcC5jdXJyZW50IS5mZWVDZW50ISksXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcmtlcnM6IHRoaXMuZGF0YS5tYXJrZXJzLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGNvbnNvbGUuZXJyb3IpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIGVsYXBzZWQ6IGR1cmF0aW9uU3RyKGxhc3RVcGRhdGVEdXJhdGlvblNlYyArIHNlY1NpbmNlTGFzdFVwZGF0ZSksXG4gICAgICAgICAgICB9KVxuICAgICAgICB9LCAxMDAwKVxuICAgIH0sXG5cbiAgICBvbkVuZFRyaXBUYXAoKSB7XG4gICAgICAgIFRyaXBTZXJ2aWNlLmZpbmlzaFRyaXAodGhpcy50cmlwSUQpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICAgICAgdXJsOiByb3V0aW5nLm15dHJpcHMoKSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pLmNhdGNoKGVyciA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycilcbiAgICAgICAgICAgIHd4LnNob3dUb2FzdCh7XG4gICAgICAgICAgICAgICAgdGl0bGU6ICfnu5PmnZ/ooYznqIvlpLHotKUnLFxuICAgICAgICAgICAgICAgIGljb246ICdub25lJyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfVxufSkiXX0=