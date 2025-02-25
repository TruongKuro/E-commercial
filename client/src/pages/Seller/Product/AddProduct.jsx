import { useState, useEffect } from "react";
import HeaderSeller from "../../../Layouts/Header/header-seller";
import { faPencil, faPlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { apiSellerAddProduct, apiUploadImage } from "../../../utils/API";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function AddProduct() {

    const navigate = useNavigate();
    const location = useLocation();
    const changeCategory = ()=>{
        navigate('/seller/select-category')
    }
    //Lấy id cho shop
    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem(process.env.REACT_APP_KEY)));
    },[]);


    //Xử lý lấy 5 hình ảnh
    const [uploadImage1, setUploadImage1]=useState('');
    const [image1, setImage1] = useState(null);
    const [uploadImage2, setUploadImage2]=useState('');
    const [image2, setImage2] = useState(null);
    const [uploadImage3, setUploadImage3]=useState('');
    const [image3, setImage3] = useState(null);
    const [uploadImage4, setUploadImage4]=useState('');
    const [image4, setImage4] = useState(null);
    const [uploadImage5, setUploadImage5]=useState('');
    const [image5, setImage5] = useState(null);

    const changeInput1=async event => {
        var file=event.target.files[0];
        if (event.target.files && file) {
            var reader = new FileReader();
            reader.onload = (e) => {
                this.setState({image1: e.target.result});
            };
            setImage1(URL.createObjectURL(file));
            document.getElementById('upload-img-1').classList.add('hidden');
            document.getElementById('shown-img-1').classList.remove('hidden');
            const formData = new FormData()
		    formData.append('file', file);
            const {data}=await axios.post(apiUploadImage, formData);
            setUploadImage1(data);
        }
    }

    const removeUpload1 = () => {
        setImage1(null);
        document.getElementById('upload-img-1').classList.remove('hidden');
        document.getElementById('shown-img-1').classList.add('hidden');
    }

    const changeInput2=async event => {
        var file=event.target.files[0];
        if (event.target.files && file) {
            var reader = new FileReader();
            reader.onload = (e) => {
                this.setState({image2: e.target.result});
            };
            setImage2(URL.createObjectURL(file));
            document.getElementById('upload-img-2').classList.add('hidden');
            document.getElementById('shown-img-2').classList.remove('hidden');
            const formData = new FormData()
		    formData.append('file', file);
            const {data}=await axios.post(apiUploadImage, formData);
            setUploadImage2(data);
        }
    }
    const removeUpload2 = () => {
        setImage2(null);
        document.getElementById('upload-img-2').classList.remove('hidden');
        document.getElementById('shown-img-2').classList.add('hidden');
    }

    const changeInput3=async event => {
        var file=event.target.files[0];
        if (event.target.files && file) {
            var reader = new FileReader();
            reader.onload = (e) => {
                this.setState({image3: e.target.result});
            };
            setImage3(URL.createObjectURL(file));
            document.getElementById('upload-img-3').classList.add('hidden');
            document.getElementById('shown-img-3').classList.remove('hidden');
            const formData = new FormData()
		    formData.append('file', file);
            const {data}=await axios.post(apiUploadImage, formData);
            setUploadImage3(data);
        }
    }
    const removeUpload3 = () => {
        setImage3(null);
        document.getElementById('upload-img-3').classList.remove('hidden');
        document.getElementById('shown-img-3').classList.add('hidden');
    }

    const changeInput4=async event => {
        var file=event.target.files[0];
        if (event.target.files && file) {
            var reader = new FileReader();
            reader.onload = (e) => {
                this.setState({image4: e.target.result});
            };
            setImage4(URL.createObjectURL(file));
            document.getElementById('upload-img-4').classList.add('hidden');
            document.getElementById('shown-img-4').classList.remove('hidden');
            const formData = new FormData()
		    formData.append('file', file);
            const {data}=await axios.post(apiUploadImage, formData);
            setUploadImage4(data);
        }
    }
    const removeUpload4 = () => {
        setImage4(null);
        document.getElementById('upload-img-4').classList.remove('hidden');
        document.getElementById('shown-img-4').classList.add('hidden');
    }
    const changeInput5=async event => {
        var file=event.target.files[0];
        if (event.target.files && file) {
            var reader = new FileReader();
            reader.onload = (e) => {
                this.setState({image5: e.target.result});
            };
            setImage5(URL.createObjectURL(file));
            document.getElementById('upload-img-5').classList.add('hidden');
            document.getElementById('shown-img-5').classList.remove('hidden');
            const formData = new FormData()
		    formData.append('file', file);
            const {data}=await axios.post(apiUploadImage, formData);
            setUploadImage5(data);
        }
    }
    const removeUpload5 = () => {
        setImage5(null);
        document.getElementById('upload-img-5').classList.remove('hidden');
        document.getElementById('shown-img-5').classList.add('hidden');
    }

    //Tạo mới sản phẩm
    const toastOptions={
       position:'top-center',
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: 'dark',         
    };

    const [formData, setFormData]=useState({
        shopId: '',
        name:'',
        description: '',
        listPrice: '',
        price: '',
        quantity: '',
        weight: '',
        status: '',
        origin:'',
        brand:'',
        dateOfManufacture:'',
        material:'',
    });

    const {name, description, listPrice, price, quantity, weight, status, origin, brand, dateOfManufacture, material}= formData;
    const onChangeAddProduct= (event) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.name]: event.target.value,
        }))
    }

    const createProduct= async event => {
        event.preventDefault();
        try{   

            const response = await axios.post(apiSellerAddProduct, {
                shopId: currentUser._id,
                uploadImage1,
                uploadImage2,
                uploadImage3,
                uploadImage4,
                uploadImage5,
                name,
                description,
                listPrice,
                price,
                quantity,
                list: location.state.valList,
                item: location.state.valItem,
                child: location.state.valChild,
                weight,
                status,
                origin,
                brand,
                dateOfManufacture,
                material,
            });
            toast('Tạo Sản phẩm thành công!', toastOptions);
            setFormData(response.data.data);
            navigate('/seller/list-product');

        }catch(error){
            console.log(error);
            alert(error);
        }   
    }

    return ( 
        <>
           <HeaderSeller>
            <ToastContainer/>
                <form onSubmit={createProduct} encType="multipart/form-data">
                    <div className="seller-main-container">
                        <h1>THÊM 1 SẢN PHẨM MỚI</h1>

                        <h3 className="mt-12">THÔNG TIN CƠ BẢN</h3>
                        <div className="add-product-card">
                            <p>Hình ảnh sản phẩm</p>
                            <div className="add-product-card-image">
                                <div className="add-product-card-image-item">
                                    <div className="add-product-upload-image" id='upload-img-1'>
                                        <div className="add-product-upload-image-icon">
                                            <FontAwesomeIcon icon={faPlus}/>
                                        </div>
                                        <input className="add-product-upload-image-input" type="file" accept="image/*" name='file' required onChange={changeInput1}/>
                                    </div>
                                    <div className="add-product-show-image hidden" id='shown-img-1'>
                                        <div className="add-product-upload-image-show">
                                            <img src={image1} alt=''/>
                                        </div>
                                        <div className="add-product-upload-image-remove" onClick={removeUpload1}>
                                            <FontAwesomeIcon icon={faTrashCan}/>
                                        </div>
                                    </div>
                                    <span>Ảnh bìa</span>
                                </div>
                                <div className="add-product-card-image-item">
                                    <div className="add-product-upload-image" id='upload-img-2'>
                                        <div className="add-product-upload-image-icon">
                                            <FontAwesomeIcon icon={faPlus}/>
                                        </div>
                                        <input className="add-product-upload-image-input" type="file" accept="image/*" name='file' required onChange={changeInput2}/>
                                    </div>
                                    <div className="add-product-show-image hidden" id='shown-img-2'>
                                        <div className="add-product-upload-image-show">
                                            <img src={image2} alt=''/>
                                        </div>
                                        <div className="add-product-upload-image-remove" onClick={removeUpload2}>
                                            <FontAwesomeIcon icon={faTrashCan}/>
                                        </div>
                                    </div>
                                    <span>Ảnh 1</span>
                                </div>
                                <div className="add-product-card-image-item">
                                    <div className="add-product-upload-image" id='upload-img-3'>
                                        <div className="add-product-upload-image-icon">
                                            <FontAwesomeIcon icon={faPlus}/>
                                        </div>
                                        <input className="add-product-upload-image-input" type="file" accept="image/*" name='file' required onChange={changeInput3}/>
                                    </div>
                                    <div className="add-product-show-image hidden" id='shown-img-3'>
                                        <div className="add-product-upload-image-show">
                                            <img src={image3} alt=''/>
                                        </div>
                                        <div className="add-product-upload-image-remove" onClick={removeUpload3}>
                                            <FontAwesomeIcon icon={faTrashCan}/>
                                        </div>
                                    </div>
                                    <span>Ảnh 2</span>
                                </div>
                                <div className="add-product-card-image-item">
                                    <div className="add-product-upload-image" id='upload-img-4'>
                                        <div className="add-product-upload-image-icon">
                                            <FontAwesomeIcon icon={faPlus}/>
                                        </div>
                                        <input className="add-product-upload-image-input" type="file" accept="image/*" name='file' required onChange={changeInput4}/>
                                    </div>
                                    <div className="add-product-show-image hidden" id='shown-img-4'>
                                        <div className="add-product-upload-image-show">
                                            <img src={image4} alt=''/>
                                        </div>
                                        <div className="add-product-upload-image-remove" onClick={removeUpload4}>
                                            <FontAwesomeIcon icon={faTrashCan}/>
                                        </div>
                                    </div>
                                    <span>Ảnh 3</span>
                                </div>
                                <div className="add-product-card-image-item">
                                    <div className="add-product-upload-image" id='upload-img-5'>
                                        <div className="add-product-upload-image-icon">
                                            <FontAwesomeIcon icon={faPlus}/>
                                        </div>
                                        <input className="add-product-upload-image-input" type="file" accept="image/*" name='file' required onChange={changeInput5}/>
                                    </div>
                                    <div className="add-product-show-image hidden" id='shown-img-5'>
                                        <div className="add-product-upload-image-show">
                                            <img src={image5} alt=''/>
                                        </div>
                                        <div className="add-product-upload-image-remove" onClick={removeUpload5}>
                                            <FontAwesomeIcon icon={faTrashCan}/>
                                        </div>
                                    </div>
                                    <span>Ảnh 4</span>
                                </div>
                            </div>
                        </div>
                        <div className="add-product-card">
                            <p>Tên sản phẩm</p>
                            <input type="text" placeholder="Nhập vào" maxLength="100" name="name" required  autoComplete="off" spellCheck='false' onChange={onChangeAddProduct}/>
                        </div>
                        <div className="add-product-card">
                            <p>Mô tả sản phẩm</p>
                            <textarea name="description" id="" cols="30" rows="10" placeholder="Nhập vào" spellCheck='false' onChange={onChangeAddProduct}></textarea>
                        </div>
                        <div className="add-product-card">
                            <p>Danh mục</p>
                            <div className="add-product-card-category">
                                {location.state.valList} &gt; {location.state.valItem} 
                                {location.state.valChild!==null && (
                                    <> &gt; {location.state.valChild}</>
                                )}
                                
                                <FontAwesomeIcon icon={faPencil} onClick={changeCategory}/>
                            </div>
                        </div>
                    </div>

                    <div className="seller-main-container">
                        <h3>THÔNG TIN CHI TIẾT</h3>
                        <p>Điền đúng thông tin để tăng mức độ tin cậy cho sản phẩm</p>
                        <div className="add-product-detail">
                            <div className="add-product-detail-item">
                                <p className="add-product-detail-title">Xuất xứ</p>
                                <select name="origin" className="add-product-detail-input" 
                                    onChange={onChangeAddProduct}  required>
                                    <option value="">Chọn xuất xứ</option>
                                    <option value="Mỹ">Mỹ</option>
                                    <option value="Anh">Anh</option>
                                    <option value="Nhật">Nhật</option>
                                    <option value="Pháp">Pháp</option>
                                    <option value="Trung Quốc">Trung Quốc</option>
                                    <option value="Đài Loan">Đài Loan</option>
                                    <option value="Nhật Bản">Nhật Bản</option>
                                    <option value="Hàn Quốc">Hàn Quốc</option>
                                    <option value="Việt Nam">Việt Nam</option>
                                </select>
                            </div>
                            <div className="add-product-detail-item">
                                <p className="add-product-detail-title">Thương hiệu</p>
                                <input type="text" name="brand" autoComplete="off" className="add-product-detail-input" onChange={onChangeAddProduct} required/>
                            </div>
                            <div className="add-product-detail-item">
                                <p className="add-product-detail-title">Ngày sản suất</p>
                                <input type="date" name="dateOfManufacture" className="add-product-detail-input" onChange={onChangeAddProduct} required/>
                            </div>
                            <div className="add-product-detail-item">
                                <p className="add-product-detail-title">Chất liệu</p>
                                <input type="text" name="material" autoComplete="off" className="add-product-detail-input" onChange={onChangeAddProduct} required/>
                            </div>
                        </div>
                    </div>

                    <div className="seller-main-container">
                        <h3>Thông tin khác</h3>
                        <div className="add-product-card">
                            <p>Giá niêm yết (VND)</p>
                            <input type="text" name="listPrice" autoComplete="off" placeholder="Nhập vào" maxLength="9" required  onChange={onChangeAddProduct}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                    event.preventDefault();
                                }
                            }}/> 
                        </div>
                        <div className="add-product-card">
                            <p>Giá bán (VND)</p>
                            <input type="text" name="price" autoComplete="off" placeholder="Nhập vào" maxLength="9" required onChange={onChangeAddProduct} 

                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                                }
                            }}/>
                        </div>
                        <div className="add-product-card">
                            <p>Số lượng (dự kiến)</p>
                            <input type="text" name="quantity" autoComplete="off" placeholder="Nhập vào" maxLength="5" pattern="[0-9]*" required  onChange={onChangeAddProduct}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                                }
                            }}/>
                        </div>
                        <div className="add-product-card">
                            <p>Cân nặng (gram)</p>
                            <input type="text" name="weight" autoComplete="off" placeholder="Nhập vào" maxLength="4" pattern="[0-9]*" required  onChange={onChangeAddProduct}
                            onKeyPress={(event) => {
                                if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                                }
                            }}/>
                        </div>
                        <div className="add-product-card">
                            <p>Tình trạng</p>
                            <select name="status" onChange={onChangeAddProduct}>
                                    <option value="Mới">Mới</option>
                                    <option value="Đã qua sử dụng">Đã qua sử dụng</option>
                            </select>
                        </div>
                    </div>

                    <button type="submit" className="add-product-btn-save">LƯU SẢN PHẨM</button>
                </form>
            </HeaderSeller> 
        </> 
    );
}

export default AddProduct;