import { useEffect, useState } from 'react';
import { TonConnectButton, useTonConnectUI, useTonWallet  } from '@tonconnect/ui-react';
import {  toNano, Address, beginCell } from '@ton/core';
import './EventPage.css';

import { TonClient } from 'ton';

export const toncenter = new TonClient({
	endpoint: `${import.meta.env.VITE_TONCENTER_BASE_URL}`,
});



const EventPage = () => {
  const [eventAddress, setEventAddress] = useState('');
  const [metadata_url, setMetadataUrlAddress] = useState('');
  const wallet = useTonWallet();
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
 

  const [eventData, setEventData] = useState({
    title: 'Загрузка...',
    description: 'Загрузка...',
    date: '15 июня 2024',
    coverImage: '',
    avatar: '',
    socialLinks: {
    },
    minPrice: 1
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const address = queryParams.get('event_address');
    if (address) setEventAddress(address);
  }, []);

  function shortenAddress(address, start = 4, end = 4) {
    return `${address.slice(0, start)}...${address.slice(-end)}`;
  }

  const convertUnixToMoscowTime = (unixTimestamp) => {
    // Создаем объект Date из Unix времени (умножаем на 1000, так как JS использует миллисекунды)
    const date = new Date(unixTimestamp * 1000);
    
    // Добавляем 3 часа для московского времени (UTC+3)
    // date.setHours(date.getHours() + 3);
    
    // Форматируем дату в читаемый вид
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short'
    };
    
    return date.toLocaleString('ru-RU', options);
  };

  

  

  useEffect(() => {
    if (!eventAddress) return;
  
    const loadData = async () => {
    console.log("Address: " + eventAddress);
    console.log("Address inside TonCenter: " + eventAddress);
      let { stack } = await toncenter.callGetMethod(
        Address.parse(eventAddress), 
        'get_collection_data'
      );
    let nextItemIndex = stack.readBigNumber();
    let contentRoot = stack.readCell();
    let owner = stack.readAddress();

    // const event = await taClient.nft.getNftCollection(address_string);

    const cleanHex = contentRoot.toString().slice(4, -1);
  
    // Преобразуем hex в строку
    let result = '';
    for (let i = 0; i < cleanHex.length; i += 2) {
        const hexByte = cleanHex.substr(i, 2);
        result += String.fromCharCode(parseInt(hexByte, 16));
    }

    console.log(result);
    setMetadataUrlAddress(result);

    const eventResponse = await fetch(result, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      // body: JSON.stringify(eventMetadata)
    });
    const md = await eventResponse.json();

    // const md = fetchMetadata(metadata_url);
    console.log("Event metadata: ", md);


    setEventData({
      title: md.name,
      description: md.description,
      date: convertUnixToMoscowTime(md.event_start_date),
      // time: '19:00',
      // location: 'Москва, ул. Примерная, 42',
      coverImage: md.cover_image,
      avatar: md.image,
      socialLinks: md.social_links,
      minPrice: Number(md.price) / 1000000000
    })

    // let testObject = Event.fromAddress(Address.parse(address_string)).getGetCollectionData(wallet);
    // console.log(testObject);

    console.log('Event:', event);
    };

    loadData();
  }, [eventAddress]);


  async function mintTheTicket(offeredPrice : string, eventAddress : string) {
    
    // wallet?.provider


    const mintBody = beginCell().storeUint(0, 32).storeStringTail("Mint").endCell();

    const transaction = {
      validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
      messages: [
        {
          address: eventAddress, // Замените на адрес вашего контракта
          amount: toNano(offeredPrice).toString(), // 0.05 TON
          payload: mintBody.toBoc().toString('base64')
        }
      ]
    };

    const result = await tonConnectUI.sendTransaction(transaction);
    console.log('Transaction sent:', result);
    alert('Transaction sent successfully!');
  }


  const TicketPurchase = () => {
    const [price, setPrice] = useState(eventData.minPrice);
    

    const handlePriceChange = (e) => {
      const value = parseFloat(e.target.value);
      if (!isNaN(value) && value >= eventData.minPrice) setPrice(value);
    };
  
    const handleBuyTicket = () => {
      if (wallet) {
        // alert(`Покупка билета за ${price} TON. Адрес коллекции: ${eventAddress}`);
        setIsProcessing(true);
        setShowTicketModal(true);
        console.log("Here")
        mintTheTicket(price.toString(), eventAddress);
        setIsProcessing(false);
      } else {
        alert('Пожалуйста, подключите кошелек TON');
      }
    };
  
    return (
        <div className="ticket-purchase">
        <h2>Купить билет</h2>
        
        <div className="wallet-connect">
          <TonConnectButton />
        </div>

        {wallet && (
          <div className="purchase-form">
            {eventAddress && (
              <div className="address-short">
                <span>{shortenAddress(eventAddress)}</span>
                <button 
                  onClick={() => navigator.clipboard.writeText(eventAddress)}
                  className="copy-button"
                >
                  ⎘
                </button>
              </div>
            )}
            
            <div className="price-input-container">
              <label htmlFor="price-input">Сумма (TON):</label>
              <input 
                id="price-input"
                type="number" 
                value={price} 
                onChange={handlePriceChange} 
                min={eventData.minPrice}
                step="0.01"
                className="price-input"
              />
            </div>
            
            <button onClick={handleBuyTicket} className="buy-button">
              Купить за {price} TON
            </button>
            
            {eventAddress && (
              <p className="event-address full-address">
                Адрес коллекции: {eventAddress}
              </p>
            )}

            {/* Модальное окно после покупки */}
            {showTicketModal && (
              <div className="modal-overlay">
                <div className="modal-content">
                  <h3>{isProcessing ? 'Processing Your Purchase' : 'Ticket Purchased!'}</h3>
                  
                  {isProcessing ? (
                    <div className="processing-status">
                      <div className="spinner"></div>
                      <p>Completing blockchain transaction...</p>
                      <p className="notice">This may take a few minutes</p>
                    </div>
                  ) : (
                    <>
                      <div className="success-icon">✓</div>
                      <p>Your ticket will be available soon at:</p>
                      <a 
                        href="/myTickets" 
                        className="tickets-link"
                      >
                        {window.location.origin}/myTickets
                      </a>
                      
                      <div className="important-notice">
                        <h4>Important:</h4>
                        <ul>
                          <li>Blockchain transaction may take 5 minutes to complete</li>
                          <li>You can check your tickets at any time in <strong>My Tickets</strong> section</li>
                          <li>For event entry, you can either:
                            <ul>
                              <li>Show the ticket from <strong>My Tickets</strong> page</li>
                              <li>Or prove NFT ownership directly from your wallet</li>
                            </ul>
                          </li>
                        </ul>
                      </div>

                      <div className="modal-actions">
                        <button 
                          onClick={() => window.location.href = '/mytickets'}
                          className="primary-button"
                        >
                          Go to My Tickets
                        </button>
                        <button 
                          onClick={() => setShowTicketModal(false)}
                          className="secondary-button"
                        >
                          Close
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}

          </div>
        )}
      </div>
    );
  };


  // loadEventMetadata(eventAddress);
  
  return (
    <div className="event-page-container">
      {/* Обложка и аватар в одном контейнере */}
      <div className="cover-avatar-wrapper">
        <div className="cover-image-container">
          <img src={eventData.coverImage} alt="Обложка мероприятия" className="cover-image" />
        </div>
        
        <div className="avatar-container">
          <img src={eventData.avatar} alt="Аватар мероприятия" className="event-avatar" />
        </div>
      </div>
      
      <div className="event-info">
        <h1>{eventData.title}</h1>
        <div className="event-details">
          <p><strong>Дата:</strong> {eventData.date}</p>
        </div>
      </div>
      
      <div className="event-description">
        <h2>О мероприятии</h2>
        <p>{eventData.description}</p>
      </div>
      
      <div className="social-links">
      <h2>Ссылки:</h2>
      <div className="links-container">
        {Object.values(eventData.socialLinks).map((url) => {
          const label = extractUrlLabel(url);
          return (
            <a 
              key={url} 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-link"
              title={url} // Добавляем полный URL в title
            >
              {label}
            </a>
          );
        })}
      </div>
    </div>
      
      <TicketPurchase />
    </div>
  );
};

function extractUrlLabel(url : string) {
  try {
    // Удаляем протокол и www.
    let cleaned = url.replace(/^(https?:\/\/)?(www\.)?/, '');
    // Берем часть до первого слеша или конца строки
    return cleaned.split('/')[0];
  } catch {
    return 'link';
  }
}

export default EventPage;