import React from "react";

function Container({ children, className="" }) {
	return <div className={`flex-1 w-full ${className}`}>{children}</div>;
}

export default Container;
