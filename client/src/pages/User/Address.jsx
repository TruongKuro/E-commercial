import { faMap, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContainerHome from "../../Layouts/Additional/container-home";
import Header from "../../Layouts/Header/header";
import SidebarUser from "../../Layouts/Sidebar/sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
import { apiDeleteAddress, apiShowAddress } from "../../utils/API";
import AddAddress from "../../components/Modal/addAddress";

function Address() {
    //Show address
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

    
    //SHOW MODAL CREATE ADDRESS  
    const [isShowModal, setIsShowModal] = useState(false);
    const showModal=()=>{
        setIsShowModal(current => !current);
    }

    const deleteAddress=async (event, id) => {
        event.preventDefault();
        try {
            const response = await axios.post(apiDeleteAddress,{
                addressId: id,
            });
            alert('Đã xóa địa chỉ thành công!');
        } catch (error) {
            console.log(error);
        }
    }
    return ( 
        <>
            <Header/>
            <ContainerHome>
                <div className="row mtb-8">
                    <SidebarUser arrUser={currentUser}/>
                    <div className="col-10">
                        <div className="account-container">
                            <h1>Địa chỉ giao hàng</h1>
                            <button className="btn-main btn-add-address" onClick={showModal}>
                                <FontAwesomeIcon icon={faPlus}/>
                                Thêm địa chỉ mới
                            </button>
                            
                            {addresses.map((address, index)=>(
                                <div className="address-list" key={index}>
                                    <div className="address-list-item">
                                        <p>Họ tên người nhận</p>
                                        <p>{address.name}</p>
                                    </div>
                                    <div className="address-list-item">
                                        <p>Số điện thoại</p>
                                        <p>{address.phoneNumber}</p>
                                    </div>
                                    <div className="address-list-item">
                                        <p>Địa chỉ</p>
                                        <p>{address.detail}<br/>{address.ward}, {address.district}, {address.city}
                                        </p>
                                    </div>
                                    <div className="address-list-edit" onClick={e=>deleteAddress(e, address._id)}>
                                        Xóa
                                    </div>
                                </div>
                            ))}                           

                            {addresses.length===0 && (
                                <div className="address-blank">
                                    <div className="address-blank-content">
                                        <FontAwesomeIcon icon={faMap} className="address-blank-content-icon"/>
                                        <p>Bạn chưa có địa chỉ giao hàng</p>
                                    </div>
                                </div>
                            )}
                        </div>   
                    </div>
                </div>
            </ContainerHome>
            <div className={isShowModal ? 'modal' : 'hidden'}>
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

export default Address;