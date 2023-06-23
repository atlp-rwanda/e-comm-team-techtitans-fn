
import { Link } from "react-router-dom";
import "./YourCart.scss";

const YourCart =()=>{
  return(
    <div className="containerview">
        <div className="headertitle">
        <p>Your Cart</p>
        <Link to="" className="closesign">X</Link>
        </div>
          <div className="containerdetails">
        <img className="imagedesign" src='https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=600' />
        <div className="titledetail">
        <h2>white shirt pleat</h2>
        <p className="pricedesign">1 X $39.00</p>
        
        </div>
        
       </div>

       <div className="containerdetails">
        <img className="imagedesign" src='https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=600' />
        <div className="titledetail">
        <h2>white shirt pleat</h2>
        <p className="pricedesign">1 X $39.00</p>
        
        </div>
        
       </div><div className="containerdetails">
        <img className="imagedesign" src='https://images.pexels.com/photos/1082528/pexels-photo-1082528.jpeg?auto=compress&cs=tinysrgb&w=600' />
        <div className="titledetail">
        <h2>white shirt pleat</h2>
        <p className="pricedesign">1 X $39.00</p>
        
        </div>
        
       </div>
       
       <div className="pricedetails"> 
         <p>Total : $75.00</p>

        </div>

        <div className="buttondetails">
         <button className="btnprimary">VIEW CART</button> <button className="btnprimary">CHECK OUT</button> 
        </div>
  
      
    </div>
    
  );
}

export default YourCart;