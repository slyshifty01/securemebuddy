// src/App.jsx
// Master Routing for SecureMeBuddy – Public Site + Secure Dashboard

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Public
import LandingPage from "./landing/LandingPage.jsx";

// Dashboard
import DashboardLayout from "./dashboard/layouts/DashboardLayout.jsx";

// Dashboard Pages
import OverviewPage from "./dashboard/pages/OverviewPage.jsx";
import UsersPage from "./dashboard/pages/UsersPage.jsx";
import AffiliatesPage from "./dashboard/pages/AffiliatesPage.jsx";
import SettingsPage from "./dashboard/pages/SettingsPage.jsx";
import SafetyCheckersPage from "./dashboard/pages/SafetyCheckersPage.jsx";
import ApiKeysPage from "./dashboard/pages/ApiKeysPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC SITE */}
        <Route path="/" element={<LandingPage />} />

        {/* SECURE DASHBOARD */}
        <Route path="/secure/dashboard" element={<DashboardLayout />}>
          <Route index element={<OverviewPage />} />

          <Route path="overview" element={<OverviewPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="affiliates" element={<AffiliatesPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="safety" element={<SafetyCheckersPage />} />
          <Route path="api-keys" element={<ApiKeysPage />} />
        </Route>

        {/* LEGACY REDIRECTS */}
        <Route
          path="/dashboard/*"
          element={<Navigate to="/secure/dashboard" replace />}
        />

        {/* 404 → Home */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
