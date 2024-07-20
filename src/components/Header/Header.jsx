import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import HorizontalLoadingBar from '../HorizontalLoadingBar';
import { useState } from 'react';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const navItems = [
      {
          name: 'Home',
          slug: '/',
          active: true,
          isAnchor: false
      },
      {
          name: 'Login',
          slug: '/login',
          active: !authStatus,
          isAnchor: false
      },
      {
          name: 'Signup',
          slug: '/signup',
          active: !authStatus,
          isAnchor: false
      },
      {
          name: 'All Posts',
          slug: '/all-posts',
          active: authStatus,
          isAnchor: false
      },
      {
          name: 'Add Post',
          slug: '/add-post',
          active: authStatus,
          isAnchor: true // Mark "Add Post" as anchor
      },
  ];

  const handleNavigation = (slug) => {
      setLoading(true);
      setTimeout(() => {
          setLoading(false);
          navigate(slug);
      }, 1000);
  };

  return (
      <header className='py-3 shadow bg-zinc-900'>
        <Container>
          <nav className='flex items-center justify-between'>
            <div className='mr-4'>
              <a href='/' className='text-white text-2xl font-bold'>
                BlogVerce
              </a>
            </div>
            <ul className='flex gap-2 ml-auto'>
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name}>
                      {item.isAnchor ? (
                        <a
                          href={item.slug}
                          className='inline-block px-6 py-2 duration-200 bg-gray-700 hover:bg-blue-500 rounded-full text-white'
                        >
                          {item.name}
                        </a>
                      ) : (
                        <motion.button
                          onClick={() => handleNavigation(item.slug)}
                          className='inline-block px-6 py-2 duration-200 bg-gray-700 hover:bg-blue-500 rounded-full text-white'
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {item.name}
                        </motion.button>
                      )}
                    </li>
                  )
              )}
              {authStatus && (
                <li>
                  <LogoutBtn />
                </li>
              )}
            </ul>
          </nav>
        </Container>
        <hr className="w-full mt-2 border-slate-400" />
        {loading && <HorizontalLoadingBar />}
      </header>
  );
}

export default Header;
