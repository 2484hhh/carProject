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

        v1.CreateBlobRequest = (function() {

            /**
             * Properties of a CreateBlobRequest.
             * @memberof auth.v1
             * @interface ICreateBlobRequest
             * @property {string|null} [accountId] CreateBlobRequest accountId
             * @property {number|null} [uploadUrlTimeoutSec] CreateBlobRequest uploadUrlTimeoutSec
             */

            /**
             * Constructs a new CreateBlobRequest.
             * @memberof auth.v1
             * @classdesc Represents a CreateBlobRequest.
             * @implements ICreateBlobRequest
             * @constructor
             * @param {auth.v1.ICreateBlobRequest=} [properties] Properties to set
             */
            function CreateBlobRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CreateBlobRequest accountId.
             * @member {string} accountId
             * @memberof auth.v1.CreateBlobRequest
             * @instance
             */
            CreateBlobRequest.prototype.accountId = "";

            /**
             * CreateBlobRequest uploadUrlTimeoutSec.
             * @member {number} uploadUrlTimeoutSec
             * @memberof auth.v1.CreateBlobRequest
             * @instance
             */
            CreateBlobRequest.prototype.uploadUrlTimeoutSec = 0;

            /**
             * Encodes the specified CreateBlobRequest message. Does not implicitly {@link auth.v1.CreateBlobRequest.verify|verify} messages.
             * @function encode
             * @memberof auth.v1.CreateBlobRequest
             * @static
             * @param {auth.v1.ICreateBlobRequest} message CreateBlobRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CreateBlobRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.accountId != null && Object.hasOwnProperty.call(message, "accountId"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.accountId);
                if (message.uploadUrlTimeoutSec != null && Object.hasOwnProperty.call(message, "uploadUrlTimeoutSec"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.uploadUrlTimeoutSec);
                return writer;
            };

            /**
             * Decodes a CreateBlobRequest message from the specified reader or buffer.
             * @function decode
             * @memberof auth.v1.CreateBlobRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {auth.v1.CreateBlobRequest} CreateBlobRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CreateBlobRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.auth.v1.CreateBlobRequest();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.accountId = reader.string();
                        break;
                    case 2:
                        message.uploadUrlTimeoutSec = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Verifies a CreateBlobRequest message.
             * @function verify
             * @memberof auth.v1.CreateBlobRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CreateBlobRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.accountId != null && message.hasOwnProperty("accountId"))
                    if (!$util.isString(message.accountId))
                        return "accountId: string expected";
                if (message.uploadUrlTimeoutSec != null && message.hasOwnProperty("uploadUrlTimeoutSec"))
                    if (!$util.isInteger(message.uploadUrlTimeoutSec))
                        return "uploadUrlTimeoutSec: integer expected";
                return null;
            };

            /**
             * Creates a CreateBlobRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof auth.v1.CreateBlobRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {auth.v1.CreateBlobRequest} CreateBlobRequest
             */
            CreateBlobRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.auth.v1.CreateBlobRequest)
                    return object;
                let message = new $root.auth.v1.CreateBlobRequest();
                if (object.accountId != null)
                    message.accountId = String(object.accountId);
                if (object.uploadUrlTimeoutSec != null)
                    message.uploadUrlTimeoutSec = object.uploadUrlTimeoutSec | 0;
                return message;
            };

            /**
             * Creates a plain object from a CreateBlobRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof auth.v1.CreateBlobRequest
             * @static
             * @param {auth.v1.CreateBlobRequest} message CreateBlobRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CreateBlobRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.accountId = "";
                    object.uploadUrlTimeoutSec = 0;
                }
                if (message.accountId != null && message.hasOwnProperty("accountId"))
                    object.accountId = message.accountId;
                if (message.uploadUrlTimeoutSec != null && message.hasOwnProperty("uploadUrlTimeoutSec"))
                    object.uploadUrlTimeoutSec = message.uploadUrlTimeoutSec;
                return object;
            };

            /**
             * Converts this CreateBlobRequest to JSON.
             * @function toJSON
             * @memberof auth.v1.CreateBlobRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CreateBlobRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return CreateBlobRequest;
        })();

        v1.CreateBlobResponse = (function() {

            /**
             * Properties of a CreateBlobResponse.
             * @memberof auth.v1
             * @interface ICreateBlobResponse
             * @property {string|null} [id] CreateBlobResponse id
             * @property {string|null} [uploadUrl] CreateBlobResponse uploadUrl
             */

            /**
             * Constructs a new CreateBlobResponse.
             * @memberof auth.v1
             * @classdesc Represents a CreateBlobResponse.
             * @implements ICreateBlobResponse
             * @constructor
             * @param {auth.v1.ICreateBlobResponse=} [properties] Properties to set
             */
            function CreateBlobResponse(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * CreateBlobResponse id.
             * @member {string} id
             * @memberof auth.v1.CreateBlobResponse
             * @instance
             */
            CreateBlobResponse.prototype.id = "";

            /**
             * CreateBlobResponse uploadUrl.
             * @member {string} uploadUrl
             * @memberof auth.v1.CreateBlobResponse
             * @instance
             */
            CreateBlobResponse.prototype.uploadUrl = "";

            /**
             * Encodes the specified CreateBlobResponse message. Does not implicitly {@link auth.v1.CreateBlobResponse.verify|verify} messages.
             * @function encode
             * @memberof auth.v1.CreateBlobResponse
             * @static
             * @param {auth.v1.ICreateBlobResponse} message CreateBlobResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            CreateBlobResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.uploadUrl != null && Object.hasOwnProperty.call(message, "uploadUrl"))
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.uploadUrl);
                return writer;
            };

            /**
             * Decodes a CreateBlobResponse message from the specified reader or buffer.
             * @function decode
             * @memberof auth.v1.CreateBlobResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {auth.v1.CreateBlobResponse} CreateBlobResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            CreateBlobResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.auth.v1.CreateBlobResponse();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.string();
                        break;
                    case 2:
                        message.uploadUrl = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Verifies a CreateBlobResponse message.
             * @function verify
             * @memberof auth.v1.CreateBlobResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            CreateBlobResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.uploadUrl != null && message.hasOwnProperty("uploadUrl"))
                    if (!$util.isString(message.uploadUrl))
                        return "uploadUrl: string expected";
                return null;
            };

            /**
             * Creates a CreateBlobResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof auth.v1.CreateBlobResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {auth.v1.CreateBlobResponse} CreateBlobResponse
             */
            CreateBlobResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.auth.v1.CreateBlobResponse)
                    return object;
                let message = new $root.auth.v1.CreateBlobResponse();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.uploadUrl != null)
                    message.uploadUrl = String(object.uploadUrl);
                return message;
            };

            /**
             * Creates a plain object from a CreateBlobResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof auth.v1.CreateBlobResponse
             * @static
             * @param {auth.v1.CreateBlobResponse} message CreateBlobResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            CreateBlobResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.uploadUrl = "";
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.uploadUrl != null && message.hasOwnProperty("uploadUrl"))
                    object.uploadUrl = message.uploadUrl;
                return object;
            };

            /**
             * Converts this CreateBlobResponse to JSON.
             * @function toJSON
             * @memberof auth.v1.CreateBlobResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            CreateBlobResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return CreateBlobResponse;
        })();

        v1.GetBlobRequest = (function() {

            /**
             * Properties of a GetBlobRequest.
             * @memberof auth.v1
             * @interface IGetBlobRequest
             * @property {string|null} [id] GetBlobRequest id
             */

            /**
             * Constructs a new GetBlobRequest.
             * @memberof auth.v1
             * @classdesc Represents a GetBlobRequest.
             * @implements IGetBlobRequest
             * @constructor
             * @param {auth.v1.IGetBlobRequest=} [properties] Properties to set
             */
            function GetBlobRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetBlobRequest id.
             * @member {string} id
             * @memberof auth.v1.GetBlobRequest
             * @instance
             */
            GetBlobRequest.prototype.id = "";

            /**
             * Encodes the specified GetBlobRequest message. Does not implicitly {@link auth.v1.GetBlobRequest.verify|verify} messages.
             * @function encode
             * @memberof auth.v1.GetBlobRequest
             * @static
             * @param {auth.v1.IGetBlobRequest} message GetBlobRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetBlobRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                return writer;
            };

            /**
             * Decodes a GetBlobRequest message from the specified reader or buffer.
             * @function decode
             * @memberof auth.v1.GetBlobRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {auth.v1.GetBlobRequest} GetBlobRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetBlobRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.auth.v1.GetBlobRequest();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Verifies a GetBlobRequest message.
             * @function verify
             * @memberof auth.v1.GetBlobRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetBlobRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                return null;
            };

            /**
             * Creates a GetBlobRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof auth.v1.GetBlobRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {auth.v1.GetBlobRequest} GetBlobRequest
             */
            GetBlobRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.auth.v1.GetBlobRequest)
                    return object;
                let message = new $root.auth.v1.GetBlobRequest();
                if (object.id != null)
                    message.id = String(object.id);
                return message;
            };

            /**
             * Creates a plain object from a GetBlobRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof auth.v1.GetBlobRequest
             * @static
             * @param {auth.v1.GetBlobRequest} message GetBlobRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetBlobRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.id = "";
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                return object;
            };

            /**
             * Converts this GetBlobRequest to JSON.
             * @function toJSON
             * @memberof auth.v1.GetBlobRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetBlobRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetBlobRequest;
        })();

        v1.GetBlobResponse = (function() {

            /**
             * Properties of a GetBlobResponse.
             * @memberof auth.v1
             * @interface IGetBlobResponse
             * @property {Uint8Array|null} [data] GetBlobResponse data
             */

            /**
             * Constructs a new GetBlobResponse.
             * @memberof auth.v1
             * @classdesc Represents a GetBlobResponse.
             * @implements IGetBlobResponse
             * @constructor
             * @param {auth.v1.IGetBlobResponse=} [properties] Properties to set
             */
            function GetBlobResponse(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetBlobResponse data.
             * @member {Uint8Array} data
             * @memberof auth.v1.GetBlobResponse
             * @instance
             */
            GetBlobResponse.prototype.data = $util.newBuffer([]);

            /**
             * Encodes the specified GetBlobResponse message. Does not implicitly {@link auth.v1.GetBlobResponse.verify|verify} messages.
             * @function encode
             * @memberof auth.v1.GetBlobResponse
             * @static
             * @param {auth.v1.IGetBlobResponse} message GetBlobResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetBlobResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.data != null && Object.hasOwnProperty.call(message, "data"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.data);
                return writer;
            };

            /**
             * Decodes a GetBlobResponse message from the specified reader or buffer.
             * @function decode
             * @memberof auth.v1.GetBlobResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {auth.v1.GetBlobResponse} GetBlobResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetBlobResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.auth.v1.GetBlobResponse();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.data = reader.bytes();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Verifies a GetBlobResponse message.
             * @function verify
             * @memberof auth.v1.GetBlobResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetBlobResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.data != null && message.hasOwnProperty("data"))
                    if (!(message.data && typeof message.data.length === "number" || $util.isString(message.data)))
                        return "data: buffer expected";
                return null;
            };

            /**
             * Creates a GetBlobResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof auth.v1.GetBlobResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {auth.v1.GetBlobResponse} GetBlobResponse
             */
            GetBlobResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.auth.v1.GetBlobResponse)
                    return object;
                let message = new $root.auth.v1.GetBlobResponse();
                if (object.data != null)
                    if (typeof object.data === "string")
                        $util.base64.decode(object.data, message.data = $util.newBuffer($util.base64.length(object.data)), 0);
                    else if (object.data.length)
                        message.data = object.data;
                return message;
            };

            /**
             * Creates a plain object from a GetBlobResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof auth.v1.GetBlobResponse
             * @static
             * @param {auth.v1.GetBlobResponse} message GetBlobResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetBlobResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    if (options.bytes === String)
                        object.data = "";
                    else {
                        object.data = [];
                        if (options.bytes !== Array)
                            object.data = $util.newBuffer(object.data);
                    }
                if (message.data != null && message.hasOwnProperty("data"))
                    object.data = options.bytes === String ? $util.base64.encode(message.data, 0, message.data.length) : options.bytes === Array ? Array.prototype.slice.call(message.data) : message.data;
                return object;
            };

            /**
             * Converts this GetBlobResponse to JSON.
             * @function toJSON
             * @memberof auth.v1.GetBlobResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetBlobResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetBlobResponse;
        })();

        v1.GetBlobURLRequest = (function() {

            /**
             * Properties of a GetBlobURLRequest.
             * @memberof auth.v1
             * @interface IGetBlobURLRequest
             * @property {string|null} [id] GetBlobURLRequest id
             * @property {number|null} [timeoutSec] GetBlobURLRequest timeoutSec
             */

            /**
             * Constructs a new GetBlobURLRequest.
             * @memberof auth.v1
             * @classdesc Represents a GetBlobURLRequest.
             * @implements IGetBlobURLRequest
             * @constructor
             * @param {auth.v1.IGetBlobURLRequest=} [properties] Properties to set
             */
            function GetBlobURLRequest(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetBlobURLRequest id.
             * @member {string} id
             * @memberof auth.v1.GetBlobURLRequest
             * @instance
             */
            GetBlobURLRequest.prototype.id = "";

            /**
             * GetBlobURLRequest timeoutSec.
             * @member {number} timeoutSec
             * @memberof auth.v1.GetBlobURLRequest
             * @instance
             */
            GetBlobURLRequest.prototype.timeoutSec = 0;

            /**
             * Encodes the specified GetBlobURLRequest message. Does not implicitly {@link auth.v1.GetBlobURLRequest.verify|verify} messages.
             * @function encode
             * @memberof auth.v1.GetBlobURLRequest
             * @static
             * @param {auth.v1.IGetBlobURLRequest} message GetBlobURLRequest message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetBlobURLRequest.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                if (message.timeoutSec != null && Object.hasOwnProperty.call(message, "timeoutSec"))
                    writer.uint32(/* id 2, wireType 0 =*/16).int32(message.timeoutSec);
                return writer;
            };

            /**
             * Decodes a GetBlobURLRequest message from the specified reader or buffer.
             * @function decode
             * @memberof auth.v1.GetBlobURLRequest
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {auth.v1.GetBlobURLRequest} GetBlobURLRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetBlobURLRequest.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.auth.v1.GetBlobURLRequest();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.id = reader.string();
                        break;
                    case 2:
                        message.timeoutSec = reader.int32();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Verifies a GetBlobURLRequest message.
             * @function verify
             * @memberof auth.v1.GetBlobURLRequest
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetBlobURLRequest.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.id != null && message.hasOwnProperty("id"))
                    if (!$util.isString(message.id))
                        return "id: string expected";
                if (message.timeoutSec != null && message.hasOwnProperty("timeoutSec"))
                    if (!$util.isInteger(message.timeoutSec))
                        return "timeoutSec: integer expected";
                return null;
            };

            /**
             * Creates a GetBlobURLRequest message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof auth.v1.GetBlobURLRequest
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {auth.v1.GetBlobURLRequest} GetBlobURLRequest
             */
            GetBlobURLRequest.fromObject = function fromObject(object) {
                if (object instanceof $root.auth.v1.GetBlobURLRequest)
                    return object;
                let message = new $root.auth.v1.GetBlobURLRequest();
                if (object.id != null)
                    message.id = String(object.id);
                if (object.timeoutSec != null)
                    message.timeoutSec = object.timeoutSec | 0;
                return message;
            };

            /**
             * Creates a plain object from a GetBlobURLRequest message. Also converts values to other types if specified.
             * @function toObject
             * @memberof auth.v1.GetBlobURLRequest
             * @static
             * @param {auth.v1.GetBlobURLRequest} message GetBlobURLRequest
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetBlobURLRequest.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults) {
                    object.id = "";
                    object.timeoutSec = 0;
                }
                if (message.id != null && message.hasOwnProperty("id"))
                    object.id = message.id;
                if (message.timeoutSec != null && message.hasOwnProperty("timeoutSec"))
                    object.timeoutSec = message.timeoutSec;
                return object;
            };

            /**
             * Converts this GetBlobURLRequest to JSON.
             * @function toJSON
             * @memberof auth.v1.GetBlobURLRequest
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetBlobURLRequest.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetBlobURLRequest;
        })();

        v1.GetBlobURLResponse = (function() {

            /**
             * Properties of a GetBlobURLResponse.
             * @memberof auth.v1
             * @interface IGetBlobURLResponse
             * @property {string|null} [url] GetBlobURLResponse url
             */

            /**
             * Constructs a new GetBlobURLResponse.
             * @memberof auth.v1
             * @classdesc Represents a GetBlobURLResponse.
             * @implements IGetBlobURLResponse
             * @constructor
             * @param {auth.v1.IGetBlobURLResponse=} [properties] Properties to set
             */
            function GetBlobURLResponse(properties) {
                if (properties)
                    for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * GetBlobURLResponse url.
             * @member {string} url
             * @memberof auth.v1.GetBlobURLResponse
             * @instance
             */
            GetBlobURLResponse.prototype.url = "";

            /**
             * Encodes the specified GetBlobURLResponse message. Does not implicitly {@link auth.v1.GetBlobURLResponse.verify|verify} messages.
             * @function encode
             * @memberof auth.v1.GetBlobURLResponse
             * @static
             * @param {auth.v1.IGetBlobURLResponse} message GetBlobURLResponse message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            GetBlobURLResponse.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.url != null && Object.hasOwnProperty.call(message, "url"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.url);
                return writer;
            };

            /**
             * Decodes a GetBlobURLResponse message from the specified reader or buffer.
             * @function decode
             * @memberof auth.v1.GetBlobURLResponse
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {auth.v1.GetBlobURLResponse} GetBlobURLResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            GetBlobURLResponse.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                let end = length === undefined ? reader.len : reader.pos + length, message = new $root.auth.v1.GetBlobURLResponse();
                while (reader.pos < end) {
                    let tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1:
                        message.url = reader.string();
                        break;
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Verifies a GetBlobURLResponse message.
             * @function verify
             * @memberof auth.v1.GetBlobURLResponse
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            GetBlobURLResponse.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.url != null && message.hasOwnProperty("url"))
                    if (!$util.isString(message.url))
                        return "url: string expected";
                return null;
            };

            /**
             * Creates a GetBlobURLResponse message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof auth.v1.GetBlobURLResponse
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {auth.v1.GetBlobURLResponse} GetBlobURLResponse
             */
            GetBlobURLResponse.fromObject = function fromObject(object) {
                if (object instanceof $root.auth.v1.GetBlobURLResponse)
                    return object;
                let message = new $root.auth.v1.GetBlobURLResponse();
                if (object.url != null)
                    message.url = String(object.url);
                return message;
            };

            /**
             * Creates a plain object from a GetBlobURLResponse message. Also converts values to other types if specified.
             * @function toObject
             * @memberof auth.v1.GetBlobURLResponse
             * @static
             * @param {auth.v1.GetBlobURLResponse} message GetBlobURLResponse
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            GetBlobURLResponse.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                let object = {};
                if (options.defaults)
                    object.url = "";
                if (message.url != null && message.hasOwnProperty("url"))
                    object.url = message.url;
                return object;
            };

            /**
             * Converts this GetBlobURLResponse to JSON.
             * @function toJSON
             * @memberof auth.v1.GetBlobURLResponse
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            GetBlobURLResponse.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            return GetBlobURLResponse;
        })();

        v1.BlobService = (function() {

            /**
             * Constructs a new BlobService service.
             * @memberof auth.v1
             * @classdesc Represents a BlobService
             * @extends $protobuf.rpc.Service
             * @constructor
             * @param {$protobuf.RPCImpl} rpcImpl RPC implementation
             * @param {boolean} [requestDelimited=false] Whether requests are length-delimited
             * @param {boolean} [responseDelimited=false] Whether responses are length-delimited
             */
            function BlobService(rpcImpl, requestDelimited, responseDelimited) {
                $protobuf.rpc.Service.call(this, rpcImpl, requestDelimited, responseDelimited);
            }

            (BlobService.prototype = Object.create($protobuf.rpc.Service.prototype)).constructor = BlobService;

            /**
             * Callback as used by {@link auth.v1.BlobService#createBlob}.
             * @memberof auth.v1.BlobService
             * @typedef CreateBlobCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {auth.v1.CreateBlobResponse} [response] CreateBlobResponse
             */

            /**
             * Calls CreateBlob.
             * @function createBlob
             * @memberof auth.v1.BlobService
             * @instance
             * @param {auth.v1.ICreateBlobRequest} request CreateBlobRequest message or plain object
             * @param {auth.v1.BlobService.CreateBlobCallback} callback Node-style callback called with the error, if any, and CreateBlobResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(BlobService.prototype.createBlob = function createBlob(request, callback) {
                return this.rpcCall(createBlob, $root.auth.v1.CreateBlobRequest, $root.auth.v1.CreateBlobResponse, request, callback);
            }, "name", { value: "CreateBlob" });

            /**
             * Calls CreateBlob.
             * @function createBlob
             * @memberof auth.v1.BlobService
             * @instance
             * @param {auth.v1.ICreateBlobRequest} request CreateBlobRequest message or plain object
             * @returns {Promise<auth.v1.CreateBlobResponse>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link auth.v1.BlobService#getBlob}.
             * @memberof auth.v1.BlobService
             * @typedef GetBlobCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {auth.v1.GetBlobResponse} [response] GetBlobResponse
             */

            /**
             * Calls GetBlob.
             * @function getBlob
             * @memberof auth.v1.BlobService
             * @instance
             * @param {auth.v1.IGetBlobRequest} request GetBlobRequest message or plain object
             * @param {auth.v1.BlobService.GetBlobCallback} callback Node-style callback called with the error, if any, and GetBlobResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(BlobService.prototype.getBlob = function getBlob(request, callback) {
                return this.rpcCall(getBlob, $root.auth.v1.GetBlobRequest, $root.auth.v1.GetBlobResponse, request, callback);
            }, "name", { value: "GetBlob" });

            /**
             * Calls GetBlob.
             * @function getBlob
             * @memberof auth.v1.BlobService
             * @instance
             * @param {auth.v1.IGetBlobRequest} request GetBlobRequest message or plain object
             * @returns {Promise<auth.v1.GetBlobResponse>} Promise
             * @variation 2
             */

            /**
             * Callback as used by {@link auth.v1.BlobService#getBlobURL}.
             * @memberof auth.v1.BlobService
             * @typedef GetBlobURLCallback
             * @type {function}
             * @param {Error|null} error Error, if any
             * @param {auth.v1.GetBlobURLResponse} [response] GetBlobURLResponse
             */

            /**
             * Calls GetBlobURL.
             * @function getBlobURL
             * @memberof auth.v1.BlobService
             * @instance
             * @param {auth.v1.IGetBlobURLRequest} request GetBlobURLRequest message or plain object
             * @param {auth.v1.BlobService.GetBlobURLCallback} callback Node-style callback called with the error, if any, and GetBlobURLResponse
             * @returns {undefined}
             * @variation 1
             */
            Object.defineProperty(BlobService.prototype.getBlobURL = function getBlobURL(request, callback) {
                return this.rpcCall(getBlobURL, $root.auth.v1.GetBlobURLRequest, $root.auth.v1.GetBlobURLResponse, request, callback);
            }, "name", { value: "GetBlobURL" });

            /**
             * Calls GetBlobURL.
             * @function getBlobURL
             * @memberof auth.v1.BlobService
             * @instance
             * @param {auth.v1.IGetBlobURLRequest} request GetBlobURLRequest message or plain object
             * @returns {Promise<auth.v1.GetBlobURLResponse>} Promise
             * @variation 2
             */

            return BlobService;
        })();

        return v1;
    })();

    return auth;
})();