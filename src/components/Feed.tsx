import React from "react";
import { CardProps } from "./Card";
import styled from "styled-components";
const CardSec = styled.div`

    display:inline-block;
    width:300px;
    height:400px;
    border-radius:10px;
    margin-right:30px;
    background-color:white;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    margin-top:50px;
    img{
        width:300px;
        height:200px;
        
    }
    h2{
        width:300px;
        position:relative;
        text-align:center;
    }
    p {
        position:relative;
        width:300px;
        text-align:center;
    }
    span{
        position:relative;
        margin-right:10px;
        color:red;
        left:70px;
        top:30px;
        border:1px solid #FF8C8C;
        border-radius:10px;
        font-weight:600;
        padding:5px 10px;
        
    }
    @media (max-width: 568px) {
        width:150px;
        height:250px;
        position:relative;
        left:-50px;
        img{
        width:150px;
        height:100px;
        
    }
    h2{
        width:150px;
        position:relative;
        text-align:center;
    }
    p {
        position:relative;
        width:150px;
        text-align:center;
    }
    span{
       display:none;
    }
    }
`
const Feed: React.FC<CardProps> = ({ id, img, tag, title, location }) => {


    return (
        <CardSec key={id} >
            <img src={img} alt={title} />
            <h2 >{title}</h2>
            <p >{location}</p>
            {tag.map((t: string, idx: number) => (
                <span key={idx}>{t}</span>
            ))}
        </CardSec>

    );
}

export default Feed;