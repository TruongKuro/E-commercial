import { useState, useEffect } from "react";
import axios from "axios";
import HeaderAdmin from "../../Layouts/Header/header-admin";
import { apiAdminEditStatus, apiAdminShowOrder } from "../../utils/API";

function OrderManagement() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const res= await axios.get(apiAdminShowOrder);
            setOrders(res.data);
        }
        fetch();
    },[orders]);

    return (
        <HeaderAdmin>
            <div className="row-white p-15">
                <h1>QUẢN LÝ ĐƠN HÀNG</h1>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Mã vận đơn</th>
                            <th>Trạng thái</th>
                            <th>Thời gian đặt</th>
                            <th>Thời gian cập nhật</th>
                            <th>Xử lý</th>

                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index)=>(
                        <>
                            {((order.status !== 'delivered')&&(order.status !== 'cancelled'))?(
                                <tr key={index}>
                                <td>{order._id}</td>
                                <td>{order.status==='waiting'&& (
                                        <>Chờ xác nhận</>
                                    )}
                                    {order.status==='picking-up'&& (
                                        <>Chờ lấy hàng</>
                                    )}
                                    {order.status==='delivery'&& (
                                        <>Đang giao hàng</>
                                    )}
                                </td>
                                <td>{new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(order.date)}</td>
                                <td>
                                    {new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }).format(order.dateUpdate)}
                                </td>
                                <td>
                                    <HandleStatus order={order}/>
                                </td>
                                </tr>
                            ):(<></>)}
                        </>
                        ))}
                        
                    </tbody>
                </table>
                {orders.length===0 ? (
                    <p>CHƯA CÓ ĐƠN HẦNG CẦN XỬ LÝ</p>
                ):(
                    <>
                        {orders.map((order, index)=>(
                            <>
                                {((order.status === 'delivered')&&(order.status === 'cancelled'))&&(
                                    <p>CHƯA CÓ ĐƠN HẦNG CẦN XỬ LÝ</p>
                                )}
                            </>
                        ))}
                    </>
                )}
            </div>
        </HeaderAdmin>  
    );
}

function HandleStatus({order}) {

    const changeStatus= async (event, value) =>{
        event.preventDefault();
        try {
            const response=await axios.post(apiAdminEditStatus,{
                orderId: order._id,
                status: value,
            })
            alert('THÀNH CÔNG!!!');
            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    } 
    return(
        <>
            {order.status==='waiting'&& (
                <button className="btn-main" onClick={e=>changeStatus(e, 'picking-up')}>Chờ lấy hàng</button>
            )}
            {order.status==='picking-up'&& (
                <button className="btn-main" onClick={e=>changeStatus(e, 'delivery')}>Đang giao hàng</button>
            )}
                {order.status==='delivery'&& (
                <button className="btn-main" onClick={e=>changeStatus(e, 'delivered')}>Đã giao hàng</button>
            )}
            <button className="btn-outline" onClick={e=>changeStatus(e, 'cancelled')}>Hùy đơn hàng</button>
        </>
    )
}

export default OrderManagement;