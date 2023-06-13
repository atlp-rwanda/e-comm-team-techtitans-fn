import { useDispatch } from "react-redux";
import {useParams} from "react-router-dom";
import { AddToCartProduct } from "../../Redux/Features/Cart/CartSlice";
import { useState } from "react";
const  SingleProduct = () => {
    
    const { id } = useParams();
    const [quantity, setQuantity] = useState("");
    const dispatch = useDispatch();

  const handleSubmit=()=>{

    dispatch(AddToCartProduct({ productId:id, productQuantity :quantity}));
    console.log("cart added");
  }

    

    return (
      <div className="homeCont">
        <h1>Product details</h1>

        
            
        <label>
            Quantity:
            <input type="number" min="1" name="name"  value={quantity}
        onChange={(e) => setQuantity(e.target.value)}/>
        </label>
        <input type="submit" onClick={handleSubmit} value="add to cart" />
      
      </div>
    );
  };
  
  export default SingleProduct;