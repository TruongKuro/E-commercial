import axios from "axios";
import { apiRepurchase } from "../../utils/API";

function ButtonRepurchase({order}) {

    const btnRepurchase= async event=> {
        event.preventDefault();
        try {
            const response=await axios.post(apiRepurchase,{
                shopId: order.shopId,
                customerId: order.customerId,
                orderId: order._id,
            })
            alert('Đã thêm sản phẩm vào giỏ hàng');
            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }
    return ( 
    <>
         <button className="btn-none-gray btn-lg" onClick={btnRepurchase}>Mua lại</button>
    </> 
    );
}

export default ButtonRepurchase;