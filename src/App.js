import React, { useState, useEffect } from 'react';
import './App.css';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const savedLogin = localStorage.getItem("isLoggedIn");
    if (savedLogin === "true") setIsLoggedIn(true);
  }, []);

  const handleLogin = () => {
    if (email === 'selvinreddyyeruva.7@gmail.com' && password === 'Selvinreddy.7') {
      localStorage.setItem("isLoggedIn", "true");
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
  };

  const orders = {
    all: Array.from({ length: 125 }, (_, i) => `Order #${i + 1}`),
    transit: Array.from({ length: 58 }, (_, i) => `Transit Order #${i + 1}`),
    delivered: Array.from({ length: 63 }, (_, i) => `Delivered Order #${i + 1}`),
    issues: Array.from({ length: 4 }, (_, i) => `Issue Order #${i + 1}`),
  };

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [{
      label: 'Orders',
      data: [12, 19, 8, 15, 23],
      backgroundColor: 'rgba(75, 192, 192, 0.3)',
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.3,
    }],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Order Trends This Week' },
    },
  };

  const renderOrderList = () => {
    const list = activeSection === 'all'
      ? orders.all
      : activeSection === 'transit'
      ? orders.transit
      : activeSection === 'delivered'
      ? orders.delivered
      : activeSection === 'issues'
      ? orders.issues
      : [];

    return (
      <div className="order-data">
        <h3>{activeSection && `${activeSection.charAt(0).toUpperCase() + activeSection.slice(1)} Orders`}</h3>
        <ul>
          {list.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        <div className="login">
          <h2>Login to OrderTrack</h2>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <>
          <div className="welcome-banner">
            <div className="welcome-text">
              <h1>Welcome, <span>Rohith Selvin Reddy Yeruva</span>!</h1>
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
            <img src="https://jungleworks.com/wp-content/uploads/2021/08/1.png" alt="Delivery Banner" />
          </div>

          <div className="dashboard-container">
            <div className="main-dashboard">
              <div className="metrics">
                <button className="card total" onClick={() => setActiveSection('all')}>Total Orders: 125</button>
                <button className="card in-transit" onClick={() => setActiveSection('transit')}>In Transit: 58</button>
                <button className="card delivered" onClick={() => setActiveSection('delivered')}>Delivered: 63</button>
                <button className="card issues" onClick={() => setActiveSection('issues')}>Issues: 4</button>
              </div>

              {activeSection && renderOrderList()}

              <div className="chart">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
