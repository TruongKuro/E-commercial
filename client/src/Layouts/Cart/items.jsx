import '../../pages/Product/cart.css';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { apiDeleteItemCart, apiUpdateMinusCart, apiUpdatePlusCart } from '../../utils/API';

function ItemsCart({item, shop, customer}) {

    const submitPlusQuantity = async event => {
        event.preventDefault();
        try {
            const response=await axios.post(apiUpdatePlusCart,{
                shopId: shop,
                customerId: customer,
                productId: item.productId._id,
            });
            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }

    const submitMinusQuantity = async event => {
        event.preventDefault();
        try {
            const response=await axios.post(apiUpdateMinusCart,{
                shopId: shop,
                customerId: customer,
                productId: item.productId._id,
            });
            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }

    const deleteItems = async event => {
        event.preventDefault();
        try {
            const response=await axios.post(apiDeleteItemCart,{
                shopId: shop,
                customerId: customer,
                productId: item.productId._id,
            });
            
            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }
    return ( 
        <div className="row-container mt-4">
            <div className="col-6 flex-center">
                <div className="cart-checkbox">
                    <div className="cart-checkbox-outline">
                        <div className="cart-checkbox-fill hidden">
                            <img src='./checking-mark.png' alt="" />
                        </div>
                    </div>
                </div>
                <Link to={`/product/detail/${item.productId._id}`} className="cart-direction">
                    <div className="cart-image-product">
                        <img src={`/img/${item.productId.image1}`} alt=""/>
                    </div>
                    <div className="cart-name-product">
                        <p>{item.productId.name}</p>
                        <div className="cart-list-price">
                            <p><span>đ</span>
                                {Number(item.productId.listPrice).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                            </p>
                            <p><span>giảm </span>{item.productId.percent}%</p>
                        </div>
                    </div>
                </Link>
            </div>
            <div className="col-6 flex-center">
                <div className="cart-item">
                    <p className="cart-item-price">
                        <span>đ</span>
                        {Number(item.productId.price).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </p>
                </div>

                <div className="cart-item">
                    <button className="cart-btn-icon" onClick={submitMinusQuantity}>
                        <FontAwesomeIcon icon={faMinus}/>
                    </button>
                    <div className="cart-input-quantity">
                        <span>{item.quantity}</span>
                    </div>
                    <button className="cart-btn-icon" onClick={submitPlusQuantity}>
                        <FontAwesomeIcon icon={faPlus}/>
                    </button>
                </div>

                <div className="cart-item">
                    <p className="cart-item-sum-price">
                        <span>đ</span>
                        {Number(item.productId.price*item.quantity).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </p>
                </div>

                <div className="cart-item">
                    <button className="btn-main" onClick={deleteItems}>Xóa</button>
                </div>
            </div>
        </div> 
    );
}

export default ItemsCart;