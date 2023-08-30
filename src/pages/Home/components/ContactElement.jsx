import React from 'react';
import {
  Container,
  DataContainer,
  NumberContainer,
  Btn,
} from './Styles/ContactElement.styled';
import {
  useDeleteContactMutation,
  useGetUsersContactsQuery,
} from '../../../redux/query';
import { useSelector } from 'react-redux';

export const ContactElement = ({ contact }) => {
  const token = useSelector(state => state.contactBook.token);
  const { refetch } = useGetUsersContactsQuery(token);
  const [mutate, { isLoading }] = useDeleteContactMutation();
  const removeContact = async () => {
    const id = contact.id;
    try {
      await mutate({ id, token });
      refetch();
    } catch (error) {}
  };
  return (
    <Container key={contact.id}>
      <DataContainer>
        <NumberContainer>{contact.name}:</NumberContainer>{' '}
        <NumberContainer>{contact.number}</NumberContainer>
      </DataContainer>

      <Btn id={contact.id} onClick={() => removeContact()} disabled={isLoading}>
        delete
      </Btn>
    </Container>
  );
};
