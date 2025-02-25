
import { useState, useEffect } from "react";
import '../../main.css';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import Header from '../../Layouts/Header/header';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { apiRegister } from "../../utils/API";

function Register() {
    //SHOW & HIDE PASSWORD
    const [passwordShown, setPasswordShown] = useState(false);
    const [isShowActive, setIsShowActive] = useState(false);
    const togglePassword = () => {
        setPasswordShown(passwordShown ? false : true);
        setIsShowActive(current => !current);
    };

    const [confPasswordShown, setConfPasswordShown] = useState(false);
    const [isShowActive2, setIsShowActive2] = useState(false);
    const toggleConfirmPassword = () => {
        setConfPasswordShown(confPasswordShown ? false : true);
        setIsShowActive2(current => !current);
    };

    //FUNCTION REGISTER
    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
    });

    const { name, phoneNumber, password, confirmPassword } = formData;
    
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem(process.env.REACT_APP_KEY)) {
            navigate("/");
        }
    });

    const onChangeRegister = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))
    }

    const toastOptions={
       position:'top-center',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',         
    };

    const onSubmit  = async (event) => {
		event.preventDefault();
        if(password!==confirmPassword){
            toast.error('Vui lòng nhập mật khẩu chính xác!', toastOptions);
            return false;
        }else if(name.length<8){
            toast.error('Tên của bạn quá ngắn!', toastOptions);
            return false;
        }else{
            try {
                const response = await axios.post(apiRegister,{
                    name,
                    phoneNumber,
                    password,
                });
                localStorage.setItem(process.env.REACT_APP_KEY,JSON.stringify(response.data.user));
                navigate('/');
                return response.data.data;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        }
    }

    return ( 
        <>
            <Header/>
            <ToastContainer/>
            <div className='container-home'>
                <div className='grid'>
                    <div className='row-center'>
                        <form className='main-form' onSubmit={onSubmit}>
                            <h1>ĐĂNG KÝ TÀI KHOẢN</h1>

                            <label className='label-text'>Tên của bạn</label>
                            <input className='input-text' maxLength="50" type="text" name="name" value={name} autoComplete='off' spellCheck="false" required onChange={onChangeRegister}/>

                            <label className='label-text'>Số điện thoại</label>
                            <input className='input-text' type="text" name="phoneNumber" value={phoneNumber} autoComplete='off' spellCheck="false" maxLength="15" required onChange={onChangeRegister}/>

                            <label className='label-text'>Tạo mật khẩu</label>
                            <div className='input-password'>
                                <input className='input-text' type={passwordShown ? "text" : "password"} name="password" value={password} autoComplete='off' maxLength="30" required onChange={onChangeRegister}/>
                                <div className='btn-show-hide-password' onClick={togglePassword}>
                                    <FontAwesomeIcon icon={faEye} className={isShowActive ? 'hidden' : 'ic-show-pass'}/>
                                    <FontAwesomeIcon icon={faEyeSlash} className={isShowActive ? 'ic-hide-pass' :'hidden'}/>
                                </div>
                            </div>

                            <label className='label-text'>Nhập lại mật khẩu</label>
                            <div className='input-password'>
                                <input className='input-text' type={confPasswordShown ? "text" : "password"} name="confirmPassword" value={confirmPassword} autoComplete='off' maxLength="30" required onChange={onChangeRegister}/>
                                <div className='btn-show-hide-password' onClick={toggleConfirmPassword}>
                                    <FontAwesomeIcon icon={faEye} className={isShowActive2 ? 'hidden' : 'ic-show-pass'}/>
                                    <FontAwesomeIcon icon={faEyeSlash} className={isShowActive2 ? 'ic-hide-pass' :'hidden'}/>
                                </div>
                            </div>
                            <button className='btn-main btn-max' type='submit'>Đăng ký</button>
                            <p className="text-bottom">
                                Bạn đã có tài khoản? 
                                <Link to="/login">Đăng nhập</Link>
                            </p>
                    </form>
                    </div>
                </div>   
            </div>
        </>
     );
}

export default Register;