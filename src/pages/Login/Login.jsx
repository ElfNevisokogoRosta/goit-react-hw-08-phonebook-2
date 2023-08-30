import React, { useState } from 'react';
import { useGetUserMutation } from 'redux/query';
import { addToken } from '../../redux/reducers';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';
import {
  Container,
  FormWrpaer,
  InputWraper,
  InputElement,
  SubmitBtn,
} from '../Register/Register.styled';
import { useDispatch } from 'react-redux';

export const Login = () => {
  console.log(addToken);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mutate, { isLoading, isError }] = useGetUserMutation();
  const dispatch = useDispatch();

  const emailHandler = e => {
    setEmail(e.target.value.trim());
  };
  const passwordHandler = e => {
    setPassword(e.target.value.trim());
  };
  const handlerLogin = async e => {
    e.preventDefault();
    const userData = { email, password };
    const response = await mutate(userData);
    const {
      data: { token },
    } = response;
    if (isError) {
      toast.error('Email or password is wrong');
      return;
    }
    dispatch(addToken(token));
    toast.success('Welcome');
    sessionStorage.setItem('token', token);
    redirect('/');
  };

  return (
    <Container>
      <form onSubmit={handlerLogin}>
        <FormWrpaer>
          <InputWraper>
            Email
            <InputElement
              id="standard-basic"
              type="email"
              onChange={emailHandler}
              required
            />
          </InputWraper>
          <InputWraper>
            Password
            <InputElement
              id="standard-basic"
              type="password"
              onChange={passwordHandler}
              required
            />
          </InputWraper>

          <SubmitBtn type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Login'}
          </SubmitBtn>
        </FormWrpaer>
      </form>
    </Container>
  );
};
