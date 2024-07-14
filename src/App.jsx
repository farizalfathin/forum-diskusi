import {
  Routes, Route, useLocation, useMatch,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React, { useEffect } from 'react';
import Navigation from './components/Navigation';
import PageNotFound from './pages/PageNotFound';
import HomePage from './pages/HomePage';
import { getOwnUserThunk } from './toolkit/authUser/thunks';
import LeaderboardsPage from './pages/LeaderboardsPage';
import LoginPage from './pages/LoginPage';
import { getAccessToken } from './utils/api';
import RegisterPage from './pages/RegisterPage';
import Profile from './components/Profile';
import DetailThreadPage from './pages/DetailThreadPage';
import './styles/globalCss.css';
import AddThreadPage from './pages/AddThreadPage';
import TopNav from './components/TopNav';

function App() {
  const accessToken = getAccessToken();
  const dispatch = useDispatch();
  const location = useLocation();
  const matchDetailThread = useMatch('/threads/:threadId');

  useEffect(() => {
    if (accessToken) {
      dispatch(getOwnUserThunk());
    }
  }, [accessToken]);

  const showNavigation = location.pathname === '/' || location.pathname === '/leaderboards' || matchDetailThread || location.pathname === '/newThread';

  return (
    <>
      <TopNav />
      <main className="flex lg:justify-between bg-secondary-100 md:max-h-screen gap-4">
        {showNavigation && <Navigation />}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/leaderboards" element={<LeaderboardsPage />} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/threads/:threadId" element={<DetailThreadPage />} />
          { (!accessToken || accessToken === '') && (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </>
          )}
          {accessToken && (
            <Route path="/newThread" element={<AddThreadPage />} />
          )}
        </Routes>
        {showNavigation && (
          <aside className="hidden me-4 max-w-64 w-full lg:block">
            <Profile />
          </aside>
        )}
      </main>
    </>
  );
}

export default App;
