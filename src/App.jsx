import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './page/Home';
import User from './page/User';
import UserSite from './page/UserSite';
import ErrorPage from './page/ErrorPage';
import { useContext } from 'react';
import { ContextApi } from './context/contextapi';

function App() {
  const { name, site } = useContext(ContextApi);

  return (
    <div className='container mx-auto p-4 w-full h-full min-h-screen'>
      <Routes>
        <Route path='/' element={<Home />} />

        {/* Conditional route for User page based on name */}
        {name && (
          <Route path='/:name' element={<User />} />
        )}

        {/* Conditional route for UserSite page based on site */}
        {site && (
          <Route path='/site/:site' element={<UserSite />} />
        )}

        {/* Catch-all for any unmatched routes */}
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
