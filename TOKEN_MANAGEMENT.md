# 🔐 Token Management System

This document describes the JWT token management system implemented in the Mini Docto+ React application, based on the Flutter TokenManager pattern.

## 📋 Overview

The TokenManager system provides:
- **Automatic token refresh** when tokens expire
- **Secure token storage** in localStorage
- **Automatic logout** on refresh failure
- **Role-based authentication** support
- **React hooks integration** for easy component usage

## 🏗️ Architecture

### Core Components

1. **TokenManager** (`src/shared/services/tokenManager.ts`)
   - Main service class for token management
   - Handles token storage, refresh, and validation

2. **useToken Hook** (`src/shared/hooks/useToken.ts`)
   - React hook for easy token management in components
   - Provides reactive state updates

3. **ProtectedRoute** (`src/shared/components/ProtectedRoute.tsx`)
   - Route wrapper for authentication protection
   - Supports role-based access control

4. **Enhanced AxiosClient** (`src/shared/services/axiosClient.ts`)
   - Automatic token injection in requests
   - Automatic token refresh on 401 errors

## 🚀 Usage Examples

### Basic Login Implementation

```typescript
import { loginApi } from '../api/authApi';
import { useToken } from '../../../shared/hooks';

const LoginComponent = () => {
  const { login } = useToken();

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await loginApi(email, password);
      
      // TokenManager automatically saves tokens from loginApi
      // No manual token handling needed!
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
};
```

### Protected Routes

```typescript
import { ProtectedRoute } from '../shared/components';

const AppRouter = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    
    {/* Protected route - requires authentication */}
    <Route 
      path="/appointments" 
      element={
        <ProtectedRoute>
          <AppointmentsPage />
        </ProtectedRoute>
      } 
    />
    
    {/* Role-based protection */}
    <Route 
      path="/admin" 
      element={
        <ProtectedRoute requiredRole="admin">
          <AdminPanel />
        </ProtectedRoute>
      } 
    />
  </Routes>
);
```

### Using Token Data in Components

```typescript
import { useToken } from '../shared/hooks';

const UserProfile = () => {
  const { isLoggedIn, userEmail, userRole, logout } = useToken();

  if (!isLoggedIn) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h2>Welcome, {userEmail}</h2>
      <p>Role: {userRole}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};
```

### Manual Token Operations

```typescript
import TokenManager from '../shared/services/tokenManager';

// Check if user is logged in
const isLoggedIn = TokenManager.isLoggedIn;

// Get current user info
const userInfo = TokenManager.getUserInfo();

// Force token refresh
const newToken = await TokenManager.forceRefresh();

// Manual logout
await TokenManager.logout();

// Check token expiry
const isExpired = TokenManager.isTokenExpired(token);
```

## 🔧 API Integration

### Expected API Response Format

Your backend should return tokens in this format:

```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "role": "doctor",
  "email": "doctor@example.com"
}
```

### Required API Endpoints

1. **Login**: `POST /auth/doctor/login`
   ```json
   // Request
   { "email": "doctor@example.com", "password": "password123" }
   
   // Response
   {
     "token": "access_token_here",
     "refreshToken": "refresh_token_here",
     "role": "doctor",
     "email": "doctor@example.com"
   }
   ```

2. **Token Refresh**: `POST /auth/refresh`
   ```json
   // Request
   { "refreshToken": "refresh_token_here" }
   
   // Response
   {
     "token": "new_access_token",
     "refreshToken": "new_refresh_token", // optional
     "role": "doctor",
     "email": "doctor@example.com"
   }
   ```

3. **Logout**: `POST /auth/logout`
   ```json
   // Request
   {
     "email": "doctor@example.com",
     "refreshToken": "refresh_token_here"
   }
   
   // Response
   { "success": true }
   ```

## 🔐 Security Features

### Token Validation
- **JWT expiry checking**: Automatically validates token expiration
- **Malformed token detection**: Handles invalid token formats
- **Automatic cleanup**: Removes invalid tokens

### Refresh Strategy
- **Proactive refresh**: Refreshes tokens before they expire
- **Retry mechanism**: Retries failed requests with fresh tokens
- **Fallback logout**: Logs out user if refresh fails

### Storage Security
- **localStorage isolation**: Tokens stored with specific keys
- **Memory caching**: Reduces localStorage access
- **Automatic cleanup**: Removes tokens on logout

## 🛠️ Configuration

### Environment Setup

Update the API base URL in `src/shared/constants/app.ts`:

```typescript
export const API_BASE_URL = 'https://your-api-domain.com/';
```

### Token Storage Keys

The system uses these localStorage keys:
- `access_token` - JWT access token
- `refresh_token` - JWT refresh token  
- `user_role` - User role (doctor, admin, etc.)
- `user_email` - User email address

## 🚨 Error Handling

### Common Scenarios

1. **Network Errors**: Handled gracefully with user feedback
2. **Invalid Tokens**: Automatic logout and redirect to login
3. **Refresh Failure**: User logged out with notification
4. **API Errors**: Proper error propagation to components

### Debug Mode

Enable console logging for debugging:

```typescript
// In tokenManager.ts, add debug logs
console.log('Token refresh attempt:', response.status);
console.error('Token validation failed:', error);
```

## 🧪 Testing

### Token Expiry Testing

```typescript
// Force token expiry for testing
TokenManager.clearTokens();
localStorage.setItem('access_token', 'invalid_token');

// Should trigger automatic refresh/logout
await axiosClient.get('/appointments/doctor/me');
```

### Manual Testing Scenarios

1. **Login Flow**: Verify tokens are saved correctly
2. **Auto Refresh**: Test with short-lived tokens
3. **Logout Flow**: Verify complete token cleanup
4. **Role Access**: Test role-based route protection

## 📊 Monitoring

### Key Metrics to Track

- Token refresh frequency
- Failed refresh attempts
- Automatic logout occurrences
- API 401 error rates

### Logging Recommendations

```typescript
// Add to your analytics/monitoring
TokenManager.on('refresh_success', () => {
  analytics.track('token_refreshed');
});

TokenManager.on('logout', (reason) => {
  analytics.track('user_logout', { reason });
});
```

## 🔄 Migration from Old System

If migrating from a simpler token system:

1. **Replace localStorage calls** with TokenManager methods
2. **Update API interceptors** to use new token management
3. **Add ProtectedRoute** wrappers to existing routes
4. **Update login/logout** flows to use new APIs

## 🎯 Best Practices

1. **Always use useToken hook** in React components
2. **Wrap sensitive routes** with ProtectedRoute
3. **Handle loading states** when checking authentication
4. **Test token expiry scenarios** thoroughly
5. **Monitor refresh token rotation** if implemented

## 🆘 Troubleshooting

### Common Issues

**Problem**: User keeps getting logged out
**Solution**: Check token expiry times and refresh endpoint

**Problem**: 401 errors not handled
**Solution**: Verify axios interceptors are configured correctly

**Problem**: Role-based routes not working  
**Solution**: Ensure role is correctly saved in TokenManager

**Problem**: Tokens not persisting across browser refresh
**Solution**: Verify localStorage is accessible and not being cleared

---

This token management system provides enterprise-grade security and user experience for your medical appointment application! 🏥✨
