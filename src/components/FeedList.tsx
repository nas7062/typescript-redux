import React from "react";
import { CardProps } from "./Card";
import { useQuery } from "@tanstack/react-query";
import { fetchDatas } from "./api";
import Feed from "./Feed";
import styled from "styled-components";
import { Link } from "react-router-dom";


const Feedlist = styled.div`
    width:1400px;
    margin :0 auto;
    display:block;
     @media (max-width: 1508px) {

        width:1000px;
    }
     @media (max-width: 958px) {

        width:800px;
        position:relative;
        left:100px;
    }
    @media (max-width: 568px) {

        width:400px;
        position:relative;
        left:100px;
    }
`

const FeedList: React.FC<{ feeds: CardProps[] }> = ({ feeds }) => {
    const { data } = useQuery<CardProps[]>({ queryKey: ["data"], queryFn: fetchDatas });

    console.log(feeds);
    return (
        <Feedlist>
            {Array.isArray(data) &&
                data.map((item: CardProps) => (
                    <Link key={item.id} to={`/feed/${item.id}`} >
                        <Feed {...item} />
                    </Link>
                ))}
            {feeds.map((feed) => (
                <Link key={feed.id} to={`/feeds/${feed.id}`} >
                    <Feed {...feed} />
                </Link>
            ))}
        </Feedlist>
    );
}

export default FeedList;