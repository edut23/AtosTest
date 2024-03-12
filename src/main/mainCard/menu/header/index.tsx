import React from "react";
import "./index.css"
import UserImage from "../../../../assets/userImage";
import NotificationIcon from "../../../../assets/notificationIcon";
import HelpIcon from "../../../../assets/helpIcon";
import SearchIcon from "../../../../assets/searchIcon";

interface HeaderProps{
    username: string,  
}

const Header = ({username}: HeaderProps) => {
    return (
        <div className="header">
            <div className="searchBar">
                <SearchIcon/>
                Procurar...
            </div>
            <HelpIcon/>
            <NotificationIcon/>
            <UserImage/>
            <h3>{username}</h3>
        </div>
    )
}

export default Header;