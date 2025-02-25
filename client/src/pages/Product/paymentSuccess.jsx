import './paymentSuccess.css'
import {Link, useNavigate} from 'react-router-dom'

function PaymentSuccess() {
    const navigate=useNavigate();
    const submitLogout=()=>{
        localStorage.clear();
        navigate('/');
    } 

    return (
        <div className="payment-success-container">
            <div className="payment-success-card">
                <div className="payment-success-wrapper">
                    <div className='payment-success-header'>Đặt hàng thành công</div>
                    <Link to='/account/order' className='payment-success-btn'>Xem đơn hàng</Link>
                    <Link to='/' className='payment-success-btn'>Về trang chủ</Link>
                    <Link to='/cart' className='payment-success-btn'>Mua tiếp</Link>
                    <div className='payment-success-btn' onClick={submitLogout}>Đăng xuất</div>
                </div>
            </div>
            <div className="payment-success-bubbles">
                <span style={{'--i':'11'}}></span>
                <span style={{'--i':'12'}}></span>
                <span style={{'--i':'24'}}></span>
                <span style={{'--i':'10'}}></span>
                <span style={{'--i':'14'}}></span>
                <span style={{'--i':'23'}}></span>
                <span style={{'--i':'18'}}></span>
                <span style={{'--i':'16'}}></span>
                <span style={{'--i':'19'}}></span>
                <span style={{'--i':'20'}}></span>
                <span style={{'--i':'22'}}></span>
                <span style={{'--i':'25'}}></span>
                <span style={{'--i':'18'}}></span>
                <span style={{'--i':'21'}}></span>
                <span style={{'--i':'15'}}></span>
                <span style={{'--i':'13'}}></span>
                <span style={{'--i':'26'}}></span>
                <span style={{'--i':'16'}}></span>
                <span style={{'--i':'17'}}></span>
                <span style={{'--i':'30'}}></span>
                <span style={{'--i':'29'}}></span>
                <span style={{'--i':'24'}}></span>
                <span style={{'--i':'21'}}></span>
                <span style={{'--i':'15'}}></span>
                <span style={{'--i':'13'}}></span>
                <span style={{'--i':'26'}}></span>
                <span style={{'--i':'16'}}></span>
                <span style={{'--i':'17'}}></span>
                <span style={{'--i':'10'}}></span>
                <span style={{'--i':'29'}}></span>
                <span style={{'--i':'24'}}></span>
                <span style={{'--i':'23'}}></span>
                <span style={{'--i':'22'}}></span>
                <span style={{'--i':'29'}}></span>
                <span style={{'--i':'13'}}></span>
                <span style={{'--i':'11'}}></span>
                <span style={{'--i':'10'}}></span>
                <span style={{'--i':'26'}}></span>
                <span style={{'--i':'27'}}></span>
                <span style={{'--i':'15'}}></span>
                <span style={{'--i':'29'}}></span>
            </div>
        </div>
    );
}

export default PaymentSuccess;