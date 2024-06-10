import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace ciphel_io. */
export namespace ciphel_io {

    /** PlayerSide enum. */
    enum PlayerSide {
        DEFAULT = 0,
        P1 = 1,
        P2 = 2
    }

    /** Properties of a SrcCode. */
    interface ISrcCode {

        /** SrcCode content */
        content?: (string|null);

        /** SrcCode side */
        side?: (ciphel_io.PlayerSide|null);
    }

    /** Represents a SrcCode. */
    class SrcCode implements ISrcCode {

        /**
         * Constructs a new SrcCode.
         * @param [properties] Properties to set
         */
        constructor(properties?: ciphel_io.ISrcCode);

        /** SrcCode content. */
        public content: string;

        /** SrcCode side. */
        public side: ciphel_io.PlayerSide;

        /**
         * Creates a new SrcCode instance using the specified properties.
         * @param [properties] Properties to set
         * @returns SrcCode instance
         */
        public static create(properties?: ciphel_io.ISrcCode): ciphel_io.SrcCode;

        /**
         * Encodes the specified SrcCode message. Does not implicitly {@link ciphel_io.SrcCode.verify|verify} messages.
         * @param message SrcCode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ciphel_io.ISrcCode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified SrcCode message, length delimited. Does not implicitly {@link ciphel_io.SrcCode.verify|verify} messages.
         * @param message SrcCode message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ciphel_io.ISrcCode, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a SrcCode message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns SrcCode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ciphel_io.SrcCode;

        /**
         * Decodes a SrcCode message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns SrcCode
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ciphel_io.SrcCode;

        /**
         * Verifies a SrcCode message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a SrcCode message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns SrcCode
         */
        public static fromObject(object: { [k: string]: any }): ciphel_io.SrcCode;

        /**
         * Creates a plain object from a SrcCode message. Also converts values to other types if specified.
         * @param message SrcCode
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ciphel_io.SrcCode, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this SrcCode to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for SrcCode
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a Command. */
    interface ICommand {

        /** Command cmd */
        cmd?: (string|null);

        /** Command args */
        args?: (string[]|null);

        /** Command src */
        src?: (ciphel_io.ISrcCode|null);
    }

    /** Represents a Command. */
    class Command implements ICommand {

        /**
         * Constructs a new Command.
         * @param [properties] Properties to set
         */
        constructor(properties?: ciphel_io.ICommand);

        /** Command cmd. */
        public cmd: string;

        /** Command args. */
        public args: string[];

        /** Command src. */
        public src?: (ciphel_io.ISrcCode|null);

        /** Command _src. */
        public _src?: "src";

        /**
         * Creates a new Command instance using the specified properties.
         * @param [properties] Properties to set
         * @returns Command instance
         */
        public static create(properties?: ciphel_io.ICommand): ciphel_io.Command;

        /**
         * Encodes the specified Command message. Does not implicitly {@link ciphel_io.Command.verify|verify} messages.
         * @param message Command message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ciphel_io.ICommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified Command message, length delimited. Does not implicitly {@link ciphel_io.Command.verify|verify} messages.
         * @param message Command message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ciphel_io.ICommand, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a Command message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns Command
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ciphel_io.Command;

        /**
         * Decodes a Command message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns Command
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ciphel_io.Command;

        /**
         * Verifies a Command message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a Command message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns Command
         */
        public static fromObject(object: { [k: string]: any }): ciphel_io.Command;

        /**
         * Creates a plain object from a Command message. Also converts values to other types if specified.
         * @param message Command
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ciphel_io.Command, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this Command to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for Command
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a StdOut. */
    interface IStdOut {

        /** StdOut content */
        content?: (string|null);
    }

    /** Represents a StdOut. */
    class StdOut implements IStdOut {

        /**
         * Constructs a new StdOut.
         * @param [properties] Properties to set
         */
        constructor(properties?: ciphel_io.IStdOut);

