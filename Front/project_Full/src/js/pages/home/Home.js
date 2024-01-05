import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import "react-alice-carousel/lib/alice-carousel.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useHome } from './useHome';
import AliceCarousel from 'react-alice-carousel';

function Home() {

	// 페이지 이동을 위한 함수   
	const navigate = useNavigate();

	// 이미지 배열
	const [festivalImg, setFestivalImg] = useState();
	const [packImg, setPackImg] = useState();

	const { getPackNumber, getFilePack, getFestivalNumber, getFileFestival } = useHome();

	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

	useEffect(() => { getFestivalImg(); getPackImg(); }, []);

	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

	// 슬라이드에 이미지를 출력할 태그들
	const itemFestival = festivalImg !== undefined ? festivalImg.map((image, index) => {
		return (
			<img className='slide-img'
				key={`imageFestival ${index}`}
				alt={`image ${image.orgName}`}
				src={`data:image/png;base64,${image.imgFile}`}
			/>
		)
	}) : undefined;

	const itemPack = packImg !== undefined ? packImg.map((image, index) => {
		return (
			<img className='slide-img'
				key={`imagePackage ${index}`}
				alt={`image ${image.orgName}`}
				src={`data:image/png;base64,${image.imgFile}`}
			/>
		)
	}) : undefined;

	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

	// 축제 이미지 불러오기
	const getFestivalImg = async () => {
		const list = await getFestivalNumber();

		// 등록된 축제가 없는 경우
		if (list === undefined || list.length === 0) { return; }

		let newImages = []; // 새 이미지를 저장할 배열

		for (const num of list) {
			const res = await getFileFestival(num);

			if (res !== undefined) {
				newImages.push(res); // 새 이미지를 배열에 추가
			}
		}

		setFestivalImg(prevImages => prevImages ? [...prevImages, ...newImages] : newImages);
	}

	// 패키지 여행 이미지 불러오기
	const getPackImg = async () => {
		const list = await getPackNumber();

		// 등록된 패키지 여행이 없는 경우
		if (list === undefined || list.length === 0) { return; }

		let newImages = []; // 새 이미지를 저장할 배열

		for (const num of list) {
			const res = await getFilePack(num);

			if (res !== undefined) {
				newImages.push(res); // 새 이미지를 배열에 추가
			}
		}

		setPackImg(prevImages => prevImages ? [...prevImages, ...newImages] : newImages);
	}

	// const onShow = () => {
	// 	console.log(festivalImg);
	// 	console.log(packImg);
	// }

	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦
	// ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦ ▦▦▦▦▦▦▦▦▦▦

	return (

		<div class="container-xl">

			{/* <button onClick={onShow}>데이터 확인</button> */}

			<div class="p-5 mb-4 bg-body-tertiary rounded-3">
				<div class="container-fluid py-5">
					<h1 class="display-5 fw-bold" align="center">축제</h1>
					<p class="col-md-8 fs-4" align="center"><p class="mainfont">빛나는 무대, 환상의 놀이, 풍요로운 음식, 특별한 순간,<br /> 우리와 함께하세요. 최고의 축제가 여러분을 기다립니다!</p>
					</p>
				</div>
			</div>

			<div class="row align-items-md-stretch">
				<div class="col-md-6">
					<div class="h-100 p-5 text-bg-dark rounded-3">
						<h4>음악과 미술, <br></br>다양한 축제 활동으로 가득 찬 특별한 날을 만나보세요.</h4>
						<button class="btn btn-outline-light" type="button" onClick={() => navigate(`/calendar`)}>축제 보기</button>
					</div>
				</div>
				<div class="Homeimg">
					{festivalImg !== undefined ?
						<div class="imgGroup">
							<AliceCarousel
								autoPlay
								autoPlayStrategy="none"
								autoPlayInterval={2000}
								animationDuration={7000}
								animationType="slide"
								infinite
								touchTracking={false}
								disableDotsControls
								disableButtonsControls
								items={itemFestival}
							/>
						</div> : <></>
					}
				</div>
			</div>
			<div>
				<div class="col-md-7">
					<div class="h-100 p-5 bg-body-tertiary border rounded-3">
						<h4>특별한 순간을 예약하세요. 여행의 시작은 지금부터입니다!</h4>

						<button class="btn btn-outline-secondary" type="button" onClick={() => navigate(`/packreservationList`)}>패키지 보기</button>
					</div>
				</div>
				<div class="Homeimg2">
					{packImg !== undefined ?
						<div class="imgGroup2">
							<AliceCarousel
								autoPlay
								autoPlayStrategy="none"
								autoPlayInterval={2000}
								animationDuration={7000}
								animationType="slide"
								infinite
								touchTracking={false}
								disableDotsControls
								disableButtonsControls
								items={itemPack}
								autoPlayDirection='rtl'
							/>
						</div> : <></>
					}
				</div>
			</div>
		</div>
	);
}

export default Home;