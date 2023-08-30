import React, { useState } from 'react';
import {
  Formwraper,
  FormContainer,
  NameInput,
  NumberInput,
  Btn,
} from './Styles/FormComponent.styled';

import {
  usePostNewContactMutation,
  useGetUsersContactsQuery,
} from '../../../redux/query';
import { useSelector } from 'react-redux';

import { toast } from 'react-toastify';

export const FormComponent = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const token = useSelector(state => state.contactBook.token);
  const [mutate, { isLoading }] = usePostNewContactMutation();
  const { data, refetch } = useGetUsersContactsQuery(token);
  const nameHandler = e => {
    setName(e.target.value);
  };
  const numberHandler = e => {
    setNumber(e.target.value);
  };
  const formHandler = async e => {
    e.preventDefault();
    if (data?.some(contact => contact.name === name)) {
      toast.error('This contact is already in a list');
      return;
    }
    const newContact = { name, number };
    try {
      await mutate({ contact: newContact, token });
      refetch();
      toast.success('New contacts is created');
    } catch (error) {}
  };

  return (
    <Formwraper onSubmit={formHandler}>
      <FormContainer>
        <NameInput
          value={name}
          type="text"
          name="name"
          onChange={nameHandler}
          required
          placeholder="Name"
        />
        <NumberInput
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          onChange={numberHandler}
          placeholder="Phone number"
          value={number}
        />
        <Btn type="submit" disabled={isLoading}>
          Add contact
        </Btn>
      </FormContainer>
    </Formwraper>
  );
};
