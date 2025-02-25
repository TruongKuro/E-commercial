import { faHeart, faMinus, faPlus, faStar, faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import ContainerHome from "../../Layouts/Additional/container-home";
import Header from "../../Layouts/Header/header";
import ListReview from "../../Layouts/Review/ListReview";
import '../../main.css';
import '../../responsive.css';
import { apiAddToCart, apiDetailProduct } from "../../utils/API";
import './detail.css';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Detail() {
    //Show Product Detail
    const [product, setProduct]=useState({});
    const params = useParams();

    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem(process.env.REACT_APP_KEY)));
    },[]);
    var userId="";
    if(currentUser) {userId= currentUser._id;}

    useEffect(()=>{
        const fetch=async()=> {
            const {data} = await axios.get(apiDetailProduct+params.id);
            setProduct(data);
        }
        fetch();
    });

    //Show list Image
    const arrImage= [
        product.image1,
        product.image2,
        product.image3,
        product.image4,
        product.image5,
    ];

    function onMouseEnterImageItem (nameImg) {
        document.getElementById('product-detail-img').src='/img/'+nameImg;
    }

    //Increment & Decrement INPUT QUANTITY
    const [count, setCount] = useState(1);
    const decrementCount = () => {
        if (count > 1) setCount(count - 1);
    };

    const incrementCount = () => {
        if (count < 99) setCount(count + 1);
    };

    //ADD TO CART
    const toastOptions={
        position: 'top-center',
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',         
    };
    const [formAddCart, setFormAddCart] = useState({
        shopId: '',
        customerId: '',
        productId: '',
        quantity: '',
    });

    const { customerId, productId } = formAddCart;
    const navigate=useNavigate();
    const addToCart = async (event) => {
       event.preventDefault();
       try {
            if(currentUser) {
                const response = await axios.post(apiAddToCart,{
                    shopId: product.shopId,
                    customerId: userId,
                    productId: params.id,
                    quantity: count,
                });
                toast.success('Thêm sản phẩm vào giỏ hàng thành công', toastOptions);
                // navigate('/detail/params.id');
                console.log("Đã login");
                return response.data.data;
                
            }else{
                navigate('/login');
                console.log("Chưa login");
            }
       } catch (error) {
            console.log(error);
            toast.error('Lỗi server, vui lòng liên hệ phòng chăm sóc khách hàng',toastOptions);
       }
    }
    return ( 
        <>
            <Header/>
            <ToastContainer/>
            <ContainerHome>
                <div className="row-container mt-12 mb-12">
                    <div className="col-5 sm-12 sm-mr-0">
                        <div className="product-detail-image">
                            <img src={`/img/${product.image1}`} alt="" id="product-detail-img"/>
                        </div>
                        <div className="product-detail-image-list">
                            {arrImage.map((arr, index)=>(
                                <div className="product-detail-image-list-item" key={index}>
                                    <img src={`/img/${arr}`} alt="" onMouseEnter={()=>onMouseEnterImageItem(arr)}/>
                                </div>
                            ))}  
                        </div>
                    </div>
                    <div className="col-7 sm-mt-24 sm-12">
                        <div className="product-detail-content">
                            <p className="product-detail-name">{product.name}</p>
                            {/* Thông tin ĐÁNH GIÁ, LƯỢT BÁN */}
                            <div className="product-detail-status">
                                <a href="#card-review" className="product-detail-status-card">
                                    <p className="product-detail-status-number">
                                        5.0
                                    </p>
                                    <div className="product-detail-status-rating">
                                        <FontAwesomeIcon icon={faStar} className="product-detail-status-rating-icon"/>
                                        <FontAwesomeIcon icon={faStar} className="product-detail-status-rating-icon"/>
                                        <FontAwesomeIcon icon={faStar} className="product-detail-status-rating-icon"/>
                                        <FontAwesomeIcon icon={faStar} className="product-detail-status-rating-icon"/>
                                        <FontAwesomeIcon icon={faStar} className="product-detail-status-rating-icon-stroke"/>
                                    </div>
                                </a>

                                <div className="line-vertical"></div>

                                <a href="#card-review" className="product-detail-status-card">
                                    <p className="product-detail-status-number">
                                        0
                                    </p>
                                    <p className="product-detail-status-name">
                                        Đánh giá
                                    </p>
                                </a>

                                <div className="line-vertical"></div>
                                <div className="product-detail-status-card">
                                    <p className="product-detail-status-number">
                                        0
                                    </p>
                                    <p className="product-detail-status-name">
                                        Đã bán
                                    </p>
                                </div>

                                <div className="line-vertical"></div>
                                <div className="product-detail-status-card">
                                    <FontAwesomeIcon icon={faHeart} className='product-detail-status-icon-heart'/>
                                    <p className="product-detail-status-name">
                                        Đã thích (0)
                                    </p>
                                </div>
                            </div>
                            {/* Thông tin GIÁ BÁN */}
                            <div className="product-detail-status-price">
                            <p className="product-detail-status-price-old">
                                <span>
                                    {Number(product.listPrice).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                </span>
                                <span>đ</span>
                            </p>
                            <p className="product-detail-status-price-new">
                                <span>
                                    {Number(product.price).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                </span>
                                <span>đ</span>
                            </p>

                            <p className="product-detail-status-percent">
                                Giảm {product.percent}%
                            </p>
                            </div>
                            {/* Thông tin KHÁC */}
                            <div className="product-detail-action">
                                <div className="product-detail-action-card">
                                    <p className="product-detail-action-title">
                                        Vận chuyển
                                    </p>
                                    <div className="product-detail-action-content">
                                        <div className="flex-center">
                                            <FontAwesomeIcon icon={faTruck} className="product-detail-action-truck"/>
                                            <p className="strong">Miễn phí vận chuyển</p>
                                        </div>

                                        <p>Miễn phí vận chuyển cho đơn hàng trên 50.000đ</p>
                                    </div>
                                </div>

                                {/* <div className="product-detail-action-card">
                                    <p className="product-detail-action-title">
                                        Phân loại
                                    </p>
                                    <div className="product-detail-action-classify">
                                        <p className="product-detail-classify-item in-stock">100g</p>
                                        <p className="product-detail-classify-item out-stock">200g</p>
                                        <p className="product-detail-classify-item click-item">300g</p>
                                    </div>
                                </div> */}
                                
                                <div className="product-detail-action-card">
                                    <p className="product-detail-action-title">
                                        Số lượng
                                    </p>
                                    <div className="flex-center">
                                        <div className="product-detail-quantity-btn" onClick={decrementCount}>
                                            <FontAwesomeIcon icon={faMinus} className="product-detail-quantity-icon"/>
                                        </div>
                                        <div className="product-detail-quantity-number">
                                            <input type="text" name="quantity" value={count} maxLength="2" id="number-quantity" autoComplete="off" 
                                            onChange={(event, e) => {
                                                const value = Number(event.target.value);
                                                setCount(value);    
                                            }}
                                            onKeyPress={(event) => {
                                                if (!/[0-9]/.test(event.key)) {
                                                    event.preventDefault();
                                                }
                                            }}/>
                                        </div>
                                        <div className="product-detail-quantity-btn" onClick={incrementCount}>
                                            <FontAwesomeIcon icon={faPlus} className="product-detail-quantity-icon"/>
                                        </div>

                                        <p className="product-detail-quantity-available">
                                            100 sản phẩm có sẵn
                                        </p>
                                    </div>
                                </div>
                                <div className="btn-add-cart" onClick={addToCart}>
                                    Thêm vào giỏ hàng
                                    <img src={product.image} alt="" className="product-detail-image-animation" />
                                </div>
                                
                            </div>
                            <div className="product-detail-shop">
                                <Link to='/shop'>
                                    <img src="https://dep.com.vn/wp-content/uploads/2019/01/BLACKPINK-Lisa-New-Instagram-Profile-Picture-November-2018.jpg" alt="" className="product-detail-shop-avatar" />
                                </Link>
                                <div className="product-detail-shop-content">
                                    <p>{currentUser.nameShop}</p>
                                    <div className="flex-center">
                                        <button className="btn-main btn-sm">Chat ngay</button>
                                        <button className="btn-outline btn-sm ml-8">
                                            <Link to='/shop'>Xem shop</Link>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Chi tiết sản phẩm */}
                <div className="row-white mt-16">
                    <p className="product-detail-title">Chi tiết sản phẩm</p>
                    <div className="product-detail-info">
                        <p className="product-detail-info-title">
                            Danh mục
                        </p>
                        <p className="product-detail-info-content">
                            {product.list} &gt; {product.item} &gt; {product.child}
                        </p>
                    </div>
                    <div className="product-detail-info">
                        <p className="product-detail-info-title">
                            Thương hiệu
                        </p>
                        <p className="product-detail-info-content">
                            {product.brand}
                        </p>
                    </div>
                    <div className="product-detail-info">
                        <p className="product-detail-info-title">
                            Xuất xứ
                        </p>
                        <p className="product-detail-info-content">
                            {product.origin}
                        </p>
                    </div>
                    <div className="product-detail-info">
                        <p className="product-detail-info-title">
                            Chát liệu
                        </p>
                        <p className="product-detail-info-content">
                            {product.material}
                        </p>
                    </div>
                    <div className="product-detail-info">
                        <p className="product-detail-info-title">
                            Trọng lượng
                        </p>
                        <p className="product-detail-info-content">
                            {product.weight}gr
                        </p>
                    </div>

                    <p className="product-detail-title">Mô tả sản phẩm</p>
                    <p className="product-detail-description">{product.description}</p>
                </div>

                {/* Đánh giá sản phẩm */}
                {/* <ListReview productId={product._id} userId={userId}/> */}
            </ContainerHome>
        </>
    );
}

export default Detail;