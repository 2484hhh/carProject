import * as $protobuf from "protobufjs";
/** Namespace car. */
export namespace car {

    /** Namespace v1. */
    namespace v1 {

        /** Properties of a CarEntity. */
        interface ICarEntity {

            /** CarEntity id */
            id?: (string|null);

            /** CarEntity car */
            car?: (car.v1.ICar|null);
        }

        /** Represents a CarEntity. */
        class CarEntity implements ICarEntity {

            /**
             * Constructs a new CarEntity.
             * @param [properties] Properties to set
             */
            constructor(properties?: car.v1.ICarEntity);

            /** CarEntity id. */
            public id: string;

            /** CarEntity car. */
            public car?: (car.v1.ICar|null);

            /**
             * Encodes the specified CarEntity message. Does not implicitly {@link car.v1.CarEntity.verify|verify} messages.
             * @param message CarEntity message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: car.v1.ICarEntity, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CarEntity message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CarEntity
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): car.v1.CarEntity;

            /**
             * Verifies a CarEntity message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CarEntity message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CarEntity
             */
            public static fromObject(object: { [k: string]: any }): car.v1.CarEntity;

            /**
             * Creates a plain object from a CarEntity message. Also converts values to other types if specified.
             * @param message CarEntity
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: car.v1.CarEntity, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CarEntity to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** CarStatus enum. */
        enum CarStatus {
            CS_NOT_SPECIFIED = 0,
            LOCKED = 1,
            UNLOCKING = 2,
            UNLOCKED = 3,
            LOCKING = 4
        }

        /** Properties of a Driver. */
        interface IDriver {

            /** Driver id */
            id?: (string|null);

            /** Driver avatarUrl */
            avatarUrl?: (string|null);
        }

        /** Represents a Driver. */
        class Driver implements IDriver {

            /**
             * Constructs a new Driver.
             * @param [properties] Properties to set
             */
            constructor(properties?: car.v1.IDriver);

            /** Driver id. */
            public id: string;

            /** Driver avatarUrl. */
            public avatarUrl: string;

            /**
             * Encodes the specified Driver message. Does not implicitly {@link car.v1.Driver.verify|verify} messages.
             * @param message Driver message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: car.v1.IDriver, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Driver message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Driver
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): car.v1.Driver;

            /**
             * Verifies a Driver message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Driver message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Driver
             */
            public static fromObject(object: { [k: string]: any }): car.v1.Driver;

            /**
             * Creates a plain object from a Driver message. Also converts values to other types if specified.
             * @param message Driver
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: car.v1.Driver, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Driver to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Location. */
        interface ILocation {

            /** Location latitude */
            latitude?: (number|null);

            /** Location longitude */
            longitude?: (number|null);
        }

        /** Represents a Location. */
        class Location implements ILocation {

            /**
             * Constructs a new Location.
             * @param [properties] Properties to set
             */
            constructor(properties?: car.v1.ILocation);

            /** Location latitude. */
            public latitude: number;

            /** Location longitude. */
            public longitude: number;

            /**
             * Encodes the specified Location message. Does not implicitly {@link car.v1.Location.verify|verify} messages.
             * @param message Location message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: car.v1.ILocation, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Location message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Location
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): car.v1.Location;

            /**
             * Verifies a Location message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Location message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Location
             */
            public static fromObject(object: { [k: string]: any }): car.v1.Location;

            /**
             * Creates a plain object from a Location message. Also converts values to other types if specified.
             * @param message Location
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: car.v1.Location, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Location to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a Car. */
        interface ICar {

            /** Car Status */
            Status?: (car.v1.CarStatus|null);

            /** Car driver */
            driver?: (car.v1.IDriver|null);

            /** Car position */
            position?: (car.v1.ILocation|null);

            /** Car tripId */
            tripId?: (string|null);
        }

        /** Represents a Car. */
        class Car implements ICar {

            /**
             * Constructs a new Car.
             * @param [properties] Properties to set
             */
            constructor(properties?: car.v1.ICar);

            /** Car Status. */
            public Status: car.v1.CarStatus;

