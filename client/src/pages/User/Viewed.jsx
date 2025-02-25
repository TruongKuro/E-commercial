import ContainerHome from "../../Layouts/Additional/container-home";
import Header from "../../Layouts/Header/header";
import SidebarUser from "../../Layouts/Sidebar/sidebar";

function Viewed() {
    return ( 
        <>
            <Header/>
            <ContainerHome>
                <div className="row mtb-8">
                    <SidebarUser/>
                    <div className="col-10">
                        
                    </div>
                </div>
            </ContainerHome>
        </> 
    );
}

export default Viewed;