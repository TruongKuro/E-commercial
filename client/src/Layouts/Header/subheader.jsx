import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser, faRightFromBracket, faStore } from '@fortawesome/free-solid-svg-icons';
import { LogoBlack } from "../../components/Logo/logo";
import { MenuHome } from "../../components/Menu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const MENU_SUBHEADER_CHECKOUT= [
    {
        icon: <FontAwesomeIcon icon={faUser}/>,
        title:'Hồ sơ của tôi',
        to: '/account/profile',
        onclick: false
    },
    {
        icon: <FontAwesomeIcon icon={faStore}/>,
        title:'Kênh bán hàng',
        to: '/seller/select-category',
        onclick: false
    },
    {
        icon: <FontAwesomeIcon icon={faRightFromBracket}/>,
        title:'Đăng xuất',
        onclick: true
    },
];
function Subheader({title_header}) {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem(process.env.REACT_APP_KEY)));
    },[]);

    return ( 
        <>
            <div className="subheader-header">
                <div className="subheader-wrap">
                    <div to='/' className="subheader-left">
                        <Link to='/'><LogoBlack/></Link>
                        <p>{title_header}</p>
                    </div>
                    <div className="subheader-right">
                        <MenuHome items={MENU_SUBHEADER_CHECKOUT}>
                            <div className="subheader-info">
                                <img src={`/img/${currentUser.avatar}`} alt="Avatar user"/>
                                <p>{currentUser.name}</p>
                            </div>
                        </MenuHome>
                    </div>
                </div>
            </div>
        </> 
    );
}

export default Subheader;