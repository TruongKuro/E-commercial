import { faAngleLeft, faAngleRight, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContainerHome from "../../Layouts/Additional/container-home";
import Header from "../../Layouts/Header/header";
import '../../main.css';
import { apiShowCategory, apiShowProduct } from "../../utils/API";
import './home.css';


function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            const res= await axios.get(apiShowProduct);
            setProducts(res.data);
        }
        fetchProduct();
    },[products]);

    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetch = async () => {
            const res= await axios.get(apiShowCategory);
            setCategories(res.data);
        }
        fetch();
    },[categories]);
    categories.sort((a, b) => a.name.localeCompare(b.name))

    const slideLeft = () => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 900;
    };

    const slideRight = event => {
        var slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 900;
        console.log(event.target);
    };

    return (
        <>
            <Header/>
            <ContainerHome>
                <div className="home-slider-category-2-level">
                    <h3>Danh mục</h3>
                     <div className="home-slider-category-left-arrow" onClick={slideLeft}>
                        <FontAwesomeIcon icon={faAngleLeft}/>
                    </div>
                    <div className="home-slider-category-right-arrow" onClick={slideRight}>
                        <FontAwesomeIcon icon={faAngleRight}/>
                    </div>
                    <ul className="home-slider-category-2-level-wrapper"  id="slider">
                        <ListCategory categories={categories}/>
                    </ul>
                </div>
                
                <div className="row mtb-12">        
                    {products.map((product) => (
                        <div className="c-100-6" key={product._id}>
                            <div className="product-item">
                                <Link to={`product/detail/${product._id}`} className="product-item-link">
                                    <div className="product-item-image">
                                        <img src={`/img/${product.image1}`} alt={product.name} className="product-item-img"/>
                                    </div>
                                    <div className="product-item-content">
                                        <p className="product-item-name">{product.name}</p>
                                        <div className="product-item-action">
                                            <div className="product-item-star">
                                                <FontAwesomeIcon icon={faStar} className="product-item-star-icon"/>
                                                <FontAwesomeIcon icon={faStar} className="product-item-star-icon"/>
                                                <FontAwesomeIcon icon={faStar} className="product-item-star-icon"/>
                                                <FontAwesomeIcon icon={faStar} className="product-item-star-stroke"/>
                                                <FontAwesomeIcon icon={faStar} className="product-item-star-stroke"/>
                                            </div>
                                            <span className="product-item-sold" >Đã bán 2</span>
                                        </div>
                                        <p className="product-item-price">
                                            {(product.price).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                                        <span>đ</span>
                                        </p>
                                        {product.percent!==0 && (
                                        <div className="product-sale-off">
                                            <span className="product-sale-off-percent">{product.percent}%</span>
                                        </div>
                                        )}
                                    </div>
                                </Link>
                            </div>
                        </div>        
                    ))}        
                      
                </div>
            </ContainerHome>
        </>
    );
}

function ListCategory({categories}){  
    let arr=[]
    for(var i=0; i<categories.length;i++) {
        arr.push(
            <li key={i}>
                <Link to={`/category/${categories[i]._id}`} >
                    <div className="home-slider-category-item-image">
                        <img src={`./img/${categories[i].image}`} alt="" />
                    </div>
                    <div className="home-slider-category-item-name">{categories[i++].name}</div>
                </Link>
                <Link to={`/category/${categories[i]._id}`}>
                    <div className="home-slider-category-item-image">
                        <img src={`./img/${categories[i].image}`} alt="" />
                    </div>
                    <div className="home-slider-category-item-name">{categories[i].name}</div>
                </Link>
            </li>
        )
    }
    return arr;
}


export default Home;