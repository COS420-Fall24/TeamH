import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { AppRoutes } from './App';

test('renders LoginWidget on initial load', () => {
    render(
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
    expect(screen.getByText(/login/i)).toBeInTheDocument();
});


test('renders Account and Input components on /app route', () => {
    const history = createMemoryHistory();
    history.push('/app');
    render(
        <Router location={history.location} navigator={history}>
            <AppRoutes />
        </Router>
    );
    expect(screen.getByText(/account/i)).toBeInTheDocument();
    expect(screen.getByText(/input/i)).toBeInTheDocument();
});

test('renders Account and Feedback components on /feedback route', () => {
    const history = createMemoryHistory();
    history.push('/feedback');
    render(
        <Router location={history.location} navigator={history}>
            <AppRoutes />
        </Router>
    );
    expect(screen.getByText(/account/i)).toBeInTheDocument();
    expect(screen.getByText(/feedback/i)).toBeInTheDocument();
});

test('redirects to login on invalid route', () => {
    const history = createMemoryHistory();
    history.push('/');
});
