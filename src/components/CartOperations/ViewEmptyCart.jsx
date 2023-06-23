import "./emptycart.scss";
import showemptycartphoto from "../../assets/images/showemptycartphoto.svg";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';

const ViewEmptyCart =()=>{
    return(
        <div className="emptycartcontainer">

            <div className="emptytitledetail">
            <p className="emptytitle">Your Cart Is Currently Empty</p>
            <img className="imagedesign" src={showemptycartphoto}/>
            <div className="emptycartdesc">
            <p >before proceed to checkout , you must add some products to your cart .
           you will find a lot of interesting products on our "shop" page</p>
            </div>
             
            <Link to='/'> <button className="btnretun"> <ShoppingCartIcon /> RETURN TO SHOP</button></Link>
             
                         </div>
            

        </div>
    );

    
}

export default ViewEmptyCart;