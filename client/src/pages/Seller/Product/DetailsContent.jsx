import { useEffect } from 'react';
import './sellerProduct.css';

function DetailsContent({code}) {
    const origin=["Trung Quốc", "Mỹ", "Thái Lan","Việt Nam"];
    useEffect(()=>{
        const cmbOrigin=document.getElementById('detail-origin');
        cmbOrigin.length = 0;
        cmbOrigin.options[0] = new Option('Chọn xuất xứ', '');
        cmbOrigin.selectedIndex = 0;
        for (var i = 0; i < origin.length; i++) {
            cmbOrigin.options[cmbOrigin.length] = new Option(origin[i].name, origin[i].number);
        }   
    })

    return (
        <>
            <div className="add-product-detail-item">
                <p className="add-product-detail-title">Xuất xứ</p>
                <select name="origin" className="add-product-detail-input" id='detail-origin'></select>
            </div>
        </> 
    );
}

export default DetailsContent;