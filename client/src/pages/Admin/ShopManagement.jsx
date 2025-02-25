import { useState, useEffect } from "react";
import axios from "axios";
import HeaderAdmin from "../../Layouts/Header/header-admin";
import { apiAdminShowUser } from "../../utils/API";

function ShopManagement() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const res= await axios.get(apiAdminShowUser);
            setUsers(res.data);
        }
        fetch();
    },[users]);

    return (
        <HeaderAdmin>
            <div className="row-white p-15">
                <h1>QUẢN LÝ NHÀ BÁN HÀNG</h1>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Tên người dùng</th>
                            <th>Giới tính</th>
                            <th>Số điện thoại</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user)=>(
                        <tr>
                            <td>{user.name}</td>
                            <td>{user.gender==='male' ? (
                                <>Nam</>
                                ):(<>Nữ</>)}
                            </td>
                            <td>{user.phoneNumber}</td>
                            <td>
                                <button className="btn-main">Chặn tài khoản</button>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </HeaderAdmin>  
    );
}

export default ShopManagement;