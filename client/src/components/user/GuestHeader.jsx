// import React, { useState } from "react";
// import { Menu, X } from "lucide-react";
// import DarkMode from "../shared/DarkMode";

// const GuestHeader = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <div className="bg-white shadow-md px-6 py-4">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-800">Rento Wheels</h1>

//         <div className="md:hidden">
//           <button onClick={() => setMenuOpen(!menuOpen)}>
//             {menuOpen ? (
//               <X size={24} className="text-black" />
//             ) : (
//               <Menu size={24} className="text-black" />
//             )}
//           </button>
//         </div>

//         <nav className="hidden md:flex gap-6 text-gray-800 font-medium">
//           <a className="hover:text-blue-500 cursor-pointer">Home</a>
//           <a className="hover:text-blue-500 cursor-pointer">Vehicles</a>
//           <a className="hover:text-blue-500 cursor-pointer">Details</a>
//           <a className="hover:text-blue-500 cursor-pointer">About Us</a>
//           <a className="hover:text-blue-500 cursor-pointer">Contact Us</a>
//         </nav>

//         <div className="hidden md:flex items-center gap-4">
//           <DarkMode />
//           <a className="text-gray-800 text-sm font-medium hover:underline cursor-pointer">
//             Need Help?
//           </a>
//           <button
//             className="text-white text-sm px-4 py-1 rounded hover:bg-blue-700 transition"
//             style={{ background: "#5937E0" }}
//           >
//             Login
//           </button>
//         </div>
//       </div>

//       {menuOpen && (
//         <div className="md:hidden mt-4 space-y-2">
//           <a className="block text-gray-700 hover:text-blue-500">Home</a>
//           <a className="block text-gray-700 hover:text-blue-500">Vehicles</a>
//           <a className="block text-gray-700 hover:text-blue-500">Details</a>
//           <a className="block text-gray-700 hover:text-blue-500">About Us</a>
//           <a className="block text-gray-700 hover:text-blue-500">Contact Us</a>
//           <a className="block text-gray-700 text-sm font-medium hover:underline">
//             Need Help?
//           </a>
//           <button
//             className="w-full text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
//             style={{ background: "#5937E0" }}
//           >
//             Login
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GuestHeader;

// import React, { useState } from "react";
// import { Menu, X } from "lucide-react";
// import DarkMode from "../shared/DarkMode";

// const GuestHeader = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <div className="bg-white shadow-md px-6 py-4">
//       <div className="flex justify-between items-center">
//         <h1 className="text-2xl font-bold text-gray-800">Rento Wheels</h1>

//         <div className="md:hidden">
//           <button onClick={() => setMenuOpen(!menuOpen)}>
//             {menuOpen ? (
//               <X size={24} className="text-black" />
//             ) : (
//               <Menu size={24} className="text-black" />
//             )}
//           </button>
//         </div>

//         <nav className="hidden md:flex gap-6 text-gray-800 font-medium">
//           <a className="hover:text-blue-500 cursor-pointer">Home</a>
//           <a className="hover:text-blue-500 cursor-pointer">Vehicles</a>
//           <a className="hover:text-blue-500 cursor-pointer">Details</a>
//           <a className="hover:text-blue-500 cursor-pointer">About Us</a>
//           <a className="hover:text-blue-500 cursor-pointer">Contact Us</a>
//         </nav>

//         <div className="hidden md:flex items-center gap-4">
//           <DarkMode />
//           <a className="text-gray-800 text-sm font-medium hover:underline cursor-pointer">
//             Need Help?
//           </a>
//           <button
//             className="text-white text-sm px-4 py-1 rounded hover:bg-blue-700 transition"
//             style={{ background: "#5937E0" }}
//           >
//             Login
//           </button>
//         </div>
//       </div>

//       {menuOpen && (
//         <div className="md:hidden mt-4 space-y-2">
//           <a className="block text-gray-700 hover:text-blue-500">Home</a>
//           <a className="block text-gray-700 hover:text-blue-500">Vehicles</a>
//           <a className="block text-gray-700 hover:text-blue-500">Details</a>
//           <a className="block text-gray-700 hover:text-blue-500">About Us</a>
//           <a className="block text-gray-700 hover:text-blue-500">Contact Us</a>
//           <div className="pt-2">
//             <DarkMode />
//           </div>
//           <a className="block text-gray-700 text-sm font-medium hover:underline">
//             Need Help?
//           </a>
//           <button
//             className="w-full text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
//             style={{ background: "#5937E0" }}
//           >
//             Login
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default GuestHeader;

import React, { useState } from "react";
import DarkMode from "../shared/DarkMode";

const GuestHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white shadow-md px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Rento Wheels</h1>

        <div className="md:hidden">
          <label className="btn btn-circle swap swap-rotate">
            <input
              type="checkbox"
              checked={menuOpen}
              onChange={() => setMenuOpen(!menuOpen)}
            />
            <svg
              className="swap-off fill-black"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
            <svg
              className="swap-on fill-black"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          </label>
        </div>

        <nav className="hidden md:flex gap-6 text-gray-800 font-medium">
          <a className="hover:text-blue-500 cursor-pointer">Home</a>
          <a className="hover:text-blue-500 cursor-pointer">Vehicles</a>
          <a className="hover:text-blue-500 cursor-pointer">Details</a>
          <a className="hover:text-blue-500 cursor-pointer">About Us</a>
          <a className="hover:text-blue-500 cursor-pointer">Contact Us</a>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <DarkMode />
          <a className="text-gray-800 text-sm font-medium hover:underline cursor-pointer">
            Need Help?
          </a>
          <button
            className="text-white text-sm px-4 py-1 rounded hover:bg-blue-700 transition"
            style={{ background: "#5937E0" }}
          >
            Login
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden mt-4 space-y-2">
          <a className="block text-gray-700 hover:text-blue-500">Home</a>
          <a className="block text-gray-700 hover:text-blue-500">Vehicles</a>
          <a className="block text-gray-700 hover:text-blue-500">Details</a>
          <a className="block text-gray-700 hover:text-blue-500">About Us</a>
          <a className="block text-gray-700 hover:text-blue-500">Contact Us</a>
          <div className="pt-2">
            <DarkMode />
          </div>
          <a className="block text-gray-700 text-sm font-medium hover:underline">
            Need Help?
          </a>
          <button
            className="w-full text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition"
            style={{ background: "#5937E0" }}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
};

export default GuestHeader;
