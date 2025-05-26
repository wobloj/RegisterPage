import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.tsx'
import { Home } from './pages/Home.tsx';
import { UserProvider } from './context/UserContext.tsx';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/home" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </StrictMode>
)
