import { createContext, useCallback, useContext, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

import { signup as signupAPI } from '../../services/api/auth';
import { signin as signinAPI } from '../../services/api/auth';
import { signout as signoutAPI } from '../../services/api/auth';

/**
 * Authentication Context
 * 
 * Provides authentication state and methods throughout the application.
 * This context manages user authentication, token storage, and navigation flow.
 * 
 * @context
 */
const UserContext = createContext();

/**
 * AuthProvider Component
 * 
 * An authentication provider that manages user authentication state and
 * cookie-based token storage.
 * 
 * @component
 * @example
 * import { AuthProvider } from './contexts/AuthContext';
 * 
 * function App() {
 *   return (
 *     <BrowserRouter>
 *       <AuthProvider>
 *         <Routes>
 *           <Route path="/signin" element={<SigninPage />} />
 *         </Routes>
 *       </AuthProvider>
 *     </BrowserRouter>
 *   );
 * }
 */
export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    const [cookies, setCookies, removeCookie] = useCookies(['token']);

    const signup = useCallback(async ({ name, email, password }) => {
        try {
            const result = await signupAPI({ name, email, password });
            if (result.success) {
                return {
                    success: true,
                    message: "Registro exitoso."
                };
            } else {
                return { success: false, error: result.error || "Error en el registro." };
            }
        } catch (error) {
            return { success: false, error: 'Error inesperado. Inténtalo de nuevo.' };
        }

    }, []);

    const signin = useCallback(async ({ email, password }) => {
        try {
            const result = await signinAPI({ email, password });
            if (result.success) {
                const userData = result.data.result.data;

                setCookies('token', userData.token);
                setCookies('expires_at', userData.expires_at);

                localStorage.setItem('user', JSON.stringify({
                    name: userData.name,
                    survey_completed_at: userData.survey_completed_at,
                    survey_completed: userData.survey_completed
                }));

                return {
                    success: true,
                    message: 'Inicio de sesión exitoso.',
                    survey_completed: userData.survey_completed
                }
            } else {
                return { success: false, error: result.error };
            }

        } catch (error) {
            return { success: false, error: 'Error inesperado. Inténtalo de nuevo.' };
        }
    }, [setCookies]);


    const signout = useCallback(async () => {
        try {
            const token = cookies.token;
            const result = await signoutAPI({ token });

            if (result.success) {

                ['token', 'expires_at'].forEach(obj => removeCookie(obj));
                localStorage.removeItem("user");

                navigate('/signin');

            } else {
                return { success: false, error: result.error };
            }
        } catch (error) {
            return { success: false, error: 'Error inesperado. Inténtalo de nuevo.' };
        }


    }, [cookies.token, removeCookie, navigate]);

    // Memoized context value to prevent unnecessary re-renders
    const value = useMemo(
        () => ({
            cookies,
            signup,
            signin,
            signout,
        }),
        [cookies, signup, signin, signout]
    );

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
};


/**
 * Custom hook for accessing authentication context
 * 
 * Provides a way to access authentication state and methods
 * from any component within the AuthProvider tree.
 * 
 * @hook
 * @returns {AuthContextValue} Authentication context containing cookies and auth methods
 * @throws {Error} If used outside of AuthProvider
 * 
 */
export const useAuth = () => {
    const context = useContext(UserContext);

    // Runtime check to ensure hook is used within provider
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
