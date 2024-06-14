import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace ciphel_io. */
export namespace ciphel_io {
	/** PlayerSide enum. */
	enum PlayerSide {
		DEFAULT = 0,
		P1 = 1,
		P2 = 2,
	}

	/** Properties of a SrcCode. */
	interface ISrcCode {
		/** SrcCode content */
		content?: string | null;

		/** SrcCode side */
		side?: ciphel_io.PlayerSide | null;
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
		public static create(
			properties?: ciphel_io.ISrcCode
		): ciphel_io.SrcCode;

		/**
		 * Encodes the specified SrcCode message. Does not implicitly {@link ciphel_io.SrcCode.verify|verify} messages.
		 * @param message SrcCode message or plain object to encode
		 * @param [writer] Writer to encode to
		 * @returns Writer
		 */
		public static encode(
			message: ciphel_io.ISrcCode,
			writer?: $protobuf.Writer
		): $protobuf.Writer;

		/**
		 * Encodes the specified SrcCode message, length delimited. Does not implicitly {@link ciphel_io.SrcCode.verify|verify} messages.
		 * @param message SrcCode message or plain object to encode
		 * @param [writer] Writer to encode to
		 * @returns Writer
		 */
		public static encodeDelimited(
			message: ciphel_io.ISrcCode,
			writer?: $protobuf.Writer
		): $protobuf.Writer;

		/**
		 * Decodes a SrcCode message from the specified reader or buffer.
		 * @param reader Reader or buffer to decode from
		 * @param [length] Message length if known beforehand
		 * @returns SrcCode
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decode(
			reader: $protobuf.Reader | Uint8Array,
			length?: number
		): ciphel_io.SrcCode;

		/**
		 * Decodes a SrcCode message from the specified reader or buffer, length delimited.
		 * @param reader Reader or buffer to decode from
		 * @returns SrcCode
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decodeDelimited(
			reader: $protobuf.Reader | Uint8Array
		): ciphel_io.SrcCode;

		/**
		 * Verifies a SrcCode message.
		 * @param message Plain object to verify
		 * @returns `null` if valid, otherwise the reason why it is not
		 */
		public static verify(message: { [k: string]: any }): string | null;

		/**
		 * Creates a SrcCode message from a plain object. Also converts values to their respective internal types.
		 * @param object Plain object
		 * @returns SrcCode
		 */
		public static fromObject(object: {
			[k: string]: any;
		}): ciphel_io.SrcCode;

		/**
		 * Creates a plain object from a SrcCode message. Also converts values to other types if specified.
		 * @param message SrcCode
		 * @param [options] Conversion options
		 * @returns Plain object
		 */
		public static toObject(
			message: ciphel_io.SrcCode,
			options?: $protobuf.IConversionOptions
		): { [k: string]: any };

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
		cmd?: string | null;

		/** Command args */
		args?: string[] | null;

		/** Command src */
		src?: ciphel_io.ISrcCode | null;
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
		public src?: ciphel_io.ISrcCode | null;

		/** Command _src. */
		public _src?: "src";

		/**
		 * Creates a new Command instance using the specified properties.
		 * @param [properties] Properties to set
		 * @returns Command instance
		 */
		public static create(
			properties?: ciphel_io.ICommand
		): ciphel_io.Command;

		/**
		 * Encodes the specified Command message. Does not implicitly {@link ciphel_io.Command.verify|verify} messages.
		 * @param message Command message or plain object to encode
		 * @param [writer] Writer to encode to
		 * @returns Writer
		 */
		public static encode(
			message: ciphel_io.ICommand,
			writer?: $protobuf.Writer
		): $protobuf.Writer;

		/**
		 * Encodes the specified Command message, length delimited. Does not implicitly {@link ciphel_io.Command.verify|verify} messages.
		 * @param message Command message or plain object to encode
		 * @param [writer] Writer to encode to
		 * @returns Writer
		 */
		public static encodeDelimited(
			message: ciphel_io.ICommand,
			writer?: $protobuf.Writer
		): $protobuf.Writer;

		/**
		 * Decodes a Command message from the specified reader or buffer.
		 * @param reader Reader or buffer to decode from
		 * @param [length] Message length if known beforehand
		 * @returns Command
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decode(
			reader: $protobuf.Reader | Uint8Array,
			length?: number
		): ciphel_io.Command;

		/**
		 * Decodes a Command message from the specified reader or buffer, length delimited.
		 * @param reader Reader or buffer to decode from
		 * @returns Command
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decodeDelimited(
			reader: $protobuf.Reader | Uint8Array
		): ciphel_io.Command;

		/**
		 * Verifies a Command message.
		 * @param message Plain object to verify
		 * @returns `null` if valid, otherwise the reason why it is not
		 */
		public static verify(message: { [k: string]: any }): string | null;

