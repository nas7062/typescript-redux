import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import {  fetchChals } from "../components/api";
import styled from "styled-components";
import { CardProps } from "../components/Card";
import { auth } from "../firebaseConfig";
import BookMarkBtn from "../components/BookMarkBtn";

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
    span {
        position: relative;
        margin-right: 10px;
        color: red;
        left: 330px;
        border: 1px solid #FF8C8C;
        border-radius: 10px;
        font-weight: 600;
        padding: 5px 10px;
    }
`;
const Btn = styled.div`
    display:flex;
     justify-content: space-around ;

     button {
        background-color:#007bff;
        color:white;
         margin-top:50px;
     }
`
const GoalDetail2: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data } = useQuery<CardProps[]>({
        queryKey: ["challenges"],
        queryFn: fetchChals,
    });
    const userId = auth.currentUser?.uid;
   
    const goal = data?.find(item => item.id === id! );
    
    return (
        <DetailContainer>
            {goal ? (
                <>
                    <img src={goal.img} alt={goal.title} />
                    <h2>{goal.title}</h2>
                    <p>{goal.location}</p>
                    {goal.tag.map((t, idx) => (
                        <span key={idx}>{t}</span>
                    ))}
                    <Btn>
                    <BookMarkBtn userId={userId} studyId={goal.id.toString()}/>
                        <button>스터디 참여하기</button>    
                    </Btn>
                </>
            ) : (
                <p>피드를 찾을 수 없습니다.</p>
            )}
        </DetailContainer>
    );
}

export default GoalDetail2;