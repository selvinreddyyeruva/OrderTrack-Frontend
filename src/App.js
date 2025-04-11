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
  const [selectedOrder, setSelectedOrder] = useState(null);

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

  // Sample Order Details
  const getOrderDetail = (orderNum) => ({
    id: orderNum,
    recipient: `Customer ${orderNum}`,
    status: ['Processing', 'In Transit', 'Delivered', 'Issue'][orderNum % 4],
    eta: `${2 + (orderNum % 3)} days`,
    address: `10${orderNum} Main St, New Orleans, LA`
  });

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
          {list.map((item, index) => {
            const orderId = parseInt(item.match(/\d+/)[0], 10);
            return (
              <li key={index}>
                <button className="order-link" onClick={() => setSelectedOrder(getOrderDetail(orderId))}>
                  {item}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  const renderOrderDetails = () => {
    if (!selectedOrder) return null;

    return (
      <div className="order-detail">
        <h3>Order Details</h3>
        <p><strong>Order ID:</strong> {selectedOrder.id}</p>
        <p><strong>Recipient:</strong> {selectedOrder.recipient}</p>
        <p><strong>Status:</strong> {selectedOrder.status}</p>
        <p><strong>ETA:</strong> {selectedOrder.eta}</p>
        <p><strong>Address:</strong> {selectedOrder.address}</p>
      </div>
    );
  };

  const deliveryList = [
    { name: 'Ankit Sharma', address: '123 Canal Street, New Orleans, LA' },
    { name: 'Priya Mehra', address: '456 Bourbon St, New Orleans, LA' },
    { name: 'Ravi Kumar', address: '789 Decatur St, New Orleans, LA' },
    { name: 'Neha Reddy', address: '1010 Frenchmen St, New Orleans, LA' },
  ];

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
              {selectedOrder && renderOrderDetails()}

              <div className="chart">
                <Line data={chartData} options={chartOptions} />
              </div>
            </div>

            <div className="delivery-right-pane">
              <h2>📦 Delivery Recipients – New Orleans</h2>
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
          </div>
        </>
      )}
    </div>
  );
}

export default App;
