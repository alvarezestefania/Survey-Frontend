import { AuthProvider } from './auth';
import { SurveyProvider } from "../hooks/survey"

const AppProvider = ({ children }) => (
    <>
        <AuthProvider>
            <SurveyProvider>
                {children}
            </SurveyProvider>
        </AuthProvider>
    </>
);

export default AppProvider;