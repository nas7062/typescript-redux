import React from "react";
import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import { fetchNotice } from "../components/api";
import Noti from "../components/Noti";
import { Link } from "react-router-dom";

export interface NotiProps {
    id:number,
    img?: string,
    name: string,
    title: string,
    descript: string,
}
const Notice:React.FC = () =>{

    const { data } = useQuery<NotiProps[]>({ queryKey: ["data"], queryFn: fetchNotice });
    return (
        <>
            <Header/>
            <div>
                <h2>공지사항 & FAQ</h2>
                <div>
                {Array.isArray(data) &&
                data.map((item: NotiProps) =>(
                <Link key={item.id} to={`/notice/${item.id}`} >
                <Noti {...item}/>
                </Link>
            ))}
                </div>
            </div>
        </>
    );
}

export default Notice;