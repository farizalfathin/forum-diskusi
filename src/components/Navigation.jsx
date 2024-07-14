import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { RiAddLargeLine, RiChatQuoteFill } from 'react-icons/ri';
import PropTypes from 'prop-types';
import { FaUserCircle, FaUsers } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken } from '../utils/api';
import { Authenticated, NotAuthenticated } from './Profile';
import { logoutOwnUser, setStatusDefault } from '../toolkit/authUser/slices';

function Navigation() {
  const location = useLocation();
  const accessToken = getAccessToken();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(location.pathname);

  const clickLink = (to) => {
    if (to === '/newThread' && !accessToken) {
      alert('Anda harus login terlebih dahulu');
      return;
    }

    setSelected(to);
    navigate(to);
  };

  return (
    <nav className="hidden min-h-screen bg-primary-500 p-4 md:flex flex-col items-center gap-2 w-fit relative">
      <svg className="mb-2" xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 32 32">
        <path fill="white" d="M28 17H18a2.002 2.002 0 0 0-2 2v6a2.002 2.002 0 0 0 2 2h4v-2h-4v-6h10v6h-2.535l-2.594 3.89L24.535 30l2-3H28a2.002 2.002 0 0 0 2-2v-6a2.002 2.002 0 0 0-2-2zM8.667 24.109l.861-.862a.833.833 0 0 1 .899-.184l1.05.42a.833.833 0 0 1 .523.773v1.908a.833.833 0 0 1-.879.834c-7.354-.457-8.84-6.686-9.115-9.072A.832.832 0 0 1 2.834 17h1.874a.834.834 0 0 1 .774.524l.42 1.05a.833.833 0 0 1-.184.898l-.862.861a4.527 4.527 0 0 0 3.81 3.776zM21 9h7v2h-7zm0-4h9v2h-9zm-4 1l-3 2.2V6a2.002 2.002 0 0 0-2-2H4a2.002 2.002 0 0 0-2 2v6a2.002 2.002 0 0 0 2 2h8a2.002 2.002 0 0 0 2-2V9.8l3 2.2zM4 12V6h8v6z" />
      </svg>
      <NavItem selected={selected === '/'} id="/" setSelected={clickLink}>
        <RiChatQuoteFill />
      </NavItem>
      <NavItem selected={selected === '/leaderboards'} id="/leaderboards" setSelected={clickLink}>
        <FaUsers />
      </NavItem>
      <NavItem selected={selected === '/newThread'} id="/newThread" setSelected={clickLink}>
        <RiAddLargeLine />
      </NavItem>
      <StaggeredDropDown />
    </nav>
  );
}

function NavItem({
  children, selected, id, setSelected, className,
}) {
  return (
    <motion.button
      className={`p-3 text-xl bg-secondary-800 hover:bg-secondary-700 rounded-md transition-colors relative ${className}`}
      onClick={() => setSelected(id)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="block relative z-10 text-white">{children}</span>
      <AnimatePresence>
        {selected && (
          <motion.span
            className="absolute inset-0 rounded-md bg-primary-800 z-0"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}

const wrapperVariants = {
  open: {
    scaleX: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleX: 0,
    transition: {
      when: 'afterChildren',
      staggerChildren: 0.1,
    },
  },
};

function StaggeredDropDown() {
  const { data, status } = useSelector((state) => state.authUser);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(setStatusDefault());
    dispatch(logoutOwnUser());
  };

  return (
    <div className="mt-auto lg:hidden">
      <motion.div animate={open ? 'open' : 'closed'} className="relative">
        <motion.button
          className="p-3 text-xl bg-secondary-800 hover:bg-secondary-700 rounded-md transition-colors relative"
          onClick={() => setOpen((pv) => !pv)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="block relative z-10 text-white"><FaUserCircle /></span>
          <AnimatePresence>
            {open && (
              <motion.span
                className="absolute inset-0 rounded-md bg-primary-800 z-0"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              />
            )}
          </AnimatePresence>
        </motion.button>

        <motion.div
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originX: 'left', translateX: '10px', translateY: '-164px' }}
          className="flex justify-center items-center bg-white rounded-md h-52 w-64 shadow-xl absolute top-0 left-full overflow-hidden"
        >
          { status === 'Loading' ? (
            <p>Loading...</p>
          ) : status === 'idle' || status === 'Failed' ? (
            <NotAuthenticated />
          ) : (
            <Authenticated
              avatar={data.avatar}
              name={data.name}
              email={data.email}
              onLogout={onLogout}
            />
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Navigation;

NavItem.propTypes = {
  children: PropTypes.node.isRequired,
  selected: PropTypes.bool,
  id: PropTypes.string,
  setSelected: PropTypes.func,
  className: PropTypes.string,
};
