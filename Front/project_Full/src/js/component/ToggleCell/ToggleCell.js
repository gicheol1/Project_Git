import React, { useState } from 'react';


// 가격을 특정 형식으로 포맷하는 함수
const formatPrice = (price) => {
    // 가격을 만원, 천원으로 분리
    const unit = price >= 10000 ? '만' : '천';
    const mainPrice = Math.floor(price / (unit === '만' ? 10000 : 1000)); // 만 단위로 표시하면 만 단위의 가격을 계산, 그 외에는 천 단위로 계산
    const remainder = price % (unit === '만' ? 10000 : 1000); // remainder: 만 단위로 표시되면 가격을 1만으로 나눈 나머지를, 그렇지 않으면 1천으로 나눈 나머지를 계산

    // 포맷된 문자열 생성
    const formattedPrice = `${mainPrice}${unit}${remainder > 0 ? ` ${remainder}` : '천'}원`; // 가격 문자열

    return formattedPrice;
};

// 토글 가능한 셀 컴포넌트
const ToggleCell = ({ value }) => {
    const [toggle, setToggle] = useState(false);

    // 클릭 핸들러
    const handleClick = () => {
        setToggle(!toggle);
    };

    return (
        <div classname="togglefont" onClick={handleClick} style={{ cursor: 'pointer', float: 'left' }}>
            {/* 토글 상태에 따라 가격을 표시 */}
            <p>{toggle ? `${formatPrice(value)}원` : `${value.toLocaleString()}원`}</p>
            {/* toLocaleString(): 숫자를 해당 지역화된 형식으로 문자열로 변환하여 출력 
                - 출력: "1,234,567.89" (예: 미국 로케일에서)
            */}
        </div>
    );
};

export default ToggleCell;