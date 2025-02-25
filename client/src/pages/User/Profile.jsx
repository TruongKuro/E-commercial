import axios from 'axios';
import {useState, useEffect} from 'react';
import { day31, month12, year1900 } from '../../json/dateOfBirth';
import ContainerHome from '../../Layouts/Additional/container-home';
import Header from '../../Layouts/Header/header';
import SidebarUser from '../../Layouts/Sidebar/sidebar';
import { apiEditProfile, apiUploadImage } from '../../utils/API';
import './user.css';

function Profile() {

    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem(process.env.REACT_APP_KEY)));
    },[]);
    //Handle Image
    var [changeImage, setChangeImage] = useState(false);
    var [image, setImage] = useState(null);
    const [uploadImage, setUploadImage]=useState('');
    
    const onImageChange=async event=> {
        var file=event.target.files[0];
        if (event.target.files &&file) {
            var reader = new FileReader();
            reader.onload = (e) => {
                this.setState({image: e.target.result});
            };
            setImage(URL.createObjectURL(file));
            setChangeImage(true);
            const formData = new FormData()
		    formData.append('file', file);
            const {data}=await axios.post(apiUploadImage, formData);
            setUploadImage(data);
        }

        console.log(uploadImage);
    }

    //Tạo dữ liệu ngày sinh
    var valueDay=currentUser.day;
    var valueMonth=currentUser.month;
    var valueYear=currentUser.year;
    useEffect(()=>{
        const select_day=document.getElementById('select_day');
        select_day.length = 0;
        select_day.options[0] = new Option('Ngày', '');
        select_day.selectedIndex = 0;
        for (var i = 0; i < day31.length; i++) {
            select_day.options[select_day.length] = new Option(day31[i].day, day31[i].day);
        }
        select_day.value=currentUser.day
    })
    
    useEffect(()=>{
        const select_month=document.getElementById('select_month');
        select_month.length = 0;
        select_month.options[0] = new Option('Tháng', '');
        select_month.selectedIndex = 0;
        for (var j = 0; j < month12.length; j++) {
            select_month.options[select_month.length] = new Option(month12[j].month, month12[j].month);
        }
        select_month.value=currentUser.month
    })
    useEffect(()=>{
        const select_year=document.getElementById('select_year');
        select_year.length = 0;
        select_year.options[0] = new Option('Năm', '');
        select_year.selectedIndex = 0;
        for (var k = 0; k < year1900.length; k++) {
            select_year.options[select_year.length] = new Option(year1900[k].year, year1900[k].year);
        }
        select_year.value=currentUser.year
    })

    const handleChangeDay=(value)=>{
        valueDay=value;
        if((value==="31" && (valueMonth==="2"||valueMonth==="4"||valueMonth==="6"||valueMonth==="9"||valueMonth==="11"))
            ||(value==="30" && valueMonth==="2")) {
            document.getElementById('select_month').selectedIndex = 0
        }

        var str=parseInt(valueYear, 10);
        var sum=str%4;
        if(sum!==0 && valueMonth==="2" && value==="29"){
             document.getElementById('select_year').selectedIndex = 0;
        }

    }
    const handleChangeMonth=(value)=>{
        valueMonth=value;
        if(((value==="2"||value==="4"||value==="6"||value==="9"||value==="11")&&valueDay==="31")
            ||(value==="2"&&valueDay==="30")){
            document.getElementById('select_day').selectedIndex = 0;
        }

        var str=parseInt(valueYear, 10);
        var sum=str%4;
        if(sum!==0 && value==="2" && valueDay==="29"){
            document.getElementById('select_year').selectedIndex = 0;
        }

    }
    const handleChangeYear=(value)=>{
        valueYear=value;
        var str=parseInt(value, 10);
        var sum=str%4;
        if(sum!==0){
            if(valueMonth==="2"&&valueDay==="29") {
                document.getElementById('select_day').selectedIndex = 0;
            }
        }
    }

    //Tạo chức năng checkbox giới tính
    const [checkGender, setCheckGender]=useState(true);
    const toggleCheckGenderMale=()=>{
        setCheckGender(true);
    }
    const toggleCheckGenderFemale=()=>{
        setCheckGender(false);
    }

    

    //EDIT PROFILE USER
    const [valueName,setValueName]=useState('');
    const [valuePhoneNumber,setValuePhoneNumber]=useState('');


    useEffect(()=>{
        const second=()=>{
            
            setValueName(currentUser.name);
            setValuePhoneNumber(currentUser.phoneNumber);
        }
        second()
        document.getElementById('name-user').value=currentUser.name;
        document.getElementById('phone-user').value=currentUser.phoneNumber;
        
    });

    const changeEditNameUser=event=> {
        setValueName(event.target.value);
    }
    const changeEditPhoneUser=event=> {
        setValuePhoneNumber(event.target.value);
    }
    const submitUpdateProfile = async event =>{
        event.preventDefault(); 
        var valueGender;
        try{
            if(checkGender===true){
                valueGender='male';
            }else{
                valueGender='female';
            }
            
            const response =await axios.post(apiEditProfile,{
                userId: currentUser._id,
                image: uploadImage,
                name: valueName,
                phoneNumber: valuePhoneNumber,
                gender: valueGender,
                day: valueDay,
                month: valueMonth,
                year: valueYear,
            });
            localStorage.setItem(process.env.REACT_APP_KEY,JSON.stringify(response.data));
            alert('Đã thay đổi thông tin cá nhân thành công!')
            return response.data.data;

        }catch(error){
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
                            <h1>Hồ sơ cá nhân</h1>
                            <div className="row">
                                <div className="col-2">
                                        <img src={changeImage ? image : '/img/'+currentUser.avatar} alt="" className="profile-edit-img"/>
                                        <div className="profile-edit-img-btn">
                                            <span>Chọn ảnh</span>
                                            <input type='file' accept="image/*" name="file" onChange={onImageChange}/>
                                        </div>
                                </div>
                                <div className="col-10">
                                    <div className="profile-edit-input">
                                        <label>Tên của bạn</label>
                                        <input type="text" name="name" id="name-user" autoComplete='off' required onChange={changeEditNameUser}/>
                                    </div>
                                    <div className="profile-edit-input">
                                        <label>Số điện thoại</label>
                                        <input type="text" name="phoneNumber" id="phone-user" autoComplete='off' required onChange={changeEditPhoneUser}/>
                                    </div>
                                    <div className="profile-edit-input">
                                        <label>Giới tính</label>
                                        <div className="flex-center">
                                            <div className="profile-edit-item-checkbox" onClick={toggleCheckGenderMale}>
                                                <div className={checkGender ? "profile-edit-item-checkbox-checked" : "profile-edit-item-checkbox-outline"}>
                                                </div>
                                                <span>Nam</span>
                                            </div>
                                            <div className="profile-edit-item-checkbox" onClick={toggleCheckGenderFemale}>
                                                <div className={ checkGender ? "profile-edit-item-checkbox-outline" : "profile-edit-item-checkbox-checked"}>
                                                </div>
                                                <span>Nữ</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="profile-edit-input">
                                        <label>Ngày sinh</label>
                                        <div className="profile-edit-combobox-dob">
                                            <div className="profile-edit-combobox-item">
                                                <select name="day" id="select_day" required onChange={(e)=>handleChangeDay(e.target.value)}>
                                                </select>
                                            </div>
                                            <div className="profile-edit-combobox-item">
                                                <select name="month" id="select_month" required onChange={(e)=>handleChangeMonth(e.target.value)}>
                                                </select>
                                            </div>
                                            <div className="profile-edit-combobox-item">
                                                <select name="year" id="select_year" required onChange={(e)=>handleChangeYear(e.target.value)}>
                                                </select>
                                            </div>
                                                
                                        </div>
                                    </div>

                                    <div className="profile-edit-input">
                                        <label></label>
                                        <button className="btn-main btn-lg" onClick={submitUpdateProfile}>Lưu thay đổi</button>
                                    </div>
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
            </ContainerHome>
        </> 
    );
}

export default Profile;