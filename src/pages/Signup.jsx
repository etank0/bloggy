import React from "react";
import { Signup as SignupComponent } from "../components";
import { Container } from "../components";

function Signup() {
	return (
		<Container className="py-8">
			<SignupComponent />
		</Container>
	);
}

export default Signup;
