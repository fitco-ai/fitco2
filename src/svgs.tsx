import { theme } from "./styles/theme";

export function CameraIcon(props: React.SVGProps<SVGSVGElement>) {
	const { style, ...others } = props;
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="inherit"
			viewBox="0 0 32 32"
			style={style}
			{...others}
		>
			<title>camera</title>
			<path
				d="M16 6.66672C18.5142 6.66672 19.7717 6.66692 20.5527 7.44797C21.3335 8.22904 21.333 9.48675 21.333 13.3337V18.6667C21.333 22.5139 21.3336 23.7714 20.5527 24.5525C19.7717 25.3335 18.5142 25.3337 16 25.3337H9.33301C6.81924 25.3337 5.56228 25.3333 4.78125 24.5525C4.0002 23.7714 4 22.5142 4 18.6667V13.3337C4 9.48622 4.0002 8.22902 4.78125 7.44797C5.56226 6.66695 6.81907 6.66672 9.33301 6.66672H16ZM27.0352 10.6667C27.4784 10.4451 28 10.7678 28 11.2634V20.737C28 21.2326 27.4784 21.5552 27.0352 21.3337L22.667 18.6667V13.3337L27.0352 10.6667Z"
				fill="inherit"
			/>
		</svg>
	);
}

export function FitcoLogoIcon(props: React.SVGProps<SVGSVGElement>) {
	const { style, ...others } = props;
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 19 17"
			fill="none"
			style={style}
			{...others}
		>
			<title>fitco logo</title>
			<g clipPath="url(#clip0_2_295)">
				<path
					d="M17.8092 4.28572L18.9393 0.941528H12.8606C11.2901 0.941528 10.4797 1.1635 10.0634 1.35892C8.57111 2.05963 7.69182 2.84256 6.74305 5.27165C6.708 5.36082 6.6582 5.44303 6.61823 5.5303C6.05745 5.53283 5.6338 5.53726 5.42781 5.54358C4.22632 5.58216 3.23082 6.18864 2.50341 6.94184C1.76554 7.70643 1.14389 9.51133 0.542535 11.2353C-0.0588246 12.9592 0.0739909 13.7017 0.0739909 13.7017C0.0739909 13.7017 0.35315 16.8947 3.38147 16.9105C6.40917 16.9264 7.08923 13.9673 7.08923 13.9673L8.89393 8.79987L14.1094 8.77394L15.2795 5.54358C15.2795 5.54358 12.614 5.53157 10.037 5.52777L10.5049 4.18833L17.8098 4.28572H17.8092ZM3.8537 13.3096C3.8537 13.3096 3.74732 13.4569 3.59483 13.3924C3.44173 13.3273 3.27878 13.2622 3.46325 12.791C3.64771 12.3192 4.83875 8.77457 4.83875 8.77457L5.42842 8.81758L3.85431 13.3102L3.8537 13.3096Z"
					fill="#F57F39"
				/>
				<path
					d="M9.21957 8.79797L8.89307 8.79987L10.0361 5.52777L10.3669 5.52967L9.21957 8.79797Z"
					fill="#3D3735"
				/>
				<path
					d="M5.42814 8.817L5.125 8.79486L6.29513 5.52972H6.61794L5.42814 8.817Z"
					fill="#3D3735"
				/>
			</g>
			<defs>
				<clipPath id="clip0_2_295">
					<rect width="19" height="16" fill="white" transform="translate(0 0.941528)" />
				</clipPath>
			</defs>
		</svg>
	);
}

export function XIcon(props: React.SVGProps<SVGSVGElement>) {
	const { style, ...others } = props;
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			viewBox="0 0 24 25"
			fill="inherit"
			style={style}
			{...others}
		>
			<title>X</title>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M4.29289 4.73442C4.68342 4.3439 5.31658 4.3439 5.70711 4.73442L12 11.0273L18.2929 4.73442C18.6834 4.3439 19.3166 4.3439 19.7071 4.73442C20.0976 5.12495 20.0976 5.75811 19.7071 6.14864L13.4142 12.4415L19.7071 18.7344C20.0976 19.1249 20.0976 19.7581 19.7071 20.1486C19.3166 20.5392 18.6834 20.5392 18.2929 20.1486L12 13.8557L5.70711 20.1486C5.31658 20.5392 4.68342 20.5392 4.29289 20.1486C3.90237 19.7581 3.90237 19.1249 4.29289 18.7344L10.5858 12.4415L4.29289 6.14864C3.90237 5.75811 3.90237 5.12495 4.29289 4.73442Z"
				fill="inherit"
			/>
		</svg>
	);
}

/**
 * viewBox ratio: 2:1
 */
