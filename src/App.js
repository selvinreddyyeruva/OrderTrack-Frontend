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

  const deliveryList = [
    { name: 'Ankit Sharma', address: '123 Canal Street, New Orleans, LA' },
    { name: 'Priya Mehra', address: '456 Bourbon St, New Orleans, LA' },
    { name: 'Ravi Kumar', address: '789 Decatur St, New Orleans, LA' },
    { name: 'Neha Reddy', address: '1010 Frenchmen St, New Orleans, LA' },
  ];

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
      legend: { position: 'top' },
      title: { display: true, text: 'Order Trends This Week' },
    },
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
          <h1>Welcome Rohith Selvin Reddy Yeruva !!!</h1>
          <div className="metrics">
            <div className="card total">Total Orders: 125</div>
            <div className="card in-transit">In Transit: 58</div>
            <div className="card delivered">Delivered: 63</div>
            <div className="card issues">Issues: 4</div>
          </div>

          <div className="chart">
            <Line data={chartData} options={chartOptions} />
          </div>

          <div className="delivery-section">
            <h2>📦 Delivery Recipients - New Orleans</h2>
            <ul>
              {deliveryList.map((person, index) => (
                <li key={index}>
                  <a href={`https://www.google.com/maps/search/${encodeURIComponent(person.address)}`} target="_blank" rel="noreferrer">
                    {person.name} – {person.address}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="dashboard-images">
            <img src="https://cdn-icons-png.flaticon.com/512/891/891419.png" alt="parcel" />
            <img src="https://cdn-icons-png.flaticon.com/512/2674/2674940.png" alt="map" />
            <img src="https://cdn-icons-png.flaticon.com/512/1046/1046857.png" alt="delivery truck" />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
