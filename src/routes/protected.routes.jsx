import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/auth';


export const ProtectedRoute = ({ redirectTo = "/signIn" }) => {
  const { cookies } = useAuth();
  return cookies.token ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

/**
 * SurveyProtectedRoute Component
 * 
 * Protects survey route - only allows access if user hasn't completed the survey yet.
 * Redirects completed users to their answers page.
 * 
 * @component
 * @param {string} [redirectTo="/myanswers"] - Route to redirect if survey is already completed
 */
export const SurveyProtectedRoute = ({ redirectTo = "/myanswers" }) => {
  let userData;
  try {
    userData = JSON.parse(localStorage.getItem('user')) || {};
  } catch (error) {
    console.warn('Error al parsear user en localStorage:', error);
    userData = {};
  }

  const surveyCompleted = userData.survey_completed || false;
  return !surveyCompleted ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

/**
 * AnswersProtectedRoute Component
 * 
 * Protects answers route - only allows access if user has completed the survey.
 * Redirects non-completed users to survey page.
 * 
 * @component
 * @param {string} [redirectTo="/survey"] - Route to redirect if survey is not completed
 */
export const AnswersProtectedRoute = ({ redirectTo = "/survey" }) => {
  let userData;
  try {
    userData = JSON.parse(localStorage.getItem('user')) || {};
  } catch (error) {
    console.warn('Error al parsear user en localStorage:', error);
    userData = {};
  }

  const surveyCompleted = userData.survey_completed || false;
  return surveyCompleted ? <Outlet /> : <Navigate to={redirectTo} replace />;
};
