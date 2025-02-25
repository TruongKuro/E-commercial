import {Link} from 'react-router-dom';


function SumPrice({cart}) {
    var sum=0;
    for(var i=0; i<cart.items.length;i++){
        sum+=(cart.items[i].productId.price*cart.items[i].quantity)
    }
    
    return ( 
        <div className="row-container mt-4 mb-12 flex-center-end">
            <p className="cart-total-quantity">Tổng thanh toán ({cart.items.length} sản phẩm)</p>
            <p className="cart-total-money">
                <span>đ</span>
                {Number(sum).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
            </p>
            <Link to={`/checkout/${cart._id}`} className="btn-main btn-lg">Mua Hàng</Link>
        </div>
     );
}

export default SumPrice;