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
const profile_1 = require("../../service/profile");
const rental_pb_1 = require("../../service/proto_gen/rental/rental_pb");
const request_1 = require("../../service/request");
const format_1 = require("../../utils/format");
function formatDate(millis) {
    const dt = new Date(millis);
    const y = dt.getFullYear();
    const m = dt.getMonth() + 1;
    const d = dt.getDate();
    return `${format_1.padString(y)}-${format_1.padString(m)}-${format_1.padString(d)}`;
}
Page({
    redirectURL: '',
    profileRefresher: 0,
    data: {
        licNo: '',
        name: '',
        genderIndex: 0,
        genders: ['未知', '男', '女'],
        birthDate: '1990-01-01',
        licImgURL: '',
        state: rental_pb_1.rental.v1.IdentityStatus[rental_pb_1.rental.v1.IdentityStatus.UNSUBMITTED],
    },
    renderProfile(p) {
        this.renderIdentity(p.identity);
        this.setData({
            state: rental_pb_1.rental.v1.IdentityStatus[p.identityStatus || 0],
        });
    },
    renderIdentity(i) {
        this.setData({
            licNo: (i === null || i === void 0 ? void 0 : i.licNumber) || '',
            name: (i === null || i === void 0 ? void 0 : i.name) || '',
            genderIndex: (i === null || i === void 0 ? void 0 : i.gender) || 0,
            birthDate: formatDate((i === null || i === void 0 ? void 0 : i.birthDateMillis) || 0),
        });
    },
    onLoad(opt) {
        const o = opt;
        if (o.redirect) {
            this.redirectURL = decodeURIComponent(o.redirect);
        }
        profile_1.ProfileService.getProfile().then(p => this.renderProfile(p));
        profile_1.ProfileService.getProfilePhoto().then(p => {
            this.setData({
                licImgURL: p.url || '',
            });
        });
    },
    onUploadLic() {
        wx.chooseImage({
            success: (res) => __awaiter(this, void 0, void 0, function* () {
                if (res.tempFilePaths.length === 0) {
                    return;
                }
                this.setData({
                    licImgURL: res.tempFilePaths[0]
                });
                const photoRes = yield profile_1.ProfileService.createProfilePhoto();
                if (!photoRes.uploadUrl) {
                    return;
                }
                yield request_1.Coolcar.uploadfile({
                    localPath: res.tempFilePaths[0],
                    url: photoRes.uploadUrl,
                });
                const identity = yield profile_1.ProfileService.completeProfilePhoto();
                this.renderIdentity(identity);
            })
        });
    },
    onGenderChange(e) {
        this.setData({
            genderIndex: parseInt(e.detail.value),
        });
    },
    onBirthDateChange(e) {
        this.setData({
            birthDate: e.detail.value,
        });
    },
    onSubmit() {
        profile_1.ProfileService.submitProfile({
            licNumber: this.data.licNo,
            name: this.data.name,
            gender: this.data.genderIndex,
            birthDateMillis: Date.parse(this.data.birthDate),
        }).then(p => {
            this.renderProfile(p);
            this.scheduleProfileRefresher();
        });
    },
    onUnload() {
        this.clearProfileRefresher();
    },
    scheduleProfileRefresher() {
        this.profileRefresher = setInterval(() => {
            profile_1.ProfileService.getProfile().then(p => {
                this.renderProfile(p);
                if (p.identityStatus !== rental_pb_1.rental.v1.IdentityStatus.PENDING) {
                    this.clearProfileRefresher();
                }
                if (p.identityStatus === rental_pb_1.rental.v1.IdentityStatus.VERIFIED) {
                    this.onLicVerified();
                }
            });
        }, 1000);
    },
    clearProfileRefresher() {
        if (this.profileRefresher) {
            clearInterval(this.profileRefresher);
            this.profileRefresher = 0;
        }
    },
    onResubmit() {
        profile_1.ProfileService.clearProfile().then(p => this.renderProfile(p));
        profile_1.ProfileService.clearProfilePhoto().then(() => {
            this.setData({
                licImgURL: '',
            });
        });
    },
    onLicVerified() {
        if (this.redirectURL) {
            wx.redirectTo({
                url: this.redirectURL,
            });
        }
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJyZWdpc3Rlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLG1EQUFzRDtBQUN0RCx3RUFBaUU7QUFDakUsbURBQStDO0FBQy9DLCtDQUE4QztBQUc5QyxTQUFTLFVBQVUsQ0FBQyxNQUFjO0lBQzlCLE1BQU0sRUFBRSxHQUFHLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQzNCLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQTtJQUMxQixNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFBO0lBQzNCLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUN0QixPQUFPLEdBQUcsa0JBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxrQkFBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLGtCQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQTtBQUM1RCxDQUFDO0FBRUQsSUFBSSxDQUFDO0lBQ0QsV0FBVyxFQUFFLEVBQUU7SUFDZixnQkFBZ0IsRUFBRSxDQUFDO0lBRW5CLElBQUksRUFBRTtRQUNGLEtBQUssRUFBRSxFQUFFO1FBQ1QsSUFBSSxFQUFFLEVBQUU7UUFDUixXQUFXLEVBQUUsQ0FBQztRQUNkLE9BQU8sRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDO1FBQ3pCLFNBQVMsRUFBRSxZQUFZO1FBQ3ZCLFNBQVMsRUFBRSxFQUFFO1FBQ2IsS0FBSyxFQUFFLGtCQUFNLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxrQkFBTSxDQUFDLEVBQUUsQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDO0tBQ3hFO0lBRUQsYUFBYSxDQUFDLENBQXFCO1FBQy9CLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFFBQVMsQ0FBQyxDQUFBO1FBQ2hDLElBQUksQ0FB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SSxDQUFDLGdCQUFnQixHQUFHLENBQUMsQ0FBQTtTQUM1QjtJQUNMLENBQUM7SUFFRCxVQUFVO1FBQ04sd0JBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDOUQsd0JBQWMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDekMsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFDVCxTQUFTLEVBQUUsRUFBRTthQUNoQixDQUFDLENBQUE7UUFDTixDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxhQUFhO1FBQ1QsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ2xCLEVBQUUsQ0FBQyxVQUFVLENBQUM7Z0JBQ1YsR0FBRyxFQUFFLElBQUksQ0FBQyxXQUFXO2FBQ3hCLENBQUMsQ0FBQTtTQUNMO0lBQ0wsQ0FBQztDQUNKLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb2ZpbGVTZXJ2aWNlIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvcHJvZmlsZVwiXG5pbXBvcnQgeyByZW50YWwgfSBmcm9tIFwiLi4vLi4vc2VydmljZS9wcm90b19nZW4vcmVudGFsL3JlbnRhbF9wYlwiXG5pbXBvcnQgeyBDb29sY2FyIH0gZnJvbSBcIi4uLy4uL3NlcnZpY2UvcmVxdWVzdFwiXG5pbXBvcnQgeyBwYWRTdHJpbmcgfSBmcm9tIFwiLi4vLi4vdXRpbHMvZm9ybWF0XCJcbmltcG9ydCB7IHJvdXRpbmcgfSBmcm9tIFwiLi4vLi4vdXRpbHMvcm91dGluZ1wiXG5cbmZ1bmN0aW9uIGZvcm1hdERhdGUobWlsbGlzOiBudW1iZXIpIHtcbiAgICBjb25zdCBkdCA9IG5ldyBEYXRlKG1pbGxpcylcbiAgICBjb25zdCB5ID0gZHQuZ2V0RnVsbFllYXIoKVxuICAgIGNvbnN0IG0gPSBkdC5nZXRNb250aCgpICsgMVxuICAgIGNvbnN0IGQgPSBkdC5nZXREYXRlKClcbiAgICByZXR1cm4gYCR7cGFkU3RyaW5nKHkpfS0ke3BhZFN0cmluZyhtKX0tJHtwYWRTdHJpbmcoZCl9YFxufVxuXG5QYWdlKHtcbiAgICByZWRpcmVjdFVSTDogJycsXG4gICAgcHJvZmlsZVJlZnJlc2hlcjogMCxcblxuICAgIGRhdGE6IHtcbiAgICAgICAgbGljTm86ICcnLFxuICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgZ2VuZGVySW5kZXg6IDAsXG4gICAgICAgIGdlbmRlcnM6IFsn5pyq55+lJywgJ+eUtycsICflpbMnXSxcbiAgICAgICAgYmlydGhEYXRlOiAnMTk5MC0wMS0wMScsXG4gICAgICAgIGxpY0ltZ1VSTDogJycsXG4gICAgICAgIHN0YXRlOiByZW50YWwudjEuSWRlbnRpdHlTdGF0dXNbcmVudGFsLnYxLklkZW50aXR5U3RhdHVzLlVOU1VCTUlUVEVEXSxcbiAgICB9LFxuXG4gICAgcmVuZGVyUHJvZmlsZShwOiByZW50YWwudjEuSVByb2ZpbGUpIHtcbiAgICAgICAgdGhpcy5yZW5kZXJJZGVudGl0eShwLmlkZW50aXR5ISlcbiAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIHN0YXRlOiByZW50YWwudjEuSWRlbnRpdHlTdGF0dXNbcC5pZGVudGl0eVN0YXR1c3x8MF0sXG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIHJlbmRlcklkZW50aXR5KGk/OiByZW50YWwudjEuSUlkZW50aXR5KSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBsaWNObzogaT8ubGljTnVtYmVyfHwnJyxcbiAgICAgICAgICAgIG5hbWU6IGk/Lm5hbWV8fCcnLFxuICAgICAgICAgICAgZ2VuZGVySW5kZXg6IGk/LmdlbmRlcnx8MCxcbiAgICAgICAgICAgIGJpcnRoRGF0ZTogZm9ybWF0RGF0ZShpPy5iaXJ0aERhdGVNaWxsaXN8fDApLFxuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICBvbkxvYWQob3B0OiBSZWNvcmQ8J3JlZGlyZWN0Jywgc3RyaW5nPikge1xuICAgICAgICBjb25zdCBvOiByb3V0aW5nLlJlZ2lzdGVyT3B0cyA9IG9wdFxuICAgICAgICBpZihvLnJlZGlyZWN0KSB7XG4gICAgICAgICAgICB0aGlzLnJlZGlyZWN0VVJMID0gZGVjb2RlVVJJQ29tcG9uZW50KG8ucmVkaXJlY3QpXG4gICAgICAgIH1cbiAgICAgICAgUHJvZmlsZVNlcnZpY2UuZ2V0UHJvZmlsZSgpLnRoZW4ocCA9PiB0aGlzLnJlbmRlclByb2ZpbGUocCkpXG4gICAgICAgIFByb2ZpbGVTZXJ2aWNlLmdldFByb2ZpbGVQaG90bygpLnRoZW4ocCA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgICAgIGxpY0ltZ1VSTDogcC51cmx8fCcnLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgb25VcGxvYWRMaWMoKSB7XG4gICAgICAgIHd4LmNob29zZUltYWdlKHtcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGFzeW5jIHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlcy50ZW1wRmlsZVBhdGhzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICAgICAgbGljSW1nVVJMOiByZXMudGVtcEZpbGVQYXRoc1swXVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgY29uc3QgcGhvdG9SZXMgPSBhd2FpdCBQcm9maWxlU2VydmljZS5jcmVhdGVQcm9maWxlUGhvdG8oKVxuICAgICAgICAgICAgICAgIGlmICghcGhvdG9SZXMudXBsb2FkVXJsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhd2FpdCBDb29sY2FyLnVwbG9hZGZpbGUoe1xuICAgICAgICAgICAgICAgICAgICBsb2NhbFBhdGg6IHJlcy50ZW1wRmlsZVBhdGhzWzBdLFxuICAgICAgICAgICAgICAgICAgICB1cmw6IHBob3RvUmVzLnVwbG9hZFVybCxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIGNvbnN0IGlkZW50aXR5ID0gYXdhaXQgUHJvZmlsZVNlcnZpY2UuY29tcGxldGVQcm9maWxlUGhvdG8oKVxuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVySWRlbnRpdHkoaWRlbnRpdHkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIG9uR2VuZGVyQ2hhbmdlKGU6IGFueSkge1xuICAgICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICAgICAgZ2VuZGVySW5kZXg6IHBhcnNlSW50KGUuZGV0YWlsLnZhbHVlKSxcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgb25CaXJ0aERhdGVDaGFuZ2UoZTogYW55KSB7XG4gICAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgICAgICBiaXJ0aERhdGU6IGUuZGV0YWlsLnZhbHVlLFxuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICBvblN1Ym1pdCgpIHtcbiAgICAgICAgUHJvZmlsZVNlcnZpY2Uuc3VibWl0UHJvZmlsZSh7XG4gICAgICAgICAgICBsaWNOdW1iZXI6IHRoaXMuZGF0YS5saWNObyxcbiAgICAgICAgICAgIG5hbWU6IHRoaXMuZGF0YS5uYW1lLFxuICAgICAgICAgICAgZ2VuZGVyOiB0aGlzLmRhdGEuZ2VuZGVySW5kZXgsXG4gICAgICAgICAgICBiaXJ0aERhdGVNaWxsaXM6IERhdGUucGFyc2UodGhpcy5kYXRhLmJpcnRoRGF0ZSksXG4gICAgICAgIH0pLnRoZW4ocCA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclByb2ZpbGUocClcbiAgICAgICAgICAgIHRoaXMuc2NoZWR1bGVQcm9maWxlUmVmcmVzaGVyKClcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgb25VbmxvYWQoKSB7XG4gICAgICAgIHRoaXMuY2xlYXJQcm9maWxlUmVmcmVzaGVyKClcbiAgICB9LFxuXG4gICAgc2NoZWR1bGVQcm9maWxlUmVmcmVzaGVyKCkge1xuICAgICAgICB0aGlzLnByb2ZpbGVSZWZyZXNoZXIgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICBQcm9maWxlU2VydmljZS5nZXRQcm9maWxlKCkudGhlbihwID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlclByb2ZpbGUocClcbiAgICAgICAgICAgICAgICBpZiAocC5pZGVudGl0eVN0YXR1cyAhPT0gcmVudGFsLnYxLklkZW50aXR5U3RhdHVzLlBFTkRJTkcpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbGVhclByb2ZpbGVSZWZyZXNoZXIoKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocC5pZGVudGl0eVN0YXR1cyA9PT0gcmVudGFsLnYxLklkZW50aXR5U3RhdHVzLlZFUklGSUVEKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25MaWNWZXJpZmllZCgpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSwgMTAwMClcbiAgICB9LFxuXG4gICAgY2xlYXJQcm9maWxlUmVmcmVzaGVyKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9maWxlUmVmcmVzaGVyKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKHRoaXMucHJvZmlsZVJlZnJlc2hlcilcbiAgICAgICAgICAgIHRoaXMucHJvZmlsZVJlZnJlc2hlciA9IDBcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvblJlc3VibWl0KCkge1xuICAgICAgICBQcm9maWxlU2VydmljZS5jbGVhclByb2ZpbGUoKS50aGVuKHAgPT4gdGhpcy5yZW5kZXJQcm9maWxlKHApKVxuICAgICAgICBQcm9maWxlU2VydmljZS5jbGVhclByb2ZpbGVQaG90bygpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgICAgICBsaWNJbWdVUkw6ICcnLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgb25MaWNWZXJpZmllZCgpIHtcbiAgICAgICAgaWYgKHRoaXMucmVkaXJlY3RVUkwpIHtcbiAgICAgICAgICAgIHd4LnJlZGlyZWN0VG8oe1xuICAgICAgICAgICAgICAgIHVybDogdGhpcy5yZWRpcmVjdFVSTCxcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG59KSJdfQ==