            /** Car driver. */
            public driver?: (car.v1.IDriver|null);

            /** Car position. */
            public position?: (car.v1.ILocation|null);

            /** Car tripId. */
            public tripId: string;

            /**
             * Encodes the specified Car message. Does not implicitly {@link car.v1.Car.verify|verify} messages.
             * @param message Car message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: car.v1.ICar, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Car message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Car
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): car.v1.Car;

            /**
             * Verifies a Car message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Car message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Car
             */
            public static fromObject(object: { [k: string]: any }): car.v1.Car;

            /**
             * Creates a plain object from a Car message. Also converts values to other types if specified.
             * @param message Car
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: car.v1.Car, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Car to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a CreateCarRequest. */
        interface ICreateCarRequest {
        }

        /** Represents a CreateCarRequest. */
        class CreateCarRequest implements ICreateCarRequest {

            /**
             * Constructs a new CreateCarRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: car.v1.ICreateCarRequest);

            /**
             * Encodes the specified CreateCarRequest message. Does not implicitly {@link car.v1.CreateCarRequest.verify|verify} messages.
             * @param message CreateCarRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: car.v1.ICreateCarRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a CreateCarRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns CreateCarRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): car.v1.CreateCarRequest;

            /**
             * Verifies a CreateCarRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a CreateCarRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns CreateCarRequest
             */
            public static fromObject(object: { [k: string]: any }): car.v1.CreateCarRequest;

            /**
             * Creates a plain object from a CreateCarRequest message. Also converts values to other types if specified.
             * @param message CreateCarRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: car.v1.CreateCarRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this CreateCarRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetCarRequest. */
        interface IGetCarRequest {

            /** GetCarRequest id */
            id?: (string|null);
        }

        /** Represents a GetCarRequest. */
        class GetCarRequest implements IGetCarRequest {

            /**
             * Constructs a new GetCarRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: car.v1.IGetCarRequest);

            /** GetCarRequest id. */
            public id: string;

            /**
             * Encodes the specified GetCarRequest message. Does not implicitly {@link car.v1.GetCarRequest.verify|verify} messages.
             * @param message GetCarRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: car.v1.IGetCarRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetCarRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetCarRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): car.v1.GetCarRequest;

            /**
             * Verifies a GetCarRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetCarRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetCarRequest
             */
            public static fromObject(object: { [k: string]: any }): car.v1.GetCarRequest;

            /**
             * Creates a plain object from a GetCarRequest message. Also converts values to other types if specified.
             * @param message GetCarRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: car.v1.GetCarRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetCarRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetCarsRequest. */
        interface IGetCarsRequest {
        }

        /** Represents a GetCarsRequest. */
        class GetCarsRequest implements IGetCarsRequest {

            /**
             * Constructs a new GetCarsRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: car.v1.IGetCarsRequest);

            /**
             * Encodes the specified GetCarsRequest message. Does not implicitly {@link car.v1.GetCarsRequest.verify|verify} messages.
             * @param message GetCarsRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: car.v1.IGetCarsRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetCarsRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetCarsRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): car.v1.GetCarsRequest;

            /**
             * Verifies a GetCarsRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetCarsRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetCarsRequest
             */
            public static fromObject(object: { [k: string]: any }): car.v1.GetCarsRequest;

            /**
             * Creates a plain object from a GetCarsRequest message. Also converts values to other types if specified.
             * @param message GetCarsRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: car.v1.GetCarsRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetCarsRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a GetCarsResponse. */
        interface IGetCarsResponse {

            /** GetCarsResponse cars */
            cars?: (car.v1.ICarEntity[]|null);
        }

        /** Represents a GetCarsResponse. */
        class GetCarsResponse implements IGetCarsResponse {

            /**
             * Constructs a new GetCarsResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: car.v1.IGetCarsResponse);

            /** GetCarsResponse cars. */
            public cars: car.v1.ICarEntity[];

