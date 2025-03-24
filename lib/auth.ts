import { useState, useEffect } from 'react';

// Type pour l'utilisateur
export interface User {
  id: string;
  email: string;
  role: 'admin';
}

// État de l'authentification
export interface AuthState {
  user: User | null;
  loading: boolean;
}

// Credentials pour l'authentification
const ADMIN_CREDENTIALS = {
  email: 'admin@fullness-safety.fr',
  password: 'admin123'
};

// Hook personnalisé pour l'authentification
export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    loading: true
  });

  useEffect(() => {
    // Vérifie si l'utilisateur est déjà connecté
    const user = localStorage.getItem('user');
    if (user) {
      setAuthState({
        user: JSON.parse(user),
        loading: false
      });
    } else {
      setAuthState({ user: null, loading: false });
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simule une requête d'authentification
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      const user: User = {
        id: '1',
        email: ADMIN_CREDENTIALS.email,
        role: 'admin'
      };
      localStorage.setItem('user', JSON.stringify(user));
      setAuthState({ user, loading: false });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({ user: null, loading: false });
  };

  return {
    user: authState.user,
    loading: authState.loading,
    login,
    logout
  };
}