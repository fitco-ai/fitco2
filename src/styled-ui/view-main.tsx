import styled from "styled-components";

export default function ViewMain({
	paddingHorizontal = 16,
	children,
}: {
	paddingHorizontal?: number;
	children: React.ReactNode;
}) {
	return <Container $paddingHorizontal={paddingHorizontal}>{children}</Container>;
}

const Container = styled.div<{ $paddingHorizontal: number }>`
    flex: 1;
    padding: 0 ${(props) => props.$paddingHorizontal}px;
    box-sizing: border-box;
    overflow-y: auto;
`;
