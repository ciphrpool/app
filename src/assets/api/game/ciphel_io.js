/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader,
	$Writer = $protobuf.Writer,
	$util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const ciphel_io = ($root.ciphel_io = (() => {
	/**
	 * Namespace ciphel_io.
	 * @exports ciphel_io
	 * @namespace
	 */
	const ciphel_io = {};

	/**
	 * PlayerSide enum.
	 * @name ciphel_io.PlayerSide
	 * @enum {number}
	 * @property {number} DEFAULT=0 DEFAULT value
	 * @property {number} P1=1 P1 value
	 * @property {number} P2=2 P2 value
	 */
	ciphel_io.PlayerSide = (function () {
		const valuesById = {},
			values = Object.create(valuesById);
		values[(valuesById[0] = "DEFAULT")] = 0;
		values[(valuesById[1] = "P1")] = 1;
		values[(valuesById[2] = "P2")] = 2;
		return values;
	})();

	ciphel_io.SrcCode = (function () {
		/**
		 * Properties of a SrcCode.
		 * @memberof ciphel_io
		 * @interface ISrcCode
		 * @property {string|null} [content] SrcCode content
		 * @property {ciphel_io.PlayerSide|null} [side] SrcCode side
		 */

		/**
		 * Constructs a new SrcCode.
		 * @memberof ciphel_io
		 * @classdesc Represents a SrcCode.
		 * @implements ISrcCode
		 * @constructor
		 * @param {ciphel_io.ISrcCode=} [properties] Properties to set
		 */
		function SrcCode(properties) {
			if (properties)
				for (
					let keys = Object.keys(properties), i = 0;
					i < keys.length;
					++i
				)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * SrcCode content.
		 * @member {string} content
		 * @memberof ciphel_io.SrcCode
		 * @instance
		 */
		SrcCode.prototype.content = "";

		/**
		 * SrcCode side.
		 * @member {ciphel_io.PlayerSide} side
		 * @memberof ciphel_io.SrcCode
		 * @instance
		 */
		SrcCode.prototype.side = 0;

		/**
		 * Creates a new SrcCode instance using the specified properties.
		 * @function create
		 * @memberof ciphel_io.SrcCode
		 * @static
		 * @param {ciphel_io.ISrcCode=} [properties] Properties to set
		 * @returns {ciphel_io.SrcCode} SrcCode instance
		 */
		SrcCode.create = function create(properties) {
			return new SrcCode(properties);
		};

		/**
		 * Encodes the specified SrcCode message. Does not implicitly {@link ciphel_io.SrcCode.verify|verify} messages.
		 * @function encode
		 * @memberof ciphel_io.SrcCode
		 * @static
		 * @param {ciphel_io.ISrcCode} message SrcCode message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SrcCode.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.content != null &&
				Object.hasOwnProperty.call(message, "content")
			)
				writer
					.uint32(/* id 1, wireType 2 =*/ 10)
					.string(message.content);
			if (
				message.side != null &&
				Object.hasOwnProperty.call(message, "side")
			)
				writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.side);
			return writer;
		};

		/**
		 * Encodes the specified SrcCode message, length delimited. Does not implicitly {@link ciphel_io.SrcCode.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof ciphel_io.SrcCode
		 * @static
		 * @param {ciphel_io.ISrcCode} message SrcCode message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		SrcCode.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a SrcCode message from the specified reader or buffer.
		 * @function decode
		 * @memberof ciphel_io.SrcCode
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {ciphel_io.SrcCode} SrcCode
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SrcCode.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.ciphel_io.SrcCode();
			while (reader.pos < end) {
				let tag = reader.uint32();
				switch (tag >>> 3) {
					case 1: {
						message.content = reader.string();
						break;
					}
					case 2: {
						message.side = reader.int32();
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a SrcCode message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof ciphel_io.SrcCode
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {ciphel_io.SrcCode} SrcCode
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		SrcCode.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a SrcCode message.
		 * @function verify
		 * @memberof ciphel_io.SrcCode
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		SrcCode.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.content != null && message.hasOwnProperty("content"))
				if (!$util.isString(message.content))
					return "content: string expected";
			if (message.side != null && message.hasOwnProperty("side"))
				switch (message.side) {
					default:
						return "side: enum value expected";
					case 0:
					case 1:
					case 2:
						break;
				}
			return null;
		};

		/**
		 * Creates a SrcCode message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof ciphel_io.SrcCode
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {ciphel_io.SrcCode} SrcCode
		 */
		SrcCode.fromObject = function fromObject(object) {
			if (object instanceof $root.ciphel_io.SrcCode) return object;
			let message = new $root.ciphel_io.SrcCode();
			if (object.content != null)
				message.content = String(object.content);
			switch (object.side) {
				default:
					if (typeof object.side === "number") {
						message.side = object.side;
						break;
					}
					break;
				case "DEFAULT":
				case 0:
					message.side = 0;
					break;
				case "P1":
				case 1:
					message.side = 1;
					break;
				case "P2":
				case 2:
					message.side = 2;
					break;
			}
			return message;
		};

		/**
		 * Creates a plain object from a SrcCode message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof ciphel_io.SrcCode
		 * @static
		 * @param {ciphel_io.SrcCode} message SrcCode
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		SrcCode.toObject = function toObject(message, options) {
			if (!options) options = {};
			let object = {};
			if (options.defaults) {
				object.content = "";
				object.side = options.enums === String ? "DEFAULT" : 0;
			}
			if (message.content != null && message.hasOwnProperty("content"))
				object.content = message.content;
			if (message.side != null && message.hasOwnProperty("side"))
				object.side =
					options.enums === String
						? $root.ciphel_io.PlayerSide[message.side] === undefined
							? message.side
							: $root.ciphel_io.PlayerSide[message.side]
						: message.side;
			return object;
		};

		/**
		 * Converts this SrcCode to JSON.
		 * @function toJSON
		 * @memberof ciphel_io.SrcCode
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		SrcCode.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(
				this,
				$protobuf.util.toJSONOptions
			);
		};

		/**
		 * Gets the default type url for SrcCode
		 * @function getTypeUrl
		 * @memberof ciphel_io.SrcCode
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		SrcCode.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/ciphel_io.SrcCode";
		};

		return SrcCode;
	})();

	ciphel_io.Command = (function () {
		/**
		 * Properties of a Command.
		 * @memberof ciphel_io
		 * @interface ICommand
		 * @property {string|null} [cmd] Command cmd
		 * @property {Array.<string>|null} [args] Command args
		 * @property {ciphel_io.ISrcCode|null} [src] Command src
		 */

		/**
		 * Constructs a new Command.
		 * @memberof ciphel_io
		 * @classdesc Represents a Command.
		 * @implements ICommand
		 * @constructor
		 * @param {ciphel_io.ICommand=} [properties] Properties to set
		 */
		function Command(properties) {
			this.args = [];
			if (properties)
				for (
					let keys = Object.keys(properties), i = 0;
					i < keys.length;
					++i
				)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * Command cmd.
		 * @member {string} cmd
		 * @memberof ciphel_io.Command
		 * @instance
		 */
		Command.prototype.cmd = "";

		/**
		 * Command args.
		 * @member {Array.<string>} args
		 * @memberof ciphel_io.Command
		 * @instance
		 */
		Command.prototype.args = $util.emptyArray;

		/**
		 * Command src.
		 * @member {ciphel_io.ISrcCode|null|undefined} src
		 * @memberof ciphel_io.Command
		 * @instance
		 */
		Command.prototype.src = null;

		// OneOf field names bound to virtual getters and setters
		let $oneOfFields;

		/**
		 * Command _src.
		 * @member {"src"|undefined} _src
		 * @memberof ciphel_io.Command
		 * @instance
		 */
		Object.defineProperty(Command.prototype, "_src", {
			get: $util.oneOfGetter(($oneOfFields = ["src"])),
			set: $util.oneOfSetter($oneOfFields),
		});

		/**
		 * Creates a new Command instance using the specified properties.
		 * @function create
		 * @memberof ciphel_io.Command
		 * @static
		 * @param {ciphel_io.ICommand=} [properties] Properties to set
		 * @returns {ciphel_io.Command} Command instance
		 */
		Command.create = function create(properties) {
			return new Command(properties);
		};

		/**
		 * Encodes the specified Command message. Does not implicitly {@link ciphel_io.Command.verify|verify} messages.
		 * @function encode
		 * @memberof ciphel_io.Command
		 * @static
		 * @param {ciphel_io.ICommand} message Command message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		Command.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.cmd != null &&
				Object.hasOwnProperty.call(message, "cmd")
			)
				writer.uint32(/* id 1, wireType 2 =*/ 10).string(message.cmd);
			if (message.args != null && message.args.length)
				for (let i = 0; i < message.args.length; ++i)
					writer
						.uint32(/* id 2, wireType 2 =*/ 18)
						.string(message.args[i]);
			if (
				message.src != null &&
				Object.hasOwnProperty.call(message, "src")
			)
				$root.ciphel_io.SrcCode.encode(
					message.src,
					writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
				).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified Command message, length delimited. Does not implicitly {@link ciphel_io.Command.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof ciphel_io.Command
		 * @static
		 * @param {ciphel_io.ICommand} message Command message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		Command.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a Command message from the specified reader or buffer.
		 * @function decode
		 * @memberof ciphel_io.Command
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {ciphel_io.Command} Command
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		Command.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.ciphel_io.Command();
			while (reader.pos < end) {
				let tag = reader.uint32();
				switch (tag >>> 3) {
					case 1: {
						message.cmd = reader.string();
						break;
					}
					case 2: {
						if (!(message.args && message.args.length))
							message.args = [];
						message.args.push(reader.string());
						break;
					}
					case 3: {
						message.src = $root.ciphel_io.SrcCode.decode(
							reader,
							reader.uint32()
						);
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a Command message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof ciphel_io.Command
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {ciphel_io.Command} Command
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		Command.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a Command message.
		 * @function verify
		 * @memberof ciphel_io.Command
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		Command.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			let properties = {};
			if (message.cmd != null && message.hasOwnProperty("cmd"))
				if (!$util.isString(message.cmd)) return "cmd: string expected";
			if (message.args != null && message.hasOwnProperty("args")) {
				if (!Array.isArray(message.args)) return "args: array expected";
				for (let i = 0; i < message.args.length; ++i)
					if (!$util.isString(message.args[i]))
						return "args: string[] expected";
			}
			if (message.src != null && message.hasOwnProperty("src")) {
				properties._src = 1;
				{
					let error = $root.ciphel_io.SrcCode.verify(message.src);
					if (error) return "src." + error;
				}
			}
			return null;
		};

		/**
		 * Creates a Command message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof ciphel_io.Command
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {ciphel_io.Command} Command
		 */
		Command.fromObject = function fromObject(object) {
			if (object instanceof $root.ciphel_io.Command) return object;
			let message = new $root.ciphel_io.Command();
			if (object.cmd != null) message.cmd = String(object.cmd);
			if (object.args) {
				if (!Array.isArray(object.args))
					throw TypeError(".ciphel_io.Command.args: array expected");
				message.args = [];
				for (let i = 0; i < object.args.length; ++i)
					message.args[i] = String(object.args[i]);
			}
			if (object.src != null) {
				if (typeof object.src !== "object")
					throw TypeError(".ciphel_io.Command.src: object expected");
				message.src = $root.ciphel_io.SrcCode.fromObject(object.src);
			}
			return message;
		};

		/**
		 * Creates a plain object from a Command message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof ciphel_io.Command
		 * @static
		 * @param {ciphel_io.Command} message Command
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		Command.toObject = function toObject(message, options) {
			if (!options) options = {};
			let object = {};
			if (options.arrays || options.defaults) object.args = [];
			if (options.defaults) object.cmd = "";
			if (message.cmd != null && message.hasOwnProperty("cmd"))
				object.cmd = message.cmd;
			if (message.args && message.args.length) {
				object.args = [];
				for (let j = 0; j < message.args.length; ++j)
					object.args[j] = message.args[j];
			}
			if (message.src != null && message.hasOwnProperty("src")) {
				object.src = $root.ciphel_io.SrcCode.toObject(
					message.src,
					options
				);
				if (options.oneofs) object._src = "src";
			}
			return object;
		};

		/**
		 * Converts this Command to JSON.
		 * @function toJSON
		 * @memberof ciphel_io.Command
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		Command.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(
				this,
				$protobuf.util.toJSONOptions
			);
		};

		/**
		 * Gets the default type url for Command
		 * @function getTypeUrl
		 * @memberof ciphel_io.Command
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		Command.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/ciphel_io.Command";
		};

		return Command;
	})();

	ciphel_io.StdOut = (function () {
		/**
		 * Properties of a StdOut.
		 * @memberof ciphel_io
		 * @interface IStdOut
		 * @property {string|null} [content] StdOut content
		 */

		/**
		 * Constructs a new StdOut.
		 * @memberof ciphel_io
		 * @classdesc Represents a StdOut.
		 * @implements IStdOut
		 * @constructor
		 * @param {ciphel_io.IStdOut=} [properties] Properties to set
		 */
		function StdOut(properties) {
			if (properties)
				for (
					let keys = Object.keys(properties), i = 0;
					i < keys.length;
					++i
				)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * StdOut content.
		 * @member {string} content
		 * @memberof ciphel_io.StdOut
		 * @instance
		 */
		StdOut.prototype.content = "";

		/**
		 * Creates a new StdOut instance using the specified properties.
		 * @function create
		 * @memberof ciphel_io.StdOut
		 * @static
		 * @param {ciphel_io.IStdOut=} [properties] Properties to set
		 * @returns {ciphel_io.StdOut} StdOut instance
		 */
		StdOut.create = function create(properties) {
			return new StdOut(properties);
		};

		/**
		 * Encodes the specified StdOut message. Does not implicitly {@link ciphel_io.StdOut.verify|verify} messages.
		 * @function encode
		 * @memberof ciphel_io.StdOut
		 * @static
		 * @param {ciphel_io.IStdOut} message StdOut message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		StdOut.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.content != null &&
				Object.hasOwnProperty.call(message, "content")
			)
				writer
					.uint32(/* id 1, wireType 2 =*/ 10)
					.string(message.content);
			return writer;
		};

		/**
		 * Encodes the specified StdOut message, length delimited. Does not implicitly {@link ciphel_io.StdOut.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof ciphel_io.StdOut
		 * @static
		 * @param {ciphel_io.IStdOut} message StdOut message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		StdOut.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a StdOut message from the specified reader or buffer.
		 * @function decode
		 * @memberof ciphel_io.StdOut
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {ciphel_io.StdOut} StdOut
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		StdOut.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.ciphel_io.StdOut();
			while (reader.pos < end) {
				let tag = reader.uint32();
				switch (tag >>> 3) {
					case 1: {
						message.content = reader.string();
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a StdOut message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof ciphel_io.StdOut
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {ciphel_io.StdOut} StdOut
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		StdOut.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a StdOut message.
		 * @function verify
		 * @memberof ciphel_io.StdOut
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		StdOut.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.content != null && message.hasOwnProperty("content"))
				if (!$util.isString(message.content))
					return "content: string expected";
			return null;
		};

		/**
		 * Creates a StdOut message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof ciphel_io.StdOut
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {ciphel_io.StdOut} StdOut
		 */
		StdOut.fromObject = function fromObject(object) {
			if (object instanceof $root.ciphel_io.StdOut) return object;
			let message = new $root.ciphel_io.StdOut();
			if (object.content != null)
				message.content = String(object.content);
			return message;
		};

		/**
		 * Creates a plain object from a StdOut message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof ciphel_io.StdOut
		 * @static
		 * @param {ciphel_io.StdOut} message StdOut
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		StdOut.toObject = function toObject(message, options) {
			if (!options) options = {};
			let object = {};
			if (options.defaults) object.content = "";
			if (message.content != null && message.hasOwnProperty("content"))
				object.content = message.content;
			return object;
		};

		/**
		 * Converts this StdOut to JSON.
		 * @function toJSON
		 * @memberof ciphel_io.StdOut
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		StdOut.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(
				this,
				$protobuf.util.toJSONOptions
			);
		};

		/**
		 * Gets the default type url for StdOut
		 * @function getTypeUrl
		 * @memberof ciphel_io.StdOut
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		StdOut.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/ciphel_io.StdOut";
		};

		return StdOut;
	})();

	ciphel_io.StdErr = (function () {
		/**
		 * Properties of a StdErr.
		 * @memberof ciphel_io
		 * @interface IStdErr
		 * @property {string|null} [content] StdErr content
		 */

		/**
		 * Constructs a new StdErr.
		 * @memberof ciphel_io
		 * @classdesc Represents a StdErr.
		 * @implements IStdErr
		 * @constructor
		 * @param {ciphel_io.IStdErr=} [properties] Properties to set
		 */
		function StdErr(properties) {
			if (properties)
				for (
					let keys = Object.keys(properties), i = 0;
					i < keys.length;
					++i
				)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * StdErr content.
		 * @member {string} content
		 * @memberof ciphel_io.StdErr
		 * @instance
		 */
		StdErr.prototype.content = "";

		/**
		 * Creates a new StdErr instance using the specified properties.
		 * @function create
		 * @memberof ciphel_io.StdErr
		 * @static
		 * @param {ciphel_io.IStdErr=} [properties] Properties to set
		 * @returns {ciphel_io.StdErr} StdErr instance
		 */
		StdErr.create = function create(properties) {
			return new StdErr(properties);
		};

		/**
		 * Encodes the specified StdErr message. Does not implicitly {@link ciphel_io.StdErr.verify|verify} messages.
		 * @function encode
		 * @memberof ciphel_io.StdErr
		 * @static
		 * @param {ciphel_io.IStdErr} message StdErr message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		StdErr.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.content != null &&
				Object.hasOwnProperty.call(message, "content")
			)
				writer
					.uint32(/* id 1, wireType 2 =*/ 10)
					.string(message.content);
			return writer;
		};

		/**
		 * Encodes the specified StdErr message, length delimited. Does not implicitly {@link ciphel_io.StdErr.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof ciphel_io.StdErr
		 * @static
		 * @param {ciphel_io.IStdErr} message StdErr message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		StdErr.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a StdErr message from the specified reader or buffer.
		 * @function decode
		 * @memberof ciphel_io.StdErr
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {ciphel_io.StdErr} StdErr
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		StdErr.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.ciphel_io.StdErr();
			while (reader.pos < end) {
				let tag = reader.uint32();
				switch (tag >>> 3) {
					case 1: {
						message.content = reader.string();
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a StdErr message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof ciphel_io.StdErr
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {ciphel_io.StdErr} StdErr
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		StdErr.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a StdErr message.
		 * @function verify
		 * @memberof ciphel_io.StdErr
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		StdErr.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.content != null && message.hasOwnProperty("content"))
				if (!$util.isString(message.content))
					return "content: string expected";
			return null;
		};

		/**
		 * Creates a StdErr message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof ciphel_io.StdErr
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {ciphel_io.StdErr} StdErr
		 */
		StdErr.fromObject = function fromObject(object) {
			if (object instanceof $root.ciphel_io.StdErr) return object;
			let message = new $root.ciphel_io.StdErr();
			if (object.content != null)
				message.content = String(object.content);
			return message;
		};

		/**
		 * Creates a plain object from a StdErr message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof ciphel_io.StdErr
		 * @static
		 * @param {ciphel_io.StdErr} message StdErr
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		StdErr.toObject = function toObject(message, options) {
			if (!options) options = {};
			let object = {};
			if (options.defaults) object.content = "";
			if (message.content != null && message.hasOwnProperty("content"))
				object.content = message.content;
			return object;
		};

		/**
		 * Converts this StdErr to JSON.
		 * @function toJSON
		 * @memberof ciphel_io.StdErr
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		StdErr.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(
				this,
				$protobuf.util.toJSONOptions
			);
		};

		/**
		 * Gets the default type url for StdErr
		 * @function getTypeUrl
		 * @memberof ciphel_io.StdErr
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		StdErr.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/ciphel_io.StdErr";
		};

		return StdErr;
	})();

	ciphel_io.StdIn = (function () {
		/**
		 * Properties of a StdIn.
		 * @memberof ciphel_io
		 * @interface IStdIn
		 * @property {string|null} [content] StdIn content
		 */

		/**
		 * Constructs a new StdIn.
		 * @memberof ciphel_io
		 * @classdesc Represents a StdIn.
		 * @implements IStdIn
		 * @constructor
		 * @param {ciphel_io.IStdIn=} [properties] Properties to set
		 */
		function StdIn(properties) {
			if (properties)
				for (
					let keys = Object.keys(properties), i = 0;
					i < keys.length;
					++i
				)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * StdIn content.
		 * @member {string} content
		 * @memberof ciphel_io.StdIn
		 * @instance
		 */
		StdIn.prototype.content = "";

		/**
		 * Creates a new StdIn instance using the specified properties.
		 * @function create
		 * @memberof ciphel_io.StdIn
		 * @static
		 * @param {ciphel_io.IStdIn=} [properties] Properties to set
		 * @returns {ciphel_io.StdIn} StdIn instance
		 */
		StdIn.create = function create(properties) {
			return new StdIn(properties);
		};

		/**
		 * Encodes the specified StdIn message. Does not implicitly {@link ciphel_io.StdIn.verify|verify} messages.
		 * @function encode
		 * @memberof ciphel_io.StdIn
		 * @static
		 * @param {ciphel_io.IStdIn} message StdIn message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		StdIn.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.content != null &&
				Object.hasOwnProperty.call(message, "content")
			)
				writer
					.uint32(/* id 1, wireType 2 =*/ 10)
					.string(message.content);
			return writer;
		};

		/**
		 * Encodes the specified StdIn message, length delimited. Does not implicitly {@link ciphel_io.StdIn.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof ciphel_io.StdIn
		 * @static
		 * @param {ciphel_io.IStdIn} message StdIn message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		StdIn.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a StdIn message from the specified reader or buffer.
		 * @function decode
		 * @memberof ciphel_io.StdIn
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {ciphel_io.StdIn} StdIn
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		StdIn.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.ciphel_io.StdIn();
			while (reader.pos < end) {
				let tag = reader.uint32();
				switch (tag >>> 3) {
					case 1: {
						message.content = reader.string();
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a StdIn message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof ciphel_io.StdIn
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {ciphel_io.StdIn} StdIn
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		StdIn.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a StdIn message.
		 * @function verify
		 * @memberof ciphel_io.StdIn
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		StdIn.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			if (message.content != null && message.hasOwnProperty("content"))
				if (!$util.isString(message.content))
					return "content: string expected";
			return null;
		};

		/**
		 * Creates a StdIn message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof ciphel_io.StdIn
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {ciphel_io.StdIn} StdIn
		 */
		StdIn.fromObject = function fromObject(object) {
			if (object instanceof $root.ciphel_io.StdIn) return object;
			let message = new $root.ciphel_io.StdIn();
			if (object.content != null)
				message.content = String(object.content);
			return message;
		};

		/**
		 * Creates a plain object from a StdIn message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof ciphel_io.StdIn
		 * @static
		 * @param {ciphel_io.StdIn} message StdIn
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		StdIn.toObject = function toObject(message, options) {
			if (!options) options = {};
			let object = {};
			if (options.defaults) object.content = "";
			if (message.content != null && message.hasOwnProperty("content"))
				object.content = message.content;
			return object;
		};

		/**
		 * Converts this StdIn to JSON.
		 * @function toJSON
		 * @memberof ciphel_io.StdIn
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		StdIn.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(
				this,
				$protobuf.util.toJSONOptions
			);
		};

		/**
		 * Gets the default type url for StdIn
		 * @function getTypeUrl
		 * @memberof ciphel_io.StdIn
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		StdIn.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/ciphel_io.StdIn";
		};

		return StdIn;
	})();

	ciphel_io.CiphelRequest = (function () {
		/**
		 * Properties of a CiphelRequest.
		 * @memberof ciphel_io
		 * @interface ICiphelRequest
		 * @property {ciphel_io.CiphelRequest.IInput|null} [input] CiphelRequest input
		 * @property {ciphel_io.CiphelRequest.ICommited|null} [commited] CiphelRequest commited
		 * @property {ciphel_io.CiphelRequest.IReverted|null} [reverted] CiphelRequest reverted
		 * @property {ciphel_io.CiphelRequest.IPushed|null} [pushed] CiphelRequest pushed
		 * @property {ciphel_io.CiphelRequest.ISpawn|null} [spawnThread] CiphelRequest spawnThread
		 * @property {ciphel_io.CiphelRequest.IClose|null} [closeThread] CiphelRequest closeThread
		 */

		/**
		 * Constructs a new CiphelRequest.
		 * @memberof ciphel_io
		 * @classdesc Represents a CiphelRequest.
		 * @implements ICiphelRequest
		 * @constructor
		 * @param {ciphel_io.ICiphelRequest=} [properties] Properties to set
		 */
		function CiphelRequest(properties) {
			if (properties)
				for (
					let keys = Object.keys(properties), i = 0;
					i < keys.length;
					++i
				)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * CiphelRequest input.
		 * @member {ciphel_io.CiphelRequest.IInput|null|undefined} input
		 * @memberof ciphel_io.CiphelRequest
		 * @instance
		 */
		CiphelRequest.prototype.input = null;

		/**
		 * CiphelRequest commited.
		 * @member {ciphel_io.CiphelRequest.ICommited|null|undefined} commited
		 * @memberof ciphel_io.CiphelRequest
		 * @instance
		 */
		CiphelRequest.prototype.commited = null;

		/**
		 * CiphelRequest reverted.
		 * @member {ciphel_io.CiphelRequest.IReverted|null|undefined} reverted
		 * @memberof ciphel_io.CiphelRequest
		 * @instance
		 */
		CiphelRequest.prototype.reverted = null;

		/**
		 * CiphelRequest pushed.
		 * @member {ciphel_io.CiphelRequest.IPushed|null|undefined} pushed
		 * @memberof ciphel_io.CiphelRequest
		 * @instance
		 */
		CiphelRequest.prototype.pushed = null;

		/**
		 * CiphelRequest spawnThread.
		 * @member {ciphel_io.CiphelRequest.ISpawn|null|undefined} spawnThread
		 * @memberof ciphel_io.CiphelRequest
		 * @instance
		 */
		CiphelRequest.prototype.spawnThread = null;

		/**
		 * CiphelRequest closeThread.
		 * @member {ciphel_io.CiphelRequest.IClose|null|undefined} closeThread
		 * @memberof ciphel_io.CiphelRequest
		 * @instance
		 */
		CiphelRequest.prototype.closeThread = null;

		// OneOf field names bound to virtual getters and setters
		let $oneOfFields;

		/**
		 * CiphelRequest requestType.
		 * @member {"input"|"commited"|"reverted"|"pushed"|"spawnThread"|"closeThread"|undefined} requestType
		 * @memberof ciphel_io.CiphelRequest
		 * @instance
		 */
		Object.defineProperty(CiphelRequest.prototype, "requestType", {
			get: $util.oneOfGetter(
				($oneOfFields = [
					"input",
					"commited",
					"reverted",
					"pushed",
					"spawnThread",
					"closeThread",
				])
			),
			set: $util.oneOfSetter($oneOfFields),
		});

		/**
		 * Creates a new CiphelRequest instance using the specified properties.
		 * @function create
		 * @memberof ciphel_io.CiphelRequest
		 * @static
		 * @param {ciphel_io.ICiphelRequest=} [properties] Properties to set
		 * @returns {ciphel_io.CiphelRequest} CiphelRequest instance
		 */
		CiphelRequest.create = function create(properties) {
			return new CiphelRequest(properties);
		};

		/**
		 * Encodes the specified CiphelRequest message. Does not implicitly {@link ciphel_io.CiphelRequest.verify|verify} messages.
		 * @function encode
		 * @memberof ciphel_io.CiphelRequest
		 * @static
		 * @param {ciphel_io.ICiphelRequest} message CiphelRequest message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		CiphelRequest.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.input != null &&
				Object.hasOwnProperty.call(message, "input")
			)
				$root.ciphel_io.CiphelRequest.Input.encode(
					message.input,
					writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
				).ldelim();
			if (
				message.commited != null &&
				Object.hasOwnProperty.call(message, "commited")
			)
				$root.ciphel_io.CiphelRequest.Commited.encode(
					message.commited,
					writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
				).ldelim();
			if (
				message.reverted != null &&
				Object.hasOwnProperty.call(message, "reverted")
			)
				$root.ciphel_io.CiphelRequest.Reverted.encode(
					message.reverted,
					writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
				).ldelim();
			if (
				message.pushed != null &&
				Object.hasOwnProperty.call(message, "pushed")
			)
				$root.ciphel_io.CiphelRequest.Pushed.encode(
					message.pushed,
					writer.uint32(/* id 4, wireType 2 =*/ 34).fork()
				).ldelim();
			if (
				message.spawnThread != null &&
				Object.hasOwnProperty.call(message, "spawnThread")
			)
				$root.ciphel_io.CiphelRequest.Spawn.encode(
					message.spawnThread,
					writer.uint32(/* id 5, wireType 2 =*/ 42).fork()
				).ldelim();
			if (
				message.closeThread != null &&
				Object.hasOwnProperty.call(message, "closeThread")
			)
				$root.ciphel_io.CiphelRequest.Close.encode(
					message.closeThread,
					writer.uint32(/* id 6, wireType 2 =*/ 50).fork()
				).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified CiphelRequest message, length delimited. Does not implicitly {@link ciphel_io.CiphelRequest.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof ciphel_io.CiphelRequest
		 * @static
		 * @param {ciphel_io.ICiphelRequest} message CiphelRequest message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		CiphelRequest.encodeDelimited = function encodeDelimited(
			message,
			writer
		) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a CiphelRequest message from the specified reader or buffer.
		 * @function decode
		 * @memberof ciphel_io.CiphelRequest
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {ciphel_io.CiphelRequest} CiphelRequest
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		CiphelRequest.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.ciphel_io.CiphelRequest();
			while (reader.pos < end) {
				let tag = reader.uint32();
				switch (tag >>> 3) {
					case 1: {
						message.input =
							$root.ciphel_io.CiphelRequest.Input.decode(
								reader,
								reader.uint32()
							);
						break;
					}
					case 2: {
						message.commited =
							$root.ciphel_io.CiphelRequest.Commited.decode(
								reader,
								reader.uint32()
							);
						break;
					}
					case 3: {
						message.reverted =
							$root.ciphel_io.CiphelRequest.Reverted.decode(
								reader,
								reader.uint32()
							);
						break;
					}
					case 4: {
						message.pushed =
							$root.ciphel_io.CiphelRequest.Pushed.decode(
								reader,
								reader.uint32()
							);
						break;
					}
					case 5: {
						message.spawnThread =
							$root.ciphel_io.CiphelRequest.Spawn.decode(
								reader,
								reader.uint32()
							);
						break;
					}
					case 6: {
						message.closeThread =
							$root.ciphel_io.CiphelRequest.Close.decode(
								reader,
								reader.uint32()
							);
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a CiphelRequest message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof ciphel_io.CiphelRequest
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {ciphel_io.CiphelRequest} CiphelRequest
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		CiphelRequest.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a CiphelRequest message.
		 * @function verify
		 * @memberof ciphel_io.CiphelRequest
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		CiphelRequest.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			let properties = {};
			if (message.input != null && message.hasOwnProperty("input")) {
				properties.requestType = 1;
				{
					let error = $root.ciphel_io.CiphelRequest.Input.verify(
						message.input
					);
					if (error) return "input." + error;
				}
			}
			if (
				message.commited != null &&
				message.hasOwnProperty("commited")
			) {
				if (properties.requestType === 1)
					return "requestType: multiple values";
				properties.requestType = 1;
				{
					let error = $root.ciphel_io.CiphelRequest.Commited.verify(
						message.commited
					);
					if (error) return "commited." + error;
				}
			}
			if (
				message.reverted != null &&
				message.hasOwnProperty("reverted")
			) {
				if (properties.requestType === 1)
					return "requestType: multiple values";
				properties.requestType = 1;
				{
					let error = $root.ciphel_io.CiphelRequest.Reverted.verify(
						message.reverted
					);
					if (error) return "reverted." + error;
				}
			}
			if (message.pushed != null && message.hasOwnProperty("pushed")) {
				if (properties.requestType === 1)
					return "requestType: multiple values";
				properties.requestType = 1;
				{
					let error = $root.ciphel_io.CiphelRequest.Pushed.verify(
						message.pushed
					);
					if (error) return "pushed." + error;
				}
			}
			if (
				message.spawnThread != null &&
				message.hasOwnProperty("spawnThread")
			) {
				if (properties.requestType === 1)
					return "requestType: multiple values";
				properties.requestType = 1;
				{
					let error = $root.ciphel_io.CiphelRequest.Spawn.verify(
						message.spawnThread
					);
					if (error) return "spawnThread." + error;
				}
			}
			if (
				message.closeThread != null &&
				message.hasOwnProperty("closeThread")
			) {
				if (properties.requestType === 1)
					return "requestType: multiple values";
				properties.requestType = 1;
				{
					let error = $root.ciphel_io.CiphelRequest.Close.verify(
						message.closeThread
					);
					if (error) return "closeThread." + error;
				}
			}
			return null;
		};

		/**
		 * Creates a CiphelRequest message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof ciphel_io.CiphelRequest
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {ciphel_io.CiphelRequest} CiphelRequest
		 */
		CiphelRequest.fromObject = function fromObject(object) {
			if (object instanceof $root.ciphel_io.CiphelRequest) return object;
			let message = new $root.ciphel_io.CiphelRequest();
			if (object.input != null) {
				if (typeof object.input !== "object")
					throw TypeError(
						".ciphel_io.CiphelRequest.input: object expected"
					);
				message.input = $root.ciphel_io.CiphelRequest.Input.fromObject(
					object.input
				);
			}
			if (object.commited != null) {
				if (typeof object.commited !== "object")
					throw TypeError(
						".ciphel_io.CiphelRequest.commited: object expected"
					);
				message.commited =
					$root.ciphel_io.CiphelRequest.Commited.fromObject(
						object.commited
					);
			}
			if (object.reverted != null) {
				if (typeof object.reverted !== "object")
					throw TypeError(
						".ciphel_io.CiphelRequest.reverted: object expected"
					);
				message.reverted =
					$root.ciphel_io.CiphelRequest.Reverted.fromObject(
						object.reverted
					);
			}
			if (object.pushed != null) {
				if (typeof object.pushed !== "object")
					throw TypeError(
						".ciphel_io.CiphelRequest.pushed: object expected"
					);
				message.pushed =
					$root.ciphel_io.CiphelRequest.Pushed.fromObject(
						object.pushed
					);
			}
			if (object.spawnThread != null) {
				if (typeof object.spawnThread !== "object")
					throw TypeError(
						".ciphel_io.CiphelRequest.spawnThread: object expected"
					);
				message.spawnThread =
					$root.ciphel_io.CiphelRequest.Spawn.fromObject(
						object.spawnThread
					);
			}
			if (object.closeThread != null) {
				if (typeof object.closeThread !== "object")
					throw TypeError(
						".ciphel_io.CiphelRequest.closeThread: object expected"
					);
				message.closeThread =
					$root.ciphel_io.CiphelRequest.Close.fromObject(
						object.closeThread
					);
			}
			return message;
		};

		/**
		 * Creates a plain object from a CiphelRequest message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof ciphel_io.CiphelRequest
		 * @static
		 * @param {ciphel_io.CiphelRequest} message CiphelRequest
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		CiphelRequest.toObject = function toObject(message, options) {
			if (!options) options = {};
			let object = {};
			if (message.input != null && message.hasOwnProperty("input")) {
				object.input = $root.ciphel_io.CiphelRequest.Input.toObject(
					message.input,
					options
				);
				if (options.oneofs) object.requestType = "input";
			}
			if (
				message.commited != null &&
				message.hasOwnProperty("commited")
			) {
				object.commited =
					$root.ciphel_io.CiphelRequest.Commited.toObject(
						message.commited,
						options
					);
				if (options.oneofs) object.requestType = "commited";
			}
			if (
				message.reverted != null &&
				message.hasOwnProperty("reverted")
			) {
				object.reverted =
					$root.ciphel_io.CiphelRequest.Reverted.toObject(
						message.reverted,
						options
					);
				if (options.oneofs) object.requestType = "reverted";
			}
			if (message.pushed != null && message.hasOwnProperty("pushed")) {
				object.pushed = $root.ciphel_io.CiphelRequest.Pushed.toObject(
					message.pushed,
					options
				);
				if (options.oneofs) object.requestType = "pushed";
			}
			if (
				message.spawnThread != null &&
				message.hasOwnProperty("spawnThread")
			) {
				object.spawnThread =
					$root.ciphel_io.CiphelRequest.Spawn.toObject(
						message.spawnThread,
						options
					);
				if (options.oneofs) object.requestType = "spawnThread";
			}
			if (
				message.closeThread != null &&
				message.hasOwnProperty("closeThread")
			) {
				object.closeThread =
					$root.ciphel_io.CiphelRequest.Close.toObject(
						message.closeThread,
						options
					);
				if (options.oneofs) object.requestType = "closeThread";
			}
			return object;
		};

		/**
		 * Converts this CiphelRequest to JSON.
		 * @function toJSON
		 * @memberof ciphel_io.CiphelRequest
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		CiphelRequest.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(
				this,
				$protobuf.util.toJSONOptions
			);
		};

		/**
		 * Gets the default type url for CiphelRequest
		 * @function getTypeUrl
		 * @memberof ciphel_io.CiphelRequest
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		CiphelRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/ciphel_io.CiphelRequest";
		};

		CiphelRequest.Input = (function () {
			/**
			 * Properties of an Input.
			 * @memberof ciphel_io.CiphelRequest
			 * @interface IInput
			 */

			/**
			 * Constructs a new Input.
			 * @memberof ciphel_io.CiphelRequest
			 * @classdesc Represents an Input.
			 * @implements IInput
			 * @constructor
			 * @param {ciphel_io.CiphelRequest.IInput=} [properties] Properties to set
			 */
			function Input(properties) {
				if (properties)
					for (
						let keys = Object.keys(properties), i = 0;
						i < keys.length;
						++i
					)
						if (properties[keys[i]] != null)
							this[keys[i]] = properties[keys[i]];
			}

			/**
			 * Creates a new Input instance using the specified properties.
			 * @function create
			 * @memberof ciphel_io.CiphelRequest.Input
			 * @static
			 * @param {ciphel_io.CiphelRequest.IInput=} [properties] Properties to set
			 * @returns {ciphel_io.CiphelRequest.Input} Input instance
			 */
			Input.create = function create(properties) {
				return new Input(properties);
			};

			/**
			 * Encodes the specified Input message. Does not implicitly {@link ciphel_io.CiphelRequest.Input.verify|verify} messages.
			 * @function encode
			 * @memberof ciphel_io.CiphelRequest.Input
			 * @static
			 * @param {ciphel_io.CiphelRequest.IInput} message Input message or plain object to encode
			 * @param {$protobuf.Writer} [writer] Writer to encode to
			 * @returns {$protobuf.Writer} Writer
			 */
			Input.encode = function encode(message, writer) {
				if (!writer) writer = $Writer.create();
				return writer;
			};

			/**
			 * Encodes the specified Input message, length delimited. Does not implicitly {@link ciphel_io.CiphelRequest.Input.verify|verify} messages.
			 * @function encodeDelimited
			 * @memberof ciphel_io.CiphelRequest.Input
			 * @static
			 * @param {ciphel_io.CiphelRequest.IInput} message Input message or plain object to encode
			 * @param {$protobuf.Writer} [writer] Writer to encode to
			 * @returns {$protobuf.Writer} Writer
			 */
			Input.encodeDelimited = function encodeDelimited(message, writer) {
				return this.encode(message, writer).ldelim();
			};

			/**
			 * Decodes an Input message from the specified reader or buffer.
			 * @function decode
			 * @memberof ciphel_io.CiphelRequest.Input
			 * @static
			 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
			 * @param {number} [length] Message length if known beforehand
			 * @returns {ciphel_io.CiphelRequest.Input} Input
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			Input.decode = function decode(reader, length) {
				if (!(reader instanceof $Reader))
					reader = $Reader.create(reader);
				let end =
						length === undefined ? reader.len : reader.pos + length,
					message = new $root.ciphel_io.CiphelRequest.Input();
				while (reader.pos < end) {
					let tag = reader.uint32();
					switch (tag >>> 3) {
						default:
							reader.skipType(tag & 7);
							break;
					}
				}
				return message;
			};

			/**
			 * Decodes an Input message from the specified reader or buffer, length delimited.
			 * @function decodeDelimited
			 * @memberof ciphel_io.CiphelRequest.Input
			 * @static
			 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
			 * @returns {ciphel_io.CiphelRequest.Input} Input
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			Input.decodeDelimited = function decodeDelimited(reader) {
				if (!(reader instanceof $Reader)) reader = new $Reader(reader);
				return this.decode(reader, reader.uint32());
			};

			/**
			 * Verifies an Input message.
			 * @function verify
			 * @memberof ciphel_io.CiphelRequest.Input
			 * @static
			 * @param {Object.<string,*>} message Plain object to verify
			 * @returns {string|null} `null` if valid, otherwise the reason why it is not
			 */
			Input.verify = function verify(message) {
				if (typeof message !== "object" || message === null)
					return "object expected";
				return null;
			};

			/**
			 * Creates an Input message from a plain object. Also converts values to their respective internal types.
			 * @function fromObject
			 * @memberof ciphel_io.CiphelRequest.Input
			 * @static
			 * @param {Object.<string,*>} object Plain object
			 * @returns {ciphel_io.CiphelRequest.Input} Input
			 */
			Input.fromObject = function fromObject(object) {
				if (object instanceof $root.ciphel_io.CiphelRequest.Input)
					return object;
				return new $root.ciphel_io.CiphelRequest.Input();
			};

			/**
			 * Creates a plain object from an Input message. Also converts values to other types if specified.
			 * @function toObject
			 * @memberof ciphel_io.CiphelRequest.Input
			 * @static
			 * @param {ciphel_io.CiphelRequest.Input} message Input
			 * @param {$protobuf.IConversionOptions} [options] Conversion options
			 * @returns {Object.<string,*>} Plain object
			 */
			Input.toObject = function toObject() {
				return {};
			};

			/**
			 * Converts this Input to JSON.
			 * @function toJSON
			 * @memberof ciphel_io.CiphelRequest.Input
			 * @instance
			 * @returns {Object.<string,*>} JSON object
			 */
			Input.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(
					this,
					$protobuf.util.toJSONOptions
				);
			};

			/**
			 * Gets the default type url for Input
			 * @function getTypeUrl
			 * @memberof ciphel_io.CiphelRequest.Input
			 * @static
			 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
			 * @returns {string} The default type url
			 */
			Input.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
				if (typeUrlPrefix === undefined) {
					typeUrlPrefix = "type.googleapis.com";
				}
				return typeUrlPrefix + "/ciphel_io.CiphelRequest.Input";
			};

			return Input;
		})();

		CiphelRequest.Commited = (function () {
			/**
			 * Properties of a Commited.
			 * @memberof ciphel_io.CiphelRequest
			 * @interface ICommited
			 */

			/**
			 * Constructs a new Commited.
			 * @memberof ciphel_io.CiphelRequest
			 * @classdesc Represents a Commited.
			 * @implements ICommited
			 * @constructor
			 * @param {ciphel_io.CiphelRequest.ICommited=} [properties] Properties to set
			 */
			function Commited(properties) {
				if (properties)
					for (
						let keys = Object.keys(properties), i = 0;
						i < keys.length;
						++i
					)
						if (properties[keys[i]] != null)
							this[keys[i]] = properties[keys[i]];
			}

			/**
			 * Creates a new Commited instance using the specified properties.
			 * @function create
			 * @memberof ciphel_io.CiphelRequest.Commited
			 * @static
			 * @param {ciphel_io.CiphelRequest.ICommited=} [properties] Properties to set
			 * @returns {ciphel_io.CiphelRequest.Commited} Commited instance
			 */
			Commited.create = function create(properties) {
				return new Commited(properties);
			};

			/**
			 * Encodes the specified Commited message. Does not implicitly {@link ciphel_io.CiphelRequest.Commited.verify|verify} messages.
			 * @function encode
			 * @memberof ciphel_io.CiphelRequest.Commited
			 * @static
			 * @param {ciphel_io.CiphelRequest.ICommited} message Commited message or plain object to encode
			 * @param {$protobuf.Writer} [writer] Writer to encode to
			 * @returns {$protobuf.Writer} Writer
			 */
			Commited.encode = function encode(message, writer) {
				if (!writer) writer = $Writer.create();
				return writer;
			};

			/**
			 * Encodes the specified Commited message, length delimited. Does not implicitly {@link ciphel_io.CiphelRequest.Commited.verify|verify} messages.
			 * @function encodeDelimited
			 * @memberof ciphel_io.CiphelRequest.Commited
			 * @static
			 * @param {ciphel_io.CiphelRequest.ICommited} message Commited message or plain object to encode
			 * @param {$protobuf.Writer} [writer] Writer to encode to
			 * @returns {$protobuf.Writer} Writer
			 */
			Commited.encodeDelimited = function encodeDelimited(
				message,
				writer
			) {
				return this.encode(message, writer).ldelim();
			};

			/**
			 * Decodes a Commited message from the specified reader or buffer.
			 * @function decode
			 * @memberof ciphel_io.CiphelRequest.Commited
			 * @static
			 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
			 * @param {number} [length] Message length if known beforehand
			 * @returns {ciphel_io.CiphelRequest.Commited} Commited
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			Commited.decode = function decode(reader, length) {
				if (!(reader instanceof $Reader))
					reader = $Reader.create(reader);
				let end =
						length === undefined ? reader.len : reader.pos + length,
					message = new $root.ciphel_io.CiphelRequest.Commited();
				while (reader.pos < end) {
					let tag = reader.uint32();
					switch (tag >>> 3) {
						default:
							reader.skipType(tag & 7);
							break;
					}
				}
				return message;
			};

			/**
			 * Decodes a Commited message from the specified reader or buffer, length delimited.
			 * @function decodeDelimited
			 * @memberof ciphel_io.CiphelRequest.Commited
			 * @static
			 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
			 * @returns {ciphel_io.CiphelRequest.Commited} Commited
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			Commited.decodeDelimited = function decodeDelimited(reader) {
				if (!(reader instanceof $Reader)) reader = new $Reader(reader);
				return this.decode(reader, reader.uint32());
			};

			/**
			 * Verifies a Commited message.
			 * @function verify
			 * @memberof ciphel_io.CiphelRequest.Commited
			 * @static
			 * @param {Object.<string,*>} message Plain object to verify
			 * @returns {string|null} `null` if valid, otherwise the reason why it is not
			 */
			Commited.verify = function verify(message) {
				if (typeof message !== "object" || message === null)
					return "object expected";
				return null;
			};

			/**
			 * Creates a Commited message from a plain object. Also converts values to their respective internal types.
			 * @function fromObject
			 * @memberof ciphel_io.CiphelRequest.Commited
			 * @static
			 * @param {Object.<string,*>} object Plain object
			 * @returns {ciphel_io.CiphelRequest.Commited} Commited
			 */
			Commited.fromObject = function fromObject(object) {
				if (object instanceof $root.ciphel_io.CiphelRequest.Commited)
					return object;
				return new $root.ciphel_io.CiphelRequest.Commited();
			};

			/**
			 * Creates a plain object from a Commited message. Also converts values to other types if specified.
			 * @function toObject
			 * @memberof ciphel_io.CiphelRequest.Commited
			 * @static
			 * @param {ciphel_io.CiphelRequest.Commited} message Commited
			 * @param {$protobuf.IConversionOptions} [options] Conversion options
			 * @returns {Object.<string,*>} Plain object
			 */
			Commited.toObject = function toObject() {
				return {};
			};

			/**
			 * Converts this Commited to JSON.
			 * @function toJSON
			 * @memberof ciphel_io.CiphelRequest.Commited
			 * @instance
			 * @returns {Object.<string,*>} JSON object
			 */
			Commited.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(
					this,
					$protobuf.util.toJSONOptions
				);
			};

			/**
			 * Gets the default type url for Commited
			 * @function getTypeUrl
			 * @memberof ciphel_io.CiphelRequest.Commited
			 * @static
			 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
			 * @returns {string} The default type url
			 */
			Commited.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
				if (typeUrlPrefix === undefined) {
					typeUrlPrefix = "type.googleapis.com";
				}
				return typeUrlPrefix + "/ciphel_io.CiphelRequest.Commited";
			};

			return Commited;
		})();

		CiphelRequest.Reverted = (function () {
			/**
			 * Properties of a Reverted.
			 * @memberof ciphel_io.CiphelRequest
			 * @interface IReverted
			 */

			/**
			 * Constructs a new Reverted.
			 * @memberof ciphel_io.CiphelRequest
			 * @classdesc Represents a Reverted.
			 * @implements IReverted
			 * @constructor
			 * @param {ciphel_io.CiphelRequest.IReverted=} [properties] Properties to set
			 */
			function Reverted(properties) {
				if (properties)
					for (
						let keys = Object.keys(properties), i = 0;
						i < keys.length;
						++i
					)
						if (properties[keys[i]] != null)
							this[keys[i]] = properties[keys[i]];
			}

			/**
			 * Creates a new Reverted instance using the specified properties.
			 * @function create
			 * @memberof ciphel_io.CiphelRequest.Reverted
			 * @static
			 * @param {ciphel_io.CiphelRequest.IReverted=} [properties] Properties to set
			 * @returns {ciphel_io.CiphelRequest.Reverted} Reverted instance
			 */
			Reverted.create = function create(properties) {
				return new Reverted(properties);
			};

			/**
			 * Encodes the specified Reverted message. Does not implicitly {@link ciphel_io.CiphelRequest.Reverted.verify|verify} messages.
			 * @function encode
			 * @memberof ciphel_io.CiphelRequest.Reverted
			 * @static
			 * @param {ciphel_io.CiphelRequest.IReverted} message Reverted message or plain object to encode
			 * @param {$protobuf.Writer} [writer] Writer to encode to
			 * @returns {$protobuf.Writer} Writer
			 */
			Reverted.encode = function encode(message, writer) {
				if (!writer) writer = $Writer.create();
				return writer;
			};

			/**
			 * Encodes the specified Reverted message, length delimited. Does not implicitly {@link ciphel_io.CiphelRequest.Reverted.verify|verify} messages.
			 * @function encodeDelimited
			 * @memberof ciphel_io.CiphelRequest.Reverted
			 * @static
			 * @param {ciphel_io.CiphelRequest.IReverted} message Reverted message or plain object to encode
			 * @param {$protobuf.Writer} [writer] Writer to encode to
			 * @returns {$protobuf.Writer} Writer
			 */
			Reverted.encodeDelimited = function encodeDelimited(
				message,
				writer
			) {
				return this.encode(message, writer).ldelim();
			};

			/**
			 * Decodes a Reverted message from the specified reader or buffer.
			 * @function decode
			 * @memberof ciphel_io.CiphelRequest.Reverted
			 * @static
			 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
			 * @param {number} [length] Message length if known beforehand
			 * @returns {ciphel_io.CiphelRequest.Reverted} Reverted
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			Reverted.decode = function decode(reader, length) {
				if (!(reader instanceof $Reader))
					reader = $Reader.create(reader);
				let end =
						length === undefined ? reader.len : reader.pos + length,
					message = new $root.ciphel_io.CiphelRequest.Reverted();
				while (reader.pos < end) {
					let tag = reader.uint32();
					switch (tag >>> 3) {
						default:
							reader.skipType(tag & 7);
							break;
					}
				}
				return message;
			};

			/**
			 * Decodes a Reverted message from the specified reader or buffer, length delimited.
			 * @function decodeDelimited
			 * @memberof ciphel_io.CiphelRequest.Reverted
			 * @static
			 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
			 * @returns {ciphel_io.CiphelRequest.Reverted} Reverted
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			Reverted.decodeDelimited = function decodeDelimited(reader) {
				if (!(reader instanceof $Reader)) reader = new $Reader(reader);
				return this.decode(reader, reader.uint32());
			};

			/**
			 * Verifies a Reverted message.
			 * @function verify
			 * @memberof ciphel_io.CiphelRequest.Reverted
			 * @static
			 * @param {Object.<string,*>} message Plain object to verify
			 * @returns {string|null} `null` if valid, otherwise the reason why it is not
			 */
			Reverted.verify = function verify(message) {
				if (typeof message !== "object" || message === null)
					return "object expected";
				return null;
			};

			/**
			 * Creates a Reverted message from a plain object. Also converts values to their respective internal types.
			 * @function fromObject
			 * @memberof ciphel_io.CiphelRequest.Reverted
			 * @static
			 * @param {Object.<string,*>} object Plain object
			 * @returns {ciphel_io.CiphelRequest.Reverted} Reverted
			 */
			Reverted.fromObject = function fromObject(object) {
				if (object instanceof $root.ciphel_io.CiphelRequest.Reverted)
					return object;
				return new $root.ciphel_io.CiphelRequest.Reverted();
			};

			/**
			 * Creates a plain object from a Reverted message. Also converts values to other types if specified.
			 * @function toObject
			 * @memberof ciphel_io.CiphelRequest.Reverted
			 * @static
			 * @param {ciphel_io.CiphelRequest.Reverted} message Reverted
			 * @param {$protobuf.IConversionOptions} [options] Conversion options
			 * @returns {Object.<string,*>} Plain object
			 */
			Reverted.toObject = function toObject() {
				return {};
			};

			/**
			 * Converts this Reverted to JSON.
			 * @function toJSON
			 * @memberof ciphel_io.CiphelRequest.Reverted
			 * @instance
			 * @returns {Object.<string,*>} JSON object
			 */
			Reverted.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(
					this,
					$protobuf.util.toJSONOptions
				);
			};

			/**
			 * Gets the default type url for Reverted
			 * @function getTypeUrl
			 * @memberof ciphel_io.CiphelRequest.Reverted
			 * @static
			 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
			 * @returns {string} The default type url
			 */
			Reverted.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
				if (typeUrlPrefix === undefined) {
					typeUrlPrefix = "type.googleapis.com";
				}
				return typeUrlPrefix + "/ciphel_io.CiphelRequest.Reverted";
			};

			return Reverted;
		})();

		CiphelRequest.Pushed = (function () {
			/**
			 * Properties of a Pushed.
			 * @memberof ciphel_io.CiphelRequest
			 * @interface IPushed
			 */

			/**
			 * Constructs a new Pushed.
			 * @memberof ciphel_io.CiphelRequest
			 * @classdesc Represents a Pushed.
			 * @implements IPushed
			 * @constructor
			 * @param {ciphel_io.CiphelRequest.IPushed=} [properties] Properties to set
			 */
			function Pushed(properties) {
				if (properties)
					for (
						let keys = Object.keys(properties), i = 0;
						i < keys.length;
						++i
					)
						if (properties[keys[i]] != null)
							this[keys[i]] = properties[keys[i]];
			}

			/**
			 * Creates a new Pushed instance using the specified properties.
			 * @function create
			 * @memberof ciphel_io.CiphelRequest.Pushed
			 * @static
			 * @param {ciphel_io.CiphelRequest.IPushed=} [properties] Properties to set
			 * @returns {ciphel_io.CiphelRequest.Pushed} Pushed instance
			 */
			Pushed.create = function create(properties) {
				return new Pushed(properties);
			};

			/**
			 * Encodes the specified Pushed message. Does not implicitly {@link ciphel_io.CiphelRequest.Pushed.verify|verify} messages.
			 * @function encode
			 * @memberof ciphel_io.CiphelRequest.Pushed
			 * @static
			 * @param {ciphel_io.CiphelRequest.IPushed} message Pushed message or plain object to encode
			 * @param {$protobuf.Writer} [writer] Writer to encode to
			 * @returns {$protobuf.Writer} Writer
			 */
			Pushed.encode = function encode(message, writer) {
				if (!writer) writer = $Writer.create();
				return writer;
			};

			/**
			 * Encodes the specified Pushed message, length delimited. Does not implicitly {@link ciphel_io.CiphelRequest.Pushed.verify|verify} messages.
			 * @function encodeDelimited
			 * @memberof ciphel_io.CiphelRequest.Pushed
			 * @static
			 * @param {ciphel_io.CiphelRequest.IPushed} message Pushed message or plain object to encode
			 * @param {$protobuf.Writer} [writer] Writer to encode to
			 * @returns {$protobuf.Writer} Writer
			 */
			Pushed.encodeDelimited = function encodeDelimited(message, writer) {
				return this.encode(message, writer).ldelim();
			};

			/**
			 * Decodes a Pushed message from the specified reader or buffer.
			 * @function decode
			 * @memberof ciphel_io.CiphelRequest.Pushed
			 * @static
			 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
			 * @param {number} [length] Message length if known beforehand
			 * @returns {ciphel_io.CiphelRequest.Pushed} Pushed
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			Pushed.decode = function decode(reader, length) {
				if (!(reader instanceof $Reader))
					reader = $Reader.create(reader);
				let end =
						length === undefined ? reader.len : reader.pos + length,
					message = new $root.ciphel_io.CiphelRequest.Pushed();
				while (reader.pos < end) {
					let tag = reader.uint32();
					switch (tag >>> 3) {
						default:
							reader.skipType(tag & 7);
							break;
					}
				}
				return message;
			};

			/**
			 * Decodes a Pushed message from the specified reader or buffer, length delimited.
			 * @function decodeDelimited
			 * @memberof ciphel_io.CiphelRequest.Pushed
			 * @static
			 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
			 * @returns {ciphel_io.CiphelRequest.Pushed} Pushed
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			Pushed.decodeDelimited = function decodeDelimited(reader) {
				if (!(reader instanceof $Reader)) reader = new $Reader(reader);
				return this.decode(reader, reader.uint32());
			};

			/**
			 * Verifies a Pushed message.
			 * @function verify
			 * @memberof ciphel_io.CiphelRequest.Pushed
			 * @static
			 * @param {Object.<string,*>} message Plain object to verify
			 * @returns {string|null} `null` if valid, otherwise the reason why it is not
			 */
			Pushed.verify = function verify(message) {
				if (typeof message !== "object" || message === null)
					return "object expected";
				return null;
			};

			/**
			 * Creates a Pushed message from a plain object. Also converts values to their respective internal types.
			 * @function fromObject
			 * @memberof ciphel_io.CiphelRequest.Pushed
			 * @static
			 * @param {Object.<string,*>} object Plain object
			 * @returns {ciphel_io.CiphelRequest.Pushed} Pushed
			 */
			Pushed.fromObject = function fromObject(object) {
				if (object instanceof $root.ciphel_io.CiphelRequest.Pushed)
					return object;
				return new $root.ciphel_io.CiphelRequest.Pushed();
			};

			/**
			 * Creates a plain object from a Pushed message. Also converts values to other types if specified.
			 * @function toObject
			 * @memberof ciphel_io.CiphelRequest.Pushed
			 * @static
			 * @param {ciphel_io.CiphelRequest.Pushed} message Pushed
			 * @param {$protobuf.IConversionOptions} [options] Conversion options
			 * @returns {Object.<string,*>} Plain object
			 */
			Pushed.toObject = function toObject() {
				return {};
			};

			/**
			 * Converts this Pushed to JSON.
			 * @function toJSON
			 * @memberof ciphel_io.CiphelRequest.Pushed
			 * @instance
			 * @returns {Object.<string,*>} JSON object
			 */
			Pushed.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(
					this,
					$protobuf.util.toJSONOptions
				);
			};

			/**
			 * Gets the default type url for Pushed
			 * @function getTypeUrl
			 * @memberof ciphel_io.CiphelRequest.Pushed
			 * @static
			 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
			 * @returns {string} The default type url
			 */
			Pushed.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
				if (typeUrlPrefix === undefined) {
					typeUrlPrefix = "type.googleapis.com";
				}
				return typeUrlPrefix + "/ciphel_io.CiphelRequest.Pushed";
			};

			return Pushed;
		})();

		CiphelRequest.Spawn = (function () {
			/**
			 * Properties of a Spawn.
			 * @memberof ciphel_io.CiphelRequest
			 * @interface ISpawn
			 * @property {number|null} [cursor] Spawn cursor
			 */

			/**
			 * Constructs a new Spawn.
			 * @memberof ciphel_io.CiphelRequest
			 * @classdesc Represents a Spawn.
			 * @implements ISpawn
			 * @constructor
			 * @param {ciphel_io.CiphelRequest.ISpawn=} [properties] Properties to set
			 */
			function Spawn(properties) {
				if (properties)
					for (
						let keys = Object.keys(properties), i = 0;
						i < keys.length;
						++i
					)
						if (properties[keys[i]] != null)
							this[keys[i]] = properties[keys[i]];
			}

			/**
			 * Spawn cursor.
			 * @member {number} cursor
			 * @memberof ciphel_io.CiphelRequest.Spawn
			 * @instance
			 */
			Spawn.prototype.cursor = 0;

			/**
			 * Creates a new Spawn instance using the specified properties.
			 * @function create
			 * @memberof ciphel_io.CiphelRequest.Spawn
			 * @static
			 * @param {ciphel_io.CiphelRequest.ISpawn=} [properties] Properties to set
			 * @returns {ciphel_io.CiphelRequest.Spawn} Spawn instance
			 */
			Spawn.create = function create(properties) {
				return new Spawn(properties);
			};

			/**
			 * Encodes the specified Spawn message. Does not implicitly {@link ciphel_io.CiphelRequest.Spawn.verify|verify} messages.
			 * @function encode
			 * @memberof ciphel_io.CiphelRequest.Spawn
			 * @static
			 * @param {ciphel_io.CiphelRequest.ISpawn} message Spawn message or plain object to encode
			 * @param {$protobuf.Writer} [writer] Writer to encode to
			 * @returns {$protobuf.Writer} Writer
			 */
			Spawn.encode = function encode(message, writer) {
				if (!writer) writer = $Writer.create();
				if (
					message.cursor != null &&
					Object.hasOwnProperty.call(message, "cursor")
				)
					writer
						.uint32(/* id 1, wireType 0 =*/ 8)
						.uint32(message.cursor);
				return writer;
			};

			/**
			 * Encodes the specified Spawn message, length delimited. Does not implicitly {@link ciphel_io.CiphelRequest.Spawn.verify|verify} messages.
			 * @function encodeDelimited
			 * @memberof ciphel_io.CiphelRequest.Spawn
			 * @static
			 * @param {ciphel_io.CiphelRequest.ISpawn} message Spawn message or plain object to encode
			 * @param {$protobuf.Writer} [writer] Writer to encode to
			 * @returns {$protobuf.Writer} Writer
			 */
			Spawn.encodeDelimited = function encodeDelimited(message, writer) {
				return this.encode(message, writer).ldelim();
			};

			/**
			 * Decodes a Spawn message from the specified reader or buffer.
			 * @function decode
			 * @memberof ciphel_io.CiphelRequest.Spawn
			 * @static
			 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
			 * @param {number} [length] Message length if known beforehand
			 * @returns {ciphel_io.CiphelRequest.Spawn} Spawn
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			Spawn.decode = function decode(reader, length) {
				if (!(reader instanceof $Reader))
					reader = $Reader.create(reader);
				let end =
						length === undefined ? reader.len : reader.pos + length,
					message = new $root.ciphel_io.CiphelRequest.Spawn();
				while (reader.pos < end) {
					let tag = reader.uint32();
					switch (tag >>> 3) {
						case 1: {
							message.cursor = reader.uint32();
							break;
						}
						default:
							reader.skipType(tag & 7);
							break;
					}
				}
				return message;
			};

			/**
			 * Decodes a Spawn message from the specified reader or buffer, length delimited.
			 * @function decodeDelimited
			 * @memberof ciphel_io.CiphelRequest.Spawn
			 * @static
			 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
			 * @returns {ciphel_io.CiphelRequest.Spawn} Spawn
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			Spawn.decodeDelimited = function decodeDelimited(reader) {
				if (!(reader instanceof $Reader)) reader = new $Reader(reader);
				return this.decode(reader, reader.uint32());
			};

			/**
			 * Verifies a Spawn message.
			 * @function verify
			 * @memberof ciphel_io.CiphelRequest.Spawn
			 * @static
			 * @param {Object.<string,*>} message Plain object to verify
			 * @returns {string|null} `null` if valid, otherwise the reason why it is not
			 */
			Spawn.verify = function verify(message) {
				if (typeof message !== "object" || message === null)
					return "object expected";
				if (message.cursor != null && message.hasOwnProperty("cursor"))
					if (!$util.isInteger(message.cursor))
						return "cursor: integer expected";
				return null;
			};

			/**
			 * Creates a Spawn message from a plain object. Also converts values to their respective internal types.
			 * @function fromObject
			 * @memberof ciphel_io.CiphelRequest.Spawn
			 * @static
			 * @param {Object.<string,*>} object Plain object
			 * @returns {ciphel_io.CiphelRequest.Spawn} Spawn
			 */
			Spawn.fromObject = function fromObject(object) {
				if (object instanceof $root.ciphel_io.CiphelRequest.Spawn)
					return object;
				let message = new $root.ciphel_io.CiphelRequest.Spawn();
				if (object.cursor != null) message.cursor = object.cursor >>> 0;
				return message;
			};

			/**
			 * Creates a plain object from a Spawn message. Also converts values to other types if specified.
			 * @function toObject
			 * @memberof ciphel_io.CiphelRequest.Spawn
			 * @static
			 * @param {ciphel_io.CiphelRequest.Spawn} message Spawn
			 * @param {$protobuf.IConversionOptions} [options] Conversion options
			 * @returns {Object.<string,*>} Plain object
			 */
			Spawn.toObject = function toObject(message, options) {
				if (!options) options = {};
				let object = {};
				if (options.defaults) object.cursor = 0;
				if (message.cursor != null && message.hasOwnProperty("cursor"))
					object.cursor = message.cursor;
				return object;
			};

			/**
			 * Converts this Spawn to JSON.
			 * @function toJSON
			 * @memberof ciphel_io.CiphelRequest.Spawn
			 * @instance
			 * @returns {Object.<string,*>} JSON object
			 */
			Spawn.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(
					this,
					$protobuf.util.toJSONOptions
				);
			};

			/**
			 * Gets the default type url for Spawn
			 * @function getTypeUrl
			 * @memberof ciphel_io.CiphelRequest.Spawn
			 * @static
			 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
			 * @returns {string} The default type url
			 */
			Spawn.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
				if (typeUrlPrefix === undefined) {
					typeUrlPrefix = "type.googleapis.com";
				}
				return typeUrlPrefix + "/ciphel_io.CiphelRequest.Spawn";
			};

			return Spawn;
		})();

		CiphelRequest.Close = (function () {
			/**
			 * Properties of a Close.
			 * @memberof ciphel_io.CiphelRequest
			 * @interface IClose
			 * @property {number|null} [cursor] Close cursor
			 */

			/**
			 * Constructs a new Close.
			 * @memberof ciphel_io.CiphelRequest
			 * @classdesc Represents a Close.
			 * @implements IClose
			 * @constructor
			 * @param {ciphel_io.CiphelRequest.IClose=} [properties] Properties to set
			 */
			function Close(properties) {
				if (properties)
					for (
						let keys = Object.keys(properties), i = 0;
						i < keys.length;
						++i
					)
						if (properties[keys[i]] != null)
							this[keys[i]] = properties[keys[i]];
			}

			/**
			 * Close cursor.
			 * @member {number} cursor
			 * @memberof ciphel_io.CiphelRequest.Close
			 * @instance
			 */
			Close.prototype.cursor = 0;

			/**
			 * Creates a new Close instance using the specified properties.
			 * @function create
			 * @memberof ciphel_io.CiphelRequest.Close
			 * @static
			 * @param {ciphel_io.CiphelRequest.IClose=} [properties] Properties to set
			 * @returns {ciphel_io.CiphelRequest.Close} Close instance
			 */
			Close.create = function create(properties) {
				return new Close(properties);
			};

			/**
			 * Encodes the specified Close message. Does not implicitly {@link ciphel_io.CiphelRequest.Close.verify|verify} messages.
			 * @function encode
			 * @memberof ciphel_io.CiphelRequest.Close
			 * @static
			 * @param {ciphel_io.CiphelRequest.IClose} message Close message or plain object to encode
			 * @param {$protobuf.Writer} [writer] Writer to encode to
			 * @returns {$protobuf.Writer} Writer
			 */
			Close.encode = function encode(message, writer) {
				if (!writer) writer = $Writer.create();
				if (
					message.cursor != null &&
					Object.hasOwnProperty.call(message, "cursor")
				)
					writer
						.uint32(/* id 1, wireType 0 =*/ 8)
						.uint32(message.cursor);
				return writer;
			};

			/**
			 * Encodes the specified Close message, length delimited. Does not implicitly {@link ciphel_io.CiphelRequest.Close.verify|verify} messages.
			 * @function encodeDelimited
			 * @memberof ciphel_io.CiphelRequest.Close
			 * @static
			 * @param {ciphel_io.CiphelRequest.IClose} message Close message or plain object to encode
			 * @param {$protobuf.Writer} [writer] Writer to encode to
			 * @returns {$protobuf.Writer} Writer
			 */
			Close.encodeDelimited = function encodeDelimited(message, writer) {
				return this.encode(message, writer).ldelim();
			};

			/**
			 * Decodes a Close message from the specified reader or buffer.
			 * @function decode
			 * @memberof ciphel_io.CiphelRequest.Close
			 * @static
			 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
			 * @param {number} [length] Message length if known beforehand
			 * @returns {ciphel_io.CiphelRequest.Close} Close
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			Close.decode = function decode(reader, length) {
				if (!(reader instanceof $Reader))
					reader = $Reader.create(reader);
				let end =
						length === undefined ? reader.len : reader.pos + length,
					message = new $root.ciphel_io.CiphelRequest.Close();
				while (reader.pos < end) {
					let tag = reader.uint32();
					switch (tag >>> 3) {
						case 1: {
							message.cursor = reader.uint32();
							break;
						}
						default:
							reader.skipType(tag & 7);
							break;
					}
				}
				return message;
			};

			/**
			 * Decodes a Close message from the specified reader or buffer, length delimited.
			 * @function decodeDelimited
			 * @memberof ciphel_io.CiphelRequest.Close
			 * @static
			 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
			 * @returns {ciphel_io.CiphelRequest.Close} Close
			 * @throws {Error} If the payload is not a reader or valid buffer
			 * @throws {$protobuf.util.ProtocolError} If required fields are missing
			 */
			Close.decodeDelimited = function decodeDelimited(reader) {
				if (!(reader instanceof $Reader)) reader = new $Reader(reader);
				return this.decode(reader, reader.uint32());
			};

			/**
			 * Verifies a Close message.
			 * @function verify
			 * @memberof ciphel_io.CiphelRequest.Close
			 * @static
			 * @param {Object.<string,*>} message Plain object to verify
			 * @returns {string|null} `null` if valid, otherwise the reason why it is not
			 */
			Close.verify = function verify(message) {
				if (typeof message !== "object" || message === null)
					return "object expected";
				if (message.cursor != null && message.hasOwnProperty("cursor"))
					if (!$util.isInteger(message.cursor))
						return "cursor: integer expected";
				return null;
			};

			/**
			 * Creates a Close message from a plain object. Also converts values to their respective internal types.
			 * @function fromObject
			 * @memberof ciphel_io.CiphelRequest.Close
			 * @static
			 * @param {Object.<string,*>} object Plain object
			 * @returns {ciphel_io.CiphelRequest.Close} Close
			 */
			Close.fromObject = function fromObject(object) {
				if (object instanceof $root.ciphel_io.CiphelRequest.Close)
					return object;
				let message = new $root.ciphel_io.CiphelRequest.Close();
				if (object.cursor != null) message.cursor = object.cursor >>> 0;
				return message;
			};

			/**
			 * Creates a plain object from a Close message. Also converts values to other types if specified.
			 * @function toObject
			 * @memberof ciphel_io.CiphelRequest.Close
			 * @static
			 * @param {ciphel_io.CiphelRequest.Close} message Close
			 * @param {$protobuf.IConversionOptions} [options] Conversion options
			 * @returns {Object.<string,*>} Plain object
			 */
			Close.toObject = function toObject(message, options) {
				if (!options) options = {};
				let object = {};
				if (options.defaults) object.cursor = 0;
				if (message.cursor != null && message.hasOwnProperty("cursor"))
					object.cursor = message.cursor;
				return object;
			};

			/**
			 * Converts this Close to JSON.
			 * @function toJSON
			 * @memberof ciphel_io.CiphelRequest.Close
			 * @instance
			 * @returns {Object.<string,*>} JSON object
			 */
			Close.prototype.toJSON = function toJSON() {
				return this.constructor.toObject(
					this,
					$protobuf.util.toJSONOptions
				);
			};

			/**
			 * Gets the default type url for Close
			 * @function getTypeUrl
			 * @memberof ciphel_io.CiphelRequest.Close
			 * @static
			 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
			 * @returns {string} The default type url
			 */
			Close.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
				if (typeUrlPrefix === undefined) {
					typeUrlPrefix = "type.googleapis.com";
				}
				return typeUrlPrefix + "/ciphel_io.CiphelRequest.Close";
			};

			return Close;
		})();

		return CiphelRequest;
	})();

	ciphel_io.StdIO = (function () {
		/**
		 * Properties of a StdIO.
		 * @memberof ciphel_io
		 * @interface IStdIO
		 * @property {ciphel_io.IStdOut|null} [out] StdIO out
		 * @property {ciphel_io.IStdErr|null} [err] StdIO err
		 * @property {ciphel_io.IStdIn|null} ["in"] StdIO in
		 * @property {ciphel_io.ICiphelRequest|null} [request] StdIO request
		 * @property {ciphel_io.ICommand|null} [command] StdIO command
		 */

		/**
		 * Constructs a new StdIO.
		 * @memberof ciphel_io
		 * @classdesc Represents a StdIO.
		 * @implements IStdIO
		 * @constructor
		 * @param {ciphel_io.IStdIO=} [properties] Properties to set
		 */
		function StdIO(properties) {
			if (properties)
				for (
					let keys = Object.keys(properties), i = 0;
					i < keys.length;
					++i
				)
					if (properties[keys[i]] != null)
						this[keys[i]] = properties[keys[i]];
		}

		/**
		 * StdIO out.
		 * @member {ciphel_io.IStdOut|null|undefined} out
		 * @memberof ciphel_io.StdIO
		 * @instance
		 */
		StdIO.prototype.out = null;

		/**
		 * StdIO err.
		 * @member {ciphel_io.IStdErr|null|undefined} err
		 * @memberof ciphel_io.StdIO
		 * @instance
		 */
		StdIO.prototype.err = null;

		/**
		 * StdIO in.
		 * @member {ciphel_io.IStdIn|null|undefined} in
		 * @memberof ciphel_io.StdIO
		 * @instance
		 */
		StdIO.prototype["in"] = null;

		/**
		 * StdIO request.
		 * @member {ciphel_io.ICiphelRequest|null|undefined} request
		 * @memberof ciphel_io.StdIO
		 * @instance
		 */
		StdIO.prototype.request = null;

		/**
		 * StdIO command.
		 * @member {ciphel_io.ICommand|null|undefined} command
		 * @memberof ciphel_io.StdIO
		 * @instance
		 */
		StdIO.prototype.command = null;

		// OneOf field names bound to virtual getters and setters
		let $oneOfFields;

		/**
		 * StdIO stdType.
		 * @member {"out"|"err"|"in"|"request"|"command"|undefined} stdType
		 * @memberof ciphel_io.StdIO
		 * @instance
		 */
		Object.defineProperty(StdIO.prototype, "stdType", {
			get: $util.oneOfGetter(
				($oneOfFields = ["out", "err", "in", "request", "command"])
			),
			set: $util.oneOfSetter($oneOfFields),
		});

		/**
		 * Creates a new StdIO instance using the specified properties.
		 * @function create
		 * @memberof ciphel_io.StdIO
		 * @static
		 * @param {ciphel_io.IStdIO=} [properties] Properties to set
		 * @returns {ciphel_io.StdIO} StdIO instance
		 */
		StdIO.create = function create(properties) {
			return new StdIO(properties);
		};

		/**
		 * Encodes the specified StdIO message. Does not implicitly {@link ciphel_io.StdIO.verify|verify} messages.
		 * @function encode
		 * @memberof ciphel_io.StdIO
		 * @static
		 * @param {ciphel_io.IStdIO} message StdIO message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		StdIO.encode = function encode(message, writer) {
			if (!writer) writer = $Writer.create();
			if (
				message.out != null &&
				Object.hasOwnProperty.call(message, "out")
			)
				$root.ciphel_io.StdOut.encode(
					message.out,
					writer.uint32(/* id 1, wireType 2 =*/ 10).fork()
				).ldelim();
			if (
				message.err != null &&
				Object.hasOwnProperty.call(message, "err")
			)
				$root.ciphel_io.StdErr.encode(
					message.err,
					writer.uint32(/* id 2, wireType 2 =*/ 18).fork()
				).ldelim();
			if (
				message["in"] != null &&
				Object.hasOwnProperty.call(message, "in")
			)
				$root.ciphel_io.StdIn.encode(
					message["in"],
					writer.uint32(/* id 3, wireType 2 =*/ 26).fork()
				).ldelim();
			if (
				message.request != null &&
				Object.hasOwnProperty.call(message, "request")
			)
				$root.ciphel_io.CiphelRequest.encode(
					message.request,
					writer.uint32(/* id 4, wireType 2 =*/ 34).fork()
				).ldelim();
			if (
				message.command != null &&
				Object.hasOwnProperty.call(message, "command")
			)
				$root.ciphel_io.Command.encode(
					message.command,
					writer.uint32(/* id 5, wireType 2 =*/ 42).fork()
				).ldelim();
			return writer;
		};

		/**
		 * Encodes the specified StdIO message, length delimited. Does not implicitly {@link ciphel_io.StdIO.verify|verify} messages.
		 * @function encodeDelimited
		 * @memberof ciphel_io.StdIO
		 * @static
		 * @param {ciphel_io.IStdIO} message StdIO message or plain object to encode
		 * @param {$protobuf.Writer} [writer] Writer to encode to
		 * @returns {$protobuf.Writer} Writer
		 */
		StdIO.encodeDelimited = function encodeDelimited(message, writer) {
			return this.encode(message, writer).ldelim();
		};

		/**
		 * Decodes a StdIO message from the specified reader or buffer.
		 * @function decode
		 * @memberof ciphel_io.StdIO
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @param {number} [length] Message length if known beforehand
		 * @returns {ciphel_io.StdIO} StdIO
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		StdIO.decode = function decode(reader, length) {
			if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
			let end = length === undefined ? reader.len : reader.pos + length,
				message = new $root.ciphel_io.StdIO();
			while (reader.pos < end) {
				let tag = reader.uint32();
				switch (tag >>> 3) {
					case 1: {
						message.out = $root.ciphel_io.StdOut.decode(
							reader,
							reader.uint32()
						);
						break;
					}
					case 2: {
						message.err = $root.ciphel_io.StdErr.decode(
							reader,
							reader.uint32()
						);
						break;
					}
					case 3: {
						message["in"] = $root.ciphel_io.StdIn.decode(
							reader,
							reader.uint32()
						);
						break;
					}
					case 4: {
						message.request = $root.ciphel_io.CiphelRequest.decode(
							reader,
							reader.uint32()
						);
						break;
					}
					case 5: {
						message.command = $root.ciphel_io.Command.decode(
							reader,
							reader.uint32()
						);
						break;
					}
					default:
						reader.skipType(tag & 7);
						break;
				}
			}
			return message;
		};

		/**
		 * Decodes a StdIO message from the specified reader or buffer, length delimited.
		 * @function decodeDelimited
		 * @memberof ciphel_io.StdIO
		 * @static
		 * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
		 * @returns {ciphel_io.StdIO} StdIO
		 * @throws {Error} If the payload is not a reader or valid buffer
		 * @throws {$protobuf.util.ProtocolError} If required fields are missing
		 */
		StdIO.decodeDelimited = function decodeDelimited(reader) {
			if (!(reader instanceof $Reader)) reader = new $Reader(reader);
			return this.decode(reader, reader.uint32());
		};

		/**
		 * Verifies a StdIO message.
		 * @function verify
		 * @memberof ciphel_io.StdIO
		 * @static
		 * @param {Object.<string,*>} message Plain object to verify
		 * @returns {string|null} `null` if valid, otherwise the reason why it is not
		 */
		StdIO.verify = function verify(message) {
			if (typeof message !== "object" || message === null)
				return "object expected";
			let properties = {};
			if (message.out != null && message.hasOwnProperty("out")) {
				properties.stdType = 1;
				{
					let error = $root.ciphel_io.StdOut.verify(message.out);
					if (error) return "out." + error;
				}
			}
			if (message.err != null && message.hasOwnProperty("err")) {
				if (properties.stdType === 1) return "stdType: multiple values";
				properties.stdType = 1;
				{
					let error = $root.ciphel_io.StdErr.verify(message.err);
					if (error) return "err." + error;
				}
			}
			if (message["in"] != null && message.hasOwnProperty("in")) {
				if (properties.stdType === 1) return "stdType: multiple values";
				properties.stdType = 1;
				{
					let error = $root.ciphel_io.StdIn.verify(message["in"]);
					if (error) return "in." + error;
				}
			}
			if (message.request != null && message.hasOwnProperty("request")) {
				if (properties.stdType === 1) return "stdType: multiple values";
				properties.stdType = 1;
				{
					let error = $root.ciphel_io.CiphelRequest.verify(
						message.request
					);
					if (error) return "request." + error;
				}
			}
			if (message.command != null && message.hasOwnProperty("command")) {
				if (properties.stdType === 1) return "stdType: multiple values";
				properties.stdType = 1;
				{
					let error = $root.ciphel_io.Command.verify(message.command);
					if (error) return "command." + error;
				}
			}
			return null;
		};

		/**
		 * Creates a StdIO message from a plain object. Also converts values to their respective internal types.
		 * @function fromObject
		 * @memberof ciphel_io.StdIO
		 * @static
		 * @param {Object.<string,*>} object Plain object
		 * @returns {ciphel_io.StdIO} StdIO
		 */
		StdIO.fromObject = function fromObject(object) {
			if (object instanceof $root.ciphel_io.StdIO) return object;
			let message = new $root.ciphel_io.StdIO();
			if (object.out != null) {
				if (typeof object.out !== "object")
					throw TypeError(".ciphel_io.StdIO.out: object expected");
				message.out = $root.ciphel_io.StdOut.fromObject(object.out);
			}
			if (object.err != null) {
				if (typeof object.err !== "object")
					throw TypeError(".ciphel_io.StdIO.err: object expected");
				message.err = $root.ciphel_io.StdErr.fromObject(object.err);
			}
			if (object["in"] != null) {
				if (typeof object["in"] !== "object")
					throw TypeError(".ciphel_io.StdIO.in: object expected");
				message["in"] = $root.ciphel_io.StdIn.fromObject(object["in"]);
			}
			if (object.request != null) {
				if (typeof object.request !== "object")
					throw TypeError(
						".ciphel_io.StdIO.request: object expected"
					);
				message.request = $root.ciphel_io.CiphelRequest.fromObject(
					object.request
				);
			}
			if (object.command != null) {
				if (typeof object.command !== "object")
					throw TypeError(
						".ciphel_io.StdIO.command: object expected"
					);
				message.command = $root.ciphel_io.Command.fromObject(
					object.command
				);
			}
			return message;
		};

		/**
		 * Creates a plain object from a StdIO message. Also converts values to other types if specified.
		 * @function toObject
		 * @memberof ciphel_io.StdIO
		 * @static
		 * @param {ciphel_io.StdIO} message StdIO
		 * @param {$protobuf.IConversionOptions} [options] Conversion options
		 * @returns {Object.<string,*>} Plain object
		 */
		StdIO.toObject = function toObject(message, options) {
			if (!options) options = {};
			let object = {};
			if (message.out != null && message.hasOwnProperty("out")) {
				object.out = $root.ciphel_io.StdOut.toObject(
					message.out,
					options
				);
				if (options.oneofs) object.stdType = "out";
			}
			if (message.err != null && message.hasOwnProperty("err")) {
				object.err = $root.ciphel_io.StdErr.toObject(
					message.err,
					options
				);
				if (options.oneofs) object.stdType = "err";
			}
			if (message["in"] != null && message.hasOwnProperty("in")) {
				object["in"] = $root.ciphel_io.StdIn.toObject(
					message["in"],
					options
				);
				if (options.oneofs) object.stdType = "in";
			}
			if (message.request != null && message.hasOwnProperty("request")) {
				object.request = $root.ciphel_io.CiphelRequest.toObject(
					message.request,
					options
				);
				if (options.oneofs) object.stdType = "request";
			}
			if (message.command != null && message.hasOwnProperty("command")) {
				object.command = $root.ciphel_io.Command.toObject(
					message.command,
					options
				);
				if (options.oneofs) object.stdType = "command";
			}
			return object;
		};

		/**
		 * Converts this StdIO to JSON.
		 * @function toJSON
		 * @memberof ciphel_io.StdIO
		 * @instance
		 * @returns {Object.<string,*>} JSON object
		 */
		StdIO.prototype.toJSON = function toJSON() {
			return this.constructor.toObject(
				this,
				$protobuf.util.toJSONOptions
			);
		};

		/**
		 * Gets the default type url for StdIO
		 * @function getTypeUrl
		 * @memberof ciphel_io.StdIO
		 * @static
		 * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
		 * @returns {string} The default type url
		 */
		StdIO.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
			if (typeUrlPrefix === undefined) {
				typeUrlPrefix = "type.googleapis.com";
			}
			return typeUrlPrefix + "/ciphel_io.StdIO";
		};

		return StdIO;
	})();

	return ciphel_io;
})());

export { $root as default };
