import { useState, useEffect } from "react";
import axios from "axios";
import HeaderAdmin from "../../Layouts/Header/header-admin";
import { apiAdminShowProduct } from "../../utils/API";

function ProductManagement() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const res= await axios.get(apiAdminShowProduct);
            setProducts(res.data);
        }
        fetch();
    },[products]);

    return (
        <HeaderAdmin>
            <div className="row-white p-15">
                <h1>QUẢN LÝ SẢN PHẨM</h1>
                <table className="user-table">
                   <thead>
                        <tr>
                            <th>Tên sản phẩm</th>
                            <th>Giá niêm yết</th>
                            <th>Phần trăm giảm</th>
                            <th>Giá gốc</th>
                            <th>Cân nặng</th>
                            <th>Số lượng</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product)=>(

                        <tr>
                            <td>{product.name}</td>
                            <td>{product.listPrice}</td>
                            <td>{product.percent}</td>
                            <td>{product.price}</td>
                            <td>{product.weight}</td>
                            <td>{product.quantity}</td>
                            <td>
                                <button className="btn-main">Vi phạm</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </HeaderAdmin>  
    );
}

export default ProductManagement;