        /** StdOut content. */
        public content: string;

        /**
         * Creates a new StdOut instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StdOut instance
         */
        public static create(properties?: ciphel_io.IStdOut): ciphel_io.StdOut;

        /**
         * Encodes the specified StdOut message. Does not implicitly {@link ciphel_io.StdOut.verify|verify} messages.
         * @param message StdOut message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ciphel_io.IStdOut, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StdOut message, length delimited. Does not implicitly {@link ciphel_io.StdOut.verify|verify} messages.
         * @param message StdOut message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ciphel_io.IStdOut, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StdOut message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StdOut
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ciphel_io.StdOut;

        /**
         * Decodes a StdOut message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StdOut
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ciphel_io.StdOut;

        /**
         * Verifies a StdOut message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StdOut message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StdOut
         */
        public static fromObject(object: { [k: string]: any }): ciphel_io.StdOut;

        /**
         * Creates a plain object from a StdOut message. Also converts values to other types if specified.
         * @param message StdOut
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ciphel_io.StdOut, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StdOut to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for StdOut
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a StdErr. */
    interface IStdErr {

        /** StdErr content */
        content?: (string|null);
    }

    /** Represents a StdErr. */
    class StdErr implements IStdErr {

        /**
         * Constructs a new StdErr.
         * @param [properties] Properties to set
         */
        constructor(properties?: ciphel_io.IStdErr);

        /** StdErr content. */
        public content: string;

        /**
         * Creates a new StdErr instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StdErr instance
         */
        public static create(properties?: ciphel_io.IStdErr): ciphel_io.StdErr;

        /**
         * Encodes the specified StdErr message. Does not implicitly {@link ciphel_io.StdErr.verify|verify} messages.
         * @param message StdErr message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ciphel_io.IStdErr, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StdErr message, length delimited. Does not implicitly {@link ciphel_io.StdErr.verify|verify} messages.
         * @param message StdErr message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ciphel_io.IStdErr, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StdErr message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StdErr
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ciphel_io.StdErr;

        /**
         * Decodes a StdErr message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StdErr
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ciphel_io.StdErr;

        /**
         * Verifies a StdErr message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StdErr message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StdErr
         */
        public static fromObject(object: { [k: string]: any }): ciphel_io.StdErr;

        /**
         * Creates a plain object from a StdErr message. Also converts values to other types if specified.
         * @param message StdErr
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ciphel_io.StdErr, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StdErr to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for StdErr
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a StdIn. */
    interface IStdIn {

        /** StdIn content */
        content?: (string|null);
    }

    /** Represents a StdIn. */
    class StdIn implements IStdIn {

        /**
         * Constructs a new StdIn.
         * @param [properties] Properties to set
         */
        constructor(properties?: ciphel_io.IStdIn);

        /** StdIn content. */
        public content: string;

        /**
         * Creates a new StdIn instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StdIn instance
         */
        public static create(properties?: ciphel_io.IStdIn): ciphel_io.StdIn;

        /**
         * Encodes the specified StdIn message. Does not implicitly {@link ciphel_io.StdIn.verify|verify} messages.
         * @param message StdIn message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ciphel_io.IStdIn, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StdIn message, length delimited. Does not implicitly {@link ciphel_io.StdIn.verify|verify} messages.
         * @param message StdIn message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ciphel_io.IStdIn, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StdIn message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StdIn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ciphel_io.StdIn;

        /**
         * Decodes a StdIn message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StdIn
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ciphel_io.StdIn;

        /**
         * Verifies a StdIn message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StdIn message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StdIn
         */
        public static fromObject(object: { [k: string]: any }): ciphel_io.StdIn;

        /**
         * Creates a plain object from a StdIn message. Also converts values to other types if specified.
         * @param message StdIn
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ciphel_io.StdIn, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StdIn to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for StdIn
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a StdInRequest. */
    interface IStdInRequest {

