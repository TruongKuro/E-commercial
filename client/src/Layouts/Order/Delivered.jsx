import { faStore,faTag, faTruck } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ItemOrder from "../../components/Item/itemOrder";
import '../../pages/User/user.css';
import ButtonRepurchase from "./ButtonRepurchase";
import ButtonReviewOrder from "./ButtonReviewOrder";

function Delivered({order}) {

    return ( 
        <div className="account-container mt-24">
            <div className="flex-center-sb">
                <Link to={`/shop/${order.shopId._id}`} className="order-item-link-shop">
                    <FontAwesomeIcon icon={faStore} className='order-item-link-shop-icon'/>
                    <span>{order.shopId.name}</span>
                </Link>
                                            
                <div className="flex-center">
                    <p className="order-status-successful-delivery">
                        <FontAwesomeIcon icon={faTruck}/>
                        <span>Giao hàng thành công</span>
                    </p>
                    <p className="order-status-reviewed">
                         Đã đánh giá
                    </p>
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
                    <ButtonReviewOrder order={order}/>
                    <button className="btn-none-gray btn-lg">Liên hệ người bán</button>
                    <ButtonRepurchase order={order}/>
                </div>
            </div>
        </div>
    );
}

export default Delivered;