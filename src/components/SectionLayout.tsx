import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FeedSec = styled.div`
    width:1500px;
    display:inline-block;
    position:relative;
    left:150px;
     @media (max-width: 1568px) {
        left:50px;
        
    }
    @media (max-width: 968px) {
        left:150px;
        
    }
    @media (max-width: 788px) {
        left:50px;
        
    }
    @media (max-width: 580px) {
        left:0px;
        
    }
`
const PartSec = styled.div`
    
    position:relative;
    left:100px;
    width:1700px;
    height:700px;
    background-color:#D2D2FF;
    box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    margin:150px auto;
    @media (max-width: 1568px) {
        width: 80%;
        height: auto;
    }

    @media (max-width: 1358px) {
        width: 90%;
        padding: 15px;
    }

    @media (max-width: 1180px) {
        width: 100%;
        
        padding: 10px;
    }
    @media (max-width: 780px) {
        width: 100%;
        
        padding: 10px;
        
    }
    @media (max-width: 580px) {
        left:0px;
        
    }
    
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
         @media (max-width: 768px) {
            font-size: 0.9rem;
            padding: 8px 15px;
            left:200px;
        }

        
    }
`
const Text = styled.div`
    text-align:center;
     @media (max-width: 780px) {
        font-size:0.8rem;
        position:relative;
        left:-50px;
    }
`
interface LayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle: string;
    link: string
}
const SectionLayout: React.FC<LayoutProps> = ({ children, title, subtitle, link }) => {
    const navigate = useNavigate();
    const MoveHandler = () => {
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