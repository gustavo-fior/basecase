"use client"

import { Terminal, Database, Shield, Activity, Settings, Users } from 'lucide-react';
import { ModeToggle } from '@/components/theme-toggle';

const HomePage = () => {
  const features = [
    { icon: <Terminal size={20} />, text: 'Command-line interface' },
    { icon: <Database size={20} />, text: 'Enterprise scaling' },
    { icon: <Shield size={20} />, text: 'Security' },
    { icon: <Activity size={20} />, text: 'Performance' },
    { icon: <Settings size={20} />, text: 'Configuration' },
    { icon: <Users size={20} />, text: 'Team collaboration' }
  ];

  const clients = [
    { name: 'Client 1', logo: '▣' },
    { name: 'Client 2', logo: '◈' },
    { name: 'Client 3', logo: '◇' },
    { name: 'Client 4', logo: '⬡' }
  ];

  return (
    <div className="min-h-screen font-mono">
      {/* Navigation */}
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

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-20">
        <div className="max-w-3xl">
          <h1 className="text-4xl mb-6">
            The development platform
            <br />
            <span className="text-orange-500">built for scale</span>
          </h1>
          <p className="text-xl mb-8 text-gray-400">
            Basecase provides enterprise-grade development tools with a 
            developer-first approach. Built for teams that need power, 
            flexibility, and reliability.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {features.map((feature, index) => (
            <div key={index} className="border border-gray-800 p-6 rounded hover:border-orange-500">
              <div className="flex items-center space-x-3 mb-4">
                {feature.icon}
                <span>{feature.text}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Client Grid */}
        <div className="mt-20">
          <h2 className="text-2xl mb-8">Trusted by engineering teams at</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {clients.map((client, index) => (
              <div key={index} className="border border-gray-800 p-8 rounded flex items-center justify-center">
                <span className="text-3xl">{client.logo}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quote Section */}
        <div className="mt-20 border-l-4 border-orange-500 pl-6">
          <p className="text-lg italic">
            &ldquo;Basecase has transformed how our team develops and deploys applications.
            The developer experience is unmatched.&rdquo;
          </p>
          <p className="mt-4 text-gray-500">— Engineering Lead at TechCorp</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;