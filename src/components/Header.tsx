import React from "react";
import styled from "styled-components";
import NavBtn from "./NavBtn";
import feed from "../../public/assets/feed.png"
import msg from "../../public/assets/message.png"
import heart from "../../public/assets/heart.png"
import my from "../../public/assets/my.png"
const TopBar = styled.div`
    
    margin-top:-10px;
    background-color:#dcdcdc;
    
    max-width:100%;
    ul{
        position:relative;
        display:flex;
        left:50%;
        padding:5px 0px;
    }    
        

    li{
        margin-left:100px;
        list-style:none;
        font-weight:600;
        font-size:0.8rem;
    }
`
const NavBar = styled.div`
    width:800px;
    margin :0px auto;
    display:flex;
    position:relative;
    top:30px;
    h2 {
        display:inline-block;
        font-size:2.0rem;
        margin-right:50px;
        position:relative;
        top:-35px;
    }
    input{
        width:300px;
        height:30px;
        border-radius:10px;
        background-color:#dcdcdc;
        border:0px solid #dcdcdc;
        
    }
    
`
const Header :React.FC= () =>{
    return(
        <div>
            <TopBar>
                <ul>
                    <li>로그인</li>
                    <li>회원가입</li>
                    <li>공지사항</li>
                </ul>
            </TopBar>
            <NavBar>
                <h2>10012</h2>
                <input type="text" placeholder="지금 생각나는 단어를 검색해봐요!" />
                <NavBtn img={feed} text="피드"/>
                <NavBtn img={msg} text="메세지"/>
                <NavBtn img={heart} text="찜"/>
                <NavBtn img={my} text="마이"/>
                
            </NavBar>
            
        </div>
    );
}

export default Header;