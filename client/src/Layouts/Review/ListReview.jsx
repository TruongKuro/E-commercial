import '../../main.css';
import '../../pages/Product/detail.css';
import {  faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { apiReviewProduct } from '../../utils/API';
import { useState, useEffect } from 'react';
import axios from 'axios';

function ListReview(productId, userId) {

    const [data, setData]=useState({
        id: productId,
        user: userId,
    })

    const [reviews, setReviews] = useState([]);

    const {id, user}=data;

    useEffect(()=>{
        const fetch=async()=> {
            const review = await axios.get(apiReviewProduct+productId,{
                id
            });
            setReviews(review.data);
        }
        fetch();
    },[reviews]);

    const onClickUseful=()=>{

    }
    //const idInput=document.getElementById('input-comment').innerText='fffff';
    //document.getElementById('input-comment').textContent="ffdfd";
    const [reviewForm, getReviewForm]=useState({
        sanPhamId: productId,
        uId: userId,
        content: 'hello',
    });

    const {sanPhamId,uId, content }=reviewForm;
    const sendComment= async event=>{
        event.preventDefault();
        const res= await axios.post(apiReviewProduct,{
            sanPhamId, uId, content
        });
        return res.data.data;
    }

    return ( 
        <>
            <div className="row-white mt-16" id="card-review">
                <p className="product-detail-title">Đánh giá sản phẩm</p>
                <input type="text" placeholder='Đánh giá của bạn...' id='input-comment'/>
                <button className='btn-main ml-8' onClick={sendComment}>Gửi</button>
                {reviews.map((array)=>(
                    <div className="product-detail-review">
                        <div className="product-detail-review-info">
                            <img src={array.userId.avatar} alt="" className="product-detail-review-info-image"/>
                            <div className="product-detail-review-info-user">
                                <p>{array.userId.name}</p>
                                <div className="product-detail-review-rating">
                                    <FontAwesomeIcon icon={faStar} className="product-detail-review-rating-icon"/>
                                    <FontAwesomeIcon icon={faStar} className="product-detail-review-rating-icon"/>
                                    <FontAwesomeIcon icon={faStar} className="product-detail-review-rating-icon"/>
                                    <FontAwesomeIcon icon={faStar} className="product-detail-review-rating-icon"/>
                                    <FontAwesomeIcon icon={faStar} className="product-detail-review-rating-icon-stroke"/>
                                </div>

                                <p className="product-detail-review-content">{array.content} </p>

                                <div className="product-detail-review-image">
                                    <img src="https://nationaltoday.com/wp-content/uploads/2020/01/chocolatecake-1.jpg" alt="" className="product-detail-review-image-list"/>
                                    <img src="https://nationaltoday.com/wp-content/uploads/2020/01/chocolatecake-1.jpg" alt="" className="product-detail-review-image-list"/>
                                    <img src="https://nationaltoday.com/wp-content/uploads/2020/01/chocolatecake-1.jpg" alt="" className="product-detail-review-image-list"/>
                                    <img src="https://nationaltoday.com/wp-content/uploads/2020/01/chocolatecake-1.jpg" alt="" className="product-detail-review-image-list"/>
                                    <img src="https://nationaltoday.com/wp-content/uploads/2020/01/chocolatecake-1.jpg" alt="" className="product-detail-review-image-list"/>
                                </div>

                                <p className="product-detail-review-date">
                                    {array.time}
                                </p>
                                <button className="product-detail-review-btn-useful" onClick={onClickUseful}>Hữu ích (17) </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
     );
}

export default ListReview;