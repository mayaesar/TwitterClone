import styled from "styled-components";
import { FiHeart, FiDownload, FiMessageCircle } from "react-icons/fi";
import {BiRepost} from "react-icons/bi"
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import moment from "moment";

const Tweet = ({tweet}) => {
    const [isRetweet, setIsRetweet] = useState();
    const [isLike, setIsLike] = useState();
    const [retweets, setRetweets] = useState(tweet.numRetweets);
    const [likes, setLikes] = useState(tweet.numLikes);

    let navigate = useNavigate();
    const info = tweet;
    const author = info.author;
    const handle = author.handle;
    const time = moment(info.timestamp).format("MMM Do");
    const media = (tweet.media.length == 0)? null : <img src={tweet.media[0].url}/>
    const profilePath = '/profile/'+handle;
    

    const handleChange = (clicked) =>{
        if(clicked === 'retweet'){
            setIsRetweet((isRetweet === true)? false:true);
            setRetweets((isRetweet === true)? retweets-1:retweets+1);
        }
        else{
            setIsLike((isLike === true)? false:true);
            setLikes((isLike === true)? likes-1:likes+1);
        }
    }

    return ( 
        <Wrapper>
            <Links to={`/tweet/${info.id}`}>
                <Header onClick={(e) => {
                    e.preventDefault();
                    navigate(profilePath);
                    }}>
                    <div>
                        <img src={author.avatarSrc}/>
                    </div>
                    <div>
                        <p className="user"><span>{author.displayName}</span> @{author.handle} - {time}</p>
                    </div>
                </Header>
                <Body>
                    <p className="status">{info.status}</p>
                    {media}
                </Body>
            </Links>
            <Footer>
                <button><FiMessageCircle /></button>
                <button className={isRetweet? 'retweeted': ''} onClick={() => handleChange("retweet")}><BiRepost className="repost"/><span>{retweets}</span></button>
                <button className={isLike? 'liked': ''} onClick={() => handleChange("like")}  ><FiHeart /><span>{likes}</span></button>
                <button><FiDownload /></button>
            </Footer>
        </Wrapper>
    );
};

const Links = styled(NavLink)`
    text-decoration: none;
`;

const Wrapper = styled.div`
    border: 0.2px lightgrey solid;
    width: 900px;
    border-top: none;
    padding: 30px;
    padding-left: 95px;
`;

const Header = styled.div`
    width: 750px;
    margin-left: -75px;
    display: flex;
    div{
        padding: 10px;
    }
    img{
        width: 50px;
        border-radius: 50px;
    }
    span{
        font-weight: 600;
        color: black;
    }
    .user{
        font-weight: 300;
        color: grey;
    }
    .handle{
        font-weight: 300;
        color: grey;
    }
`;

const Body = styled.div`
    margin-top: -20px;
    .status{
        font-size: 18px;
        padding-bottom: 10px;
        font-weight: 500;
        color: black;
    }
    img{
        width: 750px;
        height: 450px;
        object-fit: cover;
        object-position: 0% 0%;
        border-radius: 20px;
    }
`;

const Footer = styled.div`
    margin-top: 15px;
    button{
        margin-right: 120px;
        background-color: white;
        border: none;
        font-size: 18px;
    }
    span{
        font-size: 20px;
        margin-left: 15px;

    }
    .repost{
        padding-top: 2px;
        font-size: 20px;
    }
    .retweeted{
        color: green;
    }
    .liked{
        color: red;
    }
`;

export default Tweet;