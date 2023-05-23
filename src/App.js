import React, { useEffect, useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import { StyledChart } from './components/chart';
import ScrollToTop from './components/scroll-to-top';

// ----------------------------------------------------------------------

export default function App() {
  const [logoutReason, setLogoutReason] = useState('');

  useEffect(() => {
    const isTokenExpired = (token) => {
      // Implementacja logiki sprawdzania ważności tokenu
      // ...
    };

    const checkTokenValidity = () => {
      const token = localStorage.getItem('token');
      if (isTokenExpired(token)) {
        // Wylogowanie użytkownika
        localStorage.removeItem('token');
        setLogoutReason('Sesja wygasła.'); // Ustawienie przyczyny wylogowania
        // Przekierowanie na stronę logowania lub inna akcja
        window.location.href = '/login'; // Przykładowe przekierowanie na stronę logowania
      } else {
        const { exp } = JSON.parse(atob(token.split('.')[1]));
        const timeToExpiration = exp * 1000 - Date.now();

        if (timeToExpiration <= 90000) { // Mniej niż 90 sekund do wygaśnięcia
          // Wylogowanie użytkownika
          localStorage.removeItem('token');
          setLogoutReason('Sesja wygasa za mniej niż 90 sekund.'); // Ustawienie przyczyny wylogowania
          // Przekierowanie na stronę logowania lub inna akcja
          window.location.href = '/login'; // Przykładowe przekierowanie na stronę logowania
        }
      }
    };

    const tokenCheckInterval = setInterval(checkTokenValidity, 1000 * 60); // Sprawdzaj co minutę

    return () => {
      clearInterval(tokenCheckInterval); // Czyszczenie interwału po zakończeniu komponentu
    };
  }, []);

  useEffect(() => {
    if (logoutReason) {
      alert(logoutReason); // Wyświetlenie powiadomienia o przyczynie wylogowania
    }
  }, [logoutReason]);

  return (
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <ScrollToTop />
          <StyledChart />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}
