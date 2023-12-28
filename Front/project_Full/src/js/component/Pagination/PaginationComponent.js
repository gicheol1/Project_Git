import { Pagination } from '@mui/material';
import { useState } from 'react';

import './PaginationComponent.css';

// 페이징 기능을 사용하기 위한 커스텀 훅
export function usePagination(values) {
    // 현재 페이지와 페이지당 아이템 수를 상태로 갖는 useState 훅 사용
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // 페이지당 표시할 행의 수

    // 현재 페이지의 시작 인덱스를 계산
    const startIndex = (currentPage - 1) * itemsPerPage;
    // 마지막 행의 다음 인덱스
    const endIndex = startIndex + itemsPerPage;
    // 현재 페이지에 표시할 데이터 추출
    const currentPageData = values.slice(startIndex, endIndex);

    // 페이지 변경 이벤트 핸들러
    const handlePageChange = (event, value) => {
        setCurrentPage(value); // 페이지 변경 시 현재 페이지 업데이트
    };

    // 반환: 현재 페이지, 현재 페이지의 데이터, 페이지당 아이템 수, 페이지 변경 핸들러
    return {
        currentPage,
        currentPageData,
        itemsPerPage,
        handlePageChange,
    };
}

// 페이지네이션 UI를 렌더링하는 컴포넌트
export function PaginationComponent({ count, page, onChange }) {
    return (

        <Pagination className='Pagination'
            count={count} // 전체 페이지 수
            page={page} // 현재 페이지
            onChange={onChange} // 페이지 변경 이벤트 핸들러
            variant="outlined" // 외곽선 스타일
            shape="rounded" // 모서리 둥글게
        />

    );
}
