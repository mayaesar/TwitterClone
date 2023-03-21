import { useState, useEffect, useContext } from "react";
import { Spinner } from "./Spinner";
import styled from "styled-components";
import { COLORS } from "../constants";
import { CurrentUserContext } from "./CurrentUserContext";
import { Error } from "./Error";

const NewTweet = ({setNewTweet}) => {
    const [error, setError] = useState(null);
    const[inputValue, setInputValue] = useState('');
    const [isClicked, setIsClicked] = useState(false);
    const[limit, setLimit] = useState(<p className="count">280</p>);
    const[button, setButton] = useState(<button className="meow" disabled>Meow</button>);
    const user = useContext(CurrentUserContext);

    const buttonClicked = () => {
        console.log("set is true")
        setIsClicked(true);
    }

    useEffect(() => {
        if(isClicked === true){
            fetch('/api/tweet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({'status': inputValue})
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setNewTweet(data);
                setIsClicked(false);
                setInputValue('');
            })
            .catch((error)  => {
                setError(error);
                setIsClicked(false);
            })            
        }
    }, [isClicked]);

    useEffect(() => {
        const count = 200 - inputValue.length;
            if (count === 200){
                setLimit(<p className="count">{count}</p>)
                setButton(<button className="meow" disabled>Meow</button>)
            }
            else if (count<200 && count >55){
                setButton(<button className="meow" onClick={buttonClicked}>Meow</button>);
                setLimit(<p className="count">{count}</p>)
            }    
            else if (count<=55 && count >=0){
                setLimit(<p className="yellow">{count}</p>);
                setButton(<button className="meow" onClick={buttonClicked}>Meow</button>);
            } 
            else{
                setLimit(<p className="red">{count}</p>);
                setButton(<button className="meow" disabled>Meow</button>);
            }   
    }, [inputValue]);

    
    const loader = () => {
        return(
            <Loading>
                <div className="load"><Spinner /></div>
            </Loading>
        );
    }

    if (error) return <Error />
    if( user === null ) { 
        return ( <div>{ loader() }</div>);
    }

    const getUser = (user.currentUser);
    let avatar = null;
    if(getUser != null){
        avatar = (getUser.profile.avatarSrc);
    }
    else{
        <Error/>
    }
    return(
        <Wrapper>
            <div className="add">
                <img src={avatar}/>
                <textarea cols="80" rows="4" placeholder="What's happening?" value={inputValue} onChange={(e) => setInputValue(e.target.value)}></textarea>
            </div>
            <div className="bottom">
                {limit}
                {button}
            </div>
        </Wrapper>
    );
}

const Loading = styled.div`
    height: 167px;
    border: 0.2px lightgrey solid;
    width: 900px;
    .load{
        padding-left: 400px;
        margin-top: 50px;
    }
`;

const Wrapper = styled.div`
border: 0.2px lightgrey solid;
width: 900px;
    .add{
        display: flex;
        margin-left: 30px;
        padding-top: 10px;
    }
    .add img{
        width: 50px;
        height: 50px;
        border-radius: 50px;
    }
    .add textarea{
        margin-left: 20px;
        font-size: 18px;
        outline: none;
        border: none;
        resize: none;
        margin-top: 10px;
    }
    .bottom{
        display: flex;
        align-items: center;
        margin-left: 720px;
        margin-top: 10px;
        margin-bottom: 20px;
    }
    .meow{
        width: 100px;
        margin-left: 20px;
        border-radius: 12px;
        font-weight: 600;
        padding: 6px;
        background-color: ${COLORS.primary};
        color: white;
        border: none;
    }
    .meow:disabled{
        background-color: ${COLORS.secondary};
    }
    .count{
        color: grey;
    }
    .yellow{
        color: orange;
    }
    .red{
        color: red;
    }
`;

export default NewTweet;