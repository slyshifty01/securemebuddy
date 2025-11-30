// src/App.jsx
// Full routing for SecureMeBuddy — Public website + Dashboard

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Public Landing Page
import LandingPage from "./landing/LandingPage.jsx";

// Legal Pages
import { PrivacyPage } from "./legal/PrivacyPage.jsx";
import { TermsPage } from "./legal/TermsPage.jsx";
import { ContactPage } from "./legal/ContactPage.jsx";
import { TrustCenterPage } from "./legal/TrustCenterPage.jsx";

// Dashboard Layout
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

        {/* ===========================
            PUBLIC LANDING PAGE
        ============================ */}
        <Route path="/" element={<LandingPage />} />

        {/* ===========================
            PUBLIC LEGAL PAGES
        ============================ */}
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/trust" element={<TrustCenterPage />} />

        {/* ===========================
            SECURE DASHBOARD
        ============================ */}
        <Route path="/secure/dashboard" element={<DashboardLayout />}>

          {/* Default Dashboard Route */}
          <Route index element={<OverviewPage />} />

          {/* Dashboard Pages */}
          <Route path="overview" element={<OverviewPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="affiliates" element={<AffiliatesPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="safety" element={<SafetyCheckersPage />} />
          <Route path="api-keys" element={<ApiKeysPage />} />

        </Route>

        {/* ===========================
            LEGACY REDIRECTS
        ============================ */}
        <Route
          path="/dashboard/*"
          element={<Navigate to="/secure/dashboard" replace />}
        />

        {/* ===========================
            CATCH-ALL → HOME
        ============================ */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}
