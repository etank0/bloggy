import React, { useId } from "react";

const Input = React.forwardRef(function Input(
	{ label, type = "text", className = "", ...props },
	ref
) {
	const id = useId();
	return (
		<div className="w-full">
			{label && (
				<label className="inline-block mb-1" htmlFor={id}></label>
			)}
			<input
				type={type}
				className={`p-3 rounded-lg bg-bkg-primary text-text-primary outline-none border border-bkg-secondary focus:border-primary duration-200 w-full ${className}`}
				ref={ref}
				id={id}
				{...props}
			></input>
		</div>
	);
});

export default Input;
