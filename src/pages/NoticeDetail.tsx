import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchNotice } from "../components/api";
import styled from "styled-components";
import { NotiProps } from "./Notice";

const DetailContainer = styled.div`
    width: 800px;
    margin: 20px auto;
    padding: 20px;
    border: 1px solid #ddd;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    margin-bottom: 20px;
    text-align: center;
`;

const Content = styled.p`
    margin-top: 10px;
    line-height: 1.6;
`;

const NoticeDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { data } = useQuery<NotiProps[]>({
        queryKey: ["data"],
        queryFn: fetchNotice,
    });
    
    const noti = data?.find(item => item.id === parseInt(id!));
    return (
        <DetailContainer>
            {noti && <>
            
            <Title>{noti.title}</Title>
            <p><strong>Author:</strong> {noti.name}</p>
            {noti.img && <img src={noti.img} alt={noti.title} />}
            <Content>{noti.descript}</Content>
            </>}
        </DetailContainer>
    );
};

export default NoticeDetail;
