import * as $protobuf from "protobufjs"; 
// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const auth = $root.auth = (() => {

    /**
     * Namespace auth.
     * @exports auth
     * @namespace
     */
    const auth = {};

    auth.v1 = (function() {

        /**
         * Namespace v1.
         * @memberof auth
         * @namespace
         */
        const v1 = {};

        v1.LoginRequest = (function() {

            /**
             * Properties of a LoginRequest.
             * @memberof auth.v1
             * @interface ILoginRequest
             * @property {string|null} [code] LoginRequest code
             */

            /**
             * Constructs a new LoginRequest.
             * @memberof auth.v1
             * @classdesc Represents a LoginRequest.
             * @implements ILoginRequest
             * @constructor
             * @param {auth.v1.ILoginRequest=} [properties] Properties to set
             */
            function LoginRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LoginRequest code.
             * @member {string} code
             * @memberof auth.v1.LoginRequest
             * @instance
             */
            LoginRequest.prototype.code = "";

            /**
             * Encodes the specified LoginRequest message. Does not implicitly {@link auth.v1.LoginRequest.verify|verify} messages.
             * @function encode
             * @memberof auth.v1.LoginRequest
             * @static
             * @param {auth.v1.ILoginRequest} message LoginRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LoginRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.code != null && Object.hasOwnProperty.call(message, "code"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.code);
                return writer;
            };

            /**
             * Decodes a LoginRequest message from the specified reader or buffer.
             * @function decode
             * @memberof auth.v1.LoginRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {auth.v1.LoginRequest} LoginRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LoginRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.auth.v1.LoginRequest();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.code = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Verifies a LoginRequest message.
             * @function verify
             * @memberof auth.v1.LoginRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LoginRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.code != null && message.hasOwnProperty("code"))
                    if (!$util.isString(message.code))
                        return "code: string expected";
                return null;
            };

            /**
             * Creates a LoginRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof auth.v1.LoginRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {auth.v1.LoginRequest} LoginRequest
             */
            LoginRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.auth.v1.LoginRequest)
                    return object;
                let message = new $root.auth.v1.LoginRequest();
                if (object.code != null)
                    message.code = String(object.code);
                return message;
            };

            /**
             * Creates a plain object from a LoginRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof auth.v1.LoginRequest
             * @static
             * @param {auth.v1.LoginRequest} message LoginRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LoginRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.code = "";
                if (message.code != null && message.hasOwnProperty("code"))
                    object.code = message.code;
                return object;
            };

            /**
             * Converts this LoginRequest to JSON.
             * @function toJSON
             * @memberof auth.v1.LoginRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LoginRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return LoginRequest;
        })();

        v1.LoginResponse = (function() {

            /**
             * Properties of a LoginResponse.
             * @memberof auth.v1
             * @interface ILoginResponse
             * @property {string|null} [accessToken] LoginResponse accessToken
             * @property {number|null} [expiresIn_] LoginResponse expiresIn_
             */

            /**
             * Constructs a new LoginResponse.
             * @memberof auth.v1
             * @classdesc Represents a LoginResponse.
             * @implements ILoginResponse
             * @constructor
             * @param {auth.v1.ILoginResponse=} [properties] Properties to set
             */
            function LoginResponse(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * LoginResponse accessToken.
             * @member {string} accessToken
             * @memberof auth.v1.LoginResponse
             * @instance
             */
            LoginResponse.prototype.accessToken = "";

            /**
             * LoginResponse expiresIn_.
             * @member {number} expiresIn_
             * @memberof auth.v1.LoginResponse
             * @instance
             */
            LoginResponse.prototype.expiresIn_ = 0;

            /**
             * Encodes the specified LoginResponse message. Does not implicitly {@link auth.v1.LoginResponse.verify|verify} messages.
             * @function encode
             * @memberof auth.v1.LoginResponse
             * @static
             * @param {auth.v1.ILoginResponse} message LoginResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            LoginResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.accessToken != null && Object.hasOwnProperty.call(message, "accessToken"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.accessToken);
                if (message.expiresIn_ != null && Object.hasOwnProperty.call(message, "expiresIn_"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.expiresIn_);
                return writer;
            };

            /**
             * Decodes a LoginResponse message from the specified reader or buffer.
             * @function decode
             * @memberof auth.v1.LoginResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {auth.v1.LoginResponse} LoginResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            LoginResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.auth.v1.LoginResponse();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.accessToken = reader.string();
                        break;
                    case 2:
                        message.expiresIn_ = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Verifies a LoginResponse message.
             * @function verify
             * @memberof auth.v1.LoginResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            LoginResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.accessToken != null && message.hasOwnProperty("accessToken"))
                    if (!$util.isString(message.accessToken))
                        return "accessToken: string expected";
                if (message.expiresIn_ != null && message.hasOwnProperty("expiresIn_"))
                    if (!$util.isInteger(message.expiresIn_))
                        return "expiresIn_: integer expected";
                return null;
            };

            /**
             * Creates a LoginResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof auth.v1.LoginResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {auth.v1.LoginResponse} LoginResponse
             */
            LoginResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.auth.v1.LoginResponse)
                    return object;
                let message = new $root.auth.v1.LoginResponse();
                if (object.accessToken != null)
                    message.accessToken = String(object.accessToken);
                if (object.expiresIn_ != null)
                    message.expiresIn_ = object.expiresIn_ | 0;
                return message;
            };

            /**
             * Creates a plain object from a LoginResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof auth.v1.LoginResponse
             * @static
             * @param {auth.v1.LoginResponse} message LoginResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            LoginResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.accessToken = "";
                    object.expiresIn_ = 0;
                }
                if (message.accessToken != null && message.hasOwnProperty("accessToken"))
                    object.accessToken = message.accessToken;
                if (message.expiresIn_ != null && message.hasOwnProperty("expiresIn_"))
                    object.expiresIn_ = message.expiresIn_;
                return object;
            };

            /**
             * Converts this LoginResponse to JSON.
             * @function toJSON
             * @memberof auth.v1.LoginResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            LoginResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return LoginResponse;
        })();

        v1.AuthService = (function() {

            /**
             * Constructs a new AuthService service.
             * @memberof auth.v1
             * @classdesc Represents an AuthService
             * @extends $protobuf.rpc.Service
             * @constructor
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             */
            function AuthService(rpcImpl, requestDelimited, responseDelimited) {
                $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
            }

            (AuthService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = AuthService;

            /**
             * Callback as used by {@link auth.v1.AuthService#login}.
             * @memberof auth.v1.AuthService
             * @typedef LoginCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {auth.v1.LoginResponse} [response] LoginResponse
             */

            /**
             * Calls Login.
             * @function login
             * @memberof auth.v1.AuthService
             * @instance
             * @param {auth.v1.ILoginRequest} request LoginRequest message or plain object
             * @param {auth.v1.AuthService.LoginCallback} callback Node-style callback called with the error, if any, and LoginResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(AuthService.prototype.login = function login(request, callback) {
                return this.rpcCall(login, $root.auth.v1.LoginRequest, $root.auth.v1.LoginResponse, request, callback);
            }, "name", { value: "Login" });

            /**
             * Calls Login.
             * @function login
             * @memberof auth.v1.AuthService
             * @instance
             * @param {auth.v1.ILoginRequest} request LoginRequest message or plain object
             * @returns {Promise<auth.v1.LoginResponse>} Promise
             * @variation 2
             */

            return AuthService;
        })();

        return v1;
    })();

    return auth;
})();