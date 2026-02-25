import styled from "styled-components";
import { CDN_URL } from "../const";

export default function LoadingFullscreen() {
	return (
		<Container>
			<Box>
				<img src={`${CDN_URL}/loading-fullscreen.gif`} alt="fitco loading" width={80} height={80} />
				<Text>
					<div>핏코가 대신 입어보고 있어요!</div>
					<div>{"조금만 기다려주세요:)"}</div>
				</Text>
			</Box>
		</Container>
	);
}

const Container = styled.div`
    z-index: 1000;
	position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);
`;

const Box = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
`;

const Text = styled.div`
    font-weight: 600;
    line-height: 150%;
    letter-spacing: -2%;
    color: white;
    text-align: center;
`;
