import styled from "styled-components";
import { Error } from "./Error";
import { useParams, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { FiHeart, FiDownload, FiMessageCircle } from "react-icons/fi";
import {BiRepost} from "react-icons/bi"
import { Spinner } from "./Spinner";
import moment from "moment";

const TweetDetails = () => {
    const [tweet, setTweet] = useState(null);
    const [error, setError] = useState(null);
    const [isRetweet, setIsRetweet] = useState();
    const [isLike, setIsLike] = useState();
    const [retweets, setRetweets] = useState();
    const [likes, setLikes] = useState();
    const {tweetId} = useParams();

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

    useEffect(() => {
        fetch(`/api/tweet/${tweetId}`)
        .then (res => res.json())
        .then ((data) => {
            setTweet(data.tweet);
            setIsRetweet(data.tweet.isRetweeted)
            setIsLike(data.tweet.isLiked)
            setRetweets(data.tweet.numRetweets)
            setLikes(data.tweet.numLikes)
        })
        .catch((error)  => {
            setError(error);
        })
    },[]);

    

    if (error) return <Error />
    if (!tweet) return(
        <Loading>
            <div className="load"><Spinner /></div>
        </Loading>
    );

        const info = tweet;
        const author = info.author;
        const handle = author.handle;
        const time = moment(info.timestamp).format("h:mm a - MMMM DD YYYY");
        const media = (tweet.media.length == 0)? null : <img src={tweet.media[0].url}/>
        const profilePath = '/profile/'+handle;
            return ( 
                <Wrapper>
                    <Links to={profilePath}>
                        <Header>
                            <div>
                                <img src={author.avatarSrc}/>
                            </div>
                            <div>
                                <p className="user">{author.displayName}</p>
                                <p className="handle">@{author.handle}</p>
                            </div>
                        </Header>
                    </Links>
                    <Body>
                        <p className="status">{info.status}</p>
                        {media}
                        <p className="postInfo">{time} - Critter web app</p>
                    </Body>
                    <Footer>
                        <button><FiMessageCircle /></button>
                        <button className={isRetweet? 'retweeted': ''} onClick={() => handleChange("retweet")}><BiRepost className="repost"/><span>{retweets}</span></button>
                        <button className={isLike? 'liked': ''} onClick={() => handleChange("like")}  ><FiHeart /><span>{likes}</span></button>
                        <button><FiDownload /></button>
                    </Footer>
                </Wrapper>
            );


};

const Wrapper = styled.div`
    width: 70%;
    margin: auto;
    padding-top: 20px;

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
    display: flex;
    div{
        font-weight: 300;
        color: grey;
    }
    img{
        width: 60px;
        border-radius: 50px;
    }
    .user{
        font-weight: 600;
        color: black;
        padding-left: 10px;
    }
    .handle{
        padding-left: 10px;
    }
    
`;
const Body = styled.div`
    margin-top: -20px;
    .status{
        width: 750px;
        font-size: 18px;
        padding-top: 25px;
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
    .postInfo{
        margin-top: 20px;
        font-weight: 300;
        color: grey;
    }
`;

const Footer = styled.div`
    margin-top: 15px;
    padding-top: 10px;
    width: 750px;
    border-top: 0.2px lightgrey solid;
    height: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    align-items: center;
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

const Links = styled(NavLink)`
    text-decoration: none;
    color: black;
    font-size: 20px;
    padding-left: 10px;
    

    span{
        padding-left: 20px;
        font-weight: 700;
    }
`;

export default TweetDetails;