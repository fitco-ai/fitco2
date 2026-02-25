import { useCallback, useState, type ReactNode } from "react";
import styled from "styled-components";
import { ChevronDownIcon } from "../../../svgs";
import { theme } from "../../../styles/theme";

export const Accordion = ({
	title,
	innerAccordion = false,
	children,
}: {
	title: ReactNode;
	innerAccordion?: boolean;
	children: ReactNode;
}) => {
	const [isExpanded, setExpand] = useState<boolean>(false);

	// const contentRef = useRef<HTMLDivElement>(null);
	// const contentHeight = isExpanded && contentRef.current ? contentRef.current.scrollHeight : 0;

	const handleExpandToggle = useCallback(() => {
		setExpand((prev) => !prev);
	}, []);

	return (
		<Container>
			<Title $innerAccordion={innerAccordion} onClick={handleExpandToggle}>
				{title}
				<ChevronDownIcon
					style={{
						width: 16,
						height: 16,
						fill: theme.color.primary[140],
						transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
						transition: "transform 0.25s ease-in-out",
						transformOrigin: "center",
						marginTop: innerAccordion ? "10px" : "0px",
					}}
				/>
			</Title>
			{isExpanded && (
				<ContentWrapper>
					<Content $innerAccordion={innerAccordion}>{children}</Content>
				</ContentWrapper>
			)}
		</Container>
	);
};

const Container = styled.div`
	box-sizing: border-box;
    border-radius: 14px;
    background-color: ${(props) => props.theme.color.primary[0]};
    /* padding: 20px 16px; */
  `;

const Title = styled.div<{ $innerAccordion: boolean }>`
	padding: ${(props) => (props.$innerAccordion ? "0px 0px 8px 0px" : "20px 16px")};
    display: flex;
    justify-content: space-between;
    align-items: ${(props) => (props.$innerAccordion ? "start" : "center")};
    cursor: pointer;
    color: ${(props) => props.theme.color.primary[140]};
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    letter-spacing: -0.48px;
  `;

const ContentWrapper = styled.div`
	box-sizing: border-box;
    transition: max-height 0.25s ease-in-out;
    overflow: hidden;
  `;

const Content = styled.div<{ $innerAccordion: boolean }>`
    padding: ${(props) => (props.$innerAccordion ? "0 0 16px" : "0 16px 0 16px")};
    color: rgba(0, 0, 0, 0.75);
    line-height: 1.5;
  `;
