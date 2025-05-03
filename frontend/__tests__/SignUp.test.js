import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
// import routes from "../src/routes";
import SignUp from '../src/components/Auth/SignUp';

// Configuration du mock global pour fetch
beforeEach(() => {
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('SignUp Component', () => {
  test('renders the SignUp form correctly', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <SignUp />
      </MemoryRouter>
    );

    expect(screen.getByText('Commençons')).toBeInTheDocument();
    expect(screen.getByLabelText(/nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continuer/i })).toBeInTheDocument();
  });

  test('updates input fields correctly', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <SignUp />
      </MemoryRouter>
    );

    const nameInput = screen.getByLabelText(/nom/i);
    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/mot de passe/i);

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'securepass' } });

    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john@example.com');
    expect(passwordInput.value).toBe('securepass');
  });

  test('submits the form and calls fetch with correct data', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: 'Utilisateur créé avec succès' })
    });

    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <SignUp />
      </MemoryRouter>
    );

    const nameInput = screen.getByLabelText(/nom/i);
    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/mot de passe/i);
    const form = screen.getByRole('form');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'securepass' } });

    await act(async () => {
      fireEvent.submit(form);
    });

    expect(global.fetch).toHaveBeenCalledWith(
      'https://dreamhabitat.djaouti.com/api/users/addUser',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          password: 'securepass'
        })
      })
    );
  });

  test('displays error message on sign-up failure', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Email déjà utilisé' })
    });

    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <SignUp />
      </MemoryRouter>
    );

    const nameInput = screen.getByLabelText(/nom/i);
    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/mot de passe/i);
    const form = screen.getByRole('form');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'securepass' } });

    await act(async () => {
      fireEvent.submit(form);
    });

    expect(await screen.findByText('Email déjà utilisé')).toBeInTheDocument();
  });
});
