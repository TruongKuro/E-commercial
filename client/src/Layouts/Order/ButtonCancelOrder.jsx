import axios from "axios";
import { useState } from "react";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { apiCancelOrder } from "../../utils/API";

function ButtonCancelOrder({order}) {
    const [showModal, setShowModal]=useState(false);
    const toastOptions={
        position: 'top-center',
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',         
    };

    const clickCancelOrder=async event=>{
        event.preventDefault();
        try {
            const response = await axios.post(apiCancelOrder,{
                orderId: order._id,
            });
            toast('Đã hủy đơn hàng thành công!',toastOptions);
            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <>
            <ToastContainer/>
            <button className="btn-none-gray btn-lg ml-8" onClick={clickCancelOrder}>Hủy đơn hàng</button>
            <div className={showModal ? 'modal' : 'hidden'}>
                <div className="modal-content w-40">
                    <p>ĐÂY LÀ MODAL</p>
                </div>
            </div>
        </>
    );
}

export default ButtonCancelOrder;