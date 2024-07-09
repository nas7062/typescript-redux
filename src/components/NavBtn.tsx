import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface NavBtnProps {
    img: string,
    text: string,
    lk:string,
}
const Nbtn = styled.div`
    width:50px;
    text-align:center;
    margin-left:10px;
    img {
        width:25px;
    }
    p  {
        font-size:0.7rem;
        margin-top:0px;
        
    }
    
`
const NavBtn: React.FC<NavBtnProps> = ({ img, text ,lk }) => {

    return (
        <Nbtn>
            <Link to={`/${lk}`}>
            <img src={img} alt="" />
            <p>{text}</p>
            </Link>
        </Nbtn>
    );
}
export default NavBtn;