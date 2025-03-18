import { Navigate, Outlet } from "react-router-dom";

interface IProps {
    children?: React.ReactNode; 
}

const ProtectedRoute: React.FC<IProps> = ({ children }) => {
    const isAuthenticated = sessionStorage.getItem("dadosUsuarios");

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
