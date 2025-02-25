import axios from "axios";
import { useState, useEffect } from "react";
import ContainerHome from "../../Layouts/Additional/container-home";
import Header from "../../Layouts/Header/header";
import SidebarUser from "../../Layouts/Sidebar/sidebar";
import { apiShowOrder } from "../../utils/API";
import './user.css';
import Waiting from "../../Layouts/Order/Waiting";
import PickingUp from "../../Layouts/Order/PickingUp";
import Delivery from "../../Layouts/Order/Delivery";
import Delivered from "../../Layouts/Order/Delivered";
import Cancelled from "../../Layouts/Order/Cancelled";
import AllOrder from "../../Layouts/Order/AllOrder";

function Order() {
    const [toggleState, setToggleState]=useState(5);
    const clickToggleState=(number)=>{
        setToggleState(number);
    }

    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem(process.env.REACT_APP_KEY)));
    },[]);

    const [orders, setOrders]=useState([]);
    useEffect(() => {
        const fetch = async () => {
            const res= await axios.post(apiShowOrder,{
                userId: currentUser._id,
            });
            setOrders(res.data);
        }
        fetch();
    },[orders]);

    const arrWaiting=orders.filter(dt=>{return dt.status === "waiting"});
    const arrPickingUp=orders.filter(dt=>{return dt.status === "picking-up"});
    const arrDelivery=orders.filter(dt=>{return dt.status === "delivery"});
    const arrDelivered=orders.filter(dt=>{return dt.status === "delivered"});
    const arrCancelled=orders.filter(dt=>{return dt.status === "cancelled"});

    return ( 
        <>
            <Header/>
            <ContainerHome>
                <div className="row mtb-8">
                    <SidebarUser arrUser={currentUser}/>
                    <div className="col-10">
                        <div className="order-tab">
                            <div className={toggleState === 1 ? 'order-tab-item-active': 'order-tab-item'}
                            onClick={()=>clickToggleState(1)}>
                                Tất cả
                            </div>
                            <div className={toggleState === 2 ? 'order-tab-item-active': 'order-tab-item'}
                            onClick={()=>clickToggleState(2)}>
                                Chờ xác nhận
                            </div>
                            <div className={toggleState === 3 ? 'order-tab-item-active': 'order-tab-item'}
                            onClick={()=>clickToggleState(3)}>
                                Chờ lấy hàng
                            </div>
                            <div className={toggleState === 4 ? 'order-tab-item-active': 'order-tab-item'}
                            onClick={()=>clickToggleState(4)}>
                                Đang giao
                            </div>
                            <div className={toggleState === 5 ? 'order-tab-item-active': 'order-tab-item'}
                            onClick={()=>clickToggleState(5)}>
                                Đã giao
                            </div>
                            <div className={toggleState === 6 ? 'order-tab-item-active': 'order-tab-item'}
                            onClick={()=>clickToggleState(6)}>
                                Đã hủy
                            </div>
                        </div>
                        {(toggleState === 1 && orders.length!==0)&& (
                            <>
                                {orders.sort((a, b) => b.date - a.date).map((order, index)=>(
                                    <div ket={index}><AllOrder order={order}/></div>
                                ))}
                            </>
                        )}
                        {(toggleState === 2 && arrWaiting.length!==0)&& (
                            <>
                                {arrWaiting.map((order, index)=>(
                                    <div ket={index}><Waiting order={order}/></div>
                                ))}
                            </>
                        )}
                        {(toggleState === 3 && arrPickingUp.length!==0)&& (
                            <>
                                {arrPickingUp.map((order, index)=>(
                                    <div ket={index}><PickingUp order={order}/></div>
                                ))}
                            </>
                        )}
                        {(toggleState === 4 && arrDelivery.length!==0)&& (
                            <>
                                {arrDelivery.map((order, index)=>(
                                    <div ket={index}><Delivery order={order}/></div>
                                ))}
                            </>
                        )}
                        {(toggleState === 5 && arrDelivered.length!==0)&& (
                            <>
                                {arrDelivered.map((order, index)=>(
                                    <div ket={index}><Delivered order={order}/></div>
                                ))}
                            </>
                        )}
                        {(toggleState === 6 && arrCancelled.length!==0)&& (
                            <>
                                {arrCancelled.map((order, index)=>(
                                    <div ket={index}><Cancelled order={order}/></div>
                                ))}
                            </>
                        )}

                        {(
                            (toggleState === 1 && orders.length===0) ||
                            (toggleState === 2 && arrWaiting.length===0) ||
                            (toggleState === 3 && arrPickingUp.length===0) ||
                            (toggleState === 4 && arrDelivery.length===0) ||
                            (toggleState === 5 && arrDelivered.length===0) ||
                            (toggleState === 6 && arrCancelled.length===0)
                        )&&(<OrderEmpty/>)}

                    </div>
                </div>
            </ContainerHome>
        </> 
    );
}

function OrderEmpty() {
    return (  
        <div className="container-blank">
            <div className="container-blank-wrapper">
                <img src="/boxes-brown-icon.png" alt="" />
                <p>Chưa có đơn hàng</p>
            </div>
        </div>
    );
}

export default Order;