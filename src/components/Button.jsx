import React from "react";

function Button({
	children,
	type = "button",
	circle = false,
	bgColor = "bg-primary",
	textColor = "text-text-primary dark:text-bkg-primary",
	className = "",
	...props
}) {
	return (
		<button
			type={type}
			className={`font-medium ${
				circle ? "rounded-full" : "rounded-lg"
			} p-3 ${className} ${textColor} ${bgColor}`}
			{...props}
		>
			{children}
		</button>
	);
}

export default Button;
