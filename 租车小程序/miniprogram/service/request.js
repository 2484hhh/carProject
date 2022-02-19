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
exports.Coolcar = void 0;
const camelcaseKeys = require("camelcase-keys");
const auth_pb_1 = require("./proto_gen/auth/auth_pb");
var Coolcar;
(function (Coolcar) {
    Coolcar.serverAddr = 'http://localhost:8080';
    Coolcar.wsAddr = 'ws://localhost:9090';
    const AUTH_ERR = 'AUTH_ERR';
    const authData = {
        token: '',
        expiryMs: 0,
    };
    function sendRequestWithAuthRetry(o, a) {
        return __awaiter(this, void 0, void 0, function* () {
            const authOpt = a || {
                attachAuthHeader: true,
                retryOnAuthError: true,
            };
            try {
                yield login();
                return sendRequest(o, authOpt);
            }
            catch (err) {
                if (err === AUTH_ERR && authOpt.retryOnAuthError) {
                    authData.token = '';
                    authData.expiryMs = 0;
                    return sendRequestWithAuthRetry(o, {
                        attachAuthHeader: authOpt.attachAuthHeader,
                        retryOnAuthError: false,
                    });
                }
                else {
                    throw err;
                }
            }
        });
    }
    Coolcar.sendRequestWithAuthRetry = sendRequestWithAuthRetry;
    function login() {
        return __awaiter(this, void 0, void 0, function* () {
            if (authData.token && authData.expiryMs >= Date.now()) {
                return;
            }
            const wxResp = yield wxLogin();
            const reqTimeMs = Date.now();
            const resp = yield sendRequest({
                method: 'POST',
                path: '/v1/auth/login',
                data: {
                    code: wxResp.code,
                },
                respMarshaller: auth_pb_1.auth.v1.LoginResponse.fromObject,
            }, {
                attachAuthHeader: false,
                retryOnAuthError: false,
            });
            authData.token = resp.accessToken;
            authData.expiryMs = reqTimeMs + resp.expiresIn_ * 1000;
        });
    }
    Coolcar.login = login;
    function sendRequest(o, a) {
        return new Promise((resolve, reject) => {
            const header = {};
            if (a.attachAuthHeader) {
                if (authData.token && authData.expiryMs >= Date.now()) {
                    header.authorization = 'Bearer ' + authData.token;
                }
                else {
                    reject(AUTH_ERR);
                    return;
                }
            }
            wx.request({
                url: Coolcar.serverAddr + o.path,
                method: o.method,
                data: o.data,
                header,
                success: res => {
                    if (res.statusCode === 401) {
                        reject(AUTH_ERR);
                    }
                    else if (res.statusCode >= 400) {
                        reject(res);
                    }
                    else {
                        resolve(o.respMarshaller(camelcaseKeys(res.data, {
                            deep: true,
                        })));
                    }
                },
                fail: reject,
            });
        });
    }
    function wxLogin() {
        return new Promise((resolve, reject) => {
            wx.login({
                success: resolve,
                fail: reject,
            });
        });
    }
    function uploadfile(o) {
        const data = wx.getFileSystemManager().readFileSync(o.localPath);
        return new Promise((resolve, reject) => {
            wx.request({
                method: 'PUT',
                url: o.url,
                data,
                success: res => {
                    if (res.statusCode >= 400) {
                        reject(res);
                    }
                    else {
                        resolve();
                    }
                },
                fail: reject,
            });
        });
    }
    Coolcar.uploadfile = uploadfile;
})(Coolcar = exports.Coolcar || (exports.Coolcar = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlcXVlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQWdEO0FBQ2hELHNEQUErQztBQUUvQyxJQUFpQixPQUFPLENBaUl2QjtBQWpJRCxXQUFpQixPQUFPO0lBQ1Asa0JBQVUsR0FBRyx1QkFBdUIsQ0FBQTtJQUNwQyxjQUFNLEdBQUcscUJBQXFCLENBQUE7SUFDM0MsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFBO0lBRTNCLE1BQU0sUUFBUSxHQUFHO1FBQ2IsS0FBSyxFQUFFLEVBQUU7UUFDVCxRQUFRLEVBQUUsQ0FBQztLQUNkLENBQUE7SUFjRCxTQUFzQix3QkFBd0IsQ0FBVyxDQUEwQixFQUFFLENBQWM7O1lBQy9GLE1BQU0sT0FBTyxHQUFHLENBQUMsSUFBSTtnQkFDakIsZ0JBQWdCLEVBQUUsSUFBSTtnQkFDdEIsZ0JBQWdCLEVBQUUsSUFBSTthQUN6QixDQUFBO1lBQ0QsSUFBSTtnQkFDQSxNQUFNLEtBQUssRUFBRSxDQUFBO2dCQUNiLE9BQU8sV0FBVyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQTthQUNqQztZQUFDLE9BQU0sR0FBRyxFQUFFO2dCQUNULElBQUksR0FBRyxLQUFLLFFBQVEsSUFBSSxPQUFPLENBQUMsZ0JBQWdCLEVBQUU7b0JBQzlDLFFBQVEsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFBO29CQUNuQixRQUFRLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQTtvQkFDckIsT0FBTyx3QkFBd0IsQ0FBQyxDQUFDLEVBQUU7d0JBQy9CLGdCQUFnQixFQUFFLE9BQU8sQ0FBQyxnQkFBZ0I7d0JBQzFDLGdCQUFnQixFQUFFLEtBQUs7cUJBQzFCLENBQUMsQ0FBQTtpQkFDTDtxQkFBTTtvQkFDSCxNQUFNLEdBQUcsQ0FBQTtpQkFDWjthQUNKO1FBQ0wsQ0FBQztLQUFBO0lBcEJxQixnQ0FBd0IsMkJBb0I3QyxDQUFBO0lBRUQs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RSxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ25DLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ1AsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHO2dCQUNWLElBQUk7Z0JBQ0osT0FBTyxFQUFFLEdBQUcsQ0FBQyxFQUFFO29CQUNYLElBQUksR0FBRyxDQUFDLFVBQVUsSUFBSSxHQUFHLEVBQUU7d0JBQ3ZCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtxQkFDZDt5QkFBTTt3QkFDSCxPQUFPLEVBQUUsQ0FBQTtxQkFDWjtnQkFDTCxDQUFDO2dCQUNELElBQUksRUFBRSxNQUFNO2FBQ2YsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUE7SUFDTixDQUFDO0lBakJlLGtCQUFVLGFBaUJ6QixDQUFBO0FBQ0wsQ0FBQyxFQWpJZ0IsT0FBTyxHQUFQLGVBQU8sS0FBUCxlQUFPLFFBaUl2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjYW1lbGNhc2VLZXlzID0gcmVxdWlyZShcImNhbWVsY2FzZS1rZXlzXCIpXG5pbXBvcnQgeyBhdXRoIH0gZnJvbSBcIi4vcHJvdG9fZ2VuL2F1dGgvYXV0aF9wYlwiXG5cbmV4cG9ydCBuYW1lc3BhY2UgQ29vbGNhciB7XG4gICAgZXhwb3J0IGNvbnN0IHNlcnZlckFkZHIgPSAnaHR0cDovL2xvY2FsaG9zdDo4MDgwJ1xuICAgIGV4cG9ydCBjb25zdCB3c0FkZHIgPSAnd3M6Ly9sb2NhbGhvc3Q6OTA5MCdcbiAgICBjb25zdCBBVVRIX0VSUiA9ICdBVVRIX0VSUidcblxuICAgIGNvbnN0IGF1dGhEYXRhID0ge1xuICAgICAgICB0b2tlbjogJycsXG4gICAgICAgIGV4cGlyeU1zOiAwLFxuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgUmVxdWVzdE9wdGlvbjxSRVEsIFJFUz4ge1xuICAgICAgICBtZXRob2Q6ICdHRVQnfCdQVVQnfCdQT1NUJ3wnREVMRVRFJ1xuICAgICAgICBwYXRoOiBzdHJpbmdcbiAgICAgICAgZGF0YT86IFJFUVxuICAgICAgICByZXNwTWFyc2hhbGxlcjogKHI6IG9iamVjdCk9PlJFU1xuICAgIH1cblxuICAgIGV4cG9ydCBpbnRlcmZhY2UgQXV0aE9wdGlvbiB7XG4gICAgICAgIGF0dGFjaEF1dGhIZWFkZXI6IGJvb2xlYW5cbiAgICAgICAgcmV0cnlPbkF1dGhFcnJvcjogYm9vbGVhblxuICAgIH1cblxuICAgIGV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZW5kUmVxdWVzdFdpdGhBdXRoUmV0cnk8UkVRLCBSRVM+KG86IFJlcXVlc3RPcHRpb248UkVRLCBSRVM+LCBhPzogQXV0aE9wdGlvbik6IFByb21pc2U8UkVTPiB7XG4gICAgICAgIGNvbnN0IGF1dGhPcHQgPSBhIHx8IHtcbiAgICAgICAgICAgIGF0dGFjaEF1dGhIZWFkZXI6IHRydWUsXG4gICAgICAgICAgICByZXRyeU9uQXV0aEVycm9yOiB0cnVlLFxuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBhd2FpdCBsb2dpbigpXG4gICAgICAgICAgICByZXR1cm4gc2VuZFJlcXVlc3QobywgYXV0aE9wdClcbiAgICAgICAgfSBjYXRjaChlcnIpIHtcbiAgICAgICAgICAgIGlmIChlcnIgPT09IEFVVEhfRVJSICYmIGF1dGhPcHQucmV0cnlPbkF1dGhFcnJvcikge1xuICAgICAgICAgICAgICAgIGF1dGhEYXRhLnRva2VuID0gJydcbiAgICAgICAgICAgICAgICBhdXRoRGF0YS5leHBpcnlNcyA9IDBcbiAgICAgICAgICAgICAgICByZXR1cm4gc2VuZFJlcXVlc3RXaXRoQXV0aFJldHJ5KG8sIHtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNoQXV0aEhlYWRlcjogYXV0aE9wdC5hdHRhY2hBdXRoSGVhZGVyLFxuICAgICAgICAgICAgICAgICAgICByZXRyeU9uQXV0aEVycm9yOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnJcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2dpbigpIHtcbiAgICAgICAgaWYgKGF1dGhEYXRhLnRva2VuICYmIGF1dGhEYXRhLmV4cGlyeU1zID49IERhdGUubm93KCkpIHtcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHd4UmVzcCA9IGF3YWl0IHd4TG9naW4oKVxuICAgICAgICBjb25zdCByZXFUaW1lTXMgPSBEYXRlLm5vdygpXG4gICAgICAgIGNvbnN0IHJlc3AgPSBhd2FpdCBzZW5kUmVxdWVzdDxhdXRoLnYxLklMb2dpblJlcXVlc3QsIGF1dGgudjEuSUxvZ2luUmVzcG9uc2U+ICh7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIHBhdGg6ICcvdjEvYXV0aC9sb2dpbicsXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgY29kZTogd3hSZXNwLmNvZGUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVzcE1hcnNoYWxsZXI6IGF1dGgudjEuTG9naW5SZXNwb25zZS5mcm9tT2JqZWN0LFxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBhdHRhY2hBdXRoSGVhZGVyOiBmYWxzZSxcbiAgICAgICAgICAgIHJldHJ5T25BdXRoRXJyb3I6IGZhbHNlLFxuICAgICAgICB9KVxuICAgICAgICBhdXRoRGF0YS50b2tlbiA9IHJlc3AuYWNjZXNzVG9rZW4hXG4gICAgICAgIGF1dGhEYXRhLmV4cGlyeU1zID0gcmVxVGltZU1zICsgcmVzcC5leHBpcmVzSW5fISAqIDEwMDBcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZW5kUmVxdWVzdDxSRVEsIFJFUz4obzogUmVxdWVzdE9wdGlvbjxSRVEsIFJFUz4sIGE6IEF1dGhPcHRpb24pOiBQcm9taXNlPFJFUz4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaGVhZGVyOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge31cbiAgICAgICAgICAgIGlmIChhLmF0dGFjaEF1dGhIZWFkZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoYXV0aERhdGEudG9rZW4gJiYgYXV0aERhdGEuZXhwaXJ5TXMgPj0gRGF0ZS5ub3coKSkge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXIuYXV0aG9yaXphdGlvbiA9ICdCZWFyZXIgJyArIGF1dGhEYXRhLnRva2VuXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVqZWN0KEFVVEhfRVJSKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB3eC5yZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICB1cmw6IHNlcnZlckFkZHIgKyBvLnBhdGgsXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBvLm1ldGhvZCxcbiAgICAgICAgICAgICAgICBkYXRhOiBvLmRhdGEsXG4gICAgICAgICAgICAgICAgaGVhZGVyLFxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlcyA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXMuc3RhdHVzQ29kZSA9PT0gNDAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoQVVUSF9FUlIpXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAocmVzLnN0YXR1c0NvZGUgPj0gNDAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QocmVzKVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShvLnJlc3BNYXJzaGFsbGVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhbWVsY2FzZUtleXMocmVzLmRhdGEgYXMgb2JqZWN0LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZXA6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3QsXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHd4TG9naW4oKTogUHJvbWlzZTxXZWNoYXRNaW5pcHJvZ3JhbS5Mb2dpblN1Y2Nlc3NDYWxsYmFja1Jlc3VsdD4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgd3gubG9naW4oe1xuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IHJlc29sdmUsXG4gICAgICAgICAgICAgICAgZmFpbDogcmVqZWN0LFxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBleHBvcnQgaW50ZXJmYWNlIFVwbG9hZEZpbGVPcHRzIHtcbiAgICAgICAgbG9jYWxQYXRoOiBzdHJpbmdcbiAgICAgICAgdXJsOiBzdHJpbmdcbiAgICB9XG4gICAgZXhwb3J0IGZ1bmN0aW9uIHVwbG9hZGZpbGUobzogVXBsb2FkRmlsZU9wdHMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgY29uc3QgZGF0YSA9IHd4LmdldEZpbGVTeXN0ZW1NYW5hZ2VyKCkucmVhZEZpbGVTeW5jKG8ubG9jYWxQYXRoKVxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgd3gucmVxdWVzdCh7XG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgICAgICAgICB1cmw6IG8udXJsLFxuICAgICAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICAgICAgc3VjY2VzczogcmVzID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlcy5zdGF0dXNDb2RlID49IDQwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KHJlcylcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWlsOiByZWplY3QsXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgIH1cbn0iXX0=