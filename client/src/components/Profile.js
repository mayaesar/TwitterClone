import styled from "styled-components";
import { Spinner } from "./Spinner";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { COLORS } from "../constants";
import { FiCalendar, FiMapPin} from "react-icons/fi";
import { Error } from "./Error";
import Tweet from "./Tweet";


const Profile = () => {
    const [user, setUser] = useState(null);
    const [feed, setFeed] = useState(null);
    const [error, setError] = useState(null);
    const [array, setArray] = useState(null);
    const [isFollow, setIsFollow]=useState('follow');
    const {handle} = useParams();

    const handleChange = () => {
        if(isFollow == 'follow'){
            setIsFollow('following');
        }
        else {
            setIsFollow('follow');
        }
    }

    useEffect(() => {
        fetch(`/api/${handle}/profile`)
        .then(res => res.json())
        .then(data => setUser(data))
        .catch((error)  => {
            setError(error);
        })
    }, [handle]);

    useEffect(() => {
        fetch(`/api/${handle}/feed`)
        .then (res => res.json())
        .then ((data) => {
            setArray(data.tweetIds);
            setFeed(data.tweetsById);
        })
        .catch((error)  => {
            setError(error);
        })
    },[user])


    if(error) return (
        <Wrapper>
            <Error />
        </Wrapper>
    )
    if((user===null)||(feed===null)||(array===null)) return (
        <Loading>
            <div className="load"><Spinner /></div>
        </Loading>
    );
    const info = user.profile;
    const setBtn = () => {
        return <button className={isFollow} onClick={() => handleChange()}>{isFollow}</button>;
    }
    return(
        <Wrapper>
            <div className="page">
                <Header>
                    <img className="banner" src={info.bannerSrc}/>
                    <img className="avatar" src={info.avatarSrc}/>
                    {setBtn()}
                </Header>
                <Information>
                    <h3 className="displayName">{info.displayName}</h3>
                    <p className="handle">@{info.handle} <span className="follower">{(info.isFollowingYou)? 'Follows you' : null}</span></p>
                    <p className="bio">{info.bio}</p>
                    <div className="info">
                        <span><FiMapPin /> {info.location}</span>
                        <span><FiCalendar /> Joined {info.joined}</span>
                    </div>
                    <div className="follow">
                        <span>{info.numFollowing} following</span>
                        <span>{info.numFollowers} Followers</span>
                    </div>
                </Information>
                <Content>
                    <Buttons>
                        <button id='tweets' className="selected">Tweets</button>
                        <button id='media'> Media</button>
                        <button id='likes'>Likes</button>
                    </Buttons>
                    {(array.map((id) => {
                        return <Tweet key={id} tweet={feed[id]} />
                    }))}
                </Content>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    .page{
        border: 0.2px lightgrey solid;
    }
`;
const Loading = styled.div`
    height: 167px;
    width: 900px;
    .load{
        padding-left: 200px;
        margin-top: 150px;
    }
`;
const Header = styled.div`
    .banner{
        width: 80vw;
        height: 300px;
        object-fit: cover;
    }
    .avatar{
        width: 250px;
        border-radius: 200px;
        border: white 3px solid;
        position: relative;
        top: -125px;
        left: 20px;
    }
    button{
        position: relative; 
        top: -200px;
        left: 45vw;
        width: 100px;
        border-radius: 12px;
        font-weight: 600;
        padding: 7px;

    }
    .follow{
        border: ${COLORS.primary} 1px solid;
        background-color: white;
        color: ${COLORS.primary};
    }
    .following{
        border: white;
        background-color: ${COLORS.primary};
        color: white;
    }

`;

const Information = styled.div`
    margin-left: 20px;
    margin-top: -110px;
    .handle{
        font-size: 15px;
        font-weight: 300;
        margin-bottom: 10px;
    }
    .follower {
        margin-left: 5px;
        padding: 2px;
        background-color: lightgray;
    }
    .info, .follow {
        margin-top: 10px;
        color: grey;
    }
    .info span, .follow span {
        margin-right: 30px;
    }
`;

const Content = styled.div`
    margin-top: 50px;
    button{
        background-color: white;
        border: none;
        font-size: 15px;
        padding-bottom: 15px;
    }
    .selected{
        color: ${COLORS.primary};
    }
    
`;
const Buttons = styled.div`
    display: grid;
    grid-template-columns: 30% 30% 30%;
    border-bottom: 0.2px lightgrey solid;
`;

export default Profile;