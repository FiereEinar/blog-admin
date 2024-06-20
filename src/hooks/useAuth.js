import { getTokenFromLocalStorage } from '@/utils/localstorage';
import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

/**
 * @returns a boolean if the user is logged in
 */
export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = getTokenFromLocalStorage();
    if (token === null) return;

    const data = jwtDecode(token.split(' ')[1]);

    setIsLoggedIn(data !== null)
  }, []);

  return isLoggedIn;
}
