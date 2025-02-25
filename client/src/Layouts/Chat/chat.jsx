import { faAngleDown, faBagShopping, faClipboardList, faFaceSmile, faImage, faPaperPlane, faVideo, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { apiAddChat, apiListChat, apiShowChat, apiUploadImage } from '../../utils/API';
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import './chat.css';

function Chat({isShow}) {
    //Lấy id user hiện tại
    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem(process.env.REACT_APP_KEY)));
    },[]);
    //Hiện list chat
    const [listChat, setListChat]=useState({});

    useEffect(()=>{
        const fetch=async()=> {
            const {data} = await axios.post(apiListChat,{
                userId: currentUser._id,
            });
            setListChat(data);
        }
        fetch();
    });
    //Hiện list tin nhắn
    const [chats, setChats]=useState([]);
    useEffect(()=>{
        const fetch=async()=> {
            const response = await axios.post(apiShowChat,{
                from: currentUser._id,
                to: '62b2c17019d9f90ed8a8b45c'
            });
            setChats(response.data);
        }
        fetch();
    },[chats]);

    //Gửi tin nhắn
    const [message, setMessage]=useState('');
    const changeInputChat= (val) => {
        setMessage(val);
    }
    const sendMessage = async event =>{
        event.preventDefault();
        try {
            if(message!==''){
                const response=await axios.post(apiAddChat,{
                    from: currentUser._id,
                    to: '62b2c17019d9f90ed8a8b45c',
                    message: message,
                })
                setMessage('');
                return response.data.data;
            }
        } catch (error) {
            console.log(error)
        }
    }
    const [uploadImage, setUploadImage]=useState('');
    const sendImage=async event => {
        var file=event.target.files[0];
        if (event.target.files && file) {
            const formData = new FormData()
		    formData.append('file', file);
            const {data}=await axios.post(apiUploadImage, formData);
            setUploadImage(data);      
        }
        //console.log(uploadImage);
    }

    const [showChat, setShowChat]=useState(false);


    return (
        <>
        {showChat ? 
        <div className="chat-container">
            <div className="chat-header flex-center-sb">
                <span>Chat</span>
                <FontAwesomeIcon icon={faXmark}/>
            </div>
            <div className="chat-body">
                <div className="chat-list">
                    {listChat?.lists?.map((list, index)=>(
                        <div className="chat-list-item" key={index}>
                            <div className="chat-list-item-img">
                                <img src={list.to.avatar} alt="" />
                            </div>
                            <div className="chat-list-item-content">
                                <span>{list.to.name}</span>
                                <div className="chat-list-item-content-bottom">
                                    <span>Tin nhắn cuối cùng</span>
                                    <span>2 Th07</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="chat-main">
                    <div className="chat-main-header">
                        <div className='chat-main-header-wrap'>
                            <span>Tên user</span>
                            <FontAwesomeIcon icon={faAngleDown}/>
                        </div>
                    </div>
                    
                    <div className="chat-main-body">
                        {chats.map((chat, index)=>(
                           <div key={index}> 
                                {chat.from===currentUser._id ? (
                                    <div className="chat-main-body-item-right" >
                                        <div className="chat-main-body-item-right-content">
                                            {chat.message}
                                        </div>
                                    </div>
                                ):(
                                    <div className="chat-main-body-item-left" >
                                        <div className="chat-main-body-item-left-content">
                                            {chat.message}
                                        </div>
                                    </div>
                                )}
                                
                           </div>
                            
                        ))}
                    </div>
                    <div className="chat-main-footer">
                        <input type="text" placeholder='Nhập tin nhắn' value={message} onChange={e=>changeInputChat(e.target.value)}/>
                        
                        <div className="chat-main-footer-action">
                            <div className="chat-main-footer-action-left">
                                <Tippy interactive render={attrs => (<span className='chat-main-tippy'>Nhãn dán</span>)}>
                                    <i><FontAwesomeIcon icon={faFaceSmile}/></i>
                                </Tippy>
                                <Tippy interactive render={attrs => (<span className='chat-main-tippy'>Hình ảnh</span>)}>
                                    <i>
                                        <FontAwesomeIcon icon={faImage}/>
                                        <input type="file" name="file" accept="image/*" onChange={sendImage} />
                                    </i>
                                </Tippy>
                                <Tippy interactive render={attrs => (<span className='chat-main-tippy'>Video</span>)}>
                                    <i><FontAwesomeIcon icon={faVideo}/></i>
                                </Tippy>
                                <Tippy interactive render={attrs => (<span className='chat-main-tippy'>Sản phẩm</span>)}>
                                    <i><FontAwesomeIcon icon={faBagShopping}/></i>
                                </Tippy>
                                <Tippy interactive render={attrs => (<span className='chat-main-tippy'>Đơn hàng</span>)}>
                                    <i><FontAwesomeIcon icon={faClipboardList}/></i>
                                </Tippy>
                            </div>    
                            <div className="chat-main-footer-action-right" onClick={sendMessage}>
                                <i><FontAwesomeIcon icon={faPaperPlane}/></i>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
        : null} 
        </>
    );
}

export default Chat;