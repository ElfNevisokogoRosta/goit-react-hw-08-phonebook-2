import React, { useState } from 'react';
import { useCreateUserMutation } from '../../redux/query';
import { toast } from 'react-toastify';
import { addToken } from '../../redux/reducers';
import {
  Container,
  FormWrpaer,
  InputWraper,
  InputElement,
  SubmitBtn,
} from './Register.styled';
import { useDispatch } from 'react-redux';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const [mutate, { data, isLoading, isError, error }] = useCreateUserMutation();
  const nameHandler = e => {
    setName(e.target.value.trim());
  };
  const emailHandler = e => {
    setEmail(e.target.value.trim());
  };
  const passwordHandler = e => {
    setPassword(e.target.value.trim());
  };
  const handleRegister = async e => {
    e.preventDefault();
    if (password.length < 7) {
      toast.error('Password length must be 7 or more symbols');
      return;
    }
    const newUser = { name, email, password };
    try {
      await mutate(newUser);
      if (data) {
        dispatch(addToken(data.token));
        toast.success('Register successfull');
      }
      if (isError && error) {
        toast.error('User with that email is already exist');
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container>
      <form onSubmit={handleRegister}>
        <FormWrpaer>
          <InputWraper>
            Name
            <InputElement
              id="name-input"
              type="text"
              autoComplete="off"
              value={name}
              onChange={nameHandler}
              required
            />
          </InputWraper>
          <InputWraper>
            Email
            <InputElement
              id="email-input"
              type="email"
              autoComplete="off"
              value={email}
              onChange={emailHandler}
              required
            />
          </InputWraper>
          <InputWraper>
            Password
            <InputElement
              id="password-input"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={passwordHandler}
              required
            />
          </InputWraper>
          <SubmitBtn type="submit" disabled={isLoading}>
            {isLoading ? 'Registering...' : 'Register'}
          </SubmitBtn>
        </FormWrpaer>
      </form>
    </Container>
  );
};
