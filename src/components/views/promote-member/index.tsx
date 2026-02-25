import styled from "styled-components";
import { useUIContextDispatch } from "../../../context/ui";
import { XIcon } from "../../../svgs";
import { ResetButton } from "../../../styled-ui/reset-components";
import { PrimaryButton } from "../../../styled-ui/fitco-button";
import { useCloseWidget } from "../../../hooks/useCloseWidget";

export default function PromoteMember() {
	const { pushView } = useUIContextDispatch();
	const closeWidget = useCloseWidget();

	return (
		<Container>
			<Dialog>
				<Top>
					<img
						src="https://d22a5p9j44snqb.cloudfront.net/fitco_logo_204x101.png"
						alt="fitco logo"
						width={51}
						height={25}
					/>
					<ResetButton onClick={closeWidget}>
						<XIcon style={{ width: 24, height: 24 }} />
					</ResetButton>
				</Top>
				<Middle>
					<MiddleIntro>
						<MiddleIntroTitle>지금까지 입력한 정보를 저장해보세요!</MiddleIntroTitle>
						<MiddleIntroDescription>
							지금 이 창을 닫으면 입력한 정보가 사라져요ㅠㅠ
						</MiddleIntroDescription>
					</MiddleIntro>
					<MiddleContent>
						복잡한 과정 없이, 휴대폰번호 입력 한번으로 나만의 사이즈 정보를 저장해보세요:{")"}
					</MiddleContent>
				</Middle>
				<Bottom>
					<PrimaryButton $isActive onClick={() => pushView("sign-up")}>
						로그인하기
					</PrimaryButton>
				</Bottom>
			</Dialog>
		</Container>
	);
}

const Container = styled.div`
	position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
`;

const Dialog = styled.div`
    padding: 24px 16px;
    width: 80vw;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    gap: 24px;
    border-radius: 12px;
    background-color: white;
`;

const Top = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Middle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const MiddleIntro = styled.div`
    padding-bottom: 16px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    border-bottom: 1px solid lightgray;
`;

const MiddleIntroTitle = styled.div`
    color: ${(props) => props.theme.color.primary[140]};
    text-align: center;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%;
    letter-spacing: -0.4px;
`;

const MiddleIntroDescription = styled.div`
    color: ${(props) => props.theme.color.primary[80]};
    text-align: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.28px;
`;

const MiddleContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    color: ${(props) => props.theme.color.primary[100]};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.48px;
    text-align: center;
`;

const Bottom = styled.div`
    padding-top: 16px;;
`;
