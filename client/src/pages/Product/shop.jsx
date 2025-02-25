import '../../main.css';
import './home.css';
import './shop.css';
import Header from '../../Layouts/Header/header';
import ContainerHome from '../../Layouts/Additional/container-home';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faComment, faList, faPlus, faUsers} from '@fortawesome/free-solid-svg-icons';
import Product from '../../components/Item/product';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';


function Shop() {

    const params = useParams();
    //Show thông tin shop dựa trên params.id
    const [user, setUser]=useState({});
    useEffect(()=>{
        const fetch=async()=> {
            //const {data} = await axios.get(apiDetailProduct+params.id);
            //setUser(data);
        }
        fetch();
    });
    //Sho danh sách sản phẩm của shop
    
    return ( 
        <>
            <Header/>
            <ContainerHome>
                {/* INFO SHOP */}
                <div className="mt-24">
                    <div className="shop-header">
                        <img src="https://www.bakingo.com/blog/wp-content/uploads/2019/08/Blog-Cover-photo.jpg" alt="" className="shop-header-cover-image" />
                        <div className="shop-header-info">
                            <div className="shop-header-info-user">
                                <img src="https://funcakes.com/content/uploads/2021/02/Red-Velvet-Cake-with-Fruit-960x720-c-default.jpg" alt="" className="shop-header-info-avatar" />
                                <div className="shop-header-info-content">
                                    <p>Shop bánh ngọt Hoàng Gia</p>
                                    <p>
                                        <FontAwesomeIcon icon={faUsers}/>
                                        Người theo dõi: 25
                                    </p>
                                </div>
                            </div>

                            <div className="shop-header-button">
                                <button className="shop-button-item">
                                    <FontAwesomeIcon icon={faPlus}/>
                                    Theo dõi
                                </button>
                                <button className="shop-button-item">
                                    <FontAwesomeIcon icon={faComment}/>
                                    Chat
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* LIST PRODUCT */}
                <div className="row-none mt-24">
                    <div className="col-2">
                        <p className='shop-category-title'>
                            <FontAwesomeIcon icon={faList}/>
                            Danh mục
                        </p>

                        <ul className='shop-category-list'>
                            <li className='shop-category-list-li-click'>
                                <FontAwesomeIcon icon={faCaretRight}/>
                                Tất cả sản phẩm
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faCaretRight}/>
                                Bánh sô cô la
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faCaretRight}/>
                                Bánh dâu tây
                            </li>
                            <li>
                                <FontAwesomeIcon icon={faCaretRight}/>
                                Bánh mì ngọt
                            </li>
                        </ul>
                    </div>
                    <div className="col-10">
                        <div className="row">
                            <Product/>
                        </div>
                    </div>
                </div>
            </ContainerHome>
        </> 
    );
}

export default Shop;