		/**
		 * Creates a Command message from a plain object. Also converts values to their respective internal types.
		 * @param object Plain object
		 * @returns Command
		 */
		public static fromObject(object: {
			[k: string]: any;
		}): ciphel_io.Command;

		/**
		 * Creates a plain object from a Command message. Also converts values to other types if specified.
		 * @param message Command
		 * @param [options] Conversion options
		 * @returns Plain object
		 */
		public static toObject(
			message: ciphel_io.Command,
			options?: $protobuf.IConversionOptions
		): { [k: string]: any };

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
		content?: string | null;
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
		public static encode(
			message: ciphel_io.IStdOut,
			writer?: $protobuf.Writer
		): $protobuf.Writer;

		/**
		 * Encodes the specified StdOut message, length delimited. Does not implicitly {@link ciphel_io.StdOut.verify|verify} messages.
		 * @param message StdOut message or plain object to encode
		 * @param [writer] Writer to encode to
		 * @returns Writer
		 */
		public static encodeDelimited(
			message: ciphel_io.IStdOut,
			writer?: $protobuf.Writer
		): $protobuf.Writer;

		/**
		 * Decodes a StdOut message from the specified reader or buffer.
		 * @param reader Reader or buffer to decode from
		 * @param [length] Message length if known beforehand
		 * @returns StdOut
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decode(
			reader: $protobuf.Reader | Uint8Array,
			length?: number
		): ciphel_io.StdOut;

		/**
		 * Decodes a StdOut message from the specified reader or buffer, length delimited.
		 * @param reader Reader or buffer to decode from
		 * @returns StdOut
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decodeDelimited(
			reader: $protobuf.Reader | Uint8Array
		): ciphel_io.StdOut;

		/**
		 * Verifies a StdOut message.
		 * @param message Plain object to verify
		 * @returns `null` if valid, otherwise the reason why it is not
		 */
		public static verify(message: { [k: string]: any }): string | null;

		/**
		 * Creates a StdOut message from a plain object. Also converts values to their respective internal types.
		 * @param object Plain object
		 * @returns StdOut
		 */
		public static fromObject(object: {
			[k: string]: any;
		}): ciphel_io.StdOut;

		/**
		 * Creates a plain object from a StdOut message. Also converts values to other types if specified.
		 * @param message StdOut
		 * @param [options] Conversion options
		 * @returns Plain object
		 */
		public static toObject(
			message: ciphel_io.StdOut,
			options?: $protobuf.IConversionOptions
		): { [k: string]: any };

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
		content?: string | null;
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
		public static encode(
			message: ciphel_io.IStdErr,
			writer?: $protobuf.Writer
		): $protobuf.Writer;

		/**
		 * Encodes the specified StdErr message, length delimited. Does not implicitly {@link ciphel_io.StdErr.verify|verify} messages.
		 * @param message StdErr message or plain object to encode
		 * @param [writer] Writer to encode to
		 * @returns Writer
		 */
		public static encodeDelimited(
			message: ciphel_io.IStdErr,
			writer?: $protobuf.Writer
		): $protobuf.Writer;

		/**
		 * Decodes a StdErr message from the specified reader or buffer.
		 * @param reader Reader or buffer to decode from
		 * @param [length] Message length if known beforehand
		 * @returns StdErr
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decode(
			reader: $protobuf.Reader | Uint8Array,
			length?: number
		): ciphel_io.StdErr;

		/**
		 * Decodes a StdErr message from the specified reader or buffer, length delimited.
		 * @param reader Reader or buffer to decode from
		 * @returns StdErr
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decodeDelimited(
			reader: $protobuf.Reader | Uint8Array
		): ciphel_io.StdErr;

		/**
		 * Verifies a StdErr message.
		 * @param message Plain object to verify
		 * @returns `null` if valid, otherwise the reason why it is not
		 */
		public static verify(message: { [k: string]: any }): string | null;

		/**
		 * Creates a StdErr message from a plain object. Also converts values to their respective internal types.
		 * @param object Plain object
		 * @returns StdErr
		 */
		public static fromObject(object: {
			[k: string]: any;
		}): ciphel_io.StdErr;

		/**
		 * Creates a plain object from a StdErr message. Also converts values to other types if specified.
		 * @param message StdErr
		 * @param [options] Conversion options
		 * @returns Plain object
		 */
		public static toObject(
			message: ciphel_io.StdErr,
			options?: $protobuf.IConversionOptions
		): { [k: string]: any };

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
		content?: string | null;
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
		public static encode(
			message: ciphel_io.IStdIn,
			writer?: $protobuf.Writer
		): $protobuf.Writer;

