import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaPlus, FaList, FaBox, FaChartBar, FaUsers, FaHome, FaCogs, FaClipboard, FaNewspaper, FaRegClock, FaClipboardList, FaYoutube, FaQuestionCircle } from 'react-icons/fa'; // Import icons

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className='w-[18%] min-h-screen border-r-2 bg-white shadow-md'>
      <div className='flex flex-col gap-6 pt-6 pl-6 text-[15px]'>
        {/* Add Items */}
        <NavLink className='flex items-center gap-3 px-4 py-2 transition border border-gray-400 rounded-md hover:bg-gray-100' to="/add">
          <FaPlus className='w-5 h-5' />
          <p className='hidden md:block'>Add items</p>
        </NavLink>

        {/* List Items */}
        <NavLink className='flex items-center gap-3 px-4 py-2 transition border border-gray-400 rounded-md hover:bg-gray-100' to="/list">
          <FaList className='w-5 h-5' />
          <p className='hidden md:block'>List items</p>
        </NavLink>

        {/* Orders */}
        <NavLink className='flex items-center gap-3 px-4 py-2 transition border border-gray-400 rounded-md hover:bg-gray-100' to="/orders">
          <FaBox className='w-5 h-5' />
          <p className='hidden md:block'>Orders</p>
        </NavLink>

        {/* Analytics */}
        <NavLink className='flex items-center gap-3 px-4 py-2 transition border border-gray-400 rounded-md hover:bg-gray-100' to="/orderAnalytics">
          <FaChartBar className='w-5 h-5' />
          <p className='hidden md:block'>Analytics</p>
        </NavLink>

        {/* Users */}
        <NavLink className='flex items-center gap-3 px-4 py-2 transition border border-gray-400 rounded-md hover:bg-gray-100' to="/users">
          <FaUsers className='w-5 h-5' />
          <p className='hidden md:block'>Users</p>
        </NavLink>

        {/* Edit Content Dropdown */}
        <div className="relative">
          <button 
            className="flex items-center gap-3 px-4 py-2 transition border border-gray-400 rounded-md hover:bg-gray-100"
            onClick={toggleDropdown}
          >
            <FaCogs className='w-5 h-5' />
            <p className='hidden md:block'>Edit Content</p>
          </button>

          {isDropdownOpen && (
            <div className="absolute left-0 z-10 w-full mt-2 overflow-y-auto bg-white border border-gray-300 rounded-md shadow-md max-h-96">
              {/* Homepage Link */}
              <NavLink
                className='flex items-center gap-3 px-4 py-2 transition border-b border-gray-200 hover:bg-gray-100'
                to="/homepage"
              >
                <FaHome className='w-5 h-5' />
                <p className='hidden md:block'>Home Page</p>
              </NavLink>

              {/* Hero Link */}
              <NavLink
                className='flex items-center gap-3 px-4 py-2 transition border-b border-gray-200 hover:bg-gray-100'
                to="/hero"
              >
                <FaHome className='w-5 h-5' />
                <p className='hidden md:block'>Hero</p>
              </NavLink>

              {/* VoucherAmount Link */}
              <NavLink
                className='flex items-center gap-3 px-4 py-2 transition border-b border-gray-200 hover:bg-gray-100'
                to="/voucheramount"
              >
                <FaHome className='w-5 h-5' />
                <p className='hidden md:block'>Voucher Amount</p>
              </NavLink>

              {/* BestSeller Link */}
              <NavLink
                className='flex items-center gap-3 px-4 py-2 transition border-b border-gray-200 hover:bg-gray-100'
                to="/bestseller"
              >
                <FaHome className='w-5 h-5' />
                <p className='hidden md:block'>Best Seller Display</p>
              </NavLink>

              {/* Latest Product Link */}
              <NavLink
                className='flex items-center gap-3 px-4 py-2 transition border-b border-gray-200 hover:bg-gray-100'
                to="/latestproduct"
              >
                <FaHome className='w-5 h-5' />
                <p className='hidden md:block'>Latest Product Display</p>
              </NavLink>

              {/* Blog Link */}
              <NavLink
                className='flex items-center gap-3 px-4 py-2 transition border-b border-gray-200 hover:bg-gray-100'
                to="/addIntro"
              >
                <FaNewspaper className='w-5 h-5' />
                <p className='hidden md:block'>Blog</p>
              </NavLink>

              {/* Blog Link */}
              <NavLink
                className='flex items-center gap-3 px-4 py-2 transition border-b border-gray-200 hover:bg-gray-100'
                to="/map"
              >
                <FaNewspaper className='w-5 h-5' />
                <p className='hidden md:block'>Map</p>
              </NavLink>

              {/* Category Link */}
              <NavLink
                className='flex items-center gap-3 px-4 py-2 transition border-b border-gray-200 hover:bg-gray-100'
                to="/category"
              >
                <FaClipboard className='w-5 h-5' />
                <p className='hidden md:block'>Category</p>
              </NavLink>

              {/* Region Link */}
              <NavLink
                className='flex items-center gap-3 px-4 py-2 transition border-b border-gray-200 hover:bg-gray-100'
                to="/region"
              >
                <FaClipboardList className='w-5 h-5' />
                <p className='hidden md:block'>Region Fee</p>
              </NavLink>

              {/* Portfolio Link */}
              <NavLink
                className='flex items-center gap-3 px-4 py-2 transition border-b border-gray-200 hover:bg-gray-100'
                to="/addCard"
              >
                <FaNewspaper className='w-5 h-5' />
                <p className='hidden md:block'>Portfolio</p>
              </NavLink>

              {/* Logo Link */}
              <NavLink
                className='flex items-center gap-3 px-4 py-2 transition border-b border-gray-200 hover:bg-gray-100'
                to="/logo"
              >
                <FaClipboardList className='w-5 h-5' />
                <p className='hidden md:block'>Logo</p>
              </NavLink>

              {/* Member Link */}
              <NavLink
                className='flex items-center gap-3 px-4 py-2 transition border-b border-gray-200 hover:bg-gray-100'
                to="/addMemberCard"
              >
                <FaUsers className='w-5 h-5' />
                <p className='hidden md:block'>Member</p>
              </NavLink>

              {/* Policy Link */}
              <NavLink
                className='flex items-center gap-3 px-4 py-2 transition border-b border-gray-200 hover:bg-gray-100'
                to="/policy"
              >
                <FaClipboard className='w-5 h-5' />
                <p className='hidden md:block'>Policy</p>
              </NavLink>

              {/* weight Link */}
              <NavLink
                className='flex items-center gap-3 px-4 py-2 transition border-b border-gray-200 hover:bg-gray-100'
                to="/weight"
              >
                <FaClipboard className='w-5 h-5' />
                <p className='hidden md:block'>Fee per Kilo</p>
              </NavLink>

              {/* Deals Link */}
              <NavLink
                className='flex items-center gap-3 px-4 py-2 transition border-b border-gray-200 hover:bg-gray-100'
                to="/deals"
              >
                <FaClipboard className='w-5 h-5' />
                <p className='hidden md:block'>Deals</p>
              </NavLink>

              {/* About Link */}
              <NavLink
                className='flex items-center gap-3 px-4 py-2 transition border-b border-gray-200 hover:bg-gray-100'
                to="/about"
              >
                <FaHome className='w-5 h-5' />
                <p className='hidden md:block'>About</p>
              </NavLink>

              {/* Contact Link */}
              <NavLink
                className='flex items-center gap-3 px-4 py-2 transition border-b border-gray-200 hover:bg-gray-100'
                to="/contact"
              >
                <FaHome className='w-5 h-5' />
                <p className='hidden md:block'>Contact</p>
              </NavLink>

              {/* Footer Link */}
              <NavLink
                className='flex items-center gap-3 px-4 py-2 transition border-b border-gray-200 hover:bg-gray-100'
                to="/footer"
              >
                <FaClipboardList className='w-5 h-5' />
                <p className='hidden md:block'>Footer</p>
              </NavLink>

              {/* Event Calendar Link */}
              <NavLink
                className='flex items-center gap-3 px-4 py-2 transition border-b border-gray-200 hover:bg-gray-100'
                to="/eventCalendar"
              >
                <FaRegClock className='w-5 h-5' />
                <p className='hidden md:block'>Event Calendar</p>
              </NavLink>

              {/* Job Editor Link */}
              <NavLink
                className='flex items-center gap-3 px-4 py-2 transition border-b border-gray-200 hover:bg-gray-100'
                to="/job"
              >
                <FaClipboardList className='w-5 h-5' />
                <p className='hidden md:block'>Job Editor</p>
              </NavLink>

              {/* YouTube Link */}
              <NavLink
                className='flex items-center gap-3 px-4 py-2 transition border-b border-gray-200 hover:bg-gray-100'
                to="/youtubeUrl"
              >
                <FaYoutube className='w-5 h-5' />
                <p className='hidden md:block'>YouTube</p>
              </NavLink>

              {/* Admin Discount Link */}
              <NavLink
                className='flex items-center gap-3 px-4 py-2 transition border-b border-gray-200 hover:bg-gray-100'
                to="/adminDiscount"
              >
                <FaClipboardList className='w-5 h-5' />
                <p className='hidden md:block'>New Subscriber Discount</p>
              </NavLink>

              {/* FAQ Link */}
              <NavLink
                className='flex items-center gap-3 px-4 py-2 transition border-b border-gray-200 hover:bg-gray-100'
                to="/faq"
              >
                <FaQuestionCircle className='w-5 h-5' />
                <p className='hidden md:block'>FAQ</p>
              </NavLink>
              
              {/* Review Link */}
              <NavLink
                className='flex items-center gap-3 px-4 py-2 transition border-b border-gray-200 hover:bg-gray-100'
                to="/review"
              >
                <FaQuestionCircle className='w-5 h-5' />
                <p className='hidden md:block'>Review</p>
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
