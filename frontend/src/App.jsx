import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import DashboardPage from "./pages/DashboardPage";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>
            <div className="h-screen flex flex-col overflow-hidden">

                <div className="fixed top-0 left-0 right-0 z-50">
                    <Navbar />
                </div>

                <div className="flex-1 overflow-y-auto mt-[60px]">
                    <Routes>

                        <Route path="/" element={<HomePage />} />
                        <Route path="/auth" element={<AuthPage />} />

                        <Route
                            path="/dashboard"
                            element={
                                <ProtectedRoute>
                                    <DashboardPage />
                                </ProtectedRoute>
                            }
                        />

                        <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
