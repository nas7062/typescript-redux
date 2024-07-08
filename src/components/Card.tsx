import React from "react";
import styled from "styled-components";

interface CartProps {
    img :string,
    tag :string[],
    title:string,
    location:string
}
const CardSec = styled.div`


`
const Card :React.FC<CartProps> = ({img,tag ,title,location}) =>{

    return (
        <CardSec>
            <img src={img} alt="" />
            {tag.map((t:string,idx:number)=><span key={idx}>{t}</span>)}
            <span>{title}</span>
            <span>{location}</span>
        </CardSec>
    );
}

export default Card;