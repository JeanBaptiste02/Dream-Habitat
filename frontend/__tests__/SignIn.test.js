import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import SignIn from '../src/components/Auth/SignIn';
import authReducer, { loginError, loginSuccess } from '../src/store/slices/authSlice';

// Création d'un mock store Redux
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: authReducer
    },
    preloadedState: { auth: initialState }
  });
};

// Wrapper pour Redux et React Router
const renderWithProviders = (ui, { store = createMockStore(), ...renderOptions } = {}) => {
  return render(
    <Provider store={store}>
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>{ui}</MemoryRouter>
    </Provider>,
    renderOptions
  );
};

describe('SignIn Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the SignIn form correctly', () => {
    renderWithProviders(<SignIn />);

    expect(screen.getByText('Bon retour !')).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /connexion/i })).toBeInTheDocument();
  });

  test('updates input fields correctly', () => {
    renderWithProviders(<SignIn />);

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/mot de passe/i);

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('submits the form and calls fetch with correct data', async () => {
    const mockStore = createMockStore();
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ jwtToken: 'fake-token' })
    });

    renderWithProviders(<SignIn />, { store: mockStore });

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/mot de passe/i);
    const submitButton = screen.getByRole('button', { name: /connexion/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://dreamhabitat.djaouti.com/api/login',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'test@example.com', password: 'password123' })
      })
    );
  });

  test('displays error message on login failure', async () => {
    const mockStore = createMockStore({ token: null, error: 'Identifiants incorrects' });
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Identifiants incorrects' })
    });

    renderWithProviders(<SignIn />, { store: mockStore });

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/mot de passe/i);
    const submitButton = screen.getByRole('button', { name: /connexion/i });

    fireEvent.change(emailInput, { target: { value: 'wrong@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });

    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(await screen.findByText('Identifiants incorrects')).toBeInTheDocument();
  });
});