            /**
             * Encodes the specified GetCarsResponse message. Does not implicitly {@link car.v1.GetCarsResponse.verify|verify} messages.
             * @param message GetCarsResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: car.v1.IGetCarsResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a GetCarsResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns GetCarsResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): car.v1.GetCarsResponse;

            /**
             * Verifies a GetCarsResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a GetCarsResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns GetCarsResponse
             */
            public static fromObject(object: { [k: string]: any }): car.v1.GetCarsResponse;

            /**
             * Creates a plain object from a GetCarsResponse message. Also converts values to other types if specified.
             * @param message GetCarsResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: car.v1.GetCarsResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this GetCarsResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a LockCarRequest. */
        interface ILockCarRequest {

            /** LockCarRequest id */
            id?: (string|null);
        }

        /** Represents a LockCarRequest. */
        class LockCarRequest implements ILockCarRequest {

            /**
             * Constructs a new LockCarRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: car.v1.ILockCarRequest);

            /** LockCarRequest id. */
            public id: string;

            /**
             * Encodes the specified LockCarRequest message. Does not implicitly {@link car.v1.LockCarRequest.verify|verify} messages.
             * @param message LockCarRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: car.v1.ILockCarRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a LockCarRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LockCarRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): car.v1.LockCarRequest;

            /**
             * Verifies a LockCarRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a LockCarRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LockCarRequest
             */
            public static fromObject(object: { [k: string]: any }): car.v1.LockCarRequest;

            /**
             * Creates a plain object from a LockCarRequest message. Also converts values to other types if specified.
             * @param message LockCarRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: car.v1.LockCarRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LockCarRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of a LockCarResponse. */
        interface ILockCarResponse {
        }

        /** Represents a LockCarResponse. */
        class LockCarResponse implements ILockCarResponse {

            /**
             * Constructs a new LockCarResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: car.v1.ILockCarResponse);

            /**
             * Encodes the specified LockCarResponse message. Does not implicitly {@link car.v1.LockCarResponse.verify|verify} messages.
             * @param message LockCarResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: car.v1.ILockCarResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a LockCarResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns LockCarResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): car.v1.LockCarResponse;

            /**
             * Verifies a LockCarResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a LockCarResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns LockCarResponse
             */
            public static fromObject(object: { [k: string]: any }): car.v1.LockCarResponse;

            /**
             * Creates a plain object from a LockCarResponse message. Also converts values to other types if specified.
             * @param message LockCarResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: car.v1.LockCarResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this LockCarResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an UnlockCarRequest. */
        interface IUnlockCarRequest {

            /** UnlockCarRequest id */
            id?: (string|null);

            /** UnlockCarRequest driver */
            driver?: (car.v1.IDriver|null);

            /** UnlockCarRequest tripId */
            tripId?: (string|null);
        }

        /** Represents an UnlockCarRequest. */
        class UnlockCarRequest implements IUnlockCarRequest {

            /**
             * Constructs a new UnlockCarRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: car.v1.IUnlockCarRequest);

            /** UnlockCarRequest id. */
            public id: string;

            /** UnlockCarRequest driver. */
            public driver?: (car.v1.IDriver|null);

            /** UnlockCarRequest tripId. */
            public tripId: string;

            /**
             * Encodes the specified UnlockCarRequest message. Does not implicitly {@link car.v1.UnlockCarRequest.verify|verify} messages.
             * @param message UnlockCarRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: car.v1.IUnlockCarRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an UnlockCarRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UnlockCarRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): car.v1.UnlockCarRequest;

            /**
             * Verifies an UnlockCarRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an UnlockCarRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UnlockCarRequest
             */
            public static fromObject(object: { [k: string]: any }): car.v1.UnlockCarRequest;

            /**
             * Creates a plain object from an UnlockCarRequest message. Also converts values to other types if specified.
             * @param message UnlockCarRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: car.v1.UnlockCarRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UnlockCarRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an UnlockCarResponse. */
        interface IUnlockCarResponse {
        }

        /** Represents an UnlockCarResponse. */
        class UnlockCarResponse implements IUnlockCarResponse {

