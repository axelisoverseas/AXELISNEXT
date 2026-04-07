import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import Layout from '../components/Layout';
import logoLight from '../assets/1yellow svg logoaxelis.svg';
import logoDark from '../assets/1 2white svg logo axelis.svg';

const NotFound = () => {
  return (
    <Layout
      title="Page Not Found"
      description="The page you're looking for doesn't exist. Return to Axelis Overseas homepage."
    >
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 text-center">
          <div>
            <div className="mb-8">
              <img
                src={logoLight}
                alt="Axelis Overseas"
                className="h-16 w-auto mx-auto mb-4"
                style={{
                  filter: 'brightness(0) saturate(100%) invert(13%) sepia(15%) saturate(2000%) hue-rotate(200deg) brightness(95%) contrast(95%)',
                  // Convert yellow logo to navy blue for better contrast on white background
                }}
              />
            </div>
            <h1 className="text-9xl font-bold text-red-600">404</h1>
            <h2 className="mt-6 text-3xl font-bold text-black">
              Page Not Found
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Sorry, we couldn't find the page you're looking for.
            </p>
          </div>
          
          <div className="mt-8 space-y-4">
            <Link
              to="/"
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors shadow-lg"
            >
              <Home className="mr-2" size={16} />
              Go to Homepage
            </Link>

            <button
              onClick={() => window.history.back()}
              className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <ArrowLeft className="mr-2" size={16} />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
