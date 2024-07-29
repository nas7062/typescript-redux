import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardProps } from "../components/Card";
import {  addBookmark, fetchStudys, getUserBookmarks, removeBookmark } from "../components/api";
import styled from "styled-components";
import { auth } from "../firebaseConfig";

const DetailContainer = styled.div`
    width: 800px;
    margin: 0 auto;
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    img {
        width: 100%;
        height: auto;
        border-radius: 10px;
    }
    h2 {
        text-align: center;
    }
    p {
        text-align: center;
    }
    span{
     position:relative;
        margin-right:10px;
        color:red;
        left:330px;
        border:1px solid #FF8C8C;
        border-radius:10px;
        font-weight:600;
        padding:5px 10px;
    }
`;
const Btn = styled.div`
    display:flex;
     justify-content: space-around ;

     button {
        background-color:#007bff;
        color:white;
     }
`
const StudyDetail: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const { data:studies =[] } = useQuery<CardProps[]>({
        queryKey: ["study"],
        queryFn: fetchStudys,
    });

    const userId = auth.currentUser?.uid;
    const study = studies.find(study => study.id === parseInt(id!));
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
    useEffect(() => {
        const checkIfBookmarked = async () => {
            if (userId && study) {
                // Firestore에서 찜 목록을 확인하여 현재 찜 상태를 설정합니다.
                try {
                    const bookmarks = await getUserBookmarks(userId);
                    setIsBookmarked(bookmarks.includes(study.id.toString()));
                } catch (error) {
                    console.error("Error checking bookmarks:", error);
                }
            }
        };

        checkIfBookmarked();
    }, [userId, study]);

    const toggleBookmark = async () => {
        if (userId && study) {
            if (isBookmarked) {
                // 찜 목록에서 제거
                await removeBookmark(userId, study.id.toString());
            } else {
                // 찜 목록에 추가
                await addBookmark(userId, study.id.toString());
            }
            setIsBookmarked(!isBookmarked); // 상태 토글
        }
    };
    return (
        <DetailContainer>
            {study && (
                <>
                    <img src={study.img} alt={study.title} />
                    <h2>{study.title}</h2>
                    <p>{study.location}</p>
                    {study.tag.map((t, idx) => (
                        <span key={idx}>{t}</span>
                    ))}
                    <Btn>
                    <button onClick={toggleBookmark}>
                            {isBookmarked ? '찜 취소하기' : '찜하기'}
                        </button>
                        <button>스터디 참여하기</button>    
                    </Btn>
                   
                </>
            )}
        </DetailContainer>
    );
}

export default StudyDetail;