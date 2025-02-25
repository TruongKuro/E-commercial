import { faComment } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../../main.css';
import Chat from '../Chat/chat';

function ContainerHome({children}) {
    return ( 
        <div className="container-home">
            <div className="grid"> 
                {children}
            </div>
            <div className="btn-chat">
                <FontAwesomeIcon icon={faComment}/>
                <p className="ml-8">Chat</p>
            </div>
            <Chat/>
        </div>
     );
}

export default ContainerHome;