import { FC, useEffect } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import { publicRoutes } from '../routes';
import { IRoute, privateRoutes } from '../routes';
import { useTypedSelector } from '../hooks/useTypedSelector';

const AppRouter: FC = () => {
  const { isAuth } = useTypedSelector(state => state.auth)
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("auth")) {
      navigate("/login");
    }

  }, [isAuth]);

  return (
    <>
      {isAuth ? 
        <Routes>
          {privateRoutes.map((route: IRoute) => 
            <Route 
              key={route.path} 
              path={route.path} 
              element={<route.element />} 
          />)}
        </Routes> :
        <Routes>
          {publicRoutes.map((route: IRoute) => 
            <Route 
            key={route.path} 
            path={route.path} 
            element={<route.element />} 
          />)}
        </Routes>
      }
    </>
  )
}

export default AppRouter