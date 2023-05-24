import Unauthorized from "../components/Unauthorized";
import Header from "../components/Header/Header";
const UnauthorizedPage = () => {
    return (
        <div>
          <main>
            <Header/>
          <Unauthorized/>  
        </main>  
        </div>
    );
};

export default UnauthorizedPage;
