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
const car_pb_1 = require("../../service/proto_gen/car/car_pb");
const trip_1 = require("../../service/trip");
const routing_1 = require("../../utils/routing");
const shareLocationKey = "share_location";
Page({
    carID: '',
    carRefresher: 0,
    data: {
        shareLocation: false,
        avatarURL: '',
    },
    onLoad(opt) {
        return __awaiter(this, void 0, void 0, function* () {
            const o = opt;
            this.carID = o.car_id;
            const userInfo = yield getApp().globalData.userInfo;
            this.setData({
                avatarURL: userInfo.avatarUrl,
                shareLocation: wx.getStorageSync(shareLocationKey) || false,
            });
        });
    },
    onGetUserInfo(e) {
        const userInfo = e.detail.userInfo;
        if (userInfo) {
            getApp().resolveUserInfo(userInfo);
            this.setData({
                shareLocation: true,
            });
            wx.setStorageSync(shareLocationKey, true);
        }
    },
    onShareLocation(e) {
        this.data.shareLocation = e.detail.value;
        wx.setStorageSync(shareLocationKey, this.data.shareLocation);
    },
    onUnlockTap() {
        wx.getLocation({
            type: 'gcj02',
            success: (loc) => __awaiter(this, void 0, void 0, function* () {
                if (!this.carID) {
                    console.error('no carID specified');
                    return;
                }
                let trip;
                try {
                    trip = yield trip_1.TripService.createTrip({
                        start: loc,
                        carId: this.carID,
                        avatarUrl: this.data.shareLocation
                            ? this.data.avatarURL : '',
                    });
                    if (!trip.id) {
                        console.error('no tripID in response', trip);
                        return;
                    }
                }
                catch (err) {
                    wx.showToast({
                        title: '创建行程失败',
                        icon: 'none',
                    });
                    return;
                }
                wx.showLoading({
                    title: '开锁中',
                    mask: true,
                });
                this.carRefresher = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                    const c = yield car_1.CarService.getCar(this.carID);
                    if (c.Status === car_pb_1.car.v1.CarStatus.UNLOCKED) {
                        this.clearCarRefresher();
                        wx.redirectTo({
                            url: routing_1.routing.drving({
                                trip_id: trip.id,
                            }),
                            complete: () => {
                                wx.hideLoading();
                            }
                        });
                    }
                }), 2000);
            }),
            fail: () => {
                wx.showToast({
                    icon: 'none',
                    title: '请前往设置页授权位置信息',
                });
            }
        });
    },
    onUnload() {
        this.clearCarRefresher();
        wx.hideLoading();
    },
    clearCarRefresher() {
        if (this.carRefresher) {
            clearInterval(this.carRefresher);
            this.carRefresher = 0;
        }
    },
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImxvY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFDQSwyQ0FBOEM7QUFDOUMsK0RBQXdEO0FBRXhELDZDQUFnRDtBQUNoRCxpREFBNkM7QUFFN0MsTUFBTSxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQTtBQUV6QyxJQUFJLENBQUM7SUFDRCxLQUFLLEVBQUUsRUFBRTtJQUNULFlBQVksRUFBRSxDQUFDO0lBRWYsSUFBSSxFQUFFO1FBQ0YsYUFBYSxFQUFFLEtBQUs7UUFDcEIsU0FBUyxFQUFFLEVBQUU7S0FDaEI7SUFFSyxNQUFNLENBQUMsR0FBNkI7O1lBQ3RDLE1BQU0sQ0FBQyxHQUFxQixHQUFHLENBQUE7WUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFBO1lBQ3JCLE1BQU0sUUFBUSxHQUFHLE1BQU0sTUFBTSxFQUFjLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQTtZQUMvRCxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNULFNBQVMsRUFBRSxRQUFRLENBQUMsU0FBUztnQkFDN0IsYUFBYSxFQUFFLEVBQUUsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxLQUFLO2FBQzlELENBQUMsQ0FBQTtRQUNOLENBQUM7S0FBQTtJQUVELGFBQWEsQ0FBQyxDQUFNO1FBQ2hCLE1BQU0sUUFBUSxHQUErQixDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQTtRQUM5RCxJQUFJLFFBQVEsRUFBRTtZQUNWLE1BQU0sRUFBYyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUM5QyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUNULGFBQWEsRUFBRSxJQUFJO2FBQ3RCLENBQUMsQ0FBQTtZQUNGLEVBQUUsQ0FBQyxjQUFjLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUE7U0FDNUM7SUFDTCxDQUFDO0lBRUQsZUFBZSxDQUFDLENB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aW9uIH0gZnJvbSBcIi4uLy4uL2FwcG9wdGlvblwiXG5pbXBvcnQgeyBDYXJTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvY2FyXCJcbmltcG9ydCB7IGNhciB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL3Byb3RvX2dlbi9jYXIvY2FyX3BiXCJcbmltcG9ydCB7IHJlbnRhbCB9IGZyb20gXCIuLi8uLi9zZXJ2aWNlL3Byb3RvX2dlbi9yZW50YWwvcmVudGFsX3BiXCJcbmltcG9ydCB7IFRyaXBTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvdHJpcFwiXG5pbXBvcnQgeyByb3V0aW5nIH0gZnJvbSBcIi4uLy4uL3V0aWxzL3JvdXRpbmdcIlxuXG5jb25zdCBzaGFyZUxvY2F0aW9uS2V5ID0gXCJzaGFyZV9sb2NhdGlvblwiXG5cblBhZ2Uoe1xuICAgIGNhcklEOiAnJyxcbiAgICBjYXJSZWZyZXNoZXI6IDAsXG5cbiAgICBkYXRhOiB7XG4gICAgICAgIHNoYXJlTG9jYXRpb246IGZhbHNlLFxuICAgICAgICBhdmF0YXJVUkw6ICcnLFxuICAgIH0sXG5cbiAgICBhc3luYyBvbkxvYWQob3B0OiBSZWNvcmQ8J2Nhcl9pZCcsIHN0cmluZz4pIHtcbiAgICAgICAgY29uc3Qgbzogcm91dGluZy5Mb2NrT3B0cyA9IG9wdFxuICAgICAgICB0aGlzLmNhcklEID0gby5jYXJfaWRcbiAgICAgICAgY29uc3QgdXNlckluZm8gPSBhd2FpdCBnZXRBcHA8SUFwcE9wdGlvbj4oKS5nbG9iYWxEYXRhLnVzZXJJbmZvXG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBhdmF0YXJVUkw6IHVzZXJJbmZvLmF2YXRhclVybCxcbiAgICAgICAgICAgIHNoYXJlTG9jYXRpb246IHd4LmdldFN0b3JhZ2VTeW5jKHNoYXJlTG9jYXRpb25LZXkpIHx8IGZhbHNlLFxuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICBvbkdldFVzZXJJbmZvKGU6IGFueSkge1xuICAgICAgICBjb25zdCB1c2VySW5mbzogV2VjaGF0TWluaXByb2dyYW0uVXNlckluZm8gPSBlLmRldGFpbC51c2VySW5mb1xuICAgICAgICBpZiAodXNlckluZm8pIHtcbiAgICAgICAgICAgIGdldEFwcDxJQXBwT3B0aW9uPigpLnJlc29sdmVVc2VySW5mbyh1c2VySW5mbylcbiAgICAgICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICAgICAgc2hhcmVMb2NhdGlvbjogdHJ1ZSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB3eC5zZXRTdG9yYWdlU3luYyhzaGFyZUxvY2F0aW9uS2V5LCB0cnVlKVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIG9uU2hhcmVMb2NhdGlvbihlOiBhbnkpIHtcbiAgICAgICAgdGhpcy5kYXRhLnNoYXJlTG9jYXRpb24gPSBlLmRldGFpbC52YWx1ZVxuICAgICAgICB3eC5zZXRTdG9yYWdlU3luYyhzaGFyZUxvY2F0aW9uS2V5LCB0aGlzLmRhdGEuc2hhcmVMb2NhdGlvbilcbiAgICB9LFxuXG4gICAgb25VbmxvY2tUYXAoKSB7XG4gICAgICAgIHd4LmdldExvY2F0aW9uKHtcbiAgICAgICAgICAgIHR5cGU6ICdnY2owMicsXG4gICAgICAgICAgICBzdWNjZXNzOiBhc3luYyBsb2MgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5jYXJJRCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdubyBjYXJJRCBzcGVjaWZpZWQnKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IHRyaXA6IHJlbnRhbC52MS5JVHJpcEVudGl0eVxuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHRyaXAgPSAgYXdhaXQgVHJpcFNlcnZpY2UuY3JlYXRlVHJpcCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydDogbG9jLFxuICAgICAgICAgICAgICAgICAgICAgICAgY2FySWQ6IHRoaXMuY2FySUQsXG4gICAgICAgICAgICAgICAgICAgICAgICBhdmF0YXJVcmw6IHRoaXMuZGF0YS5zaGFyZUxvY2F0aW9uIFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuZGF0YS5hdmF0YXJVUkwgOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0cmlwLmlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdubyB0cmlwSUQgaW4gcmVzcG9uc2UnLCB0cmlwKVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGNhdGNoKGVycikge1xuICAgICAgICAgICAgICAgICAgICB3eC5zaG93VG9hc3Qoe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGl0bGU6ICfliJvlu7rooYznqIvlpLHotKUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB3eC5zaG93TG9hZGluZyh7XG4gICAgICAgICAgICAgICAgICAgIHRpdGxlOiAn5byA6ZSB5LitJyxcbiAgICAgICAgICAgICAgICAgICAgbWFzazogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9KVxuXG4gICAgICAgICAgICAgICAgdGhpcy5jYXJSZWZyZXNoZXIgPSBzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGMgPSBhd2FpdCBDYXJTZXJ2aWNlLmdldENhcih0aGlzLmNhcklEKVxuICAgICAgICAgICAgICAgICAgICBpZiAoYy5TdGF0dXMgPT09IGNhci52MS5DYXJTdGF0dXMuVU5MT0NLRUQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJDYXJSZWZyZXNoZXIoKVxuICAgICAgICAgICAgICAgICAgICAgICAgd3gucmVkaXJlY3RUbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdXJsOiByb3V0aW5nLmRydmluZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyaXBfaWQ6IHRyaXAuaWQhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd4LmhpZGVMb2FkaW5nKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSwgMjAwMClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmYWlsOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgd3guc2hvd1RvYXN0KHtcbiAgICAgICAgICAgICAgICAgICAgaWNvbjogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgICB0aXRsZTogJ+ivt+WJjeW+gOiuvue9rumhteaOiOadg+S9jee9ruS/oeaBrycsXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgb25VbmxvYWQoKSB7XG4gICAgICAgIHRoaXMuY2xlYXJDYXJSZWZyZXNoZXIoKVxuICAgICAgICB3eC5oaWRlTG9hZGluZygpXG4gICAgfSxcblxuICAgIGNsZWFyQ2FyUmVmcmVzaGVyKCkge1xuICAgICAgICBpZiAodGhpcy5jYXJSZWZyZXNoZXIpIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5jYXJSZWZyZXNoZXIpXG4gICAgICAgICAgICB0aGlzLmNhclJlZnJlc2hlciA9IDBcbiAgICAgICAgfVxuICAgIH0sXG59KSJdfQ==