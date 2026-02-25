import { theme } from "../styles/theme";
import { ContactIcon } from "../svgs";
import { ResetButton } from "./reset-components";

export default function ContactButton() {
	const handleClick = () => {
		window.open("http://pf.kakao.com/_yDxmkn/chat", "_blank");
	};

	return (
		<ResetButton onClick={handleClick}>
			<ContactIcon style={{ width: 24, height: 24, fill: theme.color.primary[140] }} />
		</ResetButton>
	);
}
