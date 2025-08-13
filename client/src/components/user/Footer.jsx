import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white px-6 py-10 mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <h2 className="text-lg font-semibold mb-2 text-gray-800">
            Rento Wheels
          </h2>
          <p className="text-gray-800">
            Drive your dream vehicle, anytime, anywhere. Trusted rental services
            since 2024.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            Quick Links
          </h3>
          <ul className="space-y-2 text-gray-300">
            {["Home", "Vehicles", "Details", "About Us", "Contact Us"].map(
              (link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="hover:text-blue-500 cursor-pointer text-gray-800"
                  >
                    {link}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-800">Contact</h3>
          <div className="flex items-center gap-2 text-gray-800">
            <Phone className="w-4 h-4" />
            <span>+91 80865 87076</span>
          </div>
          <div className="flex items-center gap-2 text-gray-800 mt-2">
            <Mail className="w-4 h-4" />
            <span>support@rentowheels.com</span>
          </div>
          <div className="flex items-center gap-2 text-gray-800 mt-2">
            <MapPin className="w-4 h-4" />
            <span>Malappuram, Kerala, India</span>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-sm text-gray-800">
        © {new Date().getFullYear()} Rento Wheels. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
