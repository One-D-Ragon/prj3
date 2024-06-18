import axios from 'axios';
import {Button, useToast} from "@chakra-ui/react";
import '/public/css/paid/Payment.css';
import React, {useContext, useEffect, useState} from 'react';
import {LoginContext} from "../../component/LoginProvider.jsx";
import {useNavigate} from "react-router-dom";


const Payment = () => {
    const toast = useToast();
    const account = useContext(LoginContext);
    const navigate = useNavigate();
    useEffect(() => {
        const jquery = document.createElement("script");
        jquery.src = "http://code.jquery.com/jquery-1.12.4.min.js";
        const iamport = document.createElement("script");
        iamport.src = "http://cdn.iamport.kr/js/iamport.payment-1.1.7.js";
        document.head.appendChild(jquery);
        document.head.appendChild(iamport);
        return () => {
            document.head.removeChild(jquery);
            document.head.removeChild(iamport);
        };
    }, []);

    const requestPay = () => {
        const { IMP } = window;
        IMP.init('imp61364323');

        IMP.request_pay({
            pg: 'html5_inicis.INIpayTest',
            pay_method: 'card',
            merchant_uid: new Date().getTime(),
            name: '원용님 결제 전용',
            amount: 100,
            buyer_email: 'dlehddud60@naver.com',
            buyer_name: '이동영',
            buyer_tel: '010-3275-5687',
            buyer_addr: '서울특별시',
            buyer_postcode: '123-456',
        }, async (rsp) => {
            console.log(rsp)
            if(rsp.success == true) {
                alert("결제성공")
            axios
                .post("/api/paid/write",{
                    "spaceId" : 2,
                    "reservationId" : 2,
                    "memberId" : account.id,
                    "totalPrice" : 1000
                })
                .then((res) => {
                    toast({
                        status: "success",
                        description: "결제가 완료되었습니다.",
                        position: "top",
                        duration: 1000,
                    });
                    navigate("/paid/payment")
                })
                .catch((err) => {
                    toast({
                        status: "error",
                        description: "결제를 실패하였습니다.",
                        position: "top",
                        duration: 1000,
                    });
                })

            }else {
                alert("결제 실패")
            }
        });
    };

    return (
        <div>

            <div className="titleArea">
                <p className="title">결제 상태 페이지</p>
            </div>
            <div className="titleArea">
                <p className="title">회원 고유번호 : {account.id}</p>
            </div>
            <div className="paidArea">
            <Button colorScheme='blue' className="paidButton" onClick={requestPay}>결제하기</Button>
            </div>
        </div>
    );
};

export default Payment;