import FeedList from "../components/FeedList";
import Footer from "../components/Footer";
import Header from "../components/Header";
import styled from "styled-components";

const FeedSec = styled.div`
    
    h2{
        text-align:center;
    }
    button {
         box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
         background-color:#2CE0BC;
         color:white;
         font-weight:600;
         position:relative;
         left:70%;
         margin-bottom:80px;
    }
`
const Feed =() =>{
    return(
        <>
            <Header/>
            <FeedSec>
                <h2>피드</h2>
                <button>피드 작성하기</button>     
                <FeedList/>
            </FeedSec>
            <Footer/>
        </>
    );
}

export default Feed;