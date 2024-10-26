import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './store/authStore';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Favorites from './pages/Favorites';

function App() {
  const setUser = useAuthStore((state) => state.login);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      const { username } = JSON.parse(savedUser);
      setUser(username);
    }
  }, [setUser]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;