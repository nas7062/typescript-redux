import React from "react";
import { CardProps } from "./Card";
import { useQuery  } from "@tanstack/react-query";
import { fetchDatas } from "./api";
import Feed from "./Feed";
import styled from "styled-components";


const Feedlist = styled.div`
    width:1400px;
    margin :0 auto;
    display:block;
`
const FeedList :React.FC = () =>{
    const { data ,} = useQuery<CardProps[]>({ queryKey: ["data"], queryFn: fetchDatas });
    return(
        <Feedlist>
              {Array.isArray(data) &&
                data.map((item: CardProps) =><Feed key={item.id} {...item}/>)}
        </Feedlist>
    );
}

export default FeedList;