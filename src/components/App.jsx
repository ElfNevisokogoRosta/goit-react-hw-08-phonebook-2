import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { addToken } from 'redux/reducers';
import { Circles } from 'react-loader-spinner';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainContainer } from './App.styled';
import { Home } from 'pages/Home/Home';
import { Auth } from 'pages/Auth';
import 'react-toastify/dist/ReactToastify.css';
export const App = () => {
  const dispatch = useDispatch();
  const [showRoute, setShowRoute] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      dispatch(addToken(token));
    }
    const delay = 500;
    const timeOutID = setTimeout(() => {
      setShowRoute(true);
    }, delay);
    return () => {
      clearTimeout(timeOutID);
      setShowRoute(false);
    };
  }, [dispatch]);
  const isLoggedIn = useSelector(state => state.contactBook.isLoggedIn);

  if (!showRoute) {
    return (
      <div>
        <Circles
          height="150"
          width="150"
          color="teal"
          wrapperStyle={{
            width: '100vw',
            height: '100vh',
            backgroundColor: '#f2f2f205',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }
  return (
    <MainContainer>
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/auth"
          element={isLoggedIn ? <Navigate to="/" replace /> : <Auth />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </MainContainer>
  );
};
