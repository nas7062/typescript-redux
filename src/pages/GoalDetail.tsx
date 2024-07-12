import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import { CardProps } from "../components/Card";
import { fetchDatas, fetchGoal } from "../components/api";
import styled from "styled-components";

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

const GoalDetail: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const { data } = useQuery<CardProps[]>({
        queryKey: ["goal"],
        queryFn: fetchGoal,
    });

    const feed = data?.find(item => item.id === parseInt(id!));
    console.log(feed?.img);
    return (
        <DetailContainer>
            {feed && (
                <>
                    <img src={feed.img} alt={feed.title} />
                    <h2>{feed.title}</h2>
                    <p>{feed.location}</p>
                    {feed.tag.map((t, idx) => (
                        <span key={idx}>{t}</span>
                    ))}
                </>
            )}
        </DetailContainer>
    );
}

export default GoalDetail;