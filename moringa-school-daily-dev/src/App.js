import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/AdminDashboard';
import ManageUsers from './pages/ManageUsers'; // New page to manage users
import ManageContent from './pages/ManageContent'; // New page to manage content
import ManageCategories from './pages/ManageCategories'; // New page to manage categories
import Sidebar from './components/Sidebar'; // Sidebar component for navigation

// If you're using Redux, make sure the app is wrapped in a Provider
import { Provider } from 'react-redux';
import { store } from './redux/store'; // Change from default import to named import

function App() {
  return (
    <Provider store={store}> {/* Wrap the app in the Redux Provider */}
      <Router>
        <div style={{ display: 'flex', height: '100vh' }}>
          {/* Sidebar should be available across all admin pages */}
          <Sidebar style={{ position: 'fixed', width: '240px', height: '100vh' }} />

          {/* Main content section */}
          <div style={{ marginLeft: '240px', padding: '20px', flex: 1 }}>
            <Routes>
              {/* Define your routes for admin dashboard and pages */}
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<ManageUsers />} />
              <Route path="/admin/content" element={<ManageContent />} />
              <Route path="/admin/categories" element={<ManageCategories />} />
              {/* Additional routes can go here */}
            </Routes>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
