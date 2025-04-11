import React, { useState } from 'react';
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

// Register chart.js modules
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === 'selvinreddyyeruva.7@gmail.com' && password === 'Selvinreddy.7') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    datasets: [
      {
        label: 'Orders',
        data: [12, 19, 8, 15, 23],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Order Trends This Week',
      },
    },
  };

  return (
    <div className="app">
      {!isLoggedIn ? (
        <div className="login">
          <h2>Login to OrderTrack</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <>
          <h1>OrderTrack Dashboard</h1>
          <div className="metrics">
            <div className="card total">Total Orders: 125</div>
            <div className="card in-transit">In Transit: 58</div>
            <div className="card delivered">Delivered: 63</div>
            <div className="card issues">Issues: 4</div>
          </div>
          <div className="chart">
            <Line data={chartData} options={chartOptions} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