		/**
		 * Encodes the specified StdIn message, length delimited. Does not implicitly {@link ciphel_io.StdIn.verify|verify} messages.
		 * @param message StdIn message or plain object to encode
		 * @param [writer] Writer to encode to
		 * @returns Writer
		 */
		public static encodeDelimited(
			message: ciphel_io.IStdIn,
			writer?: $protobuf.Writer
		): $protobuf.Writer;

		/**
		 * Decodes a StdIn message from the specified reader or buffer.
		 * @param reader Reader or buffer to decode from
		 * @param [length] Message length if known beforehand
		 * @returns StdIn
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decode(
			reader: $protobuf.Reader | Uint8Array,
			length?: number
		): ciphel_io.StdIn;

		/**
		 * Decodes a StdIn message from the specified reader or buffer, length delimited.
		 * @param reader Reader or buffer to decode from
		 * @returns StdIn
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decodeDelimited(
			reader: $protobuf.Reader | Uint8Array
		): ciphel_io.StdIn;

		/**
		 * Verifies a StdIn message.
		 * @param message Plain object to verify
		 * @returns `null` if valid, otherwise the reason why it is not
		 */
		public static verify(message: { [k: string]: any }): string | null;

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
		public static toObject(
			message: ciphel_io.StdIn,
			options?: $protobuf.IConversionOptions
		): { [k: string]: any };

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

	/** Properties of a CiphelRequest. */
	interface ICiphelRequest {
		/** CiphelRequest input */
		input?: ciphel_io.CiphelRequest.IInput | null;

		/** CiphelRequest commited */
		commited?: ciphel_io.CiphelRequest.ICommited | null;

		/** CiphelRequest reverted */
		reverted?: ciphel_io.CiphelRequest.IReverted | null;

		/** CiphelRequest pushed */
		pushed?: ciphel_io.CiphelRequest.IPushed | null;

		/** CiphelRequest spawnThread */
		spawnThread?: ciphel_io.CiphelRequest.ISpawn | null;

		/** CiphelRequest closeThread */
		closeThread?: ciphel_io.CiphelRequest.IClose | null;
	}

	/** Represents a CiphelRequest. */
	class CiphelRequest implements ICiphelRequest {
		/**
		 * Constructs a new CiphelRequest.
		 * @param [properties] Properties to set
		 */
		constructor(properties?: ciphel_io.ICiphelRequest);

		/** CiphelRequest input. */
		public input?: ciphel_io.CiphelRequest.IInput | null;

		/** CiphelRequest commited. */
		public commited?: ciphel_io.CiphelRequest.ICommited | null;

		/** CiphelRequest reverted. */
		public reverted?: ciphel_io.CiphelRequest.IReverted | null;

		/** CiphelRequest pushed. */
		public pushed?: ciphel_io.CiphelRequest.IPushed | null;

		/** CiphelRequest spawnThread. */
		public spawnThread?: ciphel_io.CiphelRequest.ISpawn | null;

		/** CiphelRequest closeThread. */
		public closeThread?: ciphel_io.CiphelRequest.IClose | null;

		/** CiphelRequest requestType. */
		public requestType?:
			| "input"
			| "commited"
			| "reverted"
			| "pushed"
			| "spawnThread"
			| "closeThread";

		/**
		 * Creates a new CiphelRequest instance using the specified properties.
		 * @param [properties] Properties to set
		 * @returns CiphelRequest instance
		 */
		public static create(
			properties?: ciphel_io.ICiphelRequest
		): ciphel_io.CiphelRequest;

		/**
		 * Encodes the specified CiphelRequest message. Does not implicitly {@link ciphel_io.CiphelRequest.verify|verify} messages.
		 * @param message CiphelRequest message or plain object to encode
		 * @param [writer] Writer to encode to
		 * @returns Writer
		 */
		public static encode(
			message: ciphel_io.ICiphelRequest,
			writer?: $protobuf.Writer
		): $protobuf.Writer;

		/**
		 * Encodes the specified CiphelRequest message, length delimited. Does not implicitly {@link ciphel_io.CiphelRequest.verify|verify} messages.
		 * @param message CiphelRequest message or plain object to encode
		 * @param [writer] Writer to encode to
		 * @returns Writer
		 */
		public static encodeDelimited(
			message: ciphel_io.ICiphelRequest,
			writer?: $protobuf.Writer
		): $protobuf.Writer;

