import styled from "styled-components";
import {FaBomb} from "react-icons/fa";
export const Error = () => {
    return(
        <Wrapper>
            <div className="icon"><FaBomb/></div>
            <h2>An Unknown error has occurred.</h2>
            <p>Please try refreshing the page, or <span>contact support</span> if the problem persists.</p>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    padding-top: 100px;
    text-align: center;
    width: 500px;
    
    .icon{
        font-size: 80px;
    }
    h2{
        font-size: 23px;
        padding: 10px;
    }
    p{  
        padding: 10px;
        font-size: 18px;
        text-align: left;
    }
    span{
        color: blue;
        text-decoration: underline;
    }
`;