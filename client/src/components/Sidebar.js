import CatLogo from "../assets/CatLogo";
import { NavLink } from "react-router-dom";
import React from 'react';
import {COLORS} from '../constants'
import styled from 'styled-components';
import { FiHome, FiUser, FiBell, FiBookmark} from "react-icons/fi";


const Sidebar = ({user}) => {
    if(user.currentUser === null) return <div></div>;
    const current = user.currentUser.profile.handle;
    const profilePath = '/profile/' + current;

    return(
        <Side>
            <NavLink to='/'><CatLogo /></NavLink>
            <Links to='/' className={({isActive}) =>
                (isActive? 'active' : null)}><FiHome/> <span>Home</span></Links>
            <Links to={profilePath} className={({isActive}) =>
                (isActive? 'active' : null)}><FiUser/> <span>Profile</span></Links>
            <Links to='/notifications' className={({isActive}) =>
                (isActive? 'active' : null)}><FiBell/> <span>Notifications</span></Links>
            <Links to='/bookmarks' className={({isActive}) =>
                (isActive? 'active' : null)}><FiBookmark/> <span>Bookmarks</span></Links>
            <button>Meow</button>
        </Side>
    );
};

export default Sidebar;

const Side = styled.div`
    width: 200px;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    button{
        background-color: ${COLORS.primary};
        width: 150px;
        border: none;
        color: white;
        border-radius: 12px;
        font-weight: 600;
        margin-top: 10px;
        padding: 7px;
    }
`;

const Links = styled(NavLink)`
    text-decoration: none;
    border-radius: 12px;
    color: black;
    margin: 5px;
    font-weight: 600;
    padding: 7px;
    
    &:hover{
        color: ${COLORS.primary};
        background-color: ${COLORS.secondary};
    }
    &.active {
        color: ${COLORS.primary};
    }
    span{
        padding-left: 10px;
    }
`;
