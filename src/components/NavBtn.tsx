import React from "react";
import styled from "styled-components";

interface NavBtnProps {
    img :string,
    text:string,
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
const NavBtn :React.FC<NavBtnProps>= ({img,text}) =>{

    return(
        <Nbtn>
            <img src={img} alt="" />
            <p>{text}</p>
        </Nbtn>
    );
}
export default NavBtn;