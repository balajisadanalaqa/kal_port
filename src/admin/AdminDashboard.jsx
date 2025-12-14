import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    window.location.href = '/admin/login';
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar Navigation */}
            <div className="md:w-1/4 mb-4 md:mb-0 md:pr-4">
              <nav className="bg-white rounded-md shadow-md p-4">
                <ul className="space-y-2">
                  <li>
                    <Link 
                      to="/admin/dashboard" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/admin/summary" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      Summary
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/admin/education" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      Education
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/admin/experience" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      Experience
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/admin/patients" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      Patients
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/admin/reviews" 
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      Reviews
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Main Content Area */}
            <div className="md:w-3/4">
              <div className="bg-white rounded-md shadow-md p-6">
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;