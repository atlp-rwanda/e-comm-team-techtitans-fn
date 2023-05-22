// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const baseUrl = import.meta.env.API_BASE_URL || 'http://localhost:1001/api/v1/';
// // const baseUrl =
// //   import.meta.env.API_BASE_URL ||
// //   'https://ecommerce-tech-titans.herokuapp.com/api/v1/';

// console.log('the Base URL ' + baseUrl);

// export const resetPasswordSlice = createApi({
//   reducerPath: 'resetPasswordApi',
//   baseQuery: fetchBaseQuery({ baseUrl }),
//   endpoints: (builder) => ({
//     requestResetPassword: builder.mutation({
//       query: (body) => ({
//         url: '/user/forgot-password',
//         method: 'PATCH',
//         body,
//         headers: {
//           'Content-type': 'application/json; charset=UTF-8',
//         },
//       }),
//     }),
//     resetPassword: builder.query({
//       query: ({ token, id }) => ({
//         url: `/user/reset-password/${id}/${token}`,
//         method: 'GET',
//         body: JSON.stringify({
//           password: body.password,
//           confirmPassword: body.confirmPassword,
//         }),
//         headers: {
//           'Content-type': 'application/json; charset=UTF-8',
//         },
//       }),
//     }),
//   }),
// });

// export const { useRequestResetPasswordMutation, resetPassword } =
//   resetPasswordSlice;