            /**
             * Constructs a new UnlockCarResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: car.v1.IUnlockCarResponse);

            /**
             * Encodes the specified UnlockCarResponse message. Does not implicitly {@link car.v1.UnlockCarResponse.verify|verify} messages.
             * @param message UnlockCarResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: car.v1.IUnlockCarResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an UnlockCarResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UnlockCarResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): car.v1.UnlockCarResponse;

            /**
             * Verifies an UnlockCarResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an UnlockCarResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UnlockCarResponse
             */
            public static fromObject(object: { [k: string]: any }): car.v1.UnlockCarResponse;

            /**
             * Creates a plain object from an UnlockCarResponse message. Also converts values to other types if specified.
             * @param message UnlockCarResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: car.v1.UnlockCarResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UnlockCarResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an UpdateCarRequest. */
        interface IUpdateCarRequest {

            /** UpdateCarRequest id */
            id?: (string|null);

            /** UpdateCarRequest status */
            status?: (car.v1.CarStatus|null);

            /** UpdateCarRequest position */
            position?: (car.v1.ILocation|null);
        }

        /** Represents an UpdateCarRequest. */
        class UpdateCarRequest implements IUpdateCarRequest {

            /**
             * Constructs a new UpdateCarRequest.
             * @param [properties] Properties to set
             */
            constructor(properties?: car.v1.IUpdateCarRequest);

            /** UpdateCarRequest id. */
            public id: string;

            /** UpdateCarRequest status. */
            public status: car.v1.CarStatus;

            /** UpdateCarRequest position. */
            public position?: (car.v1.ILocation|null);

            /**
             * Encodes the specified UpdateCarRequest message. Does not implicitly {@link car.v1.UpdateCarRequest.verify|verify} messages.
             * @param message UpdateCarRequest message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: car.v1.IUpdateCarRequest, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an UpdateCarRequest message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UpdateCarRequest
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): car.v1.UpdateCarRequest;

            /**
             * Verifies an UpdateCarRequest message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an UpdateCarRequest message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UpdateCarRequest
             */
            public static fromObject(object: { [k: string]: any }): car.v1.UpdateCarRequest;

            /**
             * Creates a plain object from an UpdateCarRequest message. Also converts values to other types if specified.
             * @param message UpdateCarRequest
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: car.v1.UpdateCarRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UpdateCarRequest to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Properties of an UpdateCarResponse. */
        interface IUpdateCarResponse {
        }

        /** Represents an UpdateCarResponse. */
        class UpdateCarResponse implements IUpdateCarResponse {

            /**
             * Constructs a new UpdateCarResponse.
             * @param [properties] Properties to set
             */
            constructor(properties?: car.v1.IUpdateCarResponse);

            /**
             * Encodes the specified UpdateCarResponse message. Does not implicitly {@link car.v1.UpdateCarResponse.verify|verify} messages.
             * @param message UpdateCarResponse message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: car.v1.IUpdateCarResponse, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes an UpdateCarResponse message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns UpdateCarResponse
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): car.v1.UpdateCarResponse;

            /**
             * Verifies an UpdateCarResponse message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates an UpdateCarResponse message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns UpdateCarResponse
             */
            public static fromObject(object: { [k: string]: any }): car.v1.UpdateCarResponse;

            /**
             * Creates a plain object from an UpdateCarResponse message. Also converts values to other types if specified.
             * @param message UpdateCarResponse
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: car.v1.UpdateCarResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this UpdateCarResponse to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };
        }

        /** Represents a CarService */
        class CarService extends $protobuf.rpc.Service {

            /**
             * Constructs a new CarService service.
             * @param rpcImpl RPC implementation
             * @param [requestDelimited=false] Whether requests are length-delimited
             * @param [responseDelimited=false] Whether responses are length-delimited
             */
            constructor(rpcImpl: $protobuf.RPCImpl, requestDelimited?: boolean, responseDelimited?: boolean);

            /**
             * Calls CreateCar.
             * @param request CreateCarRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and CarEntity
             */
            public createCar(request: car.v1.ICreateCarRequest, callback: car.v1.CarService.CreateCarCallback): void;

