import { faMap, faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContainerHome from "../../Layouts/Additional/container-home";
import Header from "../../Layouts/Header/header";
import SidebarUser from "../../Layouts/Sidebar/sidebar";
import { useEffect, useState } from "react";
import {province} from '../../json/province';
import {district} from '../../json/district';
import {ward} from '../../json/ward';
import axios from "axios";
import { apiAddAddress, apiShowAddress } from "../../utils/API";


function AddAddress({currentUser}) {
    const [valName, setValName]=useState(''); 
    const [valPhoneNumber, setValPhoneNumber]=useState('');
    const [valDetail, setValDetail]=useState(''); 
    var valueCity, valueDistrict, valueWard;
    var [valCity, setValCity]=useState(null);
    var [valDistrict, setValDistrict]=useState(null);
    var [valWard, setValWard]=useState(null);

     //SHOW COMBO BOX
    useEffect(()=>{
        const address_city=document.getElementById('address_city');
        //address_city.length = 0;
        address_city.options[0] = new Option('Chọn tỉnh, thành phố', '');
        //address_city.selectedIndex = 0;
        for (var i = 0; i < province.length; i++) {
             address_city.options[address_city.length] = new Option(province[i].name, province[i].code);
        }
    })

    const handleChangeDistrict=(value)=>{
        const data=province.filter(dt=>{
            return dt.code === value;
        });
        valueCity=data[0].name;
        setValCity(valueCity);

        document.getElementById('address_ward').length=0;
        const address_district=document.getElementById('address_district');
        address_district.length = 0;
        address_district.options[0] = new Option('Chọn quận, huyện', '');
        address_district.selectedIndex = 0;
        const filtered = district.filter(dt => {
            return dt.parent === value;
        });

        for (var i = 0; i < filtered.length; i++) {
            address_district.options[address_district.length] = new Option(filtered[i].name, filtered[i].code);
        }   
    }

    const handleChangeWard=(value)=>{
        const data=district.filter(dt=>{
            return dt.code === value;
        });
        valueDistrict=data[0].name;
        setValDistrict(valueDistrict)

        const address_ward=document.getElementById('address_ward');
        address_ward.length = 0;
        address_ward.options[0] = new Option('Chọn xã, phường', '');
        address_ward.selectedIndex = 0;
        const filtered = ward.filter(dt => {
            return dt.parent === value;
        });
        for (var i = 0; i < filtered.length; i++) {
            address_ward.options[address_ward.length] = new Option(filtered[i].name, filtered[i].code);
        }  
    }
    const handleChangeWardValue=(value)=>{
        const data=ward.filter(dt=>{
            return dt.code === value;
        });
        valueWard=data[0].name;
        setValWard(valueWard)
        console.log(valWard);
    }

     //Lấy tên, số điện thoại, địa chỉ chi tiết
    const getValName=event=>{
        setValName(event.target.value)
    };
    const getValPhoneNumber=(val)=>{setValPhoneNumber(val)};
    const getValDetailAddress=(val)=>{setValDetail(val)};

    const submitCreateAddress = async event=>{
        event.preventDefault();
        try {
            const response=await axios.post(apiAddAddress,{
                userId: currentUser._id,
                name: valName,
                phoneNumber: valPhoneNumber,
                valueCity: valCity,
                valueDistrict: valDistrict,
                valueWard: valWard,
                detail: valDetail,
            })
            alert('Tạo địa chỉ thành công');
            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    }
    return ( 
        <>
            <div className="card-input">
                <label className="label-text-left">Tên người nhận</label>
                <input type="text"  autoComplete="off" className="input-text-right" required onChange={getValName} />
            </div>
            <div className="card-input">
                <label className="label-text-left">Số điện thoại</label> 
                <input type="text"  autoComplete="off" className="input-text-right" required onChange={e=>getValPhoneNumber(e.target.value)}/>
            </div>
            <div className="card-input">
                <label className="label-text-left">Tỉnh thành phố</label>
                <select id="address_city" className="input-text-right"  onChange={(e)=>handleChangeDistrict(e.target.value)}>
                </select>
            </div>
            <div className="card-input">
                <label className="label-text-left">Quận huyện</label>
                <select id="address_district" className="input-text-right" onChange={(e)=>handleChangeWard(e.target.value)}>
                </select>
            </div>
            <div className="card-input">
                <label className="label-text-left">Xã phường</label>
                <select id="address_ward" className="input-text-right" onChange={(e)=>handleChangeWardValue(e.target.value)}>
                </select>
            </div>
            <div className="card-input">
                <label className="label-text-left">Địa chỉ</label>
                <textarea cols="30" rows="2" className="input-text-right" placeholder="Nhập số nhà, tên đường, ..."
                        required onChange={e=>getValDetailAddress(e.target.value)}></textarea>
            </div>
            <div className="btn-double mt-12">
                <button className="btn-main btn-max" onClick={submitCreateAddress}>Tạo mới</button>
            </div>
        </>
     );
}

export default AddAddress;