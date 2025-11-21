import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="container mx-auto py-6 px-4 md:px-6 text-center text-gray-400 text-sm">
        <p>© {new Date().getFullYear()} Subham Kumar Sahu. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
