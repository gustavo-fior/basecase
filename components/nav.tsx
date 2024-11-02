"use client"

import { ModeToggle } from '@/components/theme-toggle';

export const Navigation = () => {
  return (
    <nav className="border-b border-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <span className="text-2xl text-orange-500">basecase</span>
            <div className="hidden md:flex space-x-6">
              <a href="#" className="hover:text-orange-500">Documentation</a>
              <a href="#" className="hover:text-orange-500">Features</a>
              <a href="#" className="hover:text-orange-500">About</a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <button className="px-4 py-2 border border-gray-700 hover:border-orange-500 rounded">
              Sign in
            </button>
            <button className="px-4 py-2 bg-orange-500 text-black rounded hover:bg-orange-400">
              Get started
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};