import * as $protobuf from "protobufjs";
/** Namespace auth. */
export namespace auth {

    /** Namespace v1. */
    namespace v1 {

        /** Properties of a CreateBlobRequest. */
        interface ICreateBlobRequest {

            /** CreateBlobRequest accountId */
            accountId?: (string|null);

            /** CreateBlobRequest uploadUrlTimeoutSec */
            uploadUrlTimeoutSec?: (number|null);
        }

        /** Represents a CreateBlobRequest. */
        class CreateBlobRequest implements ICreateBlobRequest {

            /**
             * Constructs a new CreateBlobRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: auth.v1.ICreateBlobRequest);

            /** CreateBlobRequest accountId. */
            public accountId: string;

            /** CreateBlobRequest uploadUrlTimeoutSec. */
            public uploadUrlTimeoutSec: number;

            /**
             * Encodes the specified CreateBlobRequest message. Does not implicitly {@link auth.v1.CreateBlobRequest.verify|verify} messages.
             * @param message CreateBlobRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: auth.v1.ICreateBlobRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CreateBlobRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CreateBlobRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): auth.v1.CreateBlobRequest;

            /**
             * Verifies a CreateBlobRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CreateBlobRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CreateBlobRequest
             */
            public static fromObject(object: { [k: string]: any }): auth.v1.CreateBlobRequest;

            /**
             * Creates a plain object from a CreateBlobRequest message. Also converts values to other types if specified.
             * @param message CreateBlobRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: auth.v1.CreateBlobRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CreateBlobRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a CreateBlobResponse. */
        interface ICreateBlobResponse {

            /** CreateBlobResponse id */
            id?: (string|null);

            /** CreateBlobResponse uploadUrl */
            uploadUrl?: (string|null);
        }

        /** Represents a CreateBlobResponse. */
        class CreateBlobResponse implements ICreateBlobResponse {

            /**
             * Constructs a new CreateBlobResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: auth.v1.ICreateBlobResponse);

            /** CreateBlobResponse id. */
            public id: string;

            /** CreateBlobResponse uploadUrl. */
            public uploadUrl: string;

            /**
             * Encodes the specified CreateBlobResponse message. Does not implicitly {@link auth.v1.CreateBlobResponse.verify|verify} messages.
             * @param message CreateBlobResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: auth.v1.ICreateBlobResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CreateBlobResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CreateBlobResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): auth.v1.CreateBlobResponse;

            /**
             * Verifies a CreateBlobResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CreateBlobResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CreateBlobResponse
             */
            public static fromObject(object: { [k: string]: any }): auth.v1.CreateBlobResponse;

            /**
             * Creates a plain object from a CreateBlobResponse message. Also converts values to other types if specified.
             * @param message CreateBlobResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: auth.v1.CreateBlobResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CreateBlobResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetBlobRequest. */
        interface IGetBlobRequest {

            /** GetBlobRequest id */
            id?: (string|null);
        }

        /** Represents a GetBlobRequest. */
        class GetBlobRequest implements IGetBlobRequest {

            /**
             * Constructs a new GetBlobRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: auth.v1.IGetBlobRequest);

            /** GetBlobRequest id. */
            public id: string;

            /**
             * Encodes the specified GetBlobRequest message. Does not implicitly {@link auth.v1.GetBlobRequest.verify|verify} messages.
             * @param message GetBlobRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: auth.v1.IGetBlobRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetBlobRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetBlobRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): auth.v1.GetBlobRequest;

            /**
             * Verifies a GetBlobRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetBlobRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetBlobRequest
             */
            public static fromObject(object: { [k: string]: any }): auth.v1.GetBlobRequest;

            /**
             * Creates a plain object from a GetBlobRequest message. Also converts values to other types if specified.
             * @param message GetBlobRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: auth.v1.GetBlobRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetBlobRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetBlobResponse. */
        interface IGetBlobResponse {

            /** GetBlobResponse data */
            data?: (Uint8Array|null);
        }

        /** Represents a GetBlobResponse. */
        class GetBlobResponse implements IGetBlobResponse {

            /**
             * Constructs a new GetBlobResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: auth.v1.IGetBlobResponse);

            /** GetBlobResponse data. */
            public data: Uint8Array;

            /**
             * Encodes the specified GetBlobResponse message. Does not implicitly {@link auth.v1.GetBlobResponse.verify|verify} messages.
             * @param message GetBlobResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: auth.v1.IGetBlobResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetBlobResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetBlobResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): auth.v1.GetBlobResponse;

            /**
             * Verifies a GetBlobResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetBlobResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetBlobResponse
             */
            public static fromObject(object: { [k: string]: any }): auth.v1.GetBlobResponse;

            /**
             * Creates a plain object from a GetBlobResponse message. Also converts values to other types if specified.
             * @param message GetBlobResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: auth.v1.GetBlobResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetBlobResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetBlobURLRequest. */
        interface IGetBlobURLRequest {

