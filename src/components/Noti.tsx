
import React from "react";
import styled from "styled-components";
import { NotiProps } from "../pages/Notice";

const NotSec = styled.div`
    width:800px;
    margin : 60px auto;
`

const Noti:React.FC<NotiProps> = ({id,img,title,name,descript}) =>{

    return(
            <NotSec>
                <span>{id}</span>
                <span>{title}</span>
                <span>{name}</span>
            </NotSec>
        );
}

export default Noti;