import React from "react";
import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import { fetchNotice } from "../components/api";
import Noti from "../components/Noti";
import { Link } from "react-router-dom";
import styled from "styled-components";
export interface NotiProps {
    id:number,
    img?: string,
    name: string,
    title: string,
    descript: string,
}
const Notilist = styled.div`

    h2 {
        text-align :center;
    }
    display:inline;
    margin:0px auto;
`
const NotLinkt = styled.div`

    width:1000px;
    margin:0px auto;
`
const Notice:React.FC = () =>{

    const { data } = useQuery<NotiProps[]>({ queryKey: ["data"], queryFn: fetchNotice });
    return (
        <>
            <Header/>
            <Notilist>
                <h2>공지사항 & FAQ</h2>
                <NotLinkt>
                {Array.isArray(data) &&
                data.map((item: NotiProps) =>(
                <Link key={item.id} to={`/notice/${item.id}`} >
                <Noti {...item}/>
                </Link>
            ))}
                </NotLinkt>
            </Notilist>
        </>
    );
}

export default Notice;