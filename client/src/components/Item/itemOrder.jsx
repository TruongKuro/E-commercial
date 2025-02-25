function ItemOrder({item}) {
    return ( 
        <div className="order-item">
            <div className="order-item-image">
                <img src={`/img/${item.image}`} alt=""/>
            </div>
            <div className="order-item-content">
                <p>{item.name}</p>
                <div className="flex-center-sb w-100">
                    <p className="cl-gray">x{item.quantity}</p>
                    <div className="flex-center">
                        <p className="order-item-content-price-old">
                            <span className="font-vnd">đ</span>
                            {Number(item.listPrice).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} 
                        </p>
                        <p className="order-list-content-price-new">
                            <span  className="font-vnd">đ</span>
                            {Number(item.price).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} 
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ItemOrder;