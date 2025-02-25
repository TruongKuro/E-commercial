import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import './logo.css'
import '../../main.css'

export const LogoWhite = () => {
    return ( 
        <div className='flex-center'>
            <FontAwesomeIcon className='logo-white-img' icon={faCartShopping}/>
            <span className='logo-white-span'>KURO</span>
        </div>
     );
}

export const LogoBlack = () => {
    return ( 
        <div className='flex-center'>
            <FontAwesomeIcon className='logo-black-img' icon={faCartShopping}/>
            <span className='logo-black-span'>KURO</span>
        </div>
    );
}
