/* global kakao */
// - 리액트에서 카카오 맵을 뛰우려면 import React 윗부분에 /* global kakao */을 작성해야한다.
// => 참고: https://velog.io/@bearsjelly/React-kakao-%EC%A7%80%EB%8F%84-%EB%9D%84%EC%9A%B0%EA%B8%B0-2-%EC%95%B1%ED%82%A4%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4-%EC%A7%80%EB%8F%84-%EB%9D%84%EC%9A%B0%EA%B8%B0
// - 주소로 장소 표시하기: https://apis.map.kakao.com/web/sample/addr2coord/

import { SERVER_URL } from 'js';
import { useEffect } from "react";
import './TravelPackMap.css';

/* 여행 예약 기능 2-2번*/
/* - 지도
	> TravelReservation에서 packNum를 전달받는다. 
*/
const TravelPackMap = ({ packNum }) => {

	// 주소-좌표 변환 객체를 생성
	const geocoder = new kakao.maps.services.Geocoder();

	/* =========================================================== */
	/* =========================================================== */
	/* =========================================================== */

	useEffect(() => {
		fetch(SERVER_URL + `getTravalpack?packNum=${packNum}`)
			.then((response) => response.json())
			.then(data => {
				showMap([data]);
			})
			.catch((e) => { alert(e); });
	}, []);

	/* =========================================================== */
	/* =========================================================== */
	/* =========================================================== */

	/* 지도 설정 */
	const showMap = (data) => {

		/* 지도에 대한 좌표 및 화면 설정 */
		const
			// 지도를 표시할 div 
			mapContainer = document.getElementById('map'),

			// 지도 설정
			mapOption = {

				// 지도의 중심좌표
				center: new kakao.maps.LatLng(33.450701, 126.570667),

				// 지도의 확대 레벨
				level: 2
			};

		/* 지도를 생성 */
		const map = new kakao.maps.Map(mapContainer, mapOption);

		data.map((addr) => {

			// 주소로 좌표를 검색
			geocoder.addressSearch(addr.address, function (result, status) {

				// 정상적으로 검색이 완료됐으면 
				if (status === kakao.maps.services.Status.OK) {

					let coords = new kakao.maps.LatLng(result[0].y, result[0].x);

					// 결과값으로 받은 위치를 마커로 표시
					let marker = new kakao.maps.Marker({
						map: map,
						position: coords
					});

					// 인포윈도우로 장소에 대한 설명을 표시
					let infowindow = new kakao.maps.InfoWindow({
						content:
							`<div style="width:300px;text-align:center;padding:1px 0;">` +
							`<p>장소: ` +
							`${addr.address}` +
							`</p>` +
							`<p>기간: ` +
							`${addr.startDate} ~ ${addr.endDate}` +
							`</p>` +
							`</div>`
					});
					infowindow.open(map, marker);

					// 지도의 중심을 결과값으로 받은 위치로 이동
					map.setCenter(coords);
				}
			});

			return null;
		});
	}

	/* =========================================================== */
	/* =========================================================== */
	/* =========================================================== */

	return (
		<div className='reservation-map'>
			{/* 패키지 여행의 위치를 지도에 표시 */}
			<div id="map" style={{ width: "100%", height: "50vh", border: "3px solid #ccc" }}>
			</div>
		</div>
	);
}

export default TravelPackMap;