import { useEffect, useState } from 'react';

const FULL_ASCII = `
██████╗  █████╗ ███████╗███████╗ ██████╗ █████╗ ███████╗███████╗
██╔══██╗██╔══██╗██╔════╝██╔════╝██╔════╝██╔══██╗██╔════╝██╔════╝
██████╔╝███████║███████╗█████╗  ██║     ███████║███████╗█████╗  
██╔══██╗██╔══██║╚════██║██╔══╝  ██║     ██╔══██║╚════██║██╔══╝  
██████╔╝██║  ██║███████║███████╗╚██████╗██║  ██║███████║███████╗
╚═════╝ ╚═╝  ╚═╝╚══════╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝`;

const AsciiAnimation = () => {
  const [position, setPosition] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const lines = FULL_ASCII.trim().split('\n');
  const totalHeight = lines.length;

  useEffect(() => {
    setIsMounted(true);

    const timer = setInterval(() => {
      setPosition(prev => (prev + 1) % (totalHeight + 1));
    }, 300);
    
    return () => clearInterval(timer);
  }, [totalHeight]);

  if (!isMounted) {
    return <div className="h-[192px]" />;
  }

  return (
    <div className="h-[192px]">
      <pre className="font-mono text-center whitespace-pre text-emerald-500 p-4">
        {lines.slice(0, position).join('\n')}
        {'\n'.repeat(Math.max(0, totalHeight - position))}
      </pre>
    </div>
  );
};

export default AsciiAnimation;
