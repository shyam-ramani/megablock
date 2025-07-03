import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

function Footer() {
  return (
    <section className="relative overflow-hidden py-10 bg-blue-900 border-t-4 border-yellow-500 text-yellow-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap -mx-6">
          {/* Logo and Copyright */}
          <div className="w-full md:w-1/2 lg:w-4/12 px-6 mb-8 md:mb-0">
            <div className="flex items-center mb-4">
              <Logo width="100px" />
            </div>
            <p className="text-sm text-yellow-300">
              &copy; 2025 SHYAM-RAMANI. All rights reserved.
            </p>
          </div>

          {/* Company Links */}
          <div className="w-full sm:w-1/2 lg:w-2/12 px-6 mb-8 md:mb-0">
            <h3 className="text-lg font-bold text-yellow-400 mb-3">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-yellow-200 transition">Features</Link></li>
              <li><Link to="/" className="hover:text-yellow-200 transition">Pricing</Link></li>
              <li><Link to="/" className="hover:text-yellow-200 transition">About Us</Link></li>
              <li><Link to="/" className="hover:text-yellow-200 transition">Press</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="w-full sm:w-1/2 lg:w-2/12 px-6 mb-8 md:mb-0">
            <h3 className="text-lg font-bold text-yellow-400 mb-3">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-yellow-200 transition">Help Center</Link></li>
              <li><Link to="/" className="hover:text-yellow-200 transition">Contact Us</Link></li>
              <li><Link to="/" className="hover:text-yellow-200 transition">FAQ</Link></li>
              <li><Link to="/" className="hover:text-yellow-200 transition">Community</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="w-full sm:w-1/2 lg:w-2/12 px-6">
            <h3 className="text-lg font-bold text-yellow-400 mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-yellow-200 transition">Terms of Service</Link></li>
              <li><Link to="/" className="hover:text-yellow-200 transition">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-yellow-200 transition">Licenses</Link></li>
              <li><Link to="/" className="hover:text-yellow-200 transition">Security</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