export function LoadingRibbon(props: React.SVGProps<SVGSVGElement>) {
	const { style, ...others } = props;
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150" style={style} {...others}>
			<title>loading ribbon</title>
			<path
				fill="none"
				stroke={theme.color.brand.orange}
				strokeWidth="15"
				strokeLinecap="round"
				strokeDasharray="300 385"
				strokeDashoffset="0"
				d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
			>
				<animate
					attributeName="stroke-dashoffset"
					calcMode="spline"
					dur="2"
					values="685;-685"
					keySplines="0 0 1 1"
					repeatCount="indefinite"
				></animate>
			</path>
		</svg>
	);
}

export function LoadingDots(props: React.SVGProps<SVGSVGElement>) {
	const { style, ...others } = props;
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" style={style} {...others}>
			<title>loading spinner</title>
			<circle fill="inherit" stroke="inherit" strokeWidth="15" r="15" cx="40" cy="100">
				<animate
					attributeName="opacity"
					calcMode="spline"
					dur="2"
					values="1;0;1;"
					keySplines=".5 0 .5 1;.5 0 .5 1"
					repeatCount="indefinite"
					begin="-.4"
				></animate>
			</circle>
			<circle fill="inherit" stroke="inherit" strokeWidth="15" r="15" cx="100" cy="100">
				<animate
					attributeName="opacity"
					calcMode="spline"
					dur="2"
					values="1;0;1;"
					keySplines=".5 0 .5 1;.5 0 .5 1"
					repeatCount="indefinite"
					begin="-.2"
				></animate>
			</circle>
			<circle fill="inherit" stroke="inherit" strokeWidth="15" r="15" cx="160" cy="100">
				<animate
					attributeName="opacity"
					calcMode="spline"
					dur="2"
					values="1;0;1;"
					keySplines=".5 0 .5 1;.5 0 .5 1"
					repeatCount="indefinite"
					begin="0"
				></animate>
			</circle>
		</svg>
	);
}

export function LoadingSpinner(props: React.SVGProps<SVGSVGElement>) {
	const { style, ...others } = props;
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" style={style} {...others}>
			<title>loading spinner</title>
			<radialGradient
				id="a11"
				cx=".66"
				fx=".66"
				cy=".3125"
				fy=".3125"
				gradientTransform="scale(1.5)"
			>
				<stop offset="0" stopColor="inherit"></stop>
				<stop offset=".3" stopColor="inherit" stopOpacity=".9"></stop>
				<stop offset=".6" stopColor="inherit" stopOpacity=".6"></stop>
				<stop offset=".8" stopColor="inherit" stopOpacity=".3"></stop>
				<stop offset="1" stopColor="inherit" stopOpacity="0"></stop>
			</radialGradient>
			<circle
				style={{ transformOrigin: "center" }}
				fill="none"
				stroke="url(#a11)"
				strokeWidth="15"
				strokeLinecap="round"
				strokeDasharray="200 1000"
				strokeDashoffset="0"
				cx="100"
				cy="100"
				r="70"
			>
				<animateTransform
					type="rotate"
					attributeName="transform"
					calcMode="spline"
					dur="2"
					values="360;0"
					keyTimes="0;1"
					keySplines="0 0 1 1"
					repeatCount="indefinite"
				></animateTransform>
			</circle>
			<circle
				style={{ transformOrigin: "center" }}
				fill="none"
				opacity=".2"
				stroke="inherit"
				strokeWidth="15"
				strokeLinecap="round"
				cx="100"
				cy="100"
				r="70"
			></circle>
		</svg>
	);
}

export function ChevronLeftIcon(props: React.SVGProps<SVGSVGElement>) {
	const { style, ...others } = props;
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 32 32"
			fill="inherit"
			style={style}
			{...others}
		>
			<title>chevron left</title>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M22.276 27.6095C21.7553 28.1302 20.9111 28.1302 20.3904 27.6095L9.7237 16.9428C9.47365 16.6928 9.33317 16.3536 9.33317 16C9.33317 15.6464 9.47365 15.3072 9.7237 15.0572L20.3904 4.39052C20.9111 3.86983 21.7553 3.86983 22.276 4.39052C22.7967 4.91123 22.7967 5.75544 22.276 6.27614L12.5521 16L22.276 25.7239C22.7967 26.2446 22.7967 27.0888 22.276 27.6095Z"
				fill="inherit"
			/>
		</svg>
	);
}