		/**
		 * Decodes a CiphelRequest message from the specified reader or buffer.
		 * @param reader Reader or buffer to decode from
		 * @param [length] Message length if known beforehand
		 * @returns CiphelRequest
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decode(
			reader: $protobuf.Reader | Uint8Array,
			length?: number
		): ciphel_io.CiphelRequest;

		/**
		 * Decodes a CiphelRequest message from the specified reader or buffer, length delimited.
		 * @param reader Reader or buffer to decode from
		 * @returns CiphelRequest
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decodeDelimited(
			reader: $protobuf.Reader | Uint8Array
		): ciphel_io.CiphelRequest;

		/**
		 * Verifies a CiphelRequest message.
		 * @param message Plain object to verify
		 * @returns `null` if valid, otherwise the reason why it is not
		 */
		public static verify(message: { [k: string]: any }): string | null;

		/**
		 * Creates a CiphelRequest message from a plain object. Also converts values to their respective internal types.
		 * @param object Plain object
		 * @returns CiphelRequest
		 */
		public static fromObject(object: {
			[k: string]: any;
		}): ciphel_io.CiphelRequest;

		/**
		 * Creates a plain object from a CiphelRequest message. Also converts values to other types if specified.
		 * @param message CiphelRequest
		 * @param [options] Conversion options
		 * @returns Plain object
		 */
		public static toObject(
			message: ciphel_io.CiphelRequest,
			options?: $protobuf.IConversionOptions
		): { [k: string]: any };

		/**
		 * Converts this CiphelRequest to JSON.
		 * @returns JSON object
		 */
		public toJSON(): { [k: string]: any };

		/**
		 * Gets the default type url for CiphelRequest
		 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns The default type url
		 */
		public static getTypeUrl(typeUrlPrefix?: string): string;
	}

	namespace CiphelRequest {
		/** Properties of an Input. */
		interface IInput {}

		/** Represents an Input. */
		class Input implements IInput {
			/**
			 * Constructs a new Input.
			 * @param [properties] Properties to set
			 */
			constructor(properties?: ciphel_io.CiphelRequest.IInput);

			/**
			 * Creates a new Input instance using the specified properties.
			 * @param [properties] Properties to set
			 * @returns Input instance
			 */
			public static create(
				properties?: ciphel_io.CiphelRequest.IInput
			): ciphel_io.CiphelRequest.Input;

			/**
			 * Encodes the specified Input message. Does not implicitly {@link ciphel_io.CiphelRequest.Input.verify|verify} messages.
			 * @param message Input message or plain object to encode
			 * @param [writer] Writer to encode to
			 * @returns Writer
			 */
			public static encode(
				message: ciphel_io.CiphelRequest.IInput,
				writer?: $protobuf.Writer
			): $protobuf.Writer;

			/**
			 * Encodes the specified Input message, length delimited. Does not implicitly {@link ciphel_io.CiphelRequest.Input.verify|verify} messages.
			 * @param message Input message or plain object to encode
			 * @param [writer] Writer to encode to
			 * @returns Writer
			 */
			public static encodeDelimited(
				message: ciphel_io.CiphelRequest.IInput,
				writer?: $protobuf.Writer
			): $protobuf.Writer;

			/**
			 * Decodes an Input message from the specified reader or buffer.
			 * @param reader Reader or buffer to decode from
			 * @param [length] Message length if known beforehand
			 * @returns Input
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			public static decode(
				reader: $protobuf.Reader | Uint8Array,
				length?: number
			): ciphel_io.CiphelRequest.Input;

			/**
			 * Decodes an Input message from the specified reader or buffer, length delimited.
			 * @param reader Reader or buffer to decode from
			 * @returns Input
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			public static decodeDelimited(
				reader: $protobuf.Reader | Uint8Array
			): ciphel_io.CiphelRequest.Input;

			/**
			 * Verifies an Input message.
			 * @param message Plain object to verify
			 * @returns `null` if valid, otherwise the reason why it is not
			 */
			public static verify(message: { [k: string]: any }): string | null;

			/**
			 * Creates an Input message from a plain object. Also converts values to their respective internal types.
			 * @param object Plain object
			 * @returns Input
			 */
			public static fromObject(object: {
				[k: string]: any;
			}): ciphel_io.CiphelRequest.Input;

			/**
			 * Creates a plain object from an Input message. Also converts values to other types if specified.
			 * @param message Input
			 * @param [options] Conversion options
			 * @returns Plain object
			 */
			public static toObject(
				message: ciphel_io.CiphelRequest.Input,
				options?: $protobuf.IConversionOptions
			): { [k: string]: any };

			/**
			 * Converts this Input to JSON.
			 * @returns JSON object
			 */
			public toJSON(): { [k: string]: any };

			/**
			 * Gets the default type url for Input
			 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
			 * @returns The default type url
			 */
			public static getTypeUrl(typeUrlPrefix?: string): string;
		}

		/** Properties of a Commited. */
		interface ICommited {}

