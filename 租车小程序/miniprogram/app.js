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
const request_1 = require("./service/request");
const wxapi_1 = require("./utils/wxapi");
let resolveUserInfo;
let rejectUserInfo;
App({
    globalData: {
        userInfo: new Promise((resolve, reject) => {
            resolveUserInfo = resolve;
            rejectUserInfo = reject;
        })
    },
    onLaunch() {
        return __awaiter(this, void 0, void 0, function* () {
            request_1.Coolcar.login();
            try {
                const setting = yield wxapi_1.getSetting();
                if (setting.authSetting['scope.userInfo']) {
                    const userInfoRes = yield wxapi_1.getUserInfo();
                    resolveUserInfo(userInfoRes.userInfo);
                }
            }
            catch (err) {
                rejectUserInfo(err);
            }
        });
    },
    resolveUserInfo(userInfo) {
        resolveUserInfo(userInfo);
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBSUEsK0NBQTJDO0FBQzNDLHlDQUF1RDtBQUV2RCxJQUFJLGVBQXNHLENBQUE7QUFDMUcsSUFBSSxjQUFzQyxDQUFBO0FBRzFDLEdBQUcsQ0FBYTtJQUNkLFVBQVUsRUFBRTtRQUNWLFFBQVEsRUFBRSxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUN4QyxlQUFlLEdBQUcsT0FBTyxDQUFBO1lBQ3pCLGNBQWMsR0FBRyxNQUFNLENBQUE7UUFDekIsQ0FBQyxDQUFDO0tBQ0g7SUFDSyxRQUFROztZQUVaLGlCQUFPLENBQUMsS0FBSyxFQUFFLENBQUE7WUFJZixJQUFJO2dCQUNGLE1BQU0sT0FBTyxHQUFHLE1BQU0sa0JBQVUsRUFBRSxDQUFBO2dCQUNsQyxJQUFJLE9BQU8sQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtvQkFDekMsTUFBTSxXQUFXLEdBQUcsTUFBTSxtQkFBVyxFQUFFLENBQUE7b0JBQ3ZDLGVBQWUsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUE7aUJBQ3RDO2FBQ0Y7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixjQUFjLENBQUMsR0FBRyxDQUFDLENBQUE7YUFDcEI7UUFDSCxDQUFDO0tBQUE7SUFDRCxlQUFlLENBQUMsUUFBb0M7UUFDbEQsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzNCLENBQUM7Q0FDRixDQUFDLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgeyBNZXRob2QgfSBmcm9tIFwicHJvdG9idWZqc1wiXG5pbXBvcnQgeyBJQXBwT3B0aW9uIH0gZnJvbSBcIi4vYXBwb3B0aW9uXCJcbi8vIGltcG9ydCB7IGF1dGggfSBmcm9tIFwiLi9zZXJ2aWNlL3Byb3RvX2dlbi9hdXRoL2F1dGhfcGJcIlxuLy8gaW1wb3J0IHsgYXV0aCB9IGZyb20gXCIuL3NlcnZpY2UvcHJvdG9fZ2VuL2F1dGgvYXV0aF9wYlwiXG5pbXBvcnQgeyBDb29sY2FyIH0gZnJvbSBcIi4vc2VydmljZS9yZXF1ZXN0XCJcbmltcG9ydCB7IGdldFNldHRpbmcsIGdldFVzZXJJbmZvIH0gZnJvbSBcIi4vdXRpbHMvd3hhcGlcIlxuXG5sZXQgcmVzb2x2ZVVzZXJJbmZvOiAodmFsdWU6IFdlY2hhdE1pbmlwcm9ncmFtLlVzZXJJbmZvIHwgUHJvbWlzZUxpa2U8V2VjaGF0TWluaXByb2dyYW0uVXNlckluZm8+KSA9PiB2b2lkXG5sZXQgcmVqZWN0VXNlckluZm86IChyZWFzb24/OiBhbnkpID0+IHZvaWRcblxuLy8gYXBwLnRzXG5BcHA8SUFwcE9wdGlvbj4oe1xuICBnbG9iYWxEYXRhOiB7XG4gICAgdXNlckluZm86IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHJlc29sdmVVc2VySW5mbyA9IHJlc29sdmVcbiAgICAgIHJlamVjdFVzZXJJbmZvID0gcmVqZWN0XG4gICAgfSlcbiAgfSxcbiAgYXN5bmMgb25MYXVuY2goKSB7XG4gICAgLy8g55m75b2VXG4gICAgQ29vbGNhci5sb2dpbigpXG4gICBcblxuICAgIC8vIOiOt+WPlueUqOaIt+S/oeaBr1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzZXR0aW5nID0gYXdhaXQgZ2V0U2V0dGluZygpXG4gICAgICBpZiAoc2V0dGluZy5hdXRoU2V0dGluZ1snc2NvcGUudXNlckluZm8nXSkge1xuICAgICAgICBjb25zdCB1c2VySW5mb1JlcyA9IGF3YWl0IGdldFVzZXJJbmZvKClcbiAgICAgICAgcmVzb2x2ZVVzZXJJbmZvKHVzZXJJbmZvUmVzLnVzZXJJbmZvKVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmVqZWN0VXNlckluZm8oZXJyKVxuICAgIH1cbiAgfSxcbiAgcmVzb2x2ZVVzZXJJbmZvKHVzZXJJbmZvOiBXZWNoYXRNaW5pcHJvZ3JhbS5Vc2VySW5mbykge1xuICAgIHJlc29sdmVVc2VySW5mbyh1c2VySW5mbylcbiAgfVxufSkiXX0=