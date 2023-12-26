import React from 'react';
import { Modal} from 'react-bootstrap';
import {Button} from '@mui/material';
import { ToggleCell } from 'js';
import './ModalComponent.css';
/* 부트 스트랩 모달 출력 */
/*  params은 fetch(SERVER_URL + `travalpack/${packNum}`) 또는 fetch(SERVER_URL + "travalpackAll", { method: 'GET' })API의 
    전체값을 받으면 보내진 값을 row.DB값을 입력해 세부적으로 출력한다 */
const ModalComponent = ({ showModal, handleClose, selectedImage, params, festivalDatas }) => {

    /* resNum과 packName을 구분하기 위한 상수 */
    /* fetch(SERVER_URL + `packreservation/memberpackreservation/${data.memId}`, { method: 'POST' })와  fetch(SERVER_URL + `packreservation/${resNum}`)에 대한 처리 */
    const isResNum = !!params.row.resNum;


    return (
        <Modal show={showModal} onHide={handleClose} className="custom-modal-dialog modal-lg">
            <Modal.Header closeButton className='modal-back'>
                <Modal.Title>
                    {isResNum ? (
                        <div className='Modal-title'>
                            <p>예약 번호: {params.row.resNum}</p>
                            <p>패키지 번호: {params.row.packNum}</p>
                            <p>숙소: {params.row.packName}</p>
                        </div>
                    ) : (
                        <div className='Modal-title'>

                            <p>패키지번호: {params.row.packNum}</p>
                            <p>패키지 이름: {params.row.name}</p>
                            <p>축제: {params.row.festivalname}</p>
                        </div>
                    )}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-body'>
                {isResNum ? (
                    <div className='Modal'>
                        <img
                            className="modal-image"
                            src={selectedImage}
                            alt="모달 이미지"

                        />
                        <div className='Modal-inform'>
                            {/* 클릭시'금액'과 '한국 통화 형식'변환 */}
                            <p>예약한 회원: {params.row.memId}</p>
                            <p>예약일: {params.row.startDate}</p>
                            <p>예약한 인원: {params.row.count}</p>
                            <p>숙박기간: {params.row.dateCnt}</p>
                            <p className='inform2'>가격:</p><p className='inform3'><ToggleCell value={params.row.price} /></p>
                            <p style={{ float: 'left', marginRight: '5px' }}>결제 금액: </p><ToggleCell value={params.row.price * params.row.count} />
                        </div>
                    </div>
                ) : (
                    
                    <div className='Modal'>
                        <img
                            className="modal-image"
                            src={selectedImage}
                            alt="모달 이미지"

                        />
                        <div className='Modal-inform'>
                            {/* 클릭시'금액'과 '한국 통화 형식'변환 */}
                            <p className='inform2'>가격:</p><p className='inform3'><ToggleCell value={params.row.price} /></p>
                            <p>숙박기간: {params.row.startDate} ~ {params.row.endDate}</p>
                            <p>등록일: {params.row.singupDate}</p>
                            <p>최대인원: {params.row.count}</p>
                            <p>흡연실(금연실): {params.row.smoke}</p>
                            <p>주소: {params.row.address}</p>
                            <p>상세내용: {params.row.text}</p>
                            <p>몇 인실: {params.row.person}</p>
                            <p>예약 가능한 상태: {params.row.reservation}</p>
                            <p>축제: {params.row.festivalname}</p>
                            {festivalDatas && (
                                <div>
                                    <p>축제기간: {festivalDatas.startDate} ~ {festivalDatas.endDate}</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer className='modal-footer'>
                <Button onClick={handleClose}>
                <h1 className='Modal-button'>닫기</h1>    
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ModalComponent;