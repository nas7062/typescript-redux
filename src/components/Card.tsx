import React from "react";
import styled from "styled-components";

export interface CardProps {
    id: string |number,
    img?: string,
    img2?: File ,
    tag: string[],
    title: string,
    location: string,
}
const CardSec = styled.div`

    display:inline-block;
    width:700px;
    height:200px;
    border-radius:10px;
    margin-right:30px;
   box-shadow: 0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);
    background-color:white;
    img{
        width:300px;
        height:200px;
        
    }
    h2{
        width:400px;
        position:relative;
        top:-200px;
        left:300px;
        text-align:center;
    }
    p {
        display:block;
        position:relative;
        top:-200px;
        left:150px;
        text-align:center;
    }
    span{
        position:relative;
        top:-180px;
        left:430px;
        text-align:center;
        margin-right:10px;
        color:red;
        border:1px solid #FF8C8C;
        border-radius:10px;
        font-weight:600;
        padding:5px 10px;
        
    }
        @media (max-width: 1568px) {
        height: 350px;
        display:inline-block;
        flex-direction: column;
        align-items: center;
        margin-bottom:20px;
        width:250px;
        
        img {
            width: 100%;
            height: 175px;
            border-radius: 10px 10px 0 0;
        }

        h2, p {
            position: relative;
            left: 0;
            top: 0;
            width: 100%;
            transform: none;
        }

        span {
            display:none;
        }
    }
         @media (max-width: 1158px) {
        height: 350px;
        display:inline-block;
        flex-direction: column;
        align-items: center;
        margin-bottom:20px;
        width:200px;
        
        img {
            width: 100%;
            height: 175px;
            border-radius: 10px 10px 0 0;
        }

        h2, p {
            position: relative;
            left: 0;
            top: 0;
            width: 100%;
            transform: none;
        }

        span {
            display:none;
        }
    }
    @media (max-width: 968px) {
        height: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width:400px;
        img {
            width: 100%;
            height: 350px;
            border-radius: 10px 10px 0 0;
        }

        h2, p {
            position: relative;
            left: 0;
            top: 0;
            width: 100%;
            transform: none;
        }

        span {
            position: relative;
            left: 0;
            bottom: 0;
            transform: none;
            margin: 5px;
        }
    }    
`
const Card: React.FC<CardProps> = ({ id, img, tag, title, location }) => {

    return (
        <>
            <CardSec key={id} className="card">
                <img src={img} alt={title} />
                <h2 >{title}</h2>
                <p >{location}</p>
                {tag.map((t: string, idx: number) => (
                    <span key={idx} className="card-tag">{t}</span>
                ))}

            </CardSec>

        </>
    );
}

export default Card;