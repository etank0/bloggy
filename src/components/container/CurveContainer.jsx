import React from "react";

function CurveContainer({ children, className = "", showCurves }) {
	return (
		<div
			className={`flex flex-1 w-full overflow-hidden bg-repeat-y bg-cover ${
				showCurves ? "bg-[url('/curves.svg')]" : "bg-[url('/shapes.svg')]"
			} ${className}`}
		>
			{children}
		</div>
	);
}

export default CurveContainer;
