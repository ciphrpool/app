/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
import * as $protobuf from "protobufjs/minimal";

// Common aliases
const $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
const $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

export const ciphel_io = $root.ciphel_io = (() => {

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
    ciphel_io.PlayerSide = (function() {
        const valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "DEFAULT"] = 0;
        values[valuesById[1] = "P1"] = 1;
        values[valuesById[2] = "P2"] = 2;
        return values;
    })();

    ciphel_io.SrcCode = (function() {

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
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
            if (!writer)
                writer = $Writer.create();
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.content);
            if (message.side != null && Object.hasOwnProperty.call(message, "side"))
                writer.uint32(/* id 2, wireType 0 =*/16).int32(message.side);
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
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ciphel_io.SrcCode();
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
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
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
            if (object instanceof $root.ciphel_io.SrcCode)
                return object;
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
            if (!options)
                options = {};
            let object = {};
            if (options.defaults) {
                object.content = "";
                object.side = options.enums === String ? "DEFAULT" : 0;
            }
            if (message.content != null && message.hasOwnProperty("content"))
                object.content = message.content;
            if (message.side != null && message.hasOwnProperty("side"))
                object.side = options.enums === String ? $root.ciphel_io.PlayerSide[message.side] === undefined ? message.side : $root.ciphel_io.PlayerSide[message.side] : message.side;
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
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
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

    ciphel_io.Command = (function() {

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
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
            get: $util.oneOfGetter($oneOfFields = ["src"]),
            set: $util.oneOfSetter($oneOfFields)
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
            if (!writer)
                writer = $Writer.create();
            if (message.cmd != null && Object.hasOwnProperty.call(message, "cmd"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.cmd);
            if (message.args != null && message.args.length)
                for (let i = 0; i < message.args.length; ++i)
                    writer.uint32(/* id 2, wireType 2 =*/18).string(message.args[i]);
            if (message.src != null && Object.hasOwnProperty.call(message, "src"))
                $root.ciphel_io.SrcCode.encode(message.src, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
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
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ciphel_io.Command();
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
                        message.src = $root.ciphel_io.SrcCode.decode(reader, reader.uint32());
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
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
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
                if (!$util.isString(message.cmd))
                    return "cmd: string expected";
            if (message.args != null && message.hasOwnProperty("args")) {
                if (!Array.isArray(message.args))
                    return "args: array expected";
                for (let i = 0; i < message.args.length; ++i)
                    if (!$util.isString(message.args[i]))
                        return "args: string[] expected";
            }
            if (message.src != null && message.hasOwnProperty("src")) {
                properties._src = 1;
                {
                    let error = $root.ciphel_io.SrcCode.verify(message.src);
                    if (error)
                        return "src." + error;
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
            if (object instanceof $root.ciphel_io.Command)
                return object;
            let message = new $root.ciphel_io.Command();
            if (object.cmd != null)
                message.cmd = String(object.cmd);
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
            if (!options)
                options = {};
            let object = {};
            if (options.arrays || options.defaults)
                object.args = [];
            if (options.defaults)
                object.cmd = "";
            if (message.cmd != null && message.hasOwnProperty("cmd"))
                object.cmd = message.cmd;
            if (message.args && message.args.length) {
                object.args = [];
                for (let j = 0; j < message.args.length; ++j)
                    object.args[j] = message.args[j];
            }
            if (message.src != null && message.hasOwnProperty("src")) {
                object.src = $root.ciphel_io.SrcCode.toObject(message.src, options);
                if (options.oneofs)
                    object._src = "src";
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
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
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

    ciphel_io.StdOut = (function() {

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
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
            if (!writer)
                writer = $Writer.create();
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.content);
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
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ciphel_io.StdOut();
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
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
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
            if (object instanceof $root.ciphel_io.StdOut)
                return object;
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
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.content = "";
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
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
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

    ciphel_io.StdErr = (function() {

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
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
            if (!writer)
                writer = $Writer.create();
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.content);
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
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ciphel_io.StdErr();
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
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
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
            if (object instanceof $root.ciphel_io.StdErr)
                return object;
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
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.content = "";
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
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
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

    ciphel_io.StdIn = (function() {

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
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
            if (!writer)
                writer = $Writer.create();
            if (message.content != null && Object.hasOwnProperty.call(message, "content"))
                writer.uint32(/* id 1, wireType 2 =*/10).string(message.content);
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
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ciphel_io.StdIn();
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
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
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
            if (object instanceof $root.ciphel_io.StdIn)
                return object;
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
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.content = "";
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
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
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

    ciphel_io.StdInRequest = (function() {

        /**
         * Properties of a StdInRequest.
         * @memberof ciphel_io
         * @interface IStdInRequest
         * @property {boolean|null} [flag] StdInRequest flag
         */

        /**
         * Constructs a new StdInRequest.
         * @memberof ciphel_io
         * @classdesc Represents a StdInRequest.
         * @implements IStdInRequest
         * @constructor
         * @param {ciphel_io.IStdInRequest=} [properties] Properties to set
         */
        function StdInRequest(properties) {
            if (properties)
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * StdInRequest flag.
         * @member {boolean} flag
         * @memberof ciphel_io.StdInRequest
         * @instance
         */
        StdInRequest.prototype.flag = false;

        /**
         * Creates a new StdInRequest instance using the specified properties.
         * @function create
         * @memberof ciphel_io.StdInRequest
         * @static
         * @param {ciphel_io.IStdInRequest=} [properties] Properties to set
         * @returns {ciphel_io.StdInRequest} StdInRequest instance
         */
        StdInRequest.create = function create(properties) {
            return new StdInRequest(properties);
        };

        /**
         * Encodes the specified StdInRequest message. Does not implicitly {@link ciphel_io.StdInRequest.verify|verify} messages.
         * @function encode
         * @memberof ciphel_io.StdInRequest
         * @static
         * @param {ciphel_io.IStdInRequest} message StdInRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StdInRequest.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.flag != null && Object.hasOwnProperty.call(message, "flag"))
                writer.uint32(/* id 1, wireType 0 =*/8).bool(message.flag);
            return writer;
        };

        /**
         * Encodes the specified StdInRequest message, length delimited. Does not implicitly {@link ciphel_io.StdInRequest.verify|verify} messages.
         * @function encodeDelimited
         * @memberof ciphel_io.StdInRequest
         * @static
         * @param {ciphel_io.IStdInRequest} message StdInRequest message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        StdInRequest.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a StdInRequest message from the specified reader or buffer.
         * @function decode
         * @memberof ciphel_io.StdInRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {ciphel_io.StdInRequest} StdInRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StdInRequest.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ciphel_io.StdInRequest();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.flag = reader.bool();
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
         * Decodes a StdInRequest message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof ciphel_io.StdInRequest
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {ciphel_io.StdInRequest} StdInRequest
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        StdInRequest.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a StdInRequest message.
         * @function verify
         * @memberof ciphel_io.StdInRequest
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        StdInRequest.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.flag != null && message.hasOwnProperty("flag"))
                if (typeof message.flag !== "boolean")
                    return "flag: boolean expected";
            return null;
        };

        /**
         * Creates a StdInRequest message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof ciphel_io.StdInRequest
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {ciphel_io.StdInRequest} StdInRequest
         */
        StdInRequest.fromObject = function fromObject(object) {
            if (object instanceof $root.ciphel_io.StdInRequest)
                return object;
            let message = new $root.ciphel_io.StdInRequest();
            if (object.flag != null)
                message.flag = Boolean(object.flag);
            return message;
        };

        /**
         * Creates a plain object from a StdInRequest message. Also converts values to other types if specified.
         * @function toObject
         * @memberof ciphel_io.StdInRequest
         * @static
         * @param {ciphel_io.StdInRequest} message StdInRequest
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        StdInRequest.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            let object = {};
            if (options.defaults)
                object.flag = false;
            if (message.flag != null && message.hasOwnProperty("flag"))
                object.flag = message.flag;
            return object;
        };

        /**
         * Converts this StdInRequest to JSON.
         * @function toJSON
         * @memberof ciphel_io.StdInRequest
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        StdInRequest.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for StdInRequest
         * @function getTypeUrl
         * @memberof ciphel_io.StdInRequest
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        StdInRequest.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/ciphel_io.StdInRequest";
        };

        return StdInRequest;
    })();

    ciphel_io.StdIO = (function() {

        /**
         * Properties of a StdIO.
         * @memberof ciphel_io
         * @interface IStdIO
         * @property {ciphel_io.IStdOut|null} [out] StdIO out
         * @property {ciphel_io.IStdErr|null} [err] StdIO err
         * @property {ciphel_io.IStdIn|null} ["in"] StdIO in
         * @property {ciphel_io.IStdInRequest|null} [inReq] StdIO inReq
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
                for (let keys = Object.keys(properties), i = 0; i < keys.length; ++i)
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
         * StdIO inReq.
         * @member {ciphel_io.IStdInRequest|null|undefined} inReq
         * @memberof ciphel_io.StdIO
         * @instance
         */
        StdIO.prototype.inReq = null;

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
         * @member {"out"|"err"|"in"|"inReq"|"command"|undefined} stdType
         * @memberof ciphel_io.StdIO
         * @instance
         */
        Object.defineProperty(StdIO.prototype, "stdType", {
            get: $util.oneOfGetter($oneOfFields = ["out", "err", "in", "inReq", "command"]),
            set: $util.oneOfSetter($oneOfFields)
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
            if (!writer)
                writer = $Writer.create();
            if (message.out != null && Object.hasOwnProperty.call(message, "out"))
                $root.ciphel_io.StdOut.encode(message.out, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            if (message.err != null && Object.hasOwnProperty.call(message, "err"))
                $root.ciphel_io.StdErr.encode(message.err, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
            if (message["in"] != null && Object.hasOwnProperty.call(message, "in"))
                $root.ciphel_io.StdIn.encode(message["in"], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
            if (message.inReq != null && Object.hasOwnProperty.call(message, "inReq"))
                $root.ciphel_io.StdInRequest.encode(message.inReq, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
            if (message.command != null && Object.hasOwnProperty.call(message, "command"))
                $root.ciphel_io.Command.encode(message.command, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
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
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            let end = length === undefined ? reader.len : reader.pos + length, message = new $root.ciphel_io.StdIO();
            while (reader.pos < end) {
                let tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        message.out = $root.ciphel_io.StdOut.decode(reader, reader.uint32());
                        break;
                    }
                case 2: {
                        message.err = $root.ciphel_io.StdErr.decode(reader, reader.uint32());
                        break;
                    }
                case 3: {
                        message["in"] = $root.ciphel_io.StdIn.decode(reader, reader.uint32());
                        break;
                    }
                case 4: {
                        message.inReq = $root.ciphel_io.StdInRequest.decode(reader, reader.uint32());
                        break;
                    }
                case 5: {
                        message.command = $root.ciphel_io.Command.decode(reader, reader.uint32());
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
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
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
                    if (error)
                        return "out." + error;
                }
            }
            if (message.err != null && message.hasOwnProperty("err")) {
                if (properties.stdType === 1)
                    return "stdType: multiple values";
                properties.stdType = 1;
                {
                    let error = $root.ciphel_io.StdErr.verify(message.err);
                    if (error)
                        return "err." + error;
                }
            }
            if (message["in"] != null && message.hasOwnProperty("in")) {
                if (properties.stdType === 1)
                    return "stdType: multiple values";
                properties.stdType = 1;
                {
                    let error = $root.ciphel_io.StdIn.verify(message["in"]);
                    if (error)
                        return "in." + error;
                }
            }
            if (message.inReq != null && message.hasOwnProperty("inReq")) {
                if (properties.stdType === 1)
                    return "stdType: multiple values";
                properties.stdType = 1;
                {
                    let error = $root.ciphel_io.StdInRequest.verify(message.inReq);
                    if (error)
                        return "inReq." + error;
                }
            }
            if (message.command != null && message.hasOwnProperty("command")) {
                if (properties.stdType === 1)
                    return "stdType: multiple values";
                properties.stdType = 1;
                {
                    let error = $root.ciphel_io.Command.verify(message.command);
                    if (error)
                        return "command." + error;
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
            if (object instanceof $root.ciphel_io.StdIO)
                return object;
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
            if (object.inReq != null) {
                if (typeof object.inReq !== "object")
                    throw TypeError(".ciphel_io.StdIO.inReq: object expected");
                message.inReq = $root.ciphel_io.StdInRequest.fromObject(object.inReq);
            }
            if (object.command != null) {
                if (typeof object.command !== "object")
                    throw TypeError(".ciphel_io.StdIO.command: object expected");
                message.command = $root.ciphel_io.Command.fromObject(object.command);
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
            if (!options)
                options = {};
            let object = {};
            if (message.out != null && message.hasOwnProperty("out")) {
                object.out = $root.ciphel_io.StdOut.toObject(message.out, options);
                if (options.oneofs)
                    object.stdType = "out";
            }
            if (message.err != null && message.hasOwnProperty("err")) {
                object.err = $root.ciphel_io.StdErr.toObject(message.err, options);
                if (options.oneofs)
                    object.stdType = "err";
            }
            if (message["in"] != null && message.hasOwnProperty("in")) {
                object["in"] = $root.ciphel_io.StdIn.toObject(message["in"], options);
                if (options.oneofs)
                    object.stdType = "in";
            }
            if (message.inReq != null && message.hasOwnProperty("inReq")) {
                object.inReq = $root.ciphel_io.StdInRequest.toObject(message.inReq, options);
                if (options.oneofs)
                    object.stdType = "inReq";
            }
            if (message.command != null && message.hasOwnProperty("command")) {
                object.command = $root.ciphel_io.Command.toObject(message.command, options);
                if (options.oneofs)
                    object.stdType = "command";
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
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
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
})();

export { $root as default };
