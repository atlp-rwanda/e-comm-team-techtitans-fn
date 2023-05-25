import jwtDecode from 'jwt-decode';


const decodeToken = (decoded) => {
    let token
     token = localStorage.getItem("token")
     decoded = token ? jwtDecode(token) : null;
     return decoded;
};

export default decodeToken;