		/** Represents a Commited. */
		class Commited implements ICommited {
			/**
			 * Constructs a new Commited.
			 * @param [properties] Properties to set
			 */
			constructor(properties?: ciphel_io.CiphelRequest.ICommited);

			/**
			 * Creates a new Commited instance using the specified properties.
			 * @param [properties] Properties to set
			 * @returns Commited instance
			 */
			public static create(
				properties?: ciphel_io.CiphelRequest.ICommited
			): ciphel_io.CiphelRequest.Commited;

			/**
			 * Encodes the specified Commited message. Does not implicitly {@link ciphel_io.CiphelRequest.Commited.verify|verify} messages.
			 * @param message Commited message or plain object to encode
			 * @param [writer] Writer to encode to
			 * @returns Writer
			 */
			public static encode(
				message: ciphel_io.CiphelRequest.ICommited,
				writer?: $protobuf.Writer
			): $protobuf.Writer;

			/**
			 * Encodes the specified Commited message, length delimited. Does not implicitly {@link ciphel_io.CiphelRequest.Commited.verify|verify} messages.
			 * @param message Commited message or plain object to encode
			 * @param [writer] Writer to encode to
			 * @returns Writer
			 */
			public static encodeDelimited(
				message: ciphel_io.CiphelRequest.ICommited,
				writer?: $protobuf.Writer
			): $protobuf.Writer;

			/**
			 * Decodes a Commited message from the specified reader or buffer.
			 * @param reader Reader or buffer to decode from
			 * @param [length] Message length if known beforehand
			 * @returns Commited
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			public static decode(
				reader: $protobuf.Reader | Uint8Array,
				length?: number
			): ciphel_io.CiphelRequest.Commited;

			/**
			 * Decodes a Commited message from the specified reader or buffer, length delimited.
			 * @param reader Reader or buffer to decode from
			 * @returns Commited
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			public static decodeDelimited(
				reader: $protobuf.Reader | Uint8Array
			): ciphel_io.CiphelRequest.Commited;

			/**
			 * Verifies a Commited message.
			 * @param message Plain object to verify
			 * @returns `null` if valid, otherwise the reason why it is not
			 */
			public static verify(message: { [k: string]: any }): string | null;

			/**
			 * Creates a Commited message from a plain object. Also converts values to their respective internal types.
			 * @param object Plain object
			 * @returns Commited
			 */
			public static fromObject(object: {
				[k: string]: any;
			}): ciphel_io.CiphelRequest.Commited;

			/**
			 * Creates a plain object from a Commited message. Also converts values to other types if specified.
			 * @param message Commited
			 * @param [options] Conversion options
			 * @returns Plain object
			 */
			public static toObject(
				message: ciphel_io.CiphelRequest.Commited,
				options?: $protobuf.IConversionOptions
			): { [k: string]: any };

			/**
			 * Converts this Commited to JSON.
			 * @returns JSON object
			 */
			public toJSON(): { [k: string]: any };

			/**
			 * Gets the default type url for Commited
			 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
			 * @returns The default type url
			 */
			public static getTypeUrl(typeUrlPrefix?: string): string;
		}

		/** Properties of a Reverted. */
		interface IReverted {}

		/** Represents a Reverted. */
		class Reverted implements IReverted {
			/**
			 * Constructs a new Reverted.
			 * @param [properties] Properties to set
			 */
			constructor(properties?: ciphel_io.CiphelRequest.IReverted);

			/**
			 * Creates a new Reverted instance using the specified properties.
			 * @param [properties] Properties to set
			 * @returns Reverted instance
			 */
			public static create(
				properties?: ciphel_io.CiphelRequest.IReverted
			): ciphel_io.CiphelRequest.Reverted;

			/**
			 * Encodes the specified Reverted message. Does not implicitly {@link ciphel_io.CiphelRequest.Reverted.verify|verify} messages.
			 * @param message Reverted message or plain object to encode
			 * @param [writer] Writer to encode to
			 * @returns Writer
			 */
			public static encode(
				message: ciphel_io.CiphelRequest.IReverted,
				writer?: $protobuf.Writer
			): $protobuf.Writer;

			/**
			 * Encodes the specified Reverted message, length delimited. Does not implicitly {@link ciphel_io.CiphelRequest.Reverted.verify|verify} messages.
			 * @param message Reverted message or plain object to encode
			 * @param [writer] Writer to encode to
			 * @returns Writer
			 */
			public static encodeDelimited(
				message: ciphel_io.CiphelRequest.IReverted,
				writer?: $protobuf.Writer
			): $protobuf.Writer;

