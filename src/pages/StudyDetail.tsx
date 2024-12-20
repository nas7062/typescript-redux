import { useMutation, useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { CardProps } from "../components/Card";
import {   addStudyParticipation, fetchStudys } from "../components/api";
import styled from "styled-components";
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
         margin-top:50px;
     }
`
const StudyDetail: React.FC= () => {

    const { id } = useParams<{ id: string }>();
    const { data:studies =[] } = useQuery<CardProps[]>({
        queryKey: ["study"],
        queryFn: fetchStudys,
    });
    const study = studies.find(study => study.id === parseInt(id!));

     const userId = auth.currentUser?.uid;
   
     const mutation = useMutation({
        mutationFn: async () => {
          if (userId && study) {
            await addStudyParticipation(userId, study.id.toString(),study.title);
          } else {
            throw new Error("유저 ID 또는 스터디 정보를 찾을 수 없습니다.");
          }
        },
        onSuccess: () => {
          alert("스터디에 성공적으로 참여했습니다.");
        },
        onError: (error: Error) => {
          alert(`스터디 참여 중 오류가 발생했습니다: ${error.message}`);
        }
      });
      
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
                    <BookMarkBtn userId={userId} studyId={study.id.toString()}/>
                    <button onClick={() => mutation.mutate()}>스터디 참여하기</button>        
                    </Btn>
                   
                </>
            )}
        </DetailContainer>
    );
}

export default StudyDetail;