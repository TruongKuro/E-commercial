import { faBoxArchive } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import HeaderSeller from "../../../Layouts/Header/header-seller";
import './sellerProduct.css'
import '../../../Layouts/Header/header.css'
import { useState, useEffect } from "react";
import { apiSellerShowProduct, apiShowProduct } from "../../../utils/API";
import axios from "axios";

function ListProduct() {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem(process.env.REACT_APP_KEY)));
    },[]);

    const [products, setProducts]=useState([]);
    useEffect(() => {
        const fetch = async () => {
            const res= await axios.post(apiSellerShowProduct,{
                shopId: currentUser._id,
            });
            setProducts(res.data);
        }
        fetch();
    },[products]);
    return ( 

        <HeaderSeller>
            <div className="seller-main-container">
                <h1>DANH SÁCH SẢN PHẨM CỦA BẠN</h1>

                    <Link to='/seller/select-category'>
                        <button className="btn-main btn-lg">
                            Thêm sản phẩm mới
                        </button>
                    </Link>

                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Tên sản phẩm</th>
                            <th>Hình bìa</th>
                            <th>Giá niêm yết</th>
                            <th>Giá bán</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    {products.length!==0 ? (
                        <tbody>
                            {products.map((product, index)=>(
                            <tr key={index}>
                                <td>{product.name}</td>
                                <td>
                                    <div className="user-table-image">
                                        <img src={`/img/${product.image1}`} alt="product" />
                                    </div>
                                </td>
                                <td>{Number(product.listPrice).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}  đ <span className="user-table-percent">10%</span></td>
                                <td>{Number(product.price).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")} đ</td>
                                <td>
                                    <button className="btn-main">Sửa</button> 
                                    <button className="btn-outline">Xóa</button>         
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    ):(

                        <tbody className="user-table-empty" > 
                            <tr>
                                <td className="user-table-empty-content" colSpan="6">
                                    <FontAwesomeIcon icon={faBoxArchive}/>
                                    <span>Không tìm thấy sản phẩm</span>   
                                </td> 
                            </tr>   
                        </tbody>    
                    )} 
                    
                </table>
            </div>
        </HeaderSeller>
     );
}

export default ListProduct;