			/**
			 * Decodes a Reverted message from the specified reader or buffer.
			 * @param reader Reader or buffer to decode from
			 * @param [length] Message length if known beforehand
			 * @returns Reverted
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			public static decode(
				reader: $protobuf.Reader | Uint8Array,
				length?: number
			): ciphel_io.CiphelRequest.Reverted;

			/**
			 * Decodes a Reverted message from the specified reader or buffer, length delimited.
			 * @param reader Reader or buffer to decode from
			 * @returns Reverted
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			public static decodeDelimited(
				reader: $protobuf.Reader | Uint8Array
			): ciphel_io.CiphelRequest.Reverted;

			/**
			 * Verifies a Reverted message.
			 * @param message Plain object to verify
			 * @returns `null` if valid, otherwise the reason why it is not
			 */
			public static verify(message: { [k: string]: any }): string | null;

			/**
			 * Creates a Reverted message from a plain object. Also converts values to their respective internal types.
			 * @param object Plain object
			 * @returns Reverted
			 */
			public static fromObject(object: {
				[k: string]: any;
			}): ciphel_io.CiphelRequest.Reverted;

			/**
			 * Creates a plain object from a Reverted message. Also converts values to other types if specified.
			 * @param message Reverted
			 * @param [options] Conversion options
			 * @returns Plain object
			 */
			public static toObject(
				message: ciphel_io.CiphelRequest.Reverted,
				options?: $protobuf.IConversionOptions
			): { [k: string]: any };

			/**
			 * Converts this Reverted to JSON.
			 * @returns JSON object
			 */
			public toJSON(): { [k: string]: any };

			/**
			 * Gets the default type url for Reverted
			 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
			 * @returns The default type url
			 */
			public static getTypeUrl(typeUrlPrefix?: string): string;
		}

		/** Properties of a Pushed. */
		interface IPushed {}

		/** Represents a Pushed. */
		class Pushed implements IPushed {
			/**
			 * Constructs a new Pushed.
			 * @param [properties] Properties to set
			 */
			constructor(properties?: ciphel_io.CiphelRequest.IPushed);

			/**
			 * Creates a new Pushed instance using the specified properties.
			 * @param [properties] Properties to set
			 * @returns Pushed instance
			 */
			public static create(
				properties?: ciphel_io.CiphelRequest.IPushed
			): ciphel_io.CiphelRequest.Pushed;

			/**
			 * Encodes the specified Pushed message. Does not implicitly {@link ciphel_io.CiphelRequest.Pushed.verify|verify} messages.
			 * @param message Pushed message or plain object to encode
			 * @param [writer] Writer to encode to
			 * @returns Writer
			 */
			public static encode(
				message: ciphel_io.CiphelRequest.IPushed,
				writer?: $protobuf.Writer
			): $protobuf.Writer;

			/**
			 * Encodes the specified Pushed message, length delimited. Does not implicitly {@link ciphel_io.CiphelRequest.Pushed.verify|verify} messages.
			 * @param message Pushed message or plain object to encode
			 * @param [writer] Writer to encode to
			 * @returns Writer
			 */
			public static encodeDelimited(
				message: ciphel_io.CiphelRequest.IPushed,
				writer?: $protobuf.Writer
			): $protobuf.Writer;

			/**
			 * Decodes a Pushed message from the specified reader or buffer.
			 * @param reader Reader or buffer to decode from
			 * @param [length] Message length if known beforehand
			 * @returns Pushed
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			public static decode(
				reader: $protobuf.Reader | Uint8Array,
				length?: number
			): ciphel_io.CiphelRequest.Pushed;

			/**
			 * Decodes a Pushed message from the specified reader or buffer, length delimited.
			 * @param reader Reader or buffer to decode from
			 * @returns Pushed
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			public static decodeDelimited(
				reader: $protobuf.Reader | Uint8Array
			): ciphel_io.CiphelRequest.Pushed;

			/**
			 * Verifies a Pushed message.
			 * @param message Plain object to verify
			 * @returns `null` if valid, otherwise the reason why it is not
			 */
			public static verify(message: { [k: string]: any }): string | null;

			/**
			 * Creates a Pushed message from a plain object. Also converts values to their respective internal types.
			 * @param object Plain object
			 * @returns Pushed
			 */
			public static fromObject(object: {
				[k: string]: any;
			}): ciphel_io.CiphelRequest.Pushed;

			/**
			 * Creates a plain object from a Pushed message. Also converts values to other types if specified.
			 * @param message Pushed
			 * @param [options] Conversion options
			 * @returns Plain object
			 */
			public static toObject(
				message: ciphel_io.CiphelRequest.Pushed,
				options?: $protobuf.IConversionOptions
			): { [k: string]: any };

			/**
			 * Converts this Pushed to JSON.
			 * @returns JSON object
			 */
			public toJSON(): { [k: string]: any };

