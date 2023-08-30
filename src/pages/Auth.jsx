import React from 'react';
import {
  Container,
  Navigation,
  NavigationContainer,
  NavigationElement,
} from './Auth.styled';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Login } from './Login/Login';
import { Register } from './Register/Register';
export const Auth = () => {
  const [activeTab, setActiveTab] = useState('login');
  const tabHandler = () => {
    if (activeTab === 'login') {
      setActiveTab('register');
    } else {
      setActiveTab('login');
    }
  };
  return (
    <Container>
      <NavigationContainer>
        <Navigation>
          <NavigationElement
            onClick={tabHandler}
            className={activeTab === 'login' ? 'active' : ''}
          >
            Login
          </NavigationElement>
          <NavigationElement
            onClick={tabHandler}
            className={activeTab !== 'login' ? 'active' : ''}
          >
            Register
          </NavigationElement>
        </Navigation>
      </NavigationContainer>
      {activeTab === 'login' ? <Login /> : <Register />}
      <ToastContainer />
    </Container>
  );
};
