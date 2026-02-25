import styled, { keyframes } from "styled-components";

export default function SlidingUpFullscreenContainer({ children }: { children: React.ReactNode }) {
	return (
		<Container>
			<SlidingArea>
				<Box>{children}</Box>
			</SlidingArea>
		</Container>
	);
}

const Container = styled.div`
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: end;
    background-color: rgba(0, 0, 0, 0.3);

    @media (min-width: 600px) {
        align-items: center;
    }
`;

const slideUp = keyframes`
  from {
    transform: translateY(300px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const SlidingArea = styled.div`
    width: 100%;
    height: 100vh;
    background-color: #fff;
    animation: ${slideUp} 0.3s ease-out forwards;
    box-sizing: content-box;

    @media (min-width: 600px) {
        width: 50vw;
        min-width: 400px;
        max-width: 600px;
        height: 70vh;
        border-radius: 12px;
        animation: none;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
    }
`;

const Box = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
`;
