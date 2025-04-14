
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/hooks/useTheme";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Treinamento from "./pages/Treinamento";
import Analise from "./pages/Analise";
import Progresso from "./pages/Progresso";
import Planos from "./pages/Planos";
import Teoria from "./pages/Teoria";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/auth" element={<Auth />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/" element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path="teoria" element={<Teoria />} />
                  <Route path="treinamento" element={<Treinamento />} />
                  <Route path="analise" element={<Analise />} />
                  <Route path="progresso" element={<ProtectedRoute><Progresso /></ProtectedRoute>} />
                  <Route path="planos" element={<Planos />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </TooltipProvider>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
