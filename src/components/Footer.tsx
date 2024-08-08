import styled from "styled-components";

const FooterSec = styled.div`
    width:100%;
    height:400px;
    background-color:rgba(0,0,0,0.1);
    margin-top:200px;
    display:flex;
    text-align:center;
    font-weight:600;
`
const FooterOne = styled.div`
    display:inline-block;
    width:80px;
    flex:0.3;
    margin-top:100px;
`
const FooterTwo = styled.div`
    display:inline-block;
    width:80px;
    flex:0.3;
    margin-top:100px;
`
const FooterThree = styled.div`
    display:inline-block;
    width:80px;
    flex:0.4;
    margin-top:100px;
`
const Footer = () => {

    return (
        <FooterSec>
            <FooterOne>
                <p>10012</p>
                <p>피드</p>
                <p>스터디</p>
                <p>챌린지</p>
                <p>메세지</p>
                <p>찜</p>
                <p>마이페이지</p>
            </FooterOne>
            <FooterTwo>
                <p>공지사항</p>
                <p>자주 묻는 질문</p>
            </FooterTwo>
            <FooterThree>
                <p>대표:김민석</p>
                <p>이메일 :nas7062@naver.com 번호 :010-9314-7062</p>
                <p>주소 :인천광역시 서구 봉오재 1로 36</p>
            </FooterThree>
        </FooterSec>
    );
}
export default Footer;