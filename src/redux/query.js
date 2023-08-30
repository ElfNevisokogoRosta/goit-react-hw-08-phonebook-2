import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com/',
  }),
  tagTypes: ['GET', 'POST'],
  endpoints: builder => ({
    getUser: builder.mutation({
      query: userData => ({
        url: 'users/login',
        method: 'POST',
        body: userData,
      }),
    }),
    createUser: builder.mutation({
      query: userData => ({
        url: 'users/signup',
        method: 'POST',
        body: userData,
      }),
    }),
    getUserData: builder.query({
      query: token => ({
        url: 'users/current',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    getUsersContacts: builder.query({
      query: token => ({
        url: '/contacts',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    postNewContact: builder.mutation({
      query: ({ contact, token }) => ({
        url: '/contacts',
        method: 'POST',
        body: contact,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    deleteContact: builder.mutation({
      query: ({ id, token }) => ({
        url: `contacts/${id}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
    logOut: builder.mutation({
      query: token => ({
        url: 'users/logout',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    }),
  }),
});
export const {
  useGetUserMutation,
  useCreateUserMutation,
  useGetUserDataQuery,
  useGetUsersContactsQuery,
  usePostNewContactMutation,
  useDeleteContactMutation,
  useLogOutMutation,
} = userApi;
