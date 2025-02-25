import ContainerHome from "../../Layouts/Additional/container-home";
import Header from "../../Layouts/Header/header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faComment, faList, faPlus, faUsers } from '@fortawesome/free-solid-svg-icons';
import Product from '../../components/Item/product';

function Category() {
    return ( 
        <>
            <Header/>
            <ContainerHome>
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

export default Category;