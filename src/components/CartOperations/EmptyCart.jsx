import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ViewEmptyCart from "./ViewEmptyCart";

const EmptyCart =()=>{
    return(
     <div>
       <Header/>
       <ViewEmptyCart/>
       <Footer/>
     </div>
    );
}

export default EmptyCart;