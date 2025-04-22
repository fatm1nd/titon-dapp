import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TonConnectButton } from '@tonconnect/ui-react';

import './Landing.css';

const Landing = () => {
  const [eventAddress, setEventAddress] = useState('');
  
  // Установка заголовка страницы
  useEffect(() => {
    document.title = "TiTON | Ticketing on TON";
  }, []);

  return (
    <div className="landing-container">
      <div className="hero-section">
        <h1 className="main-title">TiTON</h1>
        <p className="subtitle">Ticketing on The Open Network</p>
        <TonConnectButton className="connect-button" />
      </div>

      <nav className="nav-links">
        <Link to="/mytickets" className="nav-link">Мои билеты</Link>
        <Link to="/createEvent" className="nav-link">Создать мероприятие</Link>
      </nav>

      <div className="event-search">
        <input
          type="text"
          value={eventAddress}
          onChange={(e) => setEventAddress(e.target.value)}
          placeholder="Введите адрес ивента"
          className="address-input"
        />
        <Link 
          to={`/event?event_address=${eventAddress}`} 
          className={`search-button ${!eventAddress ? 'disabled' : ''}`}
        >
          Найти
        </Link>
      </div>

      <div className="about-section">
        <h2>О системе TiTON</h2>
        <p>
          Децентрализованная система продажи билетов на блокчейне TON. 
          Позволяет создавать мероприятия и продавать билеты в виде NFT.
        </p>
        
        <div className="tech-stack">
          <h3>Технологии:</h3>
          <ul>
            <li>Blockchain: TON (The Open Network)</li>
            <li>Frontend: React + Vite</li>
            <li>Smart Contracts: Tact</li>
            <li>Storage: SimpleMetaDataStorage</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Landing;