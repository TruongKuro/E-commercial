import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import HeaderSeller from "../../../Layouts/Header/header-seller";
import './sellerProduct.css'
import { useNavigate } from 'react-router-dom';



function SelectCategory() {
    const lists = ["Thời trang", "Điện thoại & phụ kiện", "Giày dép", "Điện gia dụng"];
    const items = [];
    items[0] = ["Áo","Quần","Váy đầm","Đồ lót","Đồ ngủ"];
    items[1] = ["Điện thoại","Máy tính bảng","Đồng hồ thông minh","Phụ kiện điện thoại"];
    items[2] = ["Giày thể thao","Giày tây","Giày cao gót","Xăng đan & Dép","Bốt","Phụ kiện giày dép"];
    items[3] = ["Gia dụng nhỏ","Gia dụng lớn","Gia dụng nhà bếp"];
    const children = [];
    children[0] = [
        ["Áo len","Áo Khoác","Áo Sơ mi","Áo Thun","Áo ba lỗ","Áo chống nắng"], 
        ["Quần jean","Quần dài","Quần đùi"],[], [], []];
    children[1] = [
        [], [], [],["Ốp lưng","Cáp - củ sạc","USB","Thẻ nhớ","Kính cường lực","Gậy selfie","Bút cảm ứng","Miếng dán màn hình","Sạc dự phòng","Giá đỡ điện thoại"]]; 
    children[2] = [[],[],[],[],[],["Dụng cụ vệ sinh giày","Dây giày","Lót giày"]];
    children[3] = [
        ["Bàn là","Quạt","Tivi"],
        ["Điều hòa","Máy giặt","Máy hút bụi","Máy lọc không khí","Máy lọc nước","Máy sáy quần áo"],
        ["Ấm đun siêu tốc","Bếp từ, bếp gas","Máy ép, xay sinh tố","Máy may","Máy pha cà phê","Máy rửa bát đĩa","Nồi chiên không dầu","Tủ lạnh"]]
  
    //Lấy số vị trí thẻ li
    const [countList, setCountList]=useState(0);
    const [countChild, setCountChild]=useState(0);
    //Hiện và ẩn button
    const [isShowBtn, setIsShowBtn]=useState(false);
    //Mảng thay thế cho item và childs khi 'parent' bị thay đổi
    const [dataItem, setDataItem]=useState([]);
    const [dataChild, setDataChild]=useState([]);
    //Lấy thông tin đc chọn
    const [valList, setValList]=useState(null);
    const [valItem, setValItem,]=useState(null);
    const [valChild, setValChild]=useState(null);
    
    const handleClick=(content, count, classname)=>{
        //Hiện bảng category tiếp theo
        const ulItem=document.getElementById('ul-item');
        ulItem.classList.remove('hidden');
        document.getElementById('ul-child').classList.add('hidden');
        //Điền thông tin category đã chọn
        const s=document.getElementById('list-cate');
        s.textContent=" "+content;
        setValList(content);
        setValItem(null);
        setValChild(null);
        document.getElementById('title-cate').classList.remove('hidden');
        document.getElementById('item-cate').classList.add('hidden');
        document.getElementById('child-cate').classList.add('hidden');
        //Hiện trạng thái click
        const classLiTag=document.getElementsByClassName(classname);
        for(var i=0;i<classLiTag.length;i++){
            classLiTag[i].classList.remove('select-category-li-click');
        }
        classLiTag[count].classList.add('select-category-li-click');
        
        setIsShowBtn(false);
        setCountList(count);
        setDataItem(items[count]);
    }

    const handleClickItems = (content, count, classname)=> {
        //Điền thông tin category đã chọn
        const s=document.getElementById('item-cate');
        s.textContent=" > "+ content;
        setValItem(content);
        setValChild(null);
        document.getElementById('item-cate').classList.remove('hidden');
        document.getElementById('child-cate').classList.add('hidden');
        //Hiện trạng thái click
        const classLiTag=document.getElementsByClassName(classname);
        for(var i=0;i<classLiTag.length;i++){
            classLiTag[i].classList.remove('select-category-li-click');
        }
        classLiTag[count].classList.add('select-category-li-click');
        const dt=children[countList][count];
        //Tắt/hiện ul thứ 3 và btn-Next
        const ulChild=document.getElementById('ul-child');
        if(dt.length===0){
            ulChild.classList.add('hidden');
            setIsShowBtn(true);
        }else{
            ulChild.classList.remove('hidden');
            setIsShowBtn(false);
        }
        //Hủy trạng thái click cho li ở ul thứ 3 khi đổi
        const li_3Tag=document.getElementsByClassName('li-child');
        if(li_3Tag[countChild]!==undefined){
            li_3Tag[countChild].classList.remove('select-category-li-click');
        }
        setDataChild(dt);
    }

    
    const handleClickChild = (content, count, classname)=> {
        //Điền thông tin category đã chọn
        const s=document.getElementById('child-cate');
        s.textContent=" > "+ content;
        setValChild(content);
        document.getElementById('child-cate').classList.remove('hidden');
        //Hiện trạng thái click
        const classLiTag=document.getElementsByClassName(classname);
        for(var i=0;i<classLiTag.length;i++){
            classLiTag[i].classList.remove('select-category-li-click');
        }
        classLiTag[count].classList.add('select-category-li-click');
        setIsShowBtn(true);
        setCountChild(count);
    }
    const history=useNavigate();
    const transferData = () =>{
        history('/seller/add-product',{
            state: { 
                valList: valList,
                valItem: valItem,
                valChild: valChild,
            }
        });
    }
    
    return ( 
        <>
            <HeaderSeller>
                    <div className="seller-main-container">
                    <h1>Thêm 1 sản phẩm mới</h1>
                    <p>Vui lòng chọn đúng ngành hàng cho sản phẩm</p>
                    <div className="select-category-result">
                        <p className="hidden" id="title-cate">Đã chọn: 
                            <span className="select-category-span" id="list-cate"> Ngành hàng</span>
                            <span className="select-category-span hidden" id="item-cate"> Item Ngành hàng</span>
                            <span className="select-category-span hidden" id="child-cate"> Child Ngành hàng</span>
                        </p>
                    </div>
                    <div className="flex-center w-100">
                        <ul className="select-category-ul">
                            {lists.map((list, index)=> (
                                <li className="select-category-li" key={index} 
                                onClick={()=>{handleClick(list,index, "select-category-li");}}>
                                    <p>{list}</p>
                                    <FontAwesomeIcon icon={faAngleRight}/>
                                </li>
                            ))}
                        </ul>
                        <ul className='select-category-ul hidden' id="ul-item">
                            {dataItem.map((item, index)=>( 
                                <li className="select-category-li li-item" key={index}
                                onClick={()=>{handleClickItems(item, index,"li-item")}}>
                                    <p>{item}</p>
                                    {children[countList][index].length>0 &&
                                           (<FontAwesomeIcon icon={faAngleRight}/>)     
                                    }    
                                </li>
                            ))}
                            
                        </ul>
                        <ul className='select-category-ul hidden' id="ul-child">
                            {dataChild.map((child, index)=>( 
                                <li className="select-category-li li-child" key={index}
                                onClick={()=>{handleClickChild(child, index,"li-child")}}>
                                    <p>{child}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
    
                        {/* <Link to='/seller/add-product' className={isShowBtn?'':'hidden'}> */}
                        <button className={isShowBtn?'btn-main btn-lg mt-12':'hidden'} onClick={transferData}>
                            Tiếp theo
                        </button>
                        {/* </Link> */}
                    </div>
            </HeaderSeller>
        </>
             
    
    );
}


export default SelectCategory;