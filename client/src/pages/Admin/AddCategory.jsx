import axios from 'axios';
import { useState } from 'react';
import HeaderAdmin from '../../Layouts/Header/header-admin';
import { apiAdminAddCategory, apiAdminUpload, apiUploadImage } from '../../utils/API';
import './admin.css'

function AddCategory() {

    const [name, setName]=useState('');
    const [file, setFile]=useState('');

    const uploadFileHandler= async (e)=>{
        const file = e.target.files[0]
        const formData = new FormData()
		formData.append('file', file);
        const { data } = await axios.post(apiUploadImage, formData)
        setFile(data);
    }
    const submit= async event => {
        event.preventDefault();
        try{   
            const response = await axios.post(apiAdminAddCategory, {
                name, 
                file
            });
            alert('THÀNH CÔNG!');
            return response.data.data;

        }catch(error){
            console.log(error);
            alert('THẤT BẠI!');
        }  
    }
    return ( 
        
        <HeaderAdmin>
            <div className="row-white p-15">
                <h1>THÊM LOẠI HÀNG MỚI</h1>
                <form action="" className='mt-16'>
                    <div className='card-input-anim'>
                        <input type="text" name="name" required className='input-anim' onChange={e=>setName(e.target.value)}/>
                        <span className='span-anim'>Tên loại hàng</span>
                    </div>
                    <input type="file" name="file" className='mt-12' required accept="image/*" onChange={uploadFileHandler}/>

                    <button className='btn-main btn-lg ml-12' onClick={submit}>Save</button>
                </form>
            </div>
        </HeaderAdmin>
        
    );
}

export default AddCategory;