export function ArrowLeftIcon(props: React.SVGProps<SVGSVGElement>) {
	const { style, ...others } = props;
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 32 32"
			fill="inherit"
			style={style}
			{...others}
		>
			<title>arrow left</title>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M14.276 5.72384C14.7967 6.24454 14.7967 7.08876 14.276 7.60946L7.21879 14.6666H27.9998C28.7362 14.6666 29.3332 15.2636 29.3332 16C29.3332 16.7364 28.7362 17.3333 27.9998 17.3333H7.21879L14.276 24.3905C14.7967 24.9112 14.7967 25.7554 14.276 26.2761C13.7553 26.7968 12.9111 26.7968 12.3904 26.2761L3.05703 16.9428C2.53633 16.4221 2.53633 15.5779 3.05703 15.0572L12.3904 5.72384C12.9111 5.20314 13.7553 5.20314 14.276 5.72384Z"
				fill="inherit"
			/>
		</svg>
	);
}

export function XCircleIcon(props: React.SVGProps<SVGSVGElement>) {
	const { style, ...others } = props;
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 32 32"
			fill="inherit"
			style={style}
			{...others}
		>
			<title>X circle</title>
			<path
				d="M16 4C22.6274 4 28 9.37258 28 16C28 22.6274 22.6274 28 16 28C9.37258 28 4 22.6274 4 16C4 9.37258 9.37258 4 16 4ZM20.9424 11.0576C20.4217 10.5369 19.5783 10.5369 19.0576 11.0576L16 14.1143L12.9424 11.0576C12.4217 10.5369 11.5783 10.5369 11.0576 11.0576C10.5369 11.5783 10.5369 12.4217 11.0576 12.9424L14.1143 16L11.0576 19.0576C10.5369 19.5783 10.5369 20.4217 11.0576 20.9424C11.5783 21.4631 12.4217 21.4631 12.9424 20.9424L16 17.8857L19.0576 20.9424C19.5783 21.4631 20.4217 21.4631 20.9424 20.9424C21.4631 20.4217 21.4631 19.5783 20.9424 19.0576L17.8857 16L20.9424 12.9424C21.4631 12.4217 21.4631 11.5783 20.9424 11.0576Z"
				fill="inherit"
			/>
		</svg>
	);
}

export function UserIcon(props: React.SVGProps<SVGSVGElement>) {
	const { style, ...others } = props;
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 32 32"
			fill="inherit"
			style={style}
			{...others}
		>
			<title>user</title>
			<path
				d="M16.0002 16C18.9457 16 21.3335 13.6122 21.3335 10.6667C21.3335 7.72116 18.9457 5.33334 16.0002 5.33334C13.0546 5.33334 10.6668 7.72116 10.6668 10.6667C10.6668 13.6122 13.0546 16 16.0002 16Z"
				fill="inherit"
			/>
			<path
				d="M6.35926 21.5804C4.80435 23.2172 4.99539 25.6533 7.08162 26.5556C8.85027 27.3205 11.6466 28 16.0002 28C20.3537 28 23.1501 27.3205 24.9187 26.5556C27.0049 25.6533 27.196 23.2172 25.6411 21.5804C23.7645 19.605 20.6053 17.3333 16.0002 17.3333C11.395 17.3333 8.23585 19.605 6.35926 21.5804Z"
				fill="inherit"
			/>
		</svg>
	);
}

export function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
	const { style, ...others } = props;
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="32"
			height="32"
			viewBox="0 0 32 32"
			fill="inherit"
			style={style}
			{...others}
		>
			<title>check</title>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M27.4417 5.58165C28.0409 6.00966 28.1797 6.84239 27.7517 7.44161L14.4183 26.1083C14.1801 26.4418 13.8017 26.6472 13.3923 26.6653C12.9828 26.6834 12.5878 26.5122 12.321 26.201L4.32102 16.8677C3.84179 16.3086 3.90653 15.4668 4.46564 14.9876C5.02474 14.5084 5.86647 14.5731 6.3457 15.1322L13.2378 23.1731L25.5817 5.89164C26.0097 5.29243 26.8425 5.15364 27.4417 5.58165Z"
				fill="inherit"
			/>
		</svg>
	);
}

export function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
	const { style, ...others } = props;
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 32 32"
			fill="inherit"
			style={style}
			{...others}
		>
			<title>plus</title>
			<path
				d="M14.6667 26.6667C14.6667 27.403 15.2636 28 16 28C16.7364 28 17.3333 27.403 17.3333 26.6667V17.3333H26.6667C27.403 17.3333 28 16.7364 28 16C28 15.2636 27.403 14.6667 26.6667 14.6667H17.3333V5.33333C17.3333 4.59695 16.7364 4 16 4C15.2636 4 14.6667 4.59695 14.6667 5.33333V14.6667H5.33333C4.59695 14.6667 4 15.2636 4 16C4 16.7364 4.59695 17.3333 5.33333 17.3333H14.6667V26.6667Z"
				fill="inherit"
			/>
		</svg>
	);
}

