import styled from "styled-components";
import { PrimaryButton } from "./fitco-button";

export function Dialog({
	open,
	title,
	subtitle,
	onConfirm,
	onClose,
}: {
	open: boolean;
	title: string;
	subtitle: string;
	onConfirm: () => void;
	onClose?: () => void;
}) {
	if (!open) {
		return null;
	}

	return (
		<Container>
			<Content>
				<Header>
					<Title>{title}</Title>
					<Subtitle>{subtitle}</Subtitle>
				</Header>
				<FlexRow>
					{!!onClose && <PrimaryButton onClick={onClose}>취소</PrimaryButton>}
					<PrimaryButton $isActive onClick={onConfirm}>
						확인
					</PrimaryButton>
				</FlexRow>
			</Content>
		</Container>
	);
}

const Container = styled.div`
    z-index: 10;
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.4);
`;

const Content = styled.div`
    padding: 24px;
    width: 300px;
    border-radius: 12px;
    max-width: 500px;
    background-color: white;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
    margin-bottom: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 4px;
`;

const Title = styled.div`
    margin-bottom: 4px;
    font-size: 18px;
    font-weight: 600;
`;

const Subtitle = styled.div`
    font-size: 16px;
    color: #5F7081;
    white-space: pre-wrap;
`;

const FlexRow = styled.div`
    display: flex;
    gap: 8px;
`;
