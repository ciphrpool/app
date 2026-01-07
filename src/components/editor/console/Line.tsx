import { Setter, Show, createSignal, splitProps } from "solid-js";

type PrefixProps = {
	username: string;
	file?: string;
};

function Prefix(props: PrefixProps) {
	return (
		<>
			<Show when={props.username}>
				<span class="text-pl1-200 select-none">{props.username}</span>
			</Show>
			<Show when={props.file}>
				<span class="text-ego select-none">@ciphel</span>
			</Show>
			<Show
				when={props.file}
				fallback={
					<span class="text-night-300 select-none mx-1"> $ </span>
				}
			>
				<span class="text-night-300 mx-1 select-none">
					{" "}
					: {props.file}$
				</span>
			</Show>
		</>
	);
}

type LineProps = {
	prefix: PrefixProps;
	readonly: string;
	editable: boolean;
	is_error: boolean;
	ref?: (ref: HTMLInputElement) => void;
	on_submit?: (line: string) => void;
	set_msg_ref?: (set_msg: Setter<string>) => void;
};
export function Line(props: LineProps) {
	const [local, others] = splitProps(props, ["ref", "set_msg_ref"]);
	const [get_msg, set_msg] = createSignal<string>("");
	if (local.set_msg_ref) {
		local.set_msg_ref(set_msg);
	}
	return (
		<div class="flex">
			<Prefix
				username={props.prefix!.username}
				file={props.prefix!.file}
			/>
			<span classList={{ "text-red-500": props.is_error }}>
				{props.readonly}
			</span>
			<Show when={props.editable}>
				<form
					class="flex-grow"
					onSubmit={(e) => {
						e.preventDefault();
						props.on_submit && props.on_submit(get_msg());
						set_msg("");
					}}
				>
					<input
						ref={local.ref}
						class="w-full bg-night-800   text-moon outline-none"
						placeholder=""
						value={get_msg()}
						onInput={(e) => {
							e.preventDefault();
							set_msg(e.target.value);
						}}
						spellcheck={false}
					></input>
				</form>
			</Show>
		</div>
	);
}
