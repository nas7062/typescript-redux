import styled from "styled-components";
import bgimg from "../../public/assets/1.png"
interface MsecProps {
    bgimg: string;
}
const Msec = styled.div<MsecProps>`
     background-image: url(${(props) => props.bgimg});
    background-size: cover;
    background-position: center;
    height: 60vh;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size:1.8rem;

`
const MainSection = () => {

    return (
        <Msec bgimg={bgimg} >
            <h2>취미가 같은 사람들</h2>
            <h3>관심사가 비슷한 사람들의 커뮤니티 , 10012</h3>
        </Msec>
    );
}
export default MainSection;