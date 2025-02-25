import { faCartFlatbedSuitcase, faBoxOpen, faStore,faTag , faTruck} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ItemOrder from "../../components/Item/itemOrder";
import '../../pages/User/user.css';
import ButtonCancelOrder from "./ButtonCancelOrder";

function AllOrder({order}) {
    console.log(order.shopId);
    return ( 
        <div className="account-container mt-24">
            <div className="flex-center-sb">
                <Link to={`/shop/${order.shopId._id}`} className="order-item-link-shop">
                    <FontAwesomeIcon icon={faStore} className='order-item-link-shop-icon'/>
                    <span>{order.shopId.name}</span>
                </Link>
                                            
                <div className="flex-center">               
                        {order.status==='waiting' && (
                            <p className="order-status-successful-delivery">
                                <FontAwesomeIcon icon={faCartFlatbedSuitcase}/>
                                <span>Chờ xác nhận</span>
                            </p>
                        )}
                        {order.status==='picking-up' && (
                            <p className="order-status-successful-delivery">
                                <FontAwesomeIcon icon={faBoxOpen}/>
                                <span>Chờ lấy hàng</span>
                            </p>
                        )}
                        {order.status==='delivery' && (
                            <p className="order-status-successful-delivery">
                                <FontAwesomeIcon icon={faTruck}/>
                                <span>Đang giao hàng</span>
                            </p>
                        )}
                        {order.status==='delivered' && (
                            <p className="order-status-successful-delivery">
                                <FontAwesomeIcon icon={faTruck}/>
                                <span>Giao hàng thành công</span>
                            </p>
                        )}
                        {order.status==='cancelled' && (
                            <p className="order-status-successful-delivery">
                                <FontAwesomeIcon icon={faCartFlatbedSuitcase}/>
                                <span>Đã hủy</span>
                            </p>
                        )} 
                </div>
            </div>
            {order.items.map((item, index)=>(
                <div key={index}>
                    <ItemOrder item={item}/>
                </div>
            ))}
                                        
            <div className="order-item-bottom">
                <div className="order-item-bottom-total-price">
                    <FontAwesomeIcon icon={faTag}/>
                    <span>Tổng số tiền: </span>
                    <p>
                        <span>đ</span>
                        {Number(order.total).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} 
                    </p>
                </div>
                <div className="order-item-bottom-btn">
                    <button className="btn-main btn-lg">Liên hệ shop</button>
                    {(order.status==='waiting'||order.status==='picking-up')&&(
                        <ButtonCancelOrder order={order}/>
                    )}

                    {(order.status==='delivered'||order.status==='cancelled')&&(
                        <button className="btn-none-gray btn-lg">Mua lại</button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AllOrder;