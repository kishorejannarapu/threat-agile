typescript
// All necessary imports
import React from 'react';
import { MemoryRouter, Route } from 'react-router-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';
import HorizontalMenubar from './HorizontalMenubar';

// Unit tests covering all scenarios
afterEach(cleanup);

describe('HorizontalMenubar', () => {
  test('renders the menu with all menu items', () => {
    const { getByText } = render(
      <MemoryRouter>
        <HorizontalMenubar />
      </MemoryRouter>
    );

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Explore')).toBeInTheDocument();
    expect(getByText('Customers')).toBeInTheDocument();
  });

  test('hovering over Explore menu shows submenus', () => {
    const { getByText, queryByText } = render(
      <MemoryRouter>
        <HorizontalMenubar />
      </MemoryRouter>
    );

    fireEvent.mouseEnter(getByText('Explore'));
    expect(getByText('Kill Chains')).toBeInTheDocument();
    expect(getByText('Unmapped')).toBeInTheDocument();

    fireEvent.mouseLeave(getByText('Explore'));
    // Need to wait for submenu to disappear or use jest timers if there's a delay
    expect(queryByText('Kill Chains')).not.toBeInTheDocument();
    expect(queryByText('Unmapped')).not.toBeInTheDocument();
  });

  test('clicking on Explore menu items navigates correctly', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/']}>
        <Route path="/" exact component={Home} />
        <Route path="/browse" exact component={Services} />
        <Route path="/browse/unmapped" exact component={Contact} />
        <HorizontalMenubar />
      </MemoryRouter>
    );

    fireEvent.click(getByText('Kill Chains'));
    expect(getByText('Services Page')).toBeInTheDocument();

    fireEvent.click(getByText('Unmapped'));
    expect(getByText('Contact Page')).toBeInTheDocument();
  });

  test('navigating directly to Customers should render the correct component', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={['/customers']}>
        <Route path="/customers" exact component={About} />
        <HorizontalMenubar />
      </MemoryRouter>
    );
    
    expect(getByText('About Page')).toBeInTheDocument();
  });

  test('each NavBar item should contain the right data-test-id', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <HorizontalMenubar />
      </MemoryRouter>
    );

    const homeLink = getByTestId('nav-to-home');
    expect(homeLink).toHaveAttribute('href', '/');

    const customersLink = getByTestId('nav-to-customers');
    expect(customersLink).toHaveAttribute('href', '/customers');
  });
});
