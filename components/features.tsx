"use client"

import { Terminal, Database, Shield, Activity, Settings, Users } from 'lucide-react';

export const Features = () => {
  const features = [
    { icon: <Terminal size={20} />, text: 'Command-line interface' },
    { icon: <Database size={20} />, text: 'Enterprise scaling' },
    { icon: <Shield size={20} />, text: 'Security' },
    { icon: <Activity size={20} />, text: 'Performance' },
    { icon: <Settings size={20} />, text: 'Configuration' },
    { icon: <Users size={20} />, text: 'Team collaboration' }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 mt-16">
      {features.map((feature, index) => (
        <div key={index} className="border border-gray-800 p-6 rounded hover:border-purple-600">
          <div className="flex items-center space-x-3 mb-4">
            {feature.icon}
            <span>{feature.text}</span>
          </div>
        </div>
      ))}
    </div>
  );
};