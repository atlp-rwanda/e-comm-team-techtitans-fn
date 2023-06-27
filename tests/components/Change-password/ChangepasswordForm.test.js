import React from 'react';
import { render, fireEvent, waitFor,screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { singleUserReducer } from '../../../src/Redux/Features/User/getOneUserSlice';
import ChangePasswordForm from '../../../src/components/ChangePasswordForm';

jest.mock('../../../src/utils/decodeToken', () => ({
    __esModule: true,
    default: () => ({ id: '32cc953f-38f9-4979-b620-cded5304a0a9' }),
  }));

describe('ChangePasswordForm', () => {
  test('displays error message when form is submitted with invalid values', async () => {
    // Create a mock Redux store
    const store = configureStore({
      reducer: singleUserReducer,
      // Add any additional configuration options for the store if needed
    });
    const handleChangePassword = jest.fn();
    const wrappedComponent = (
      <Provider store={store}>
        <BrowserRouter>
          <ChangePasswordForm />
        </BrowserRouter>
      </Provider>
    );

    // Render the component
    const { getByLabelText, getByText,getByRole,queryByText } = render(wrappedComponent);
    const submitButton = screen.getByRole('button', { name: 'Update' });
    // Fill in the form inputs
    const oldPasswordInput = screen.getByLabelText('Old Password');
  const newPasswordInput = screen.getByLabelText('New Password');
  const confirmPasswordInput = screen.getByLabelText('Confirm Password');

    // Submit the form
   
     fireEvent.click(submitButton);

    // Wait for the form submission to complete
    expect(handleChangePassword).not.toHaveBeenCalled(); // Ensure submit handler is not called
    await waitFor(() => {
        const errorMessage = screen.getByText(
          (content, element) =>
            element.tagName.toLowerCase() === 'p' &&
            (element.textContent === 'Please enter your old password' ||
              element.parentElement?.classList.contains('error-message')),
      
        );
        expect(errorMessage).toBeInTheDocument();
      });
})
})