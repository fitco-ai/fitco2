import styled from "styled-components";

export default function MemberPhone({ loginPhone }: { loginPhone: string | null }) {
	return (
		<Container>
			<Label>연락처</Label>
			<PhoneText>{loginPhone ?? "비회원"}</PhoneText>
		</Container>
	);
}

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
	border-top: 1px solid ${(props) => props.theme.color.primary[10]};
	padding-top: 16px;
`;

const Label = styled.label`
    color: ${(props) => props.theme.color.primary[140]};
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.48px;
`;

const PhoneText = styled.div`
        font-size: 14px;
`;
