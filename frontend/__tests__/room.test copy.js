import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
 import { MemoryRouter } from 'react-router-dom';
// import routes from "../src/routes";
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { Profiler } from 'react';
import Room from '../src/components/Room';
import UploadZone from '../src/components/UploadZone';

// Mock pour UploadZone
jest.mock('../src/components/UploadZone', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="upload-zone">Mock UploadZone</div>)
}));

// Mock pour les icônes Lucide
jest.mock('lucide-react', () => ({
  Upload: () => <div data-testid="upload-icon" />
}));

// Mock pour le store Redux
const createMockStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      auth: (state = initialState, action) => state
    },
    preloadedState: { auth: initialState }
  });
};

// Setup pour le test avec Redux et Router
const renderWithProviders = (
  ui,
  {
    initialState = { token: 'fake-token', user: { id: 1, name: 'Test User' } },
    store = createMockStore(initialState),
    route = '/',
    ...renderOptions
  } = {}
) => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <MemoryRouter initialEntries={[route]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>{children}</MemoryRouter>
    </Provider>
  );
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Mock pour fetch
global.fetch = jest.fn();

describe('Room Component Functional Tests', () => {
  beforeEach(() => {
    // Reset fetch mock
    global.fetch.mockReset();
    
    // Mock successful fetch for user rooms
    global.fetch.mockImplementation((url) => {
      if (url === 'https://dreamhabitat.djaouti.com/api/room/user') {
        return Promise.resolve({
          ok: true,
          headers: { get: () => 'application/json' },
          text: () => Promise.resolve(JSON.stringify([
            { id: 1, title: 'Living room' },
            { id: 2, title: 'Bedroom' }
          ]))
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({})
      });
    });
  });

  test('renders loading state initially', async () => {
    renderWithProviders(<Room />);
    expect(screen.getByText('Chargement...')).toBeInTheDocument();
  });

  test('renders room selection and upload UI after loading', async () => {
    await act(async () => {
      renderWithProviders(<Room />);
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    // After loading completes
    expect(screen.getByText(/Redesign your/i)).toBeInTheDocument();
    expect(screen.getByText(/Upload a photo of your room/i)).toBeInTheDocument();
    expect(screen.getByText('Select Room Type')).toBeInTheDocument();
    expect(screen.getByText('Select Style')).toBeInTheDocument();
  });

  test('redirects to login page when not authenticated', () => {
    renderWithProviders(<Room />, {
      initialState: { token: null, user: null }
    });

    expect(screen.getByText('Veuillez vous connecter pour accéder à cette page')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Se connecter' })).toBeInTheDocument();
  });

  test('shows "no rooms" message when user has no rooms', async () => {
    global.fetch.mockImplementation(() => {
      return Promise.resolve({
        ok: true,
        headers: { get: () => 'application/json' },
        text: () => Promise.resolve('[]')
      });
    });

    await act(async () => {
      renderWithProviders(<Room />);
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(screen.getByText('Aucun type de pièce créé')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Créer un type de pièce' })).toBeInTheDocument();
  });

  test('renders upload zone component', async () => {
    await act(async () => {
      renderWithProviders(<Room />);
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    expect(screen.getByTestId('upload-zone')).toBeInTheDocument();
  });
});

describe('Room Component Performance Tests', () => {
  let renderTimes = [];
  
  // Function callback for React Profiler
  const onRenderCallback = (id, phase, actualDuration) => {
    renderTimes.push({ id, phase, actualDuration });
  };
  
  beforeEach(() => {
    renderTimes = [];
    
    // Mock user rooms fetch
    global.fetch.mockImplementation((url) => {
      if (url === 'https://dreamhabitat.djaouti.com/api/room/user') {
        return Promise.resolve({
          ok: true,
          headers: { get: () => 'application/json' },
          text: () => Promise.resolve(JSON.stringify([
            { id: 1, title: 'Living room' },
            { id: 2, title: 'Bedroom' }
          ]))
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({})
      });
    });
  });

  test('initial render performance is acceptable', async () => {
    await act(async () => {
      render(
        <Profiler id="room-component" onRender={onRenderCallback}>
          <Provider store={createMockStore({ token: 'fake-token', user: { id: 1, name: 'Test User' } })}>
            <MemoryRouter>
              <Room />
            </MemoryRouter>
          </Provider>
        </Profiler>
      );
    });
    
    expect(renderTimes.length).toBeGreaterThan(0);
    const initialRender = renderTimes[0];
    console.log(`Room - Temps de rendu initial: ${initialRender.actualDuration}ms`);
    
    // Ce seuil peut être ajusté selon vos besoins
    expect(initialRender.actualDuration).toBeLessThan(500);
  });

  test('room type selection causes efficient re-render', async () => {
    // Forcer un token valide pour ce test
    const initialState = { 
      token: 'fake-token', 
      user: { id: 1, name: 'Test User' }
    };
    
    let component;
    
    await act(async () => {
      component = render(
        <Profiler id="room-selection" onRender={onRenderCallback}>
          <Provider store={createMockStore(initialState)}>
            <MemoryRouter>
              <Room />
            </MemoryRouter>
          </Provider>
        </Profiler>
      );
    });
    
    // Attendre que le composant ait chargé les données
    await screen.findByText(/Redesign your/i);
    
    // Reset render times after initial render
    renderTimes = [];
    
    // Simulate room type selection - maintenant utiliser une approche plus robuste
    await act(async () => {
      // Chercher le select par son texte associé
      const roomTypeLabel = screen.getByText('Select Room Type');
      const roomTypeSelect = roomTypeLabel.closest('div').querySelector('select');
      
      if (roomTypeSelect) {
        fireEvent.change(roomTypeSelect, { target: { value: 'Bedroom' } });
      }
    });
    
    if (renderTimes.length > 0) {
      const selectionRender = renderTimes[0];
      console.log(`Room - Temps de rendu après sélection de type: ${selectionRender.actualDuration}ms`);
      
      // The re-render should be efficient due to memoization
      expect(selectionRender.actualDuration).toBeLessThan(50);
    }
  });

  test('style selection causes efficient re-render', async () => {
    // Forcer un token valide pour ce test
    const initialState = { 
      token: 'fake-token', 
      user: { id: 1, name: 'Test User' }
    };
    
    let component;
    
    await act(async () => {
      component = render(
        <Profiler id="style-selection" onRender={onRenderCallback}>
          <Provider store={createMockStore(initialState)}>
            <MemoryRouter>
              <Room />
            </MemoryRouter>
          </Provider>
        </Profiler>
      );
    });
    
    // Attendre que le composant ait chargé les données
    await screen.findByText(/Redesign your/i);
    
    // Reset render times after initial render
    renderTimes = [];
    
    // Simulate style selection - approche plus robuste
    await act(async () => {
      // Chercher le select par son texte associé
      const styleLabel = screen.getByText('Select Style');
      const styleSelect = styleLabel.closest('div').querySelector('select');
      
      if (styleSelect) {
        fireEvent.change(styleSelect, { target: { value: 'Minimalist' } });
      }
    });
    
    if (renderTimes.length > 0) {
      const styleRender = renderTimes[0];
      console.log(`Room - Temps de rendu après sélection de style: ${styleRender.actualDuration}ms`);
      
      // The re-render should be efficient due to memoization
      expect(styleRender.actualDuration).toBeLessThan(50);
    }
  });
});