			/**
			 * Gets the default type url for Pushed
			 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
			 * @returns The default type url
			 */
			public static getTypeUrl(typeUrlPrefix?: string): string;
		}

		/** Properties of a Spawn. */
		interface ISpawn {
			/** Spawn cursor */
			cursor?: number | null;
		}

		/** Represents a Spawn. */
		class Spawn implements ISpawn {
			/**
			 * Constructs a new Spawn.
			 * @param [properties] Properties to set
			 */
			constructor(properties?: ciphel_io.CiphelRequest.ISpawn);

			/** Spawn cursor. */
			public cursor: number;

			/**
			 * Creates a new Spawn instance using the specified properties.
			 * @param [properties] Properties to set
			 * @returns Spawn instance
			 */
			public static create(
				properties?: ciphel_io.CiphelRequest.ISpawn
			): ciphel_io.CiphelRequest.Spawn;

			/**
			 * Encodes the specified Spawn message. Does not implicitly {@link ciphel_io.CiphelRequest.Spawn.verify|verify} messages.
			 * @param message Spawn message or plain object to encode
			 * @param [writer] Writer to encode to
			 * @returns Writer
			 */
			public static encode(
				message: ciphel_io.CiphelRequest.ISpawn,
				writer?: $protobuf.Writer
			): $protobuf.Writer;

			/**
			 * Encodes the specified Spawn message, length delimited. Does not implicitly {@link ciphel_io.CiphelRequest.Spawn.verify|verify} messages.
			 * @param message Spawn message or plain object to encode
			 * @param [writer] Writer to encode to
			 * @returns Writer
			 */
			public static encodeDelimited(
				message: ciphel_io.CiphelRequest.ISpawn,
				writer?: $protobuf.Writer
			): $protobuf.Writer;

			/**
			 * Decodes a Spawn message from the specified reader or buffer.
			 * @param reader Reader or buffer to decode from
			 * @param [length] Message length if known beforehand
			 * @returns Spawn
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			public static decode(
				reader: $protobuf.Reader | Uint8Array,
				length?: number
			): ciphel_io.CiphelRequest.Spawn;

			/**
			 * Decodes a Spawn message from the specified reader or buffer, length delimited.
			 * @param reader Reader or buffer to decode from
			 * @returns Spawn
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			public static decodeDelimited(
				reader: $protobuf.Reader | Uint8Array
			): ciphel_io.CiphelRequest.Spawn;

			/**
			 * Verifies a Spawn message.
			 * @param message Plain object to verify
			 * @returns `null` if valid, otherwise the reason why it is not
			 */
			public static verify(message: { [k: string]: any }): string | null;

			/**
			 * Creates a Spawn message from a plain object. Also converts values to their respective internal types.
			 * @param object Plain object
			 * @returns Spawn
			 */
			public static fromObject(object: {
				[k: string]: any;
			}): ciphel_io.CiphelRequest.Spawn;

			/**
			 * Creates a plain object from a Spawn message. Also converts values to other types if specified.
			 * @param message Spawn
			 * @param [options] Conversion options
			 * @returns Plain object
			 */
			public static toObject(
				message: ciphel_io.CiphelRequest.Spawn,
				options?: $protobuf.IConversionOptions
			): { [k: string]: any };

			/**
			 * Converts this Spawn to JSON.
			 * @returns JSON object
			 */
			public toJSON(): { [k: string]: any };

			/**
			 * Gets the default type url for Spawn
			 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
			 * @returns The default type url
			 */
			public static getTypeUrl(typeUrlPrefix?: string): string;
		}

		/** Properties of a Close. */
		interface IClose {
			/** Close cursor */
			cursor?: number | null;
		}

		/** Represents a Close. */
		class Close implements IClose {
			/**
			 * Constructs a new Close.
			 * @param [properties] Properties to set
			 */
			constructor(properties?: ciphel_io.CiphelRequest.IClose);

			/** Close cursor. */
			public cursor: number;

			/**
			 * Creates a new Close instance using the specified properties.
			 * @param [properties] Properties to set
			 * @returns Close instance
			 */
			public static create(
				properties?: ciphel_io.CiphelRequest.IClose
			): ciphel_io.CiphelRequest.Close;

			/**
			 * Encodes the specified Close message. Does not implicitly {@link ciphel_io.CiphelRequest.Close.verify|verify} messages.
			 * @param message Close message or plain object to encode
			 * @param [writer] Writer to encode to
			 * @returns Writer
			 */
			public static encode(
				message: ciphel_io.CiphelRequest.IClose,
				writer?: $protobuf.Writer
			): $protobuf.Writer;

