import React from "react";
import { CardProps } from "./Card";
import { useQuery } from "@tanstack/react-query";
import { fetchGoal } from "./api";
import Feed from "./Feed";
import styled from "styled-components";
import { Link } from "react-router-dom";


const Feedlist = styled.div`
    width:1400px;
    margin :0 auto;
    display:block;
`

const GoalList: React.FC<{ goals: CardProps[] }> = ({ goals }) => {
    const { data } = useQuery<CardProps[]>({ queryKey: ["chal"], queryFn: fetchGoal });

    return (
        <Feedlist>
            {Array.isArray(data) &&
                data.map((item: CardProps) => (
                    <Link key={item.id} to={`/chal/${item.id}`} >
                        <Feed {...item} />
                    </Link>
                ))}
            {goals.map((go) => (
                <Link key={go.id} to={`/chals/${go.id}`} >
                    <Feed {...go} />
                </Link>
            ))}
        </Feedlist>
    );
}

export default GoalList;