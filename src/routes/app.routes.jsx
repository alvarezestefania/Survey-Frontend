import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ProtectedRoute, SurveyProtectedRoute, AnswersProtectedRoute } from "./protected.routes"
import { PublicRoute } from "./public.routes"

import { HomePage } from "../pages/home"
import { SurveyPage } from "../pages/survey"
import { UserAnswersPage } from "../pages/survey/user_answers"
import { SignupPage } from "../pages/auth/signup"
import { SigninPage } from "../pages/auth/signin"

import { CookiesProvider } from 'react-cookie'
import AppProvider from "../hooks"


export const AppRouter = () => {
    return (
        <BrowserRouter>
            <CookiesProvider>
                <AppProvider>
                    <Routes>
                        {/* Private routes: only if user is logged in */}
                        <Route element={<ProtectedRoute />}>
                            <Route path='/' element={<HomePage />} />
                            <Route element={<SurveyProtectedRoute />}>
                                <Route path='/survey' element={<SurveyPage />} />
                            </Route>

                            <Route element={<AnswersProtectedRoute />}>
                                <Route path='/myanswers' element={<UserAnswersPage />} />
                            </Route>
                        </Route>


                        {/* Public routes: only if user is NOT logged in */}
                        <Route element={<PublicRoute />}>
                            <Route path='/signin' element={<SigninPage />} />
                            <Route path='/signup' element={<SignupPage />} />
                        </Route>
                    </Routes>
                </AppProvider>
            </CookiesProvider>
        </BrowserRouter>
    )
}