
import { Navigate } from "react-router-dom";


interface IProps {

    children: any,

}

const ProtectedRoute: React.FC<IProps> = ({ children }) => {

  if (sessionStorage.getItem('dadosUsuarios')) {
 
    return children
    
  } else {

    return <Navigate to="/" />;

  }
  
};

export default ProtectedRoute