            /** GetBlobURLRequest id */
            id?: (string|null);

            /** GetBlobURLRequest timeoutSec */
            timeoutSec?: (number|null);
        }

        /** Represents a GetBlobURLRequest. */
        class GetBlobURLRequest implements IGetBlobURLRequest {

            /**
             * Constructs a new GetBlobURLRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: auth.v1.IGetBlobURLRequest);

            /** GetBlobURLRequest id. */
            public id: string;

            /** GetBlobURLRequest timeoutSec. */
            public timeoutSec: number;

            /**
             * Encodes the specified GetBlobURLRequest message. Does not implicitly {@link auth.v1.GetBlobURLRequest.verify|verify} messages.
             * @param message GetBlobURLRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: auth.v1.IGetBlobURLRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetBlobURLRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetBlobURLRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): auth.v1.GetBlobURLRequest;

            /**
             * Verifies a GetBlobURLRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetBlobURLRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetBlobURLRequest
             */
            public static fromObject(object: { [k: string]: any }): auth.v1.GetBlobURLRequest;

            /**
             * Creates a plain object from a GetBlobURLRequest message. Also converts values to other types if specified.
             * @param message GetBlobURLRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: auth.v1.GetBlobURLRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetBlobURLRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetBlobURLResponse. */
        interface IGetBlobURLResponse {

            /** GetBlobURLResponse url */
            url?: (string|null);
        }

        /** Represents a GetBlobURLResponse. */
        class GetBlobURLResponse implements IGetBlobURLResponse {

            /**
             * Constructs a new GetBlobURLResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: auth.v1.IGetBlobURLResponse);

            /** GetBlobURLResponse url. */
            public url: string;

            /**
             * Encodes the specified GetBlobURLResponse message. Does not implicitly {@link auth.v1.GetBlobURLResponse.verify|verify} messages.
             * @param message GetBlobURLResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: auth.v1.IGetBlobURLResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetBlobURLResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetBlobURLResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): auth.v1.GetBlobURLResponse;

            /**
             * Verifies a GetBlobURLResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetBlobURLResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetBlobURLResponse
             */
            public static fromObject(object: { [k: string]: any }): auth.v1.GetBlobURLResponse;

            /**
             * Creates a plain object from a GetBlobURLResponse message. Also converts values to other types if specified.
             * @param message GetBlobURLResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: auth.v1.GetBlobURLResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetBlobURLResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Represents a BlobService */
        class BlobService extends $protobuf.rpc.Service {

            /**
             * Constructs a new BlobService service.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             */
            constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

            /**
             * Calls CreateBlob.
             * @param request CreateBlobRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and CreateBlobResponse
             */
            public createBlob(request: auth.v1.ICreateBlobRequest, callback: auth.v1.BlobService.CreateBlobCallback): void;

            /**
             * Calls CreateBlob.
             * @param request CreateBlobRequest message or plain object
             * @returns Promise
             */
            public createBlob(request: auth.v1.ICreateBlobRequest): Promise<auth.v1.CreateBlobResponse>;

            /**
             * Calls GetBlob.
             * @param request GetBlobRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and GetBlobResponse
             */
            public getBlob(request: auth.v1.IGetBlobRequest, callback: auth.v1.BlobService.GetBlobCallback): void;

            /**
             * Calls GetBlob.
             * @param request GetBlobRequest message or plain object
             * @returns Promise
             */
            public getBlob(request: auth.v1.IGetBlobRequest): Promise<auth.v1.GetBlobResponse>;

            /**
             * Calls GetBlobURL.
             * @param request GetBlobURLRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and GetBlobURLResponse
             */
            public getBlobURL(request: auth.v1.IGetBlobURLRequest, callback: auth.v1.BlobService.GetBlobURLCallback): void;

            /**
             * Calls GetBlobURL.
             * @param request GetBlobURLRequest message or plain object
             * @returns Promise
             */
            public getBlobURL(request: auth.v1.IGetBlobURLRequest): Promise<auth.v1.GetBlobURLResponse>;
        }

        namespace BlobService {

            /**
             * Callback as used by {@link auth.v1.BlobService#createBlob}.
             * @param error Error, if any
             * @param [response] CreateBlobResponse
             */
            type CreateBlobCallback = (error: (Error|null), response?: auth.v1.CreateBlobResponse) => void;

            /**
             * Callback as used by {@link auth.v1.BlobService#getBlob}.
             * @param error Error, if any
             * @param [response] GetBlobResponse
             */
            type GetBlobCallback = (error: (Error|null), response?: auth.v1.GetBlobResponse) => void;

            /**
             * Callback as used by {@link auth.v1.BlobService#getBlobURL}.
             * @param error Error, if any
             * @param [response] GetBlobURLResponse
             */
            type GetBlobURLCallback = (error: (Error|null), response?: auth.v1.GetBlobURLResponse) => void;
        }
    }
}
