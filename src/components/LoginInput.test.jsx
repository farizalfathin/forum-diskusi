import React from 'react';
import {
  afterEach, describe, expect, it, vi,
} from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from './LoginInput';

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });
  it('should handle username typing correctly', async () => {
    // Arrage
    render(<LoginInput login={() => {}} />);
    const usernameInput = await screen.getByPlaceholderText('Email Address');

    // Action
    await userEvent.type(usernameInput, 'usernametest@gmail.com');

    // Assert
    expect(usernameInput).toHaveValue('usernametest@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrage
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    // Action
    await userEvent.type(passwordInput, 'passwordtest');

    // Assert
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call login function when login button is clicked', async () => {
    // Arrange
    const mockLogin = vi.fn();
    render(<LoginInput onLogin={(data) => mockLogin(data)} />);
    const usernameInput = await screen.getByPlaceholderText('Email Address');
    await userEvent.type(usernameInput, 'usernametest@gmail.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'passwordtest');
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    // Action
    await userEvent.click(loginButton);

    // Assert
    expect(mockLogin).toBeCalledWith({
      email: 'usernametest@gmail.com',
      password: 'passwordtest',
    });
  });
});
