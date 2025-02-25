import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ContainerHome from '../../Layouts/Additional/container-home';
import Subheader from '../../Layouts/Header/subheader';
import { faBoxTissue, faCheck, faLocationDot, faMoneyCheckDollar, faPlus, faStore, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { apiCheckout, apiPaying, apiShowAddress } from '../../utils/API';
import './checkout.css';
import AddAddress from '../../components/Modal/addAddress';

function Checkout() {

    const [cart, setCart] = useState({});
    const [valAddressName, setValAddressName] = useState(null);
    const [valAddressPhone, setValAddressPhone] = useState(null);
    const [valAddressDetail, setValAddressDetail] = useState(null);
    const params = useParams();
    const navigate=useNavigate();

    useEffect(()=>{
        const fetch = async()=> {
            const {data} = await axios.get(apiCheckout+params.id);
            setCart(data);
        }
        fetch();
    });
    var sum=0;
    var weight=0;
    for(var i=0; i<cart?.items?.length;i++){
        sum+=(cart?.items[i].productId?.price*cart?.items[i].quantity);
        weight+=(cart?.items[i].productId?.weight);    
    }

    var fastShipping= 500*weight/100+14000;
    var expressShipping= 1500*weight/100+14000;
    //Show địa chỉ
    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem(process.env.REACT_APP_KEY)));
    },[]);

    const [addresses, setAddresses] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const res= await axios.post(apiShowAddress,{
                userId: currentUser._id,
            });
            setAddresses(res.data);
        }
        fetch();
    },[addresses]);
    //Xử lý chọn dịa chỉ giao hàng
    const selectAddress = (count, list) =>{
        const checkboxAddress=document.getElementsByClassName('checkout-checkbox-outline');
        for(var i=0;i<checkboxAddress.length;i++){
            checkboxAddress[i].classList.remove('checkout-checkbox-checked');
        }
        checkboxAddress[count].classList.add('checkout-checkbox-checked');

        setValAddressName(list.name)
        setValAddressPhone(list.phoneNumber)
        setValAddressDetail(list.detail+", "+list.ward+", "+list.district+", "+list.city);
        
    }
    //Ẩn hiện modal shipping unit
    const [modalShippingUnit, setModalShippingUnit]=useState(false);
    const showModalShippingUnit=()=>{
        setModalShippingUnit(true)
    } 
    const hideModalShippingUnit=()=>{
        setModalShippingUnit(false)
    } 

    //SHOW MODAL CREATE ADDRESS  
    const [isShowModal, setIsShowModal] = useState(false);
    const showModal=event=>{
        setIsShowModal(current => !current);
    }

    //Thanh toán
    const submitPaying=async event=>{
        event.preventDefault(); 
        try {
            const response=await axios.post(apiPaying,{
                cartId: params.id,
                receiver: valAddressName,
                phoneNumber: valAddressPhone,
                address: valAddressDetail,
                //note, 
                //address, 
                //shippingFee
            });
            navigate('/payment-success');
            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }

    return ( 
        <>
            <Subheader title_header='Thanh Toán'/>
            <ContainerHome>
                {/* ĐỊA CHỈ GIAO HÀNG */}
                <div className="row-white mt-8 checkout-address">
                    <div className="checkout-address-wrapper">
                        <p className="checkout-title">
                            <FontAwesomeIcon icon={faLocationDot} className="checkout-icon"/>
                            Địa chỉ nhận hàng
                        </p>
                        {addresses.map((address, index)=>(
                        <div className="flex-center mt-4" key={index}>
                            <div className="checkout-checkbox">
                                <div className="checkout-checkbox-outline" onClick={()=>selectAddress(index, address)}>
                                    <img src="/checking-mark.png" alt="" />
                                </div>
                            </div>
                            <p className="strong ml-12">{address.name}  {address.phoneNumber}</p>
                            <p className="ml-12">{address.detail}, {address.ward}, {address.district}, {address.city}</p>
                        </div>
                        ))}

                        {addresses.length===0 && (
                            <div className='checkout-address-empty'>
                                <img src="/map-icon.png" alt="" />
                                <p>CHƯA CÓ ĐỊA CHỈ</p>
                            </div>
                        )}
                        <button className="btn-main checkout-btn-add-address" onClick={()=>{setIsShowModal(true)}}>
                            <FontAwesomeIcon icon={faPlus}  className="mr-4"/>
                            Thêm địa chỉ mới
                        </button>
                    </div>
                </div>

                {/* SẢN PHẨM MUỐN MUA */}
                <div className="row-white mt-12">
                    <p className="checkout-title">
                        <FontAwesomeIcon icon={faBoxTissue} className="checkout-icon"/>
                        Sản phẩm
                    </p>
                    <p className="checkout-name-shop">
                        <FontAwesomeIcon icon={faStore} className="mr-4"/>
                        {cart?.shopId?.name}
                    </p>
                </div>
                {cart?.items?.map((item, index)=>(
                    <div className="row-container" key={index}>    
                        <div className="col-6 flex-center">
                            <img src={`/img/${item.productId.image1}`} alt="" className="checkout-product-image"/>
                            <p className="ml-8">{item.productId.name}</p>
                        </div>
                        <div className="col-6 flex-center">
                            <div className="col-4">
                                <p className="checkout-price">
                                    <span>đ</span>
                                    {Number(item.productId.price).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}  
                                </p>
                            </div>
                            <div className="col-4">
                                <p className="checkout-quantity"><span>x</span>{item.quantity}</p>
                            </div>
                            <div className="col-4">
                                <p className="checkout-sum-price">
                                    <span>đ</span>
                                    {Number(item.productId.price*item.quantity).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
                <div className="row-container mt-4">
                    <div className="col-6 flex-center checkout-note-to-seller">
                        <p>Lời nhắn</p>
                        <input type="text" placeholder="Lưu ý cho người bán"/>
                    </div>
                    <div className="col-6 flex-center">
                        <p className="c-100-3 strong">Đơn vị vận chuyển</p>
                        <p className="checkout-transport-unit">Vận chuyển nhanh <span onClick={showModalShippingUnit}>Thay đổi</span></p>
                        <p className="checkout-text-fee-shipping">
                            <span>đ</span>
                            {Number(expressShipping).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        </p>    
                    </div>
                </div>
                <div className="row-container mt-4">
                    <div className=" col-12 flex-center-end">
                        <p>Tổng số tiền ({cart?.items?.length} sản phẩm):</p>
                        <p className="checkout-product-price-sum">
                            <span>đ</span>
                            {Number(sum).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                        </p>
                    </div>
                </div>

                {/* PHƯƠNG THỨC THANH TOÁN */}
                <div className="row-container mt-12 flex-center-sb">  
                    <p className="checkout-title">
                        <FontAwesomeIcon icon={faMoneyCheckDollar} className="checkout-icon"/>
                        Phương thức thanh toán
                    </p>
                    <div className="checkout-payment-method">
                        <span>Thanh toán khi nhận hàng</span>
                        <span>Thay đổi</span>
                    </div>
                    
                </div>
                <div className="row-white mt-4 checkout-total">
                    <div className="checkout-total-title row-11-12 col-2-3">
                        Tổng tiền hàng
                    </div>
                    <div className="checkout-total-content row-11-12 col-3-4">
                        <span>đ</span>
                        {Number(sum).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </div>
                    <div className="checkout-total-title row-12-13 col-2-3">
                        Phí vận chuyển
                    </div>
                    <div className="checkout-total-content row-12-13 col-3-4">
                        <span>đ</span>
                        {Number(fastShipping).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </div>
                    <div className="checkout-total-title row-17-18 col-2-3">
                        Tổng thanh toán:
                    </div>
                    <div className="checkout-total-content row-17-18 col-3-4">
                        <span>đ</span>
                        {Number(sum+fastShipping).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    </div>
                </div>
                <div className="row-white flex-center-end">
                    <button className="btn-main btn-lg w-20" onClick={submitPaying}>Đặt hàng</button>
                </div>
            </ContainerHome>
            <div className={modalShippingUnit? 'modal':'hidden'}>
                <div className="modal-content w-50 p-16">
                    <h2>Chọn đơn vị vận chuyển</h2>
                    <div className="shipping-unit-subheader-lg">KÊNH VẬN CHUYỂN LIÊN KẾT VỚI KURO</div>
                    <div className="shipping-unit-subheader-sm">Bạn có thể theo dõi đơn hàng trên ứng dụng Shopee khi chọn một trong các đơn vị vận chuyển:</div>
                    <div className="shipping-unit-item shipping-unit-item-click">
                        <div className='shipping-unit-item-content'>
                            <div className="shipping-unit-item-header">
                                <span>Nhanh</span>
                                <div className='shipping-unit-item-fee'>
                                    <span>đ</span>
                                    {Number(fastShipping).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                </div>
                            </div>
                            <div className='shipping-unit-item-body'>Nhận hàng vào 28 Th06 - 29 Th06</div>
                            <div className='shipping-unit-item-body'>Cho phép Thanh toán khi nhận hàng</div>
                            <div className='shipping-unit-item-body'>(Nhanh tay vào ngay "Shopee Voucher" để săn mã Miễn phí vận chuyển nhé!)</div>
                        </div>    
                        <div className="shipping-unit-item-icon-check">
                            <FontAwesomeIcon icon={faCheck}/>
                        </div>        
                    </div>
                    <div className="shipping-unit-item">
                        <div className='shipping-unit-item-content'>
                            <div className="shipping-unit-item-header">
                                <span>Hỏa tốc</span>
                                <div className='shipping-unit-item-fee'>
                                    <span>đ</span>
                                    {Number(expressShipping).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                </div>
                            </div>
                            <div className='shipping-unit-item-body'>Nhận hàng vào 28 Th06</div>
                            <div className='shipping-unit-item-body'>Cho phép Thanh toán khi nhận hàng</div>
                            <div className='shipping-unit-item-body'>(Nhanh tay vào ngay "Shopee Voucher" để săn mã Miễn phí vận chuyển nhé!)</div>
                        </div>
                        <div className="shipping-unit-item-icon-check">
                            <FontAwesomeIcon icon={faCheck}/>
                        </div>
                    </div>

                    <div className="flex-center-end mt-24">
                        <div className="shipping-unit-bottom-right">
                            <button className='btn-none-gray btn-lg' onClick={hideModalShippingUnit}>Trở lại</button>
                            <button className='btn-main btn-lg'>Hoàn thành</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={isShowModal ? 'modal':'hidden'}>
                <div className="modal-content w-40">
                    <h2>THÊM ĐỊA CHỈ MỚI</h2>
                    <div className="modal-close" onClick={()=>{setIsShowModal(false)}}>
                        <FontAwesomeIcon icon={faXmark}/>
                    </div>
                    <AddAddress currentUser={currentUser}/>
                </div>
            </div>
        </> 
    );
}

export default Checkout;