export type Cafe24ProductOption = {
	shop_no: number;
	product_no: number;
	has_option: "T" | "F";
	/**
     *
     * ● 조합형 : 옵션명을 기준으로 옵션값을 조합할 수 있음
        ● 상품 연동형 : 옵션표시방식은 조합형과 유사하지만 필수옵션과 선택옵션을 선택할 수 있음. 옵션의 조합을 제한 없이 생성할 수 있음.
        ● 독립 선택형 : 독립적인 조건 여러개를 각각 선택할 수 있는 옵션으로 옵션 값이 조합되지 않고 각각의 품목으로 생성됨.
        T : 조합형
        E : 연동형
        F : 독립형
     */
	option_type: "T" | "E" | "F";
	/**
     * 조합형 옵션을 사용할 경우, 조합형 옵션의 유형 표시
        * 조합 일체선택형 : 하나의 셀렉스박스(버튼 이나 라디오버튼)에 모든 옵션이 조합되어 표시됨
        * 조합 분리선택형 : 옵션을 각각의 셀렉스박스(버튼 이나 라디오버튼)로 선택할 수 있으며 옵션명을 기준으로 옵션값을 조합할 수 있음
        독립형이나 상품 연동형 옵션을 사용하고 있을 경우 S(분리형)로 입력됨.
        C : 일체형
        S : 분리형
     */
	option_list_type: "S" | "R" | string;
	options: {
		option_code: string;
		option_name: string;
		option_value: {
			option_image_file: string;
			option_link_image: string;
			option_color: string;
			option_text: string;
			value_no: number | null;
			additional_amount: string | null;
		}[];
		required_option: "T" | "F";
		option_display_type: "S" | "R" | string;
	}[];
	/**
     * 옵션별로 한 개씩 선택 (독립형 옵션)

        독립형 옵션을 사용할 경우, 하나의 옵션을 여러개 중복하여 선택할 수 없고 한개씩만 선택 가능함.

        T : 사용함
        F : 사용안함
     */
	select_one_by_option: "T" | "F";
	use_additional_option: "T" | "F";
	additional_options:
		| {
				additional_option_name: string;
				required_additional_option: "T" | "F";
				additional_option_text_length: number;
		  }[]
		| null;
	use_attached_file_option: "T" | "F";
	attached_file_option: {
		option_name: string;
		required: "T" | "F";
		size_limit: number;
	} | null;
};

export type Cafe24Variant = {
	variant_code: string;
	shop_no: number;
	display: "T" | "F";
	options: { name: string; value: string }[] | null;
};
