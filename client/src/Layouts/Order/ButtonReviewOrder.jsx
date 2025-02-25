import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { apiAddReviewProduct, apiShowProductReview } from '../../utils/API';
import './order.css';

function ButtonReviewOrder({order}) {
    const [showModal, setShowModal]=useState(false);
    const showModalReview = ()=>{
        setShowModal(true)
    }

    const hideModalReview = ()=>{
        setShowModal(false)
    }

    const [starNumber, setStarNumber]=useState(0);
    const clickChangeStarNumber = (num) => {
        setStarNumber(num);
    }

    const [idReview, setIdReview]=useState('');
    const transID= async (id) => {
        const { response }=await axios.post(apiShowProductReview,{
            orderId: order._id,
            itemId: id,
        })

        setIdReview(response);
        console.log('list:');
        console.log(idReview);
    }

    return ( 
        <>
            <button className="btn-main btn-lg mr-8" onClick={showModalReview}>Đánh giá</button>
            
            <div className={showModal ? 'modal' : 'hidden'}>
                <div className="modal-content w-50">
                    <h3>ĐÁNH GIÁ SẢN PHẨM</h3>
                    <div className="modal-close" onClick={hideModalReview}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </div>
                    <div className='modal-review'>
                        <div className="modal-review-list-product">
                            <p className='mb-4'>Chọn sản phẩm</p>
                            {order.items.map((item, index)=>(
                                <div className="modal-review-item-product" key={index} onClick={()=>transID(item._id)}>
                                    <div className="modal-review-item-product-image">
                                        <img src={`/img/${item.image}`} alt="" />
                                    </div>
                                    <div className="modal-review-item-product-name">{item.name}</div>
                                </div>
                            ))}
                        </div>
                        <div className="modal-review-main">

                            {/* <div className="modal-review-main-product">
                                <div className="modal-review-main-product-image">
                                    <img src={`/img/${idReview.image}`} alt="" />
                                </div>
                                <p className="ml-8">{idReview.name}</p>
                            </div> */}
                            <div className="modal-review-list-star">
                                <img src={starNumber>0 && starNumber<6 ? '/star-full.png' : '/star.png'} alt="" 
                                onClick={()=>clickChangeStarNumber(1)}/>
                                <img src={starNumber>1 && starNumber<6 ? '/star-full.png' : '/star.png'} alt="" 
                                onClick={()=>clickChangeStarNumber(2)}/>
                                <img src={starNumber>2 && starNumber<6 ? '/star-full.png' : '/star.png'} alt="" 
                                onClick={()=>clickChangeStarNumber(3)}/>
                                <img src={starNumber>3 && starNumber<6 ? '/star-full.png' : '/star.png'} alt="" 
                                onClick={()=>clickChangeStarNumber(4)}/>
                                <img src={starNumber==5 ? '/star-full.png' : '/star.png'} alt="" 
                                onClick={()=>clickChangeStarNumber(5)}/>
                             </div>
                             <textarea name="content" placeholder='Nhập đánh giá của bạn'></textarea>
                             <button className="btn-main btn-max">Đánh giá</button>
                        </div>
                    </div>
                </div>
            </div>
        </> 
    );
}

export default ButtonReviewOrder;