import { useEffect, useState } from "react";
import styled from "styled-components";
import Tweet from "./Tweet";
import NewTweet from "./NewTweet";
import { Spinner } from "./Spinner";
import { Error } from "./Error";


const HomeFeed = () => {
    const [feed, setFeed] = useState(null);
    const [error, setError] = useState(null);
    const [array, setArray] = useState(null);
    const [newTweet, setNewTweet] = useState(null);

    
    useEffect(() => {
        fetch('/api/me/home-feed')
        .then (res => res.json())
        .then ((data) => {
            setArray(data.tweetIds);
            setFeed(data.tweetsById);
        })
        .catch((error)  => {
            setError(error);
        })
    }, [newTweet]);

    return array ? (
        <Wrapper>
            <h2>Home</h2>
            <NewTweet setNewTweet={setNewTweet}/>
            {feed ? (
                array.map((id) => {
                    return <Tweet key={id} tweet={feed[id]} />
                })
            ):(
                <Loading>
                    <div className="load"><Spinner /></div>
                </Loading>
            )}
        </Wrapper>
        
    ):(
        <>
        {(error)? (
            <Wrapper>
                <Error />
            </Wrapper>
        ):(
            <Loading>
                <div className="load"><Spinner /></div>
            </Loading>
        )}
        </>
    )
}

const Wrapper = styled.div`
    
`;
const Loading = styled.div`
    height: 167px;
    width: 900px;
    .load{
        padding-left: 200px;
        margin-top: 150px;
    }
`;

export default HomeFeed;