			/**
			 * Encodes the specified Close message, length delimited. Does not implicitly {@link ciphel_io.CiphelRequest.Close.verify|verify} messages.
			 * @param message Close message or plain object to encode
			 * @param [writer] Writer to encode to
			 * @returns Writer
			 */
			public static encodeDelimited(
				message: ciphel_io.CiphelRequest.IClose,
				writer?: $protobuf.Writer
			): $protobuf.Writer;

			/**
			 * Decodes a Close message from the specified reader or buffer.
			 * @param reader Reader or buffer to decode from
			 * @param [length] Message length if known beforehand
			 * @returns Close
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			public static decode(
				reader: $protobuf.Reader | Uint8Array,
				length?: number
			): ciphel_io.CiphelRequest.Close;

			/**
			 * Decodes a Close message from the specified reader or buffer, length delimited.
			 * @param reader Reader or buffer to decode from
			 * @returns Close
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			public static decodeDelimited(
				reader: $protobuf.Reader | Uint8Array
			): ciphel_io.CiphelRequest.Close;

			/**
			 * Verifies a Close message.
			 * @param message Plain object to verify
			 * @returns `null` if valid, otherwise the reason why it is not
			 */
			public static verify(message: { [k: string]: any }): string | null;

			/**
			 * Creates a Close message from a plain object. Also converts values to their respective internal types.
			 * @param object Plain object
			 * @returns Close
			 */
			public static fromObject(object: {
				[k: string]: any;
			}): ciphel_io.CiphelRequest.Close;

			/**
			 * Creates a plain object from a Close message. Also converts values to other types if specified.
			 * @param message Close
			 * @param [options] Conversion options
			 * @returns Plain object
			 */
			public static toObject(
				message: ciphel_io.CiphelRequest.Close,
				options?: $protobuf.IConversionOptions
			): { [k: string]: any };

			/**
			 * Converts this Close to JSON.
			 * @returns JSON object
			 */
			public toJSON(): { [k: string]: any };

			/**
			 * Gets the default type url for Close
			 * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
			 * @returns The default type url
			 */
			public static getTypeUrl(typeUrlPrefix?: string): string;
		}
	}

	/** Properties of a StdIO. */
	interface IStdIO {
		/** StdIO out */
		out?: ciphel_io.IStdOut | null;

		/** StdIO err */
		err?: ciphel_io.IStdErr | null;

		/** StdIO in */
		in?: ciphel_io.IStdIn | null;

		/** StdIO request */
		request?: ciphel_io.ICiphelRequest | null;

		/** StdIO command */
		command?: ciphel_io.ICommand | null;
	}

	/** Represents a StdIO. */
	class StdIO implements IStdIO {
		/**
		 * Constructs a new StdIO.
		 * @param [properties] Properties to set
		 */
		constructor(properties?: ciphel_io.IStdIO);

		/** StdIO out. */
		public out?: ciphel_io.IStdOut | null;

		/** StdIO err. */
		public err?: ciphel_io.IStdErr | null;

		/** StdIO in. */
		public in?: ciphel_io.IStdIn | null;

		/** StdIO request. */
		public request?: ciphel_io.ICiphelRequest | null;

		/** StdIO command. */
		public command?: ciphel_io.ICommand | null;

		/** StdIO stdType. */
		public stdType?: "out" | "err" | "in" | "request" | "command";

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
		public static encode(
			message: ciphel_io.IStdIO,
			writer?: $protobuf.Writer
		): $protobuf.Writer;

		/**
		 * Encodes the specified StdIO message, length delimited. Does not implicitly {@link ciphel_io.StdIO.verify|verify} messages.
		 * @param message StdIO message or plain object to encode
		 * @param [writer] Writer to encode to
		 * @returns Writer
		 */
		public static encodeDelimited(
			message: ciphel_io.IStdIO,
			writer?: $protobuf.Writer
		): $protobuf.Writer;

		/**
		 * Decodes a StdIO message from the specified reader or buffer.
		 * @param reader Reader or buffer to decode from
		 * @param [length] Message length if known beforehand
		 * @returns StdIO
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decode(
			reader: $protobuf.Reader | Uint8Array,
			length?: number
		): ciphel_io.StdIO;

		/**
		 * Decodes a StdIO message from the specified reader or buffer, length delimited.
		 * @param reader Reader or buffer to decode from
		 * @returns StdIO
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		public static decodeDelimited(
			reader: $protobuf.Reader | Uint8Array
		): ciphel_io.StdIO;

		/**
		 * Verifies a StdIO message.
		 * @param message Plain object to verify
		 * @returns `null` if valid, otherwise the reason why it is not
		 */
		public static verify(message: { [k: string]: any }): string | null;

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
		public static toObject(
			message: ciphel_io.StdIO,
			options?: $protobuf.IConversionOptions
		): { [k: string]: any };

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
