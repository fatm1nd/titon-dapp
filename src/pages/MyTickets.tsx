import { useState, useEffect } from 'react';
import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react';
import './TicketsPage.css';
import { HttpClient, Api } from 'tonapi-sdk-js';
import usePageTitle from '../hooks/usePageTitile';
// import { QrScanner } from '@yudiel/react-qr-scanner';
// import QRCode from 'qrcode.react';


const TicketsPage = () => {
  const wallet = useTonWallet();
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [loading, setLoading] = useState(false);
  usePageTitle('Мои билеты');


  const httpClient = new HttpClient({
      baseUrl: import.meta.env.VITE_TONAPI_BASE_URL,
      baseApiParams: {
          headers: {
              Authorization: `Bearer ${import.meta.env.VITE_TONAPI_TOKEN}`,
              'Content-type': 'application/json'
          }
      }
    });
  
  const taClient = new Api(httpClient);

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
    if (wallet?.account?.address) {
      fetchUserTickets(wallet.account.address);
    }
  }, [wallet]);

  const [showScanner, setShowScanner] = useState(false);
  const [signatureResult, setSignatureResult] = useState(null);
  const [newQrCode, setNewQrCode] = useState(null);

  const handlePunchTicket = async () => {
    setShowScanner(true);
  };

  const handleScanComplete = async (scannedData) => {
    if (scannedData) {
      try {
        const result = await tonConnectUi.signData({
          type: 'text',
          text: scannedData,
        });
        
        setSignatureResult(result);
        // Генерация нового QR кода с подписью
        const newQrData = JSON.stringify({
          signature: result.signature,
          publicKey: result.publicKey,
          ticketAddress: selectedTicket.address
        });
        setNewQrCode(newQrData);
        setShowScanner(false);
      } catch (error) {
        console.error('Signing failed:', error);
        setShowScanner(false);
      }
    }
  };

  const fetchUserTickets = async (address) => {
    setLoading(true);
    try {
      // Запрос к tonapi для получения NFT пользователя
      let data = taClient.accounts.getAccountNftItems(address)
      // Фильтрация только билетов (с titon=true в метаданных)
      const nfts = (await data.catch()).nft_items
      console.log(nfts)
      const userTickets = nfts.filter(item => 
        item.metadata?.attributes?.titon_ticket === "True" ||
        item.metadata?.titon_ticket === "True"
      );
      console.log(userTickets)
      
      setTickets(userTickets);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const openTicketDetails = (ticket) => {
    setSelectedTicket(ticket);
  };

  const closeTicketDetails = () => {
    setSelectedTicket(null);
  };

  return (
    <div className="tickets-page">
      <div className="header">
        <h1>TiTON | My Tickets</h1>
      </div>

      <div className="wallet-connect">
        <TonConnectButton />
      </div>

      {loading ? (
        <div className="loading">Loading tickets...</div>
      ) : wallet ? (
        tickets.length > 0 ? (
          <div className="tickets-grid">
            {tickets.map((ticket) => (
              <div 
                key={ticket.address} 
                className="ticket-card"
                onClick={() => openTicketDetails(ticket)}
              >
                <img 
                  src={ticket.metadata?.image || ticket.previews?.[0]?.url} 
                  alt="Ticket" 
                  className="ticket-image"
                />
                <div className="ticket-info">
                  <h3>{ticket.metadata?.name || 'Event Ticket'}</h3>
                  <p>{ticket.metadata?.description || ''}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-tickets">You don't have any tickets yet</div>
        )
      ) : (
        <div className="connect-wallet">
          <p>Please connect your wallet to view tickets</p>
        </div>
      )}

      {selectedTicket && (
        <div className="ticket-modal">
          <div className="modal-content">
            <button className="close-modal" onClick={closeTicketDetails}>×</button>
            
            <div className="modal-image-container">
              <img 
                src={selectedTicket.metadata?.image || selectedTicket.previews?.[0]?.url} 
                alt="Ticket" 
              />
            </div>
            
            <div className="modal-details">
              <h2>{selectedTicket.metadata?.name || 'Event Ticket'}</h2>
              
              <div className="detail-row">
                <span className="detail-label">Event:</span>
                <span>{selectedTicket.metadata?.description || 'Unknown Event'}</span>
              </div>
              
              <div className="detail-row">
                <span className="detail-label">Date:</span>
                <span>{convertUnixToMoscowTime(selectedTicket.metadata?.event_start_date) || 'Not specified'}</span>
              </div>
              
              
              <div className="detail-row">
                <span className="detail-label">Event Page:</span>
                <a 
                  href={`${window.location.origin}/event?event_address=${selectedTicket.collection?.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="event-link"
                >
                  View Event Page
                </a>
              </div>

              <div className="detail-row">
                <span className="detail-label">Ticket ID:</span>
                <span className="ticket-id">{selectedTicket.address}</span>
              </div>
              
              <button 
                className="punch-button" 
                onClick={handlePunchTicket}
                disabled={!!signatureResult}
              >
                {signatureResult ? 'Ticket Punched' : 'Punch the Ticket'}
              </button>

              {showScanner && (
                <div className="scanner-overlay">
                  <div className="scanner-container">
                    <h3>Scan QR Code</h3>
                    {/* Здесь будет компонент сканера */}
                    {/* <QrScanner
                      onDecode={handleScanComplete}
                      onError={(error) => console.error(error)}
                      constraints={{ facingMode: 'environment' }}
                    /> */}
                    <button onClick={() => setShowScanner(false)}>Cancel</button>
                  </div>
                </div>
              )}

              {newQrCode && (
                <div className="qr-result">
                  <h4>Show this QR to validate:</h4>
                  <QRCode 
                    value={newQrCode}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                  <button onClick={() => setNewQrCode(null)}>Close</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketsPage;