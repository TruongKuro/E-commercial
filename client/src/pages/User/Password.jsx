import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState, useEffect } from "react";
import ContainerHome from "../../Layouts/Additional/container-home";
import Header from "../../Layouts/Header/header";
import SidebarUser from "../../Layouts/Sidebar/sidebar";
import { apiChangePassword } from "../../utils/API";

function ChangePassword() {
    const [oldPassShown, setOldPassShown] = useState(false);
    const [isShowActive, setIsShowActive] = useState(false);

    const [newPassShown, setNewPassShown] = useState(false);
    const [isShowActive2, setIsShowActive2] = useState(false);

    const [confPassShown, setConfPassShown] = useState(false);
    const [isShowActive3, setIsShowActive3] = useState(false);
    const togglePassword = (str) => {
        if(str==="old"){
            setOldPassShown(oldPassShown ? false : true);
            setIsShowActive(current => !current);
        }else if(str==="new"){
            setNewPassShown(newPassShown ? false : true);
            setIsShowActive2(current => !current);
        }else if(str==="conf"){
            setConfPassShown(confPassShown ? false : true);
            setIsShowActive3(current => !current);
        }
    };

    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem(process.env.REACT_APP_KEY)));
    },[]);

    const [formData, setFormData]=useState({
        oldPassword:'',
        newPassword:'',
        confirmPassword:'',
    })

    const {oldPassword, newPassword, confirmPassword}=formData;
    const onChangePassword=event=>{
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }));
    }
    const submitChangePassword=async event=>{
        event.preventDefault();
        try {
            if(oldPassword===newPassword){
                alert('Mật khẩu mới vui lòng khác mật khẩu cũ');
            }else if(newPassword!==confirmPassword){
                alert('Vui lòng nhập lại đúng mật khẩu');
            }else{
                const response=await axios.post(apiChangePassword,{
                    userId: currentUser._id,
                    oldPassword,
                    newPassword,
                });
                alert('Thay đổi mật khẩu thành công!');
                localStorage.setItem(process.env.REACT_APP_KEY,JSON.stringify(response.data));
                return response.data.data;
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <>
            <Header/>
            <ContainerHome>
                <div className="row mtb-12">
                    <SidebarUser arrUser={currentUser}/>
                    <div className="col-10">
                        <div className="account-container">
                            <h1>Thay đổi mật khẩu</h1>

                            <form className="address-list" onSubmit={submitChangePassword}>
                                <div className="password-item">
                                    <p>Mật khẩu cũ</p>
                                    <div className='password-item-input'>
                                        <input className='input-text' type={oldPassShown ? "text" : "password"} name="oldPassword"  autoComplete="off" spellCheck='false' maxLength="30" required onChange={onChangePassword}/>
                                        <div className='btn-show-hide-password' onClick={()=>togglePassword("old")}>
                                            <FontAwesomeIcon icon={faEye} className={isShowActive ? 'hidden' : 'ic-show-pass'}/>
                                            <FontAwesomeIcon icon={faEyeSlash} className={isShowActive ? 'ic-hide-pass' :'hidden'}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="password-item">
                                    <p>Mật khẩu mới</p>
                                    <div className='password-item-input'>
                                        <input className='input-text' type={newPassShown ? "text" : "password"} name="newPassword"  autoComplete="off" spellCheck='false' maxLength="30" required onChange={onChangePassword}/>
                                        <div className='btn-show-hide-password' onClick={()=>togglePassword("new")}>
                                            <FontAwesomeIcon icon={faEye} className={isShowActive2 ? 'hidden' : 'ic-show-pass'}/>
                                            <FontAwesomeIcon icon={faEyeSlash} className={isShowActive2 ? 'ic-hide-pass' :'hidden'}/>
                                        </div>
                                    </div>
                                </div>
                                <div className="password-item">
                                    <p>Nhập lại mật khẩu</p>
                                    <div className='password-item-input'>
                                        <input className='input-text' type={confPassShown ? "text" : "password"} name="confirmPassword"  autoComplete="off" spellCheck='false' maxLength="30" required onChange={onChangePassword}/>
                                        <div className='btn-show-hide-password' onClick={()=>togglePassword("conf")}>
                                            <FontAwesomeIcon icon={faEye} className={isShowActive3 ? 'hidden' : 'ic-show-pass'}/>
                                            <FontAwesomeIcon icon={faEyeSlash} className={isShowActive3 ? 'ic-hide-pass' :'hidden'}/>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn-main password-btn-save">Lưu mật khẩu</button>
                            </form>
                        </div>
                    </div>
                </div>
            </ContainerHome>
    
        </> 
    );
}

export default ChangePassword;