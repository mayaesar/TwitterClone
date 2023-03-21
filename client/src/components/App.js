import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeFeed from './HomeFeed';
import Notifications from './Notifications';
import Bookmarks from './Bookmarks';
import TweetDetails from './TweetDetails';
import Profile from './Profile';
import { CurrentUserContext } from './CurrentUserContext';
import Sidebar from './Sidebar';
import styled from "styled-components";

function App() {

  const user = useContext(CurrentUserContext);
  
  if (user == null) return(<div>Page Loading...</div>);
  return (
    <Router>
      <Wrapper>
        <div>
          <Sidebar user={user}/>
        </div>
        <div>
          <Routes>
            <Route path='/' element={<HomeFeed />} />
            <Route path='/notifications' element={<Notifications />} />
            <Route path='/bookmarks' element={<Bookmarks />} />
            <Route path='/tweet/:tweetId' element={<TweetDetails />} />
            <Route path='/profile/:handle' element={<Profile />} />
          </Routes>
        </div>
      </Wrapper>
    </Router>
  );
};

export default App;

const Wrapper = styled.div`
    width: 80%;
    margin: auto;
    display: flex;
`;