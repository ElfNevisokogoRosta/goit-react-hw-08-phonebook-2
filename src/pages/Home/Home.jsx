import React from 'react';
import { FormComponent } from './components/FormComponent';
import { ContactList } from './components/ContactList';
import { useSelector, useDispatch } from 'react-redux';
import { removeToken } from '../../redux/reducers';
import { redirect } from 'react-router-dom';
import { Audio } from 'react-loader-spinner';
import { useGetUserDataQuery, useLogOutMutation } from '../../redux/query';
import {
  UserInfoContainer,
  UserInfoElement,
  NameContainer,
} from './Styles/Home.styled';
import { SubmitBtn } from '../Register/Register.styled';
import { ToastContainer } from 'react-toastify';

export const Home = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.contactBook.token);
  const { data, isFetching } = useGetUserDataQuery(token);
  const [mutate] = useLogOutMutation();
  const logOuteHandler = async () => {
    try {
      await mutate(token);
      sessionStorage.clear();
      dispatch(removeToken());
      return redirect('/auth');
    } catch (error) {}
  };
  return (
    <div>
      {isFetching ? (
        <Audio />
      ) : (
        <UserInfoContainer>
          <UserInfoElement>
            Hello: <NameContainer>{data?.name}</NameContainer>
          </UserInfoElement>
          <UserInfoElement>{data?.email}</UserInfoElement>
          <SubmitBtn onClick={() => logOuteHandler()}>Logout</SubmitBtn>
        </UserInfoContainer>
      )}

      <FormComponent />
      <ContactList />
      <ToastContainer />
    </div>
  );
};
