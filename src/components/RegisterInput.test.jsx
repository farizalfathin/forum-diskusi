import React from 'react';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterInput from './RegisterInput';

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });
  it('should handle password typing correctly', async () => {
    // Arrage
    render(<RegisterInput login={() => {}} />);
    const nameInput = await screen.getByPlaceholderText('Name');

    // Action
    await userEvent.type(nameInput, 'John Doe');

    // Assert
    expect(nameInput).toHaveValue('John Doe');
  });
  it('should handle username typing correctly', async () => {
    // Arrage
    render(<RegisterInput login={() => {}} />);
    const usernameInput = await screen.getByPlaceholderText('Email Address');

    // Action
    await userEvent.type(usernameInput, 'usernametest@gmail.com');

    // Assert
    expect(usernameInput).toHaveValue('usernametest@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrage
    render(<RegisterInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    // Action
    await userEvent.type(passwordInput, 'passwordtest');

    // Assert
    expect(passwordInput).toHaveValue('passwordtest');
  });
  it('should handle password typing correctly', async () => {
    // Arrage
    render(<RegisterInput login={() => {}} />);
    const confirmPasswordInput = await screen.getByPlaceholderText('Confirm Password');

    // Action
    await userEvent.type(confirmPasswordInput, 'passwordtest');

    // Assert
    expect(confirmPasswordInput).toHaveValue('passwordtest');
  });

  it('should call login function when login button is clicked', async () => {
    // Arrange
    const mockLogin = vi.fn();
    render(<RegisterInput onRegister={(data) => mockLogin(data)} />);
    const nameInput = await screen.getByPlaceholderText('Name');
    await userEvent.type(nameInput, 'usernametest');
    const usernameInput = await screen.getByPlaceholderText('Email Address');
    await userEvent.type(usernameInput, 'usernametest@gmail.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'passwordtest');
    const confirmPasswordInput = await screen.getByPlaceholderText('Confirm Password');
    await userEvent.type(confirmPasswordInput, 'passwordtest');
    const loginButton = await screen.getByRole('button', { name: 'Register' });

    // Action
    await userEvent.click(loginButton);

    // Assert
    expect(mockLogin).toBeCalledWith({
      name: 'usernametest',
      email: 'usernametest@gmail.com',
      password: 'passwordtest',
      confirmPassword: 'passwordtest',
    });
  });
});
