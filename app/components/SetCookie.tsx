import { useEffect } from 'react';
import { useToken } from '~/contexts/AuthContext';

function SetTokenCookie() {
  const { token } = useToken();

  useEffect(() => {
    if (token) {
      document.cookie = `authToken=${token}; path=/`;
    }
  }, [token]);

  return null;
}

export default SetTokenCookie;
