import React from "react";
import { CardProps } from "./Card";
import { useQuery } from "@tanstack/react-query";
import { fetchGoal, fetchStudy, fetchStudys } from "./api";
import Feed from "./Feed";
import styled from "styled-components";
import { Link } from "react-router-dom";


const Feedlist = styled.div`
    width:1400px;
    margin :0 auto;
    display:block;
`

const StudyList: React.FC<{ studys: CardProps[] }> = ({ studys }) => {
    const { data } = useQuery<CardProps[]>({ queryKey: ["study"], queryFn: fetchStudys });

    return (
        <Feedlist>
            {Array.isArray(data) &&
                data.map((item: CardProps) => (
                    <Link key={item.id} to={`/study/${item.id}`} >
                        <Feed {...item} />
                    </Link>
                ))}
            {studys.map((go) => (
                <Link key={go.id} to={`/studys/${go.id}`} >
                    <Feed {...go} />
                </Link>
            ))}
        </Feedlist>
    );
}

export default StudyList;