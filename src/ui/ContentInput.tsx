import { Btn } from "./Btn";
import { cn } from "../lib/cva";
import type { ChangeEvent, FC, ReactNode } from "react";
import { useRef, type ComponentProps } from "react";
import { Icon } from "./Icons";

interface contentInputType extends ComponentProps<"input"> {
	mutate: (content: string) => void;
	onHasValue?: (_val: boolean) => void;
	isValidating: boolean;
	fallBack?: ReactNode;
	resetOnSubmit?: ReactNode;
}
let content = "";
export const ContentInput: FC<contentInputType> = ({
	mutate,
	isValidating,
	onHasValue,
	resetOnSubmit = true,
	...props
}) => {
	const ref = useRef<HTMLInputElement>(null);
	const changeHandler = (fn: (val: string) => void) => {
		return (e: ChangeEvent<HTMLInputElement>) => fn(e.target.value);
	};
	const submitHandeler = () => {
		mutate(content);
		if (ref.current && resetOnSubmit) {
			ref.current.value = "";
			content = "";
			if (onHasValue) {
				onHasValue(false);
			}
		}
	};
	const { className, ...rest } = props;
	return (
		<div
			className={cn(
				"max-w-[400px] rounded-sm h-12   bg-neutral  flex w-full  items-center",
				className
			)}
		>
			<input
				ref={ref}
				className="  px-2  bg-transparent  h-full w-full"
				type="text"
				onChange={changeHandler((val: string) => {
					content = val;
					if (onHasValue == undefined) return;

					if (content.length == 1) {
						onHasValue(true);
					}
					if (content == "") {
						onHasValue(false);
					}
				})}
				min={1}
				onKeyDown={(e) => {
					if (e.key == "Enter") {
						submitHandeler();
					}
				}}
				{...rest}
			/>
			<div className=" size-12 p-2 flex justify-center items-center ">
				<Btn
					disabled={isValidating}
					onClick={submitHandeler}
					shape="circle"
					className="  p-2 size-10 [--variant:--prima]  "
				>
					<Icon.search className=" fill-neutral size-8 " />
				</Btn>
			</div>
		</div>
	);
};