        /** StdInRequest flag */
        flag?: (boolean|null);
    }

    /** Represents a StdInRequest. */
    class StdInRequest implements IStdInRequest {

        /**
         * Constructs a new StdInRequest.
         * @param [properties] Properties to set
         */
        constructor(properties?: ciphel_io.IStdInRequest);

        /** StdInRequest flag. */
        public flag: boolean;

        /**
         * Creates a new StdInRequest instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StdInRequest instance
         */
        public static create(properties?: ciphel_io.IStdInRequest): ciphel_io.StdInRequest;

        /**
         * Encodes the specified StdInRequest message. Does not implicitly {@link ciphel_io.StdInRequest.verify|verify} messages.
         * @param message StdInRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ciphel_io.IStdInRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StdInRequest message, length delimited. Does not implicitly {@link ciphel_io.StdInRequest.verify|verify} messages.
         * @param message StdInRequest message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ciphel_io.IStdInRequest, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StdInRequest message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StdInRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ciphel_io.StdInRequest;

        /**
         * Decodes a StdInRequest message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StdInRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ciphel_io.StdInRequest;

        /**
         * Verifies a StdInRequest message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StdInRequest message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StdInRequest
         */
        public static fromObject(object: { [k: string]: any }): ciphel_io.StdInRequest;

        /**
         * Creates a plain object from a StdInRequest message. Also converts values to other types if specified.
         * @param message StdInRequest
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ciphel_io.StdInRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StdInRequest to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for StdInRequest
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    /** Properties of a StdIO. */
    interface IStdIO {

        /** StdIO out */
        out?: (ciphel_io.IStdOut|null);

        /** StdIO err */
        err?: (ciphel_io.IStdErr|null);

        /** StdIO in */
        "in"?: (ciphel_io.IStdIn|null);

        /** StdIO inReq */
        inReq?: (ciphel_io.IStdInRequest|null);

        /** StdIO command */
        command?: (ciphel_io.ICommand|null);
    }

    /** Represents a StdIO. */
    class StdIO implements IStdIO {

        /**
         * Constructs a new StdIO.
         * @param [properties] Properties to set
         */
        constructor(properties?: ciphel_io.IStdIO);

        /** StdIO out. */
        public out?: (ciphel_io.IStdOut|null);

        /** StdIO err. */
        public err?: (ciphel_io.IStdErr|null);

        /** StdIO in. */
        public in?: (ciphel_io.IStdIn|null);

        /** StdIO inReq. */
        public inReq?: (ciphel_io.IStdInRequest|null);

        /** StdIO command. */
        public command?: (ciphel_io.ICommand|null);

        /** StdIO stdType. */
        public stdType?: ("out"|"err"|"in"|"inReq"|"command");

        /**
         * Creates a new StdIO instance using the specified properties.
         * @param [properties] Properties to set
         * @returns StdIO instance
         */
        public static create(properties?: ciphel_io.IStdIO): ciphel_io.StdIO;

        /**
         * Encodes the specified StdIO message. Does not implicitly {@link ciphel_io.StdIO.verify|verify} messages.
         * @param message StdIO message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: ciphel_io.IStdIO, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified StdIO message, length delimited. Does not implicitly {@link ciphel_io.StdIO.verify|verify} messages.
         * @param message StdIO message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: ciphel_io.IStdIO, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a StdIO message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns StdIO
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): ciphel_io.StdIO;

        /**
         * Decodes a StdIO message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns StdIO
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): ciphel_io.StdIO;

        /**
         * Verifies a StdIO message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a StdIO message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns StdIO
         */
        public static fromObject(object: { [k: string]: any }): ciphel_io.StdIO;

        /**
         * Creates a plain object from a StdIO message. Also converts values to other types if specified.
         * @param message StdIO
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: ciphel_io.StdIO, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this StdIO to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for StdIO
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }
}
