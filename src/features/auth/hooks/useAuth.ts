import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../store';
import { loginAsync, logout } from '../state/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);

  const login = (email: string, password: string) => {
    dispatch(loginAsync({ email, password }));
  };

  return {
    user,
    loading,
    error,
    login,
    logout: () => dispatch(logout()),
  };
}; 