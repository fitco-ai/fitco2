import styled from "styled-components";
import FormGender from "./form-gender";
import FormHeight from "./form-height";
import FormWeight from "./form-weight";

export default function OnboardingFormBody() {
	return (
		<Container>
			<FormGender />
			<FormHeight />
			<FormWeight />
			{/* <FormConcern /> */}
		</Container>
	);
}

const Container = styled.div`
	margin-bottom: 40px;
	display: flex;
	flex-direction: column;
	gap: 30px;
`;
