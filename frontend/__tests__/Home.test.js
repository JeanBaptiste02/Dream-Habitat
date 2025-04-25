import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Profiler } from 'react';
import Home from '../src/components/Home';

// Mock des images
jest.mock('../assets/img/image-apres.svg', () => 'image-apres-mock', { virtual: true });
jest.mock('../assets/img/image-avant.svg', () => 'image-avant-mock', { virtual: true });

// Mock des composants Lucide
jest.mock('lucide-react', () => ({
  ChevronUp: () => <div data-testid="chevron-up" />,
  ChevronDown: () => <div data-testid="chevron-down" />
}));

const renderWithRouter = (ui) => {
  return render(ui, { wrapper: BrowserRouter });
};

describe('Home Component Rendering Tests', () => {
  test('renders main heading correctly', () => {
    renderWithRouter(<Home />);
    const heading = screen.getByRole('heading', {
      name: /transformez vos espaces intérieurs/i
    });
    expect(heading).toBeInTheDocument();
  });

  test('renders call-to-action button with correct link', () => {
    renderWithRouter(<Home />);
    const ctaButton = screen.getByRole('link', { name: /commencez/i });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton.getAttribute('href')).toBe('/create-room-type');
  });

  test('chat assistant toggles correctly when clicked', () => {
    renderWithRouter(<Home />);
    
    // Au début, le chat est développé et l'icône ChevronDown est visible
    expect(screen.getByTestId('chevron-down')).toBeInTheDocument();
    
    // Cliquer sur le bouton
    const chatHeader = screen.getByText('Dream Habitat Assistant').closest('button');
    fireEvent.click(chatHeader);
    
    // Après le clic, l'icône ChevronUp doit être visible
    expect(screen.getByTestId('chevron-up')).toBeInTheDocument();
  });
});

describe('Home Component Performance Tests', () => {
  let renderTimes = [];
  
  // Fonction callback pour le Profiler React
  const onRenderCallback = (
    id,
    phase,
    actualDuration,
    baseDuration,
    startTime,
    commitTime
  ) => {
    renderTimes.push({
      id,
      phase,
      actualDuration,
      baseDuration,
      startTime,
      commitTime
    });
  };
  
  beforeEach(() => {
    renderTimes = [];
  });
  
  test('initial render performance is acceptable', () => {
    act(() => {
      render(
        <Profiler id="home-component" onRender={onRenderCallback}>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Home />
          </BrowserRouter>
        </Profiler>
      );
    });
    
    // Vérifier que le rendu initial a été capturé
    expect(renderTimes.length).toBeGreaterThan(0);
    
    // Le temps de rendu devrait être raisonnable (ajustez selon vos besoins)
    // Ces valeurs sont à ajuster en fonction de vos attentes de performance
    const initialRender = renderTimes[0];
    console.log(`Temps de rendu initial: ${initialRender.actualDuration}ms`);
    
    // Ce seuil est à ajuster en fonction de vos attentes
    expect(initialRender.actualDuration).toBeLessThan(500);
  });
  
  test('chat toggle re-renders efficiently', () => {
    let component;
    
    act(() => {
      component = render(
        <Profiler id="home-component" onRender={onRenderCallback}>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Home />
          </BrowserRouter>
        </Profiler>
      );
    });
    
    // Réinitialiser les temps capturés après le rendu initial
    renderTimes = [];
    
    // Cliquer sur le chat pour le réduire
    const chatHeader = screen.getByText('Dream Habitat Assistant').closest('button');
    
    act(() => {
      fireEvent.click(chatHeader);
    });
    
    // Vérifier que le rendu après le clic a été capturé
    expect(renderTimes.length).toBeGreaterThan(0);
    const toggleRender = renderTimes[0];
    console.log(`Temps de rendu après toggle du chat: ${toggleRender.actualDuration}ms`);
    
    // Le temps de rendu après un toggle devrait être beaucoup plus rapide
    // que le rendu initial grâce à l'optimisation
    expect(toggleRender.actualDuration).toBeLessThan(50);
  });
  
  test('multiple renders are optimized due to memoization', () => {
    let component;
    
    act(() => {
      component = render(
        <Profiler id="home-component" onRender={onRenderCallback}>
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Home />
          </BrowserRouter>
        </Profiler>
      );
    });
    
    // Réinitialiser les temps après le rendu initial
    renderTimes = [];
    
    // Forcer plusieurs rendus pour tester la mémoisation
    for (let i = 0; i < 5; i++) {
      act(() => {
        // Utiliser rerender pour simuler un rendu sans changement d'état
        component.rerender(
          <Profiler id="home-component" onRender={onRenderCallback}>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <Home />
            </BrowserRouter>
          </Profiler>
        );
      });
    }
    
    // Vérifier que les rendus successifs sont rapides
    const averageDuration = renderTimes.reduce((sum, time) => sum + time.actualDuration, 0) / renderTimes.length;
    console.log(`Durée moyenne des rendus successifs: ${averageDuration}ms`);
    
    // La durée moyenne devrait être faible grâce à la mémoisation
    expect(averageDuration).toBeLessThan(30);
  });
});