export function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
	const { style, ...others } = props;
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 32 32"
			fill="inherit"
			style={style}
			{...others}
		>
			<title>minus</title>
			<path
				d="M4 16.0003C4 15.2639 4.59695 14.667 5.33333 14.667H26.6667C27.403 14.667 28 15.2639 28 16.0003C28 16.7367 27.403 17.3337 26.6667 17.3337H5.33333C4.59695 17.3337 4 16.7367 4 16.0003Z"
				fill="inherit"
			/>
		</svg>
	);
}

export function ChevronDownIcon(props: React.SVGProps<SVGSVGElement>) {
	const { style, ...others } = props;
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 32 32"
			fill="inherit"
			style={style}
			{...others}
		>
			<title>chevron down</title>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M27.6095 9.72353C28.1302 10.2442 28.1302 11.0885 27.6095 11.6092L16.9428 22.2758C16.6928 22.5259 16.3536 22.6663 16 22.6663C15.6464 22.6663 15.3072 22.5259 15.0572 22.2758L4.39052 11.6092C3.86983 11.0885 3.86983 10.2442 4.39052 9.72353C4.91123 9.20283 5.75544 9.20283 6.27614 9.72353L16 19.4474L25.7239 9.72353C26.2446 9.20283 27.0888 9.20283 27.6095 9.72353Z"
				fill="inherit"
			/>
		</svg>
	);
}

// 버튼 사이즈 업
export function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
	const { style, ...others } = props;
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="inherit"
			style={style}
			{...others}
		>
			<title>trash</title>
			<path
				d="M17 7.23535C17 7.20471 16.9897 7.18606 16.9824 7.17676H7.01758C7.01028 7.18606 7 7.20471 7 7.23535V18.8828C7.00023 19.5544 7.50091 20 8 20H16C16.4991 20 16.9998 19.5544 17 18.8828V7.23535ZM9 16.7646V10.4121C9 9.85982 9.44772 9.41211 10 9.41211C10.5523 9.41211 11 9.85982 11 10.4121V16.7646C11 17.3169 10.5523 17.7646 10 17.7646C9.44772 17.7646 9 17.3169 9 16.7646ZM13 16.7646V10.4121C13 9.85982 13.4477 9.41211 14 9.41211C14.5523 9.41211 15 9.85982 15 10.4121V16.7646C15 17.3169 14.5523 17.7646 14 17.7646C13.4477 17.7646 13 17.3169 13 16.7646ZM14 4.05859C14 4.02789 13.9897 4.00922 13.9824 4H10.0176C10.0103 4.00922 10 4.02789 10 4.05859V5.11719C10 5.14822 10.0103 5.16759 10.0176 5.17676H13.9824C13.9897 5.16759 14 5.14822 14 5.11719V4.05859ZM16 5.11719C16 5.13695 15.9976 5.15707 15.9971 5.17676H20C20.5523 5.17676 21 5.62447 21 6.17676C20.9998 6.72891 20.5522 7.17676 20 7.17676H18.9971C18.9976 7.19625 19 7.21578 19 7.23535V18.8828C18.9998 20.5498 17.7098 22 16 22H8C6.29022 22 5.00024 20.5498 5 18.8828V7.23535C5 7.21578 5.00238 7.19625 5.00293 7.17676H4C3.44781 7.17676 3.00016 6.72891 3 6.17676C3 5.62447 3.44772 5.17676 4 5.17676H8.00293C8.00237 5.15707 8 5.13695 8 5.11719V4.05859C8.00012 2.97625 8.84243 2 10 2H14C15.1576 2 15.9999 2.97625 16 4.05859V5.11719Z"
				fill="#212529"
			/>
		</svg>
	);
}

export function WidgetBannerBackground(props: React.SVGProps<SVGSVGElement>) {
	const { style, ...others } = props;
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="121"
			height="44"
			viewBox="0 0 121 44"
			fill="none"
			style={style}
			{...others}
		>
			<title>widget banner background</title>
			<path d="M14.4613 44L0.5 35.2V0H120.981V44H14.4613Z" fill="#2c2c2c" />
		</svg>
	);
}

export function ContactIcon(props: React.SVGProps<SVGSVGElement>) {
	const { style, ...others } = props;
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="inherit"
			style={style}
			{...others}
		>
			<title>contact</title>
			<path
				d="M19.3981 15.7723C20.4081 14.56 21 13.0876 21 11.5C21 7.35786 16.9706 4 12 4C7.02944 4 3 7.35786 3 11.5C3 15.6421 7.02944 19 12 19C12.9586 19 13.8822 18.8751 14.7487 18.6438L19.351 19.9796C19.7105 20.084 20.0543 19.7721 19.9928 19.3975L19.3981 15.7723Z"
				fill="inherit"
			/>
		</svg>
	);
}
