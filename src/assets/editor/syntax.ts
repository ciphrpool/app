import { languages } from "monaco-editor";

const syntax = {
	brackets: [
		["{", "}", "delimiter.curly"],
		["[", "]", "delimiter.square"],
		["(", ")", "delimiter.parenthesis"],
		["<", ">", "delimiter.angle"],
	],
	defaultToken: "invalid",

	keywords: [
		"enum",
		"struct",
		"union",
		"as",
		"return",
		"let",
		"break",
		"continue",
		"move",
		"rec",
		"dyn",
		"fn",
		"true",
		"false",
	],
	control: [
		"else",
		"try",
		"if",
		"then",
		"match",
		"case",
		"while",
		"for",
		"loop",
	],
	typeKeywords: [
		"u8",
		"u16",
		"u32",
		"u64",
		"u128",
		"i8",
		"i16",
		"i32",
		"i64",
		"i128",
		"f64",
		"char",
		"String",
		"str",
		"bool",
		"unit",
		"Any",
		"Unit",
		"error",
		"Vec",
		"Map",
		"RangeI",
		"RangeE",
	],

	operators: [
		"<",
		">",
		"|",
		"&",
		"-",
		"!",
		"+",
		"*",
		"/",
		"%",
		"<<",
		">>",
		"or",
		"and",
		"^",
		"in",
		"<",
		"<=",
		">",
		">=",
		"==",
		"!=",
	],
	symbols: /[=><!~?:&|+\-*\/\^%]+/,
	escapes:
		/\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
	digits: /\d+(_+\d+)*/,
	octaldigits: /[0-7]+(_+[0-7]+)*/,
	binarydigits: /[0-1]+(_+[0-1]+)*/,
	hexdigits: /[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,
	regexpctl: /[(){}\[\]\$\^|\-*+?\.]/,
	regexpesc:
		/\\(?:[bBdDfnrstvwWn0\\\/]|@regexpctl|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})/,

	tokenizer: {
		root: [[/[{}]/, "delimiter.bracket"], { include: "common" }],
		common: [
			[
				/[a-zA-Z_]\w*(?=\s*\()/,
				{
					cases: {
						"@typeKeywords": "type",
						"@keywords": "keyword",
						"@control": "keyword.control",
						"@default": "function",
					},
				},
			],
			// identifiers and keywords
			[
				/[a-z_$][\w$]*/,
				{
					cases: {
						"@typeKeywords": "type",
						"@keywords": "keyword",
						"@control": "keyword.control",
						"@default": "identifier",
					},
				},
			],
			[/[A-Z_][_A-Z\d$]+/, "constant"], // to show class names nicely
			[/[A-Z][\w\$]*/, "type.identifier"], // to show class names nicely
			// [/[A-Z][\w\$]*/, 'identifier'],

			// whitespace
			{ include: "@whitespace" },

			// regular expression: ensure it is terminated before beginning (otherwise it is an operator)
			[
				/\/(?=([^\\\/]|\\.)+\/([gimsuy]*)(\s*)(\.|;|\/|,|\)|\]|\}|$))/,
				{ token: "regexp", bracket: "@open", next: "@regexp" },
			],

			// delimiters and operators
			[/[()\[\]]/, "@brackets"],
			[/[<>](?!@symbols)/, "@brackets"],
			[
				/@symbols/,
				{
					cases: {
						"@operators": "delimiter",
						"@default": "",
					},
				},
			],

			// numbers
			[/(@digits)[eE]([\-+]?(@digits))?/, "number.float"],
			[/(@digits)\.(@digits)([eE][\-+]?(@digits))?/, "number.float"],
			[/0[xX](@hexdigits)/, "number.hex"],
			[/0[oO]?(@octaldigits)/, "number.octal"],
			[/0[bB](@binarydigits)/, "number.binary"],
			[/(@digits)/, "number"],

			// delimiter: after number because of .\d floats
			[/[;,.]/, "delimiter"],

			// strings
			[/"([^"\\]|\\.)*$/, "string.invalid"], // non-teminated string
			[/'([^'\\]|\\.)*$/, "string.invalid"], // non-teminated string
			[/"/, "string", "@string_double"],
			[/'/, "string", "@string_single"],
		],

		whitespace: [
			[/[ \t\r\n]+/, ""],
			[/\/\*\*(?!\/)/, "comment.doc", "@cipheldoc"],
			[/\/\*/, "comment", "@comment"],
			[/\/\/.*$/, "comment"],
		],

		comment: [
			[/[^\/*]+/, "comment"],
			[/\*\//, "comment", "@pop"],
			[/[\/*]/, "comment"],
		],

		cipheldoc: [
			[/[^\/*]+/, "comment.doc"],
			[/\*\//, "comment.doc", "@pop"],
			[/[\/*]/, "comment.doc"],
		],

		// We match regular expression quite precisely
		regexp: [
			[
				/(\{)(\d+(?:,\d*)?)(\})/,
				[
					"regexp.escape.control",
					"regexp.escape.control",
					"regexp.escape.control",
				],
			],
			[
				/(\[)(\^?)(?=(?:[^\]\\\/]|\\.)+)/,
				[
					"regexp.escape.control",
					{ token: "regexp.escape.control", next: "@regexrange" },
				],
			],
			[
				/(\()(\?:|\?=|\?!)/,
				["regexp.escape.control", "regexp.escape.control"],
			],
			[/[()]/, "regexp.escape.control"],
			[/@regexpctl/, "regexp.escape.control"],
			[/[^\\\/]/, "regexp"],
			[/@regexpesc/, "regexp.escape"],
			[/\\\./, "regexp.invalid"],
			[
				/(\/)([gimsuy]*)/,
				[
					{ token: "regexp", bracket: "@close", next: "@pop" },
					"keyword.other",
				],
			],
		],

		regexrange: [
			[/-/, "regexp.escape.control"],
			[/\^/, "regexp.invalid"],
			[/@regexpesc/, "regexp.escape"],
			[/[^\]]/, "regexp"],
			[
				/\]/,
				{
					token: "regexp.escape.control",
					next: "@pop",
					bracket: "@close",
				},
			],
		],

		string_double: [
			[/[^\\"]+/, "string"],
			[/@escapes/, "string.escape"],
			[/\\./, "string.escape.invalid"],
			[/"/, "string", "@pop"],
		],

		string_single: [
			[/[^\\']+/, "string"],
			[/@escapes/, "string.escape"],
			[/\\./, "string.escape.invalid"],
			[/'/, "string", "@pop"],
		],

		bracketCounting: [
			[/\{/, "delimiter.bracket", "@bracketCounting"],
			[/\}/, "delimiter.bracket", "@pop"],
			{ include: "common" },
		],
	},
} as unknown as languages.IMonarchLanguage;

export default syntax;
