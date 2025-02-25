import { Link, useNavigate } from "react-router-dom";
import './menu.css'
//import axios from 'axios';
//import { apiLogout } from "../../utils/API";

function ItemMenu({data}) {
    const navigate=useNavigate();
    const handleClick = async () => {
        localStorage.clear();
        navigate('/');
    }

    return (
        <>
            <button className="menu-item-btn">
                {data.onclick===true ? (
                    <div onClick={handleClick}>
                        <span className="menu-item-btn-icon"> {data.icon} </span>
                        <span className="menu-item-btn-span"> {data.title} </span>
                    </div>
                ) : (
                    <Link to={data.to}>
                        <span className="menu-item-btn-icon"> {data.icon} </span>
                        <span className="menu-item-btn-span"> {data.title} </span>
                    </Link>
                )}
            </button> 
        </>
       
     );
}

export default ItemMenu;