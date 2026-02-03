import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[var(--navbar-bg)] shadow-inner p-4 text-center mt-8" style={{ boxShadow: '0 -2px 8px 0 rgba(0,0,0,0.04)' }}>
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
        <span className="text-[var(--foreground)] opacity-70">© 2026 Financial Literacy Adventure</span>
        <span className="hidden md:inline-block text-[var(--foreground)] opacity-40">|</span>
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[var(--primary)] hover:underline">
          <svg width="20" height="20" fill="currentColor" className="inline-block"><path d="M10 .3a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 10 5.8c.85.004 1.71.11 2.51.32 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 10 .3"/></svg>
          GitHub
        </a>
      </div>
    </footer>
  );
};

export default Footer;
