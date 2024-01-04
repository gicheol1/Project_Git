import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { ModalComponent, ModalFunction, ToggleCell } from 'js';
import { usePagination, PaginationComponent } from 'js';

import HotelIcon from '@mui/icons-material/Hotel';
import { Button } from '@mui/material';
import './TravelPackList.css'; // CSS 파일을 임포트
import { useTravelPackList } from './useTravelPackList';

/* 여행 예약 1번*/
/* - 여행 패키지 목록 페이지 */
function TravelPackList({ isAdmin }) {

    const navigate = useNavigate(); // 페이지 이동을 위한 함수

    /* useState(함수의 상태관리), useNavigate(라우터 내에서 경로를 변경), ModalFunction(모달창의 열고 닫는 기능) */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */

    /* 여행 패키지 */
    const [originalTravalPack, setOriginalTravalPack] = useState([]); // 원본 여행 패키지 데이터
    const [TravalPack, setTravalPack] = useState([]); // 수정된 여행 패키지
    // console.log(TravalPack);
    // console.log(originalTravalPack);

    /* 축제 정보 */
    const [FestivalAll, setFestivalAll] = useState([]);

    // - FestivalAll에서 name, startDate, endDate 데이터만 출력하는 부분
    const FestivalfilteredData = FestivalAll.map(festivallist => ({
        name: festivallist.name,
        startDate: festivallist.startDate,
        endDate: festivallist.endDate
    }));
    // console.log(FestivalfilteredData);

    /* 패키지 여행 데이터 로딩 */
    const [loading, setLoading] = useState(true);

    /* 검색 기능*/
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filteredRowssearch, setFilteredRowssearch] = useState(TravalPack);
    const [searchInput, setSearchInput] = useState(''); // 입력 값 저장

    /* 체크박스 필터링(당일, 1박 2일, 2박 3일) */
    const [showSelectedOnly, setShowSelectedOnly] = useState(false);
    const [showOneNightTwoDays, setShowOneNightTwoDays] = useState(false);
    const [showTwoNightsThreeDays, setShowTwoNightsThreeDays] = useState(false);

    // - 필터링된 행 데이터를 반환하는 함수 //
    const getFilteredRows = () => {
        if (!showSelectedOnly && !showOneNightTwoDays && !showTwoNightsThreeDays) {
            // return TravalPack; // 모든 필터가 비활성화된 경우 전체 데이터 반환
            return filteredRowssearch; // 모든 필터가 비활성화된 경우 전체 데이터 반환
        }

        // return TravalPack.filter(row => {
        return filteredRowssearch.filter(row => {
            const start = new Date(row.startDate);
            const end = new Date(row.endDate);
            const duration = (end - start) / (1000 * 60 * 60 * 24); // 일 단위로 계산

            if (showSelectedOnly && start.getTime() === end.getTime()) {
                return true;
            }

            if (showOneNightTwoDays && duration === 1) {
                return true;
            }

            if (showTwoNightsThreeDays && duration === 2) {
                return true;
            }

            return false;
        });

    };

    const filteredRows = getFilteredRows();

    /* 지역 선택 */
    const handleCityChange = (selectedCityValue) => {
        if (selectedCityValue !== "") {
            // 선택된 도시에 따라 필터링
            const filteredByCity = originalTravalPack.filter((item) => item.address.includes(selectedCityValue));
            // 필터링된 결과를 상태로 설정하여 해당 도시만 보여줍니다.
            setTravalPack(filteredByCity);
        } else {
            // 선택된 것이 없으면 원본 데이터로 복원
            setTravalPack(originalTravalPack);
        }

    };

    const handleSearchInputChange = (event) => {
        setSearchInput(event.target.value);
    };

    const handleSearch = () => {
        setSearchKeyword(searchInput); // 검색어를 적용하기 위해 상태 업데이트
        handleFilterChange();
    };

    // 검색어 초기화 함수
    const handleSearchReset = () => {
        setSearchKeyword(''); // 검색어 초기화
        setSearchInput(''); // 입력 값 초기화
        setFilteredRowssearch(originalTravalPack); // 필터된 결과를 원래 데이터로 초기화
        handleFilterChange(); // 필터링 변경 핸들러 호출
    };

    /* 페이지네이션 동작 */
    // - usePagination 함수를 호출하여 페이징에 필요한 상태와 함수들을 가져옵니다.
    const {
        currentPage,         // 현재 페이지를 나타내는 상태
        currentPageData,     // 현재 페이지에 해당하는 데이터를 담는 변수
        itemsPerPage,        // 페이지당 항목 수를 나타내는 값
        handlePageChange     // 페이지 변경을 처리하는 함수
        // } = usePagination(TravalPack); // 여행 패키지 정보
    } = usePagination(filteredRows); // 필터링된 여행 패키지 정보

    // 페이지 네이션 1페이지로 초기화
    // - 필터가 변경될 때 페이지네이션을 1페이지로 설정
    const handleFilterChange = () => {
        handlePageChange(null, 1);
    };
    // - 페이지 변경 이벤트 핸들러
    const handlePaginationChange = (event, value) => {
        handlePageChange(event, value);
    };

    /* 부트 스트랩 팝업창 기능 */
    const { modalOpenMap, handleModalOpen, handleModalClose } = ModalFunction();

    // Spring Boot 연동 함수
    const { getTravalpack, getFestival, getFilePack, deleteTravalpack } = useTravelPackList();

    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */

    /* 벡엔드에 Controller(컨트롤러)에서 설정한 패키지여행의 전체 정보, 축제정보 불러오기 */
    useEffect(() => {
        getTravalPacks();
        getFestivals();

    }, []);

    /* 검색 기능 */
    useEffect(() => {
        const getFilteredRowsBySearch = () => {
            if (!searchKeyword.trim()) {
                return TravalPack;
            }

            const keyword = searchKeyword.toLowerCase().trim();
            return TravalPack.filter(row => row.festivalname.toLowerCase().includes(keyword));
        };

        setFilteredRowssearch(getFilteredRowsBySearch());
    }, [searchKeyword, TravalPack]);

    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */

    // 데이터 가져오기
    const getTravalPacks = async () => {
        const result = await getTravalpack();

        if (!result) { alert('여행 패키지를 불러오는데 실패했습니다.'); return; }

        let updatedPacks = []; // 수정된 여행 패키지 데이터를 담을 배열
        let updatedOriginalPacks = []; // 다시 불러오는 여행 패키지 데이터를 담을 배열

        for (const res of result) {
            const img = await getFilePack(res.packNum);

            if (img === undefined) {
                updatedPacks.push({ ...res });
                updatedOriginalPacks.push({ ...res });
            } else {
                updatedPacks.push({ ...res, ...img });
                updatedOriginalPacks.push({ ...res, ...img });
            }
        }

        setTravalPack(prevPacks => prevPacks ? [...prevPacks, ...updatedPacks] : updatedPacks);
        setOriginalTravalPack(prevOriginalPacks => prevOriginalPacks ? [...prevOriginalPacks, ...updatedOriginalPacks] : updatedOriginalPacks);

        // setTravalPack(result);
        // setOriginalTravalPack(result);

        setLoading(false);
    }

    const getFestivals = async () => {

        const result = await getFestival();

        if (!result) { alert('축제 목록을 불러오는데 실패했습니다.'); return; }

        setFestivalAll(result); // 전체 데이터를 그대로 설정
        setLoading(false);
    }

    /* 행의 예약하기 버튼 클릭시 여행 예약 페이지로 이동(로그인이 안되어 있으면 로그인창으로 보내기)*/
    const handleCellClick = (params) => {
        const jwt = sessionStorage.getItem('jwt');

        if (!jwt) {
            alert('로그인이 필요합니다');
            navigate('/login');
            return;
        }
        else {
            navigate(`/packreservation/reservation/${params}`);
        }
    };

    /* 패키지 여행 삭제 */
    const handleDelete = (packNum) => {
        deleteTravalpack(packNum).then(res => {
            if (res) {
                const updatedTravalPack = TravalPack.filter(deletetravalpack => deletetravalpack.packNum !== packNum);
                setTravalPack(updatedTravalPack);
                alert('패키지 여행 ' + packNum + '번 이 성공적으로 삭제되었습니다.');
            } else {
                alert('패키지 여행을 삭제하는 중 오류가 발생했습니다.');
            }
        })
    };

    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */

    /* 패키지 여행의 컬럼 */
    const columns = [
        {
            field: 'image', // 이미지 필드가 있다고 가정
            headerName: '여행 이미지',
            width: 300,

            renderCell: (params) => {
                const festivalData = FestivalfilteredData.find(festivallist => festivallist.name === params.row.festivalname);

                return (
                    <div className="image-cell">
                        {params.row.imgFile === undefined ?
                            <img class="custom-image"
                                src="https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=9046601&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNC8yMS9DTFM2L2FzYWRhbFBob3RvXzI0MTRfMjAxNDA0MTY=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10004"
                                alt="축제이미지"
                                onClick={() => handleModalOpen(params.row.packNum)} // 모달 열기 함수 호출
                            />
                            :

                            <img class="custom-image"
                                src={`data:image/png;base64,${params.row.imgFile}`}
                                alt={params.row.orgFile}
                                onClick={() => handleModalOpen(params.row.packNum)} // 모달 열기 함수 호출
                            />
                        }
                        {/*
                        <img class="custom-image"
                            src="https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=9046601&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNC8yMS9DTFM2L2FzYWRhbFBob3RvXzI0MTRfMjAxNDA0MTY=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10004"
                            alt="축제이미지"
                            onClick={() => handleModalOpen(params.row.packNum)} // 모달 열기 함수 호출
                        />
                */}

                        <ModalComponent
                            showModal={modalOpenMap[params.row.packNum]}
                            handleClose={() => handleModalClose(params.row.packNum)}
                            selectedImage={"https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=9046601&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNC8yMS9DTFM2L2FzYWRhbFBob3RvXzI0MTRfMjAxNDA0MTY=&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10004"}
                            params={params}
                            festivalDatas={festivalData} // festivalData 추가
                        />
                    </div>
                );
            },
        },
        { // 한개의 컬럼에 여러 컬럼의 정보를 출력
            field: 'travelinformation',
            headerName: '여행 정보',
            width: 900,
            renderCell: (params) => {
                const festivalData = FestivalfilteredData.find(festivallist => festivallist.name === params.row.festivalname);
                return (
                    <div className="travelinformation">
                        <p>{params.row.name}</p>
                        {/* 클릭시'금액'과 '한국 통화 형식'변환 */}
                        <p className='inform2'>가격:</p><p className='inform3'><ToggleCell value={params.row.price} /></p>
                        <p>숙박주소: {params.row.address}</p>
                        <p>숙박기간: {params.row.startDate} ~ {params.row.endDate}</p>
                        <p>최대인원: {params.row.count}</p>
                        <p>흡연실(금연실): {params.row.smoke}</p>
                        <p>몇 인실: {params.row.person}</p>
                        <p>예약 가능한 상태: {params.row.reservation}</p>
                        <p>축제: {params.row.festivalname}</p>
                        <p>축제기간: {params.row.startDate} ~ {params.row.endDate}</p>
                    </div>
                );
            },
        },
        {
            field: 'packreservation',
            headerName: '예약하기',
            renderCell: row =>
                <Button onClick={() => { handleCellClick(row.row.packNum) }}>
                    <h1 className='button-font'>예약하기</h1>
                </Button>
            ,
            width: 110,
        },
    ];

    /* 만약 관리자 가 로그인하면 삭제하기 활성화 
    - 배열에 새로운 객체를 추가하고 싶을 때 push()를 사용 */
    if (isAdmin) {
        columns.push({
            field: 'travalpackdelete',
            headerName: '삭제하기',
            renderCell: row =>
                <Button onClick={() => { handleDelete(row.row.packNum) }}>
                    <h1 className='button-font'>삭제하기</h1>
                </Button>,
            width: 110,
        });
    }

    // const onShow = () => {
    //     console.log(TravalPack);
    //     console.log(originalTravalPack);
    // }

    /* 화면 출력 */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */
    /* ▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤▤ */

    /* 패키지 여행 로딩 상태 관리 */
    if (loading) {
        return (
            <div>
                <p>패키지 여행 데이터를 불러오는 중입니다...</p>
            </div>
        );
    } else {
        return (
            <div>

                {/* <button onClick={onShow}>데이터 확인</button> */}

                {/* 패키지 여행 목록 */}
                <div className="PackageTravelList">

                    <h1 className="traval-pack-list-header">
                        <HotelIcon fontSize='large' className='custom-hotel-icon' /> 숙소 목록
                    </h1>

                    {/* 예약할 일정 선택 */}
                    <div className="checkbox-container">
                        <label>
                            <input
                                type="checkbox"
                                checked={showSelectedOnly}
                                onChange={() => { setShowSelectedOnly(!showSelectedOnly); handleFilterChange(); }}
                            />
                            1일 여행만 보기
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={showOneNightTwoDays}
                                onChange={() => { setShowOneNightTwoDays(!showOneNightTwoDays); handleFilterChange(); }}
                            />
                            1박 2일 여행만 보기
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={showTwoNightsThreeDays}
                                onChange={() => { setShowTwoNightsThreeDays(!showTwoNightsThreeDays); handleFilterChange(); }}
                            />
                            2박 3일 여행만 보기
                        </label>
                        <label>
                            {/* 지역 선택 */}
                            <select onChange={(e) => { handleCityChange(e.target.value); handleFilterChange(); }}>
                                <option value="">지역 선택</option>
                                <option value="서울특별시">서울특별시</option>
                                <option value="대전광역시">대전광역시</option>
                                <option value="전라북도">전라북도</option>
                            </select>
                        </label>
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="축제 검색"
                                // value={searchKeyword}
                                value={searchInput}
                                onChange={handleSearchInputChange}
                            />
                        </div>
                        <button className='search-button' onClick={handleSearch}><h1 className='search-btn-title'>검색</h1></button>
                        <button className='search-button' onClick={handleSearchReset}><h1 className='search-btn-title'>검색 초기화</h1></button>
                    </div>

                    {/* DataGrid를 이용한 여행 패키지 목록 표시 */}
                    {TravalPack.length === 0 ? ( // TravalPack(패키지 여행)의 데이터가 없으면 p 있으면 DataGrid를 출력
                        <div>
                            <p>표시할 패키지 여행 데이터가 없습니다.</p>
                            <p>패키지 여행 데이터를 등록해주세요.</p>
                        </div>
                    ) : (
                        <DataGrid
                            className="hideHeaders" // 컬럼 헤더 숨기기
                            rows={currentPageData} // 표시할 행 데이터
                            // rows={filteredRows} // 표시할 행 데이터(필터링)
                            columns={columns}// 열(컬럼) 설정
                            getRowId={row => row.packNum}// 각 행의 고유 ID 설정
                            checkboxSelection={false} // 체크박스(false(비활성화))
                            hideFooter={true} // 표의 푸터바 제거
                            getRowHeight={params => 450} // DataGrid의 특정 행의 높이를 100 픽셀로 설정(CSS로 분리불가)
                        />
                    )}

                </div>

                {/* 페이징(페이지 네이션) */}
                <PaginationComponent
                    // count={Math.ceil(TravalPack.length / itemsPerPage)} // 전체 데이터
                    count={Math.ceil(filteredRows.length / itemsPerPage)}
                    page={currentPage}
                    // onChange={handlePageChange} // 페이지 초기화 적용전
                    onChange={handlePaginationChange}
                />
            </div>
        );
    }

};

export default TravelPackList;