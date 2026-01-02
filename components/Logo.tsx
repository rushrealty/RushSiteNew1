
import React from 'react';

interface LogoProps {
  theme?: 'dark' | 'light';
}

const Logo: React.FC<LogoProps> = ({ theme = 'dark' }) => {
  const logoUrl = "https://drive.google.com/thumbnail?id=1-G3lIXiwOQupd4CxDwpekxbmZqfaTIlD&sz=w1000";
  const imgStyle: React.CSSProperties = theme === 'light' ? { filter: 'brightness(0) invert(1)' } : {};

  return (
    <div className="relative h-8 md:h-10 flex items-center justify-start min-w-[120px]">
      <img src={logoUrl} alt="Rush Home Team" className="h-full w-auto object-contain block" style={imgStyle} />
    </div>
  );
};

export default Logo;
