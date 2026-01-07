import Prism from "prismjs";

Prism.languages.ciphel = {
	// Comments
	comment: [
		{
			pattern: /\/\*\*(?:\/|\**[^*/])*\*\//,
			alias: "doc-comment",
		},
		{
			pattern: /\/\*[\s\S]*?(?:\*\/|$)/,
			greedy: true,
		},
		{
			pattern: /\/\/.*/,
			greedy: true,
		},
	],

	// Strings
	string: [
		{
			pattern: /"(?:\\.|[^\\"\r\n])*"/,
			greedy: true,
		},
		{
			pattern: /'(?:\\.|[^\\'\r\n])*'/,
			greedy: true,
		},
	],

	// Keywords
	keyword: [
		// Regular keywords
		/\b(?:enum|struct|union|module|as|return|let|break|continue|move|rec|dyn|fn|true|false)\b/,
		// Control keywords
		/\b(?:else|try|if|then|match|case|while|for|loop)\b/,
	],

	// Types
	type: /\b(?:u8|u16|u32|u64|u128|i8|i16|i32|i64|i128|f64|char|String|str|bool|unit|Any|Unit|error|Vec|Map|RangeI|RangeE)\b/,

	// Functions - matches function names before parentheses
	function: /[a-zA-Z_]\w*(?=\s*\()/,

	// Constants - uppercase identifiers
	constant: /[A-Z_][_A-Z\d$]+/,

	// Numbers
	number: [
		// Float
		{
			pattern: /\b\d+(?:\.\d+)?(?:[eE][+-]?\d+)?\b/,
			alias: "number-float",
		},
		// Hex
		/\b0[xX][\da-fA-F]+\b/,
		// Octal
		/\b0[oO][0-7]+\b/,
		// Binary
		/\b0[bB][01]+\b/,
		// Regular numbers
		/\b\d+\b/,
	],

	// Operators
	operator: [
		/[<>|&\-!+*\/%]/,
		/<<|>>/,
		/\b(?:or|and)\b/,
		/[<>]=?/,
		/[=!]=?/,
		/\^/,
		/\bin\b/,
	],

	// Punctuation/Delimiters
	punctuation: /[{}[\]();:,.<>]/,

	// Type identifiers (capitalized names)
	"class-name": {
		pattern: /\b[A-Z][\w$]*\b/,
		alias: "type-identifier",
	},
};

// Handle nested brackets in string interpolation or complex expressions
Prism.hooks.add("before-tokenize", function (env) {
	if (env.language !== "ciphel") {
		return;
	}
	// Add any specific pre-processing here if needed
});

Prism.hooks.add("after-tokenize", function (env) {
	if (env.language !== "ciphel") {
		return;
	}
	// Add any specific post-processing here if needed
});
