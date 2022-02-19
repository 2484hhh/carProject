import * as $protobuf from "protobufjs";
/** Namespace auth. */
export namespace auth {

    /** Namespace v1. */
    namespace v1 {

        /** Properties of a LoginRequest. */
        interface ILoginRequest {

            /** LoginRequest code */
            code?: (string|null);
        }

        /** Represents a LoginRequest. */
        class LoginRequest implements ILoginRequest {

            /**
             * Constructs a new LoginRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: auth.v1.ILoginRequest);

            /** LoginRequest code. */
            public code: string;

            /**
             * Encodes the specified LoginRequest message. Does not implicitly {@link auth.v1.LoginRequest.verify|verify} messages.
             * @param message LoginRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: auth.v1.ILoginRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a LoginRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LoginRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): auth.v1.LoginRequest;

            /**
             * Verifies a LoginRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a LoginRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LoginRequest
             */
            public static fromObject(object: { [k: string]: any }): auth.v1.LoginRequest;

            /**
             * Creates a plain object from a LoginRequest message. Also converts values to other types if specified.
             * @param message LoginRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: auth.v1.LoginRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LoginRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a LoginResponse. */
        interface ILoginResponse {

            /** LoginResponse accessToken */
            accessToken?: (string|null);

            /** LoginResponse expiresIn_ */
            expiresIn_?: (number|null);
        }

        /** Represents a LoginResponse. */
        class LoginResponse implements ILoginResponse {

            /**
             * Constructs a new LoginResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: auth.v1.ILoginResponse);

            /** LoginResponse accessToken. */
            public accessToken: string;

            /** LoginResponse expiresIn_. */
            public expiresIn_: number;

            /**
             * Encodes the specified LoginResponse message. Does not implicitly {@link auth.v1.LoginResponse.verify|verify} messages.
             * @param message LoginResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: auth.v1.ILoginResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a LoginResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LoginResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): auth.v1.LoginResponse;

            /**
             * Verifies a LoginResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a LoginResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LoginResponse
             */
            public static fromObject(object: { [k: string]: any }): auth.v1.LoginResponse;

            /**
             * Creates a plain object from a LoginResponse message. Also converts values to other types if specified.
             * @param message LoginResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: auth.v1.LoginResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LoginResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Represents an AuthService */
        class AuthService extends $protobuf.rpc.Service {

            /**
             * Constructs a new AuthService service.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             */
            constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

            /**
             * Calls Login.
             * @param request LoginRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and LoginResponse
             */
            public login(request: auth.v1.ILoginRequest, callback: auth.v1.AuthService.LoginCallback): void;

            /**
             * Calls Login.
             * @param request LoginRequest message or plain object
             * @returns Promise
             */
            public login(request: auth.v1.ILoginRequest): Promise<auth.v1.LoginResponse>;
        }

        namespace AuthService {

            /**
             * Callback as used by {@link auth.v1.AuthService#login}.
             * @param error Error, if any
             * @param [response] LoginResponse
             */
            type LoginCallback = (error: (Error|null), response?: auth.v1.LoginResponse) => void;
        }
    }
}
