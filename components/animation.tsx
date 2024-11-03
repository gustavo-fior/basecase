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
    return <div className="hidden md:block h-[225px]" />;
  }

  return (
    <div className="hidden md:block h-[225px] border border-dashed border-purple-600 flex justify-center mb-10">
      <pre className="font-mono text-center whitespace-pre text-purple-600 p-4 w-full pt-[45px]">
        {lines.slice(0, position).join('\n')}
        {'\n'.repeat(Math.max(0, totalHeight - position))}
      </pre>
    </div>
  );
};

export default AsciiAnimation;
