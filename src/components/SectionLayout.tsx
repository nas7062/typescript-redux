import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FeedSec = styled.div`
    width:1500px;
    display:inline-block;
    position:relative;
    left:150px;
    
`
const PartSec = styled.div`
    margin-top:200px;
    position:relative;
    left:100px;
    width:1700px;
    height:700px;
    background-color:#D2D2FF;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    button {
        text-align:center;
        position:absolute;
        left:48%;
        top:103%;
        background-color:rgba(0,0,0,0.1);
        padding:15px 30px;
        font-size:1.1rem;
        border-radius:10px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
        
    }
`
const Text = styled.div`
    text-align:center;
    
`
interface LayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
    link :string
}
const SectionLayout: React.FC<LayoutProps> = ({ children, title, subtitle ,link }) => {
    const navigate = useNavigate();
    const MoveHandler =() =>{
        navigate(`${link}`);
    }
    return (
        <PartSec>
            <Text>
                <h3>{title}</h3>
                <h2>{subtitle}</h2>
            </Text>
            <FeedSec>{children}</FeedSec>
            <button onClick={MoveHandler}>더보기</button>
        </PartSec>
    );
}

export default SectionLayout;