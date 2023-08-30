import React, { useState } from 'react';
import {
  Container,
  Filter,
  ContactContainer,
  FilterContainer,
  PlaceholderContainer,
} from './Styles/ContactList.styled';
import { Audio } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { ContactElement } from './ContactElement';
import { useGetUsersContactsQuery } from '../../../redux/query';

export const ContactList = () => {
  const [filter, setFilter] = useState('');
  const contactBook = useSelector(state => state.contactBook);
  const token = contactBook.token;
  const { data, isFetching } = useGetUsersContactsQuery(token);
  const handleFilterChange = e => {
    setFilter(e.target.value);
  };
  return (
    <Container>
      <FilterContainer>
        <Filter
          placeholder="Enter search query"
          type="text"
          name="filter"
          onChange={handleFilterChange}
        />
      </FilterContainer>

      {data && data.length > 0 ? (
        <ContactContainer>
          {data
            .filter(contact =>
              contact.name.toLowerCase().includes(filter.toLowerCase())
            )
            .map(contact => (
              <ContactElement key={contact.id} contact={contact} />
            ))}
        </ContactContainer>
      ) : (
        <PlaceholderContainer className="alertData">
          Add some contacts
        </PlaceholderContainer>
      )}

      {isFetching && (
        <Audio
          wrapperStyle={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      )}
    </Container>
  );
};
