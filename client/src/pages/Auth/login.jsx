import {useState, useEffect} from 'react';
import '../../main.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import Header from '../../Layouts/Header/header'
import { Link, useNavigate } from 'react-router-dom';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { apiLogin } from '../../utils/API';

function Login() {
    
    //SHOW & HIDE PASSWORD
    const [passwordShown, setPasswordShown] = useState(false);
    const [isShowActive, setIsShowActive] = useState(false);
    const [isHideActive, setIsHideActive] = useState(false);
    const togglePassword = () => {
        setPasswordShown(passwordShown ? false : true);
        setIsShowActive(current => !current);
        setIsHideActive(current => !current);
    };
    //FUNCTION LOGIN
    const [values, setValues] = useState({
        phoneNumber: '',
        password: '',
    });

    const { phoneNumber, password } = values;
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem(process.env.REACT_APP_KEY)) {
            navigate("/");
        }
    });

    const handleChange=(event)=>{
        setValues({ ...values, [event.target.name]: event.target.value });
    }  

    const toastOptions={
       position:'top-center',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',         
    };

    const handleSubmit= async event => {
        event.preventDefault();
        try{
            const { data } = await axios.post(apiLogin, {
                phoneNumber,
                password,
            });
            if (data.status === false) {
                toast.error(data.msg, toastOptions);
            }else if (data.status === true) {
                localStorage.setItem(process.env.REACT_APP_KEY,JSON.stringify(data.user));
                navigate("/");
            }
        }catch(error){
            console.log(error);
        }
        
    };

         
    return ( 
        <>
            <Header />
            <ToastContainer/>
            <div className='container-home'>
                <div className='grid'>
                    <div className='row-center'>
                        <form onSubmit={(event)=>handleSubmit(event)} className='main-form'>
                            <h1>ĐĂNG NHẬP TÀI KHOẢN</h1>
                            <label className='label-text'>Số điện thoại</label>
                            <input className='input-text' type="text" name="phoneNumber" autoComplete="off" spellCheck='false'  maxLength="15" required onChange={(e)=>handleChange(e)}/>
                            <label className='label-text'>Mật khẩu</label>
                            <div className='input-password'>
                                <input className='input-text' type={passwordShown ? "text" : "password"} name="password"  autoComplete="off" spellCheck='false' maxLength="30" required onChange={(e)=>handleChange(e)}/>
                                <div className='btn-show-hide-password' onClick={togglePassword}>
                                    <FontAwesomeIcon icon={faEye} className={isShowActive ? 'hidden' : 'ic-show-pass'}/>
                                    <FontAwesomeIcon icon={faEyeSlash} className={isHideActive ? 'ic-hide-pass' :'hidden'}/>
                                </div>
                            </div>
                            <button className='btn-main btn-max'>Đăng nhập</button>
                            <p className="text-bottom">
                                Bạn chưa có tài khoản?
                                <Link to="/register">Đăng ký</Link>
                            </p>
                        </form>
                    </div>
                </div>     
            </div>   
        </>
     );
}

export default Login;