            /**
             * Calls CreateCar.
             * @param request CreateCarRequest message or plain object
             * @returns Promise
             */
            public createCar(request: car.v1.ICreateCarRequest): Promise<car.v1.CarEntity>;

            /**
             * Calls GetCar.
             * @param request GetCarRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and Car
             */
            public getCar(request: car.v1.IGetCarRequest, callback: car.v1.CarService.GetCarCallback): void;

            /**
             * Calls GetCar.
             * @param request GetCarRequest message or plain object
             * @returns Promise
             */
            public getCar(request: car.v1.IGetCarRequest): Promise<car.v1.Car>;

            /**
             * Calls GetCars.
             * @param request GetCarsRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and GetCarsResponse
             */
            public getCars(request: car.v1.IGetCarsRequest, callback: car.v1.CarService.GetCarsCallback): void;

            /**
             * Calls GetCars.
             * @param request GetCarsRequest message or plain object
             * @returns Promise
             */
            public getCars(request: car.v1.IGetCarsRequest): Promise<car.v1.GetCarsResponse>;

            /**
             * Calls LockCar.
             * @param request LockCarRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and LockCarResponse
             */
            public lockCar(request: car.v1.ILockCarRequest, callback: car.v1.CarService.LockCarCallback): void;

            /**
             * Calls LockCar.
             * @param request LockCarRequest message or plain object
             * @returns Promise
             */
            public lockCar(request: car.v1.ILockCarRequest): Promise<car.v1.LockCarResponse>;

            /**
             * Calls UnlockCar.
             * @param request UnlockCarRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and UnlockCarResponse
             */
            public unlockCar(request: car.v1.IUnlockCarRequest, callback: car.v1.CarService.UnlockCarCallback): void;

            /**
             * Calls UnlockCar.
             * @param request UnlockCarRequest message or plain object
             * @returns Promise
             */
            public unlockCar(request: car.v1.IUnlockCarRequest): Promise<car.v1.UnlockCarResponse>;

            /**
             * Calls UpdateCar.
             * @param request UpdateCarRequest message or plain object
             * @param callback Node-style callback called with the error, if any, and UpdateCarResponse
             */
            public updateCar(request: car.v1.IUpdateCarRequest, callback: car.v1.CarService.UpdateCarCallback): void;

            /**
             * Calls UpdateCar.
             * @param request UpdateCarRequest message or plain object
             * @returns Promise
             */
            public updateCar(request: car.v1.IUpdateCarRequest): Promise<car.v1.UpdateCarResponse>;
        }

        namespace CarService {

            /**
             * Callback as used by {@link car.v1.CarService#createCar}.
             * @param error Error, if any
             * @param [response] CarEntity
             */
            type CreateCarCallback = (error: (Error|null), response?: car.v1.CarEntity) => void;

            /**
             * Callback as used by {@link car.v1.CarService#getCar}.
             * @param error Error, if any
             * @param [response] Car
             */
            type GetCarCallback = (error: (Error|null), response?: car.v1.Car) => void;

            /**
             * Callback as used by {@link car.v1.CarService#getCars}.
             * @param error Error, if any
             * @param [response] GetCarsResponse
             */
            type GetCarsCallback = (error: (Error|null), response?: car.v1.GetCarsResponse) => void;

            /**
             * Callback as used by {@link car.v1.CarService#lockCar}.
             * @param error Error, if any
             * @param [response] LockCarResponse
             */
            type LockCarCallback = (error: (Error|null), response?: car.v1.LockCarResponse) => void;

            /**
             * Callback as used by {@link car.v1.CarService#unlockCar}.
             * @param error Error, if any
             * @param [response] UnlockCarResponse
             */
            type UnlockCarCallback = (error: (Error|null), response?: car.v1.UnlockCarResponse) => void;

            /**
             * Callback as used by {@link car.v1.CarService#updateCar}.
             * @param error Error, if any
             * @param [response] UpdateCarResponse
             */
            type UpdateCarCallback = (error: (Error|null), response?: car.v1.UpdateCarResponse) => void;
        }
    }
}
