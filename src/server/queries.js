import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

 export const FETCH_TODOS = gql`
 query {
   todos (
     order_by: {
       created_at: desc
     },
     where: { is_public: { _eq: false} }
   ) {
     id
     title
     is_completed
     created_at
     is_public
     user {
       name
     }
   }
 }
`;