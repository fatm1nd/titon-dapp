import { useState, useRef } from 'react';
import { TonConnectButton, useTonWallet, useTonConnectUI } from '@tonconnect/ui-react';
import './CreateEvent.css';
import { toNano, Address, Builder } from '@ton/core';
import { storeCreateEvent, CreateEvent } from "../contracts/EventFactoryv2"
import usePageTitle from '../hooks/usePageTitile';


import { TonClient, TupleBuilder, Address as ad, Builder as bldr } from 'ton';
export const toncenter = new TonClient({
	endpoint: `${import.meta.env.VITE_TONCENTER_BASE_URL}`,
});

const CreateEventPage = () => {
  usePageTitle('Создание мероприятия');
  const wallet = useTonWallet();
  const [tonConnectUI, setOptions] = useTonConnectUI();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLink, setGeneratedLink] = useState('');
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: 'TiTON Test Collection',
    description: 'Magic Collection that proves that TiTON works',
    socialLinks: ['https://t.me/fnn_inc'],
    ticketPrice: 10, // В TON (1 TON = 10^9 нанотон)
    ticketsAmount: 100,
    unlimitedTickets: false,
    eventStart: '',
    eventEnd: '',
    saleStart: '',
    saleEnd: '',
    ticketGuard: '',
    ticketImageSameAsEvent: true,
    avatarUrl: '',
    ticketImageUrl: '',
    coverUrl : ''
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const getEventAddressFunction = async (txData) => {
    let eventAddress;
    const loadData = async () => {

    const ticketContentBuilder = new bldr();
    ticketContentBuilder.storeInt(0x01, 8) 
    ticketContentBuilder.storeStringTail(txData.ticket_content.toString())
    const ticketContentCell = ticketContentBuilder.endCell();

    const collectionContentBuilder = new bldr();
    collectionContentBuilder.storeInt(0x01, 8) 
    collectionContentBuilder.storeStringTail(txData.event_content.toString())
    const collectionContentCell = collectionContentBuilder.endCell();

    const cellBuilder = new TupleBuilder();
    cellBuilder.writeAddress(ad.parse(txData.ownerAddress));
    cellBuilder.writeCell(collectionContentCell);
    cellBuilder.writeCell(ticketContentCell);
    cellBuilder.writeNumber(Number(txData.ticketPrice));
    cellBuilder.writeAddress(ad.parse(txData.ticketGuard));
    cellBuilder.writeNumber(txData.ticketsAmount);
    cellBuilder.writeNumber(txData.sale_start_date);
    cellBuilder.writeNumber(txData.sale_end_date);
    cellBuilder.writeNumber(txData.event_start_date);
    cellBuilder.writeNumber(txData.event_end_date);  

    console.log(`${import.meta.env.VITE_EVENTFACTORY_ADDRESS}`)

    console.log(txData);
      let { stack } = await toncenter.runMethod(
        ad.parse(`${import.meta.env.VITE_EVENTFACTORY_ADDRESS}`), 
        'get_event_address',
        cellBuilder.build()
      );
      eventAddress = stack.readAddress();
      console.log(eventAddress);
      console.log(eventAddress.toString());
      setGeneratedLink(`${import.meta.env.VITE_BASE_URL}/event?event_address=${eventAddress.toString()}`);
      // return eventAddress;
    }
    loadData();
  };

  const handleSocialLinkChange = (index, value) => {
    const newLinks = [...formData.socialLinks];
    newLinks[index] = value;
    setFormData(prev => ({ ...prev, socialLinks: newLinks }));
  };

  const addSocialLink = () => {
    setFormData(prev => ({ ...prev, socialLinks: [...prev.socialLinks, ''] }));
  };

  const removeSocialLink = (index) => {
    const newLinks = formData.socialLinks.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, socialLinks: newLinks }));
  };

  const [uploadStatus, setUploadStatus] = useState({
    avatar: { loading: false, error: null },
    cover: { loading: false, error: null },
    ticket: { loading: false, error: null }
  });

  const avatarRef = useRef('');
  const coverRef = useRef('');
  const ticketRef = useRef('');

  // Функция для загрузки одного изображения
  const uploadImage = async (file, type) => {
    if (!file) return null;
    
    setUploadStatus(prev => ({ ...prev, [type]: { loading: true, error: null } }));
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(`${import.meta.env.VITE_SIMPLEMETADATA_BASE_URL}/store_image`, {
        method: 'POST',
        // headers: { 'Content-Type': 'multipart/form-data' },
        body: formData
      });

      if (!response.ok) throw new Error('Upload failed');
      
      const url = await response.json();
      
      setUploadStatus(prev => ({ ...prev, [type]: { loading: false, error: null } }));
      console.log(`${import.meta.env.VITE_SIMPLEMETADATA_BASE_URL}/get_image/${url.key}`)
      return `${import.meta.env.VITE_SIMPLEMETADATA_BASE_URL}/get_image/${url.key}`;
      
    } catch (error) {
      setUploadStatus(prev => ({ ...prev, [type]: { loading: false, error: error.message } }));
      return null;
    }
  };

  // Обработчик для каждого изображения
  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = await uploadImage(file, type);
    if (url) {
      setFormData(prev => ({
        ...prev,
        [`${type}Url`]: url,
        // Если это аватар и выбрано использование для билетов
        ...(type === 'avatar' && prev.ticketImageSameAsEvent ? { ticketImageUrl: url } : {})
      }));
    }
  };

  // Отправка всей формы
  const handleGenerate = async () => {
    if (!wallet) {
      alert('Please connect your wallet first');
      return;
    }

    setIsGenerating(true);
    setShowModal(true);

    // Текущее время в Unix timestamp
    const now = Math.floor(Date.now() / 1000);
    
    // Конвертируем даты мероприятия
    const eventStart = formData.eventStart 
      ? Math.floor(new Date(formData.eventStart).getTime() / 1000)
      : now;
      
    const eventEnd = formData.eventEnd 
      ? Math.floor(new Date(formData.eventEnd).getTime() / 1000)
      : eventStart + 86400; // +1 день если не указано

    // Автоподстановка дат продаж:
    // - Если не указано начало продаж = текущее время
    // - Если не указано окончание продаж = окончание мероприятия
    const saleStart = formData.saleStart 
      ? Math.floor(new Date(formData.saleStart).getTime() / 1000)
      : now;
      
    const saleEnd = formData.saleEnd 
      ? Math.floor(new Date(formData.saleEnd).getTime() / 1000)
      : eventEnd;

    // Формируем метаданные для мероприятия
    const eventMetadata = {
      name: formData.title,
      description: formData.description,
      image: formData.avatarUrl,
      cover_image: formData.coverUrl,
      social_links: formData.socialLinks.filter(link => link.trim() !== ''),
      price: (formData.ticketPrice * 10**9).toString(), // Конвертируем в нанотоны
      event_start_date: eventStart,
      event_end_date: eventEnd,
      sale_start_date: saleStart,
      sale_end_date: saleEnd
    };

    // Формируем метаданные для билета
    const ticketMetadata = {
      name: `${formData.title}`,
      description: `${formData.title}`,
      image: formData.ticketImageUrl,
      titon_ticket: "True",
      event_start_date: eventStart,
      event_end_date: eventEnd,
      sale_start_date: saleStart,
      sale_end_date: saleEnd,
      attributes: [
        {
          trait_type: "Event",
          value: formData.title
        },
        {
          trait_type: "Price in TON",
          value: `${formData.ticketPrice}`
        }
      ]
    };

    try {
      // 1. Сохраняем метаданные мероприятия
      const eventResponse = await fetch(`${import.meta.env.VITE_SIMPLEMETADATA_BASE_URL}/store_metadata`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventMetadata)
      });
      const eventUUID = await eventResponse.json();
      const eventUri = `${import.meta.env.VITE_SIMPLEMETADATA_BASE_URL}/get_metadata/${eventUUID.key}`;
      // 2. Сохраняем метаданные билета
      const ticketResponse = await fetch(`${import.meta.env.VITE_SIMPLEMETADATA_BASE_URL}/store_metadata`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticketMetadata)
      });
      const ticketUUID = await ticketResponse.json();
      const ticketUri = `${import.meta.env.VITE_SIMPLEMETADATA_BASE_URL}/get_metadata/${ticketUUID.key}`;
      // 3. Отправляем транзакцию в блокчейн
      const txData = {
        event_content: eventUri,
        ticket_content : ticketUri,
        ownerAddress: wallet.account.address,
        ticketPrice: (formData.ticketPrice * 10**9).toString(),
        ticketGuard: formData.ticketGuard,
        ticketsAmount: formData.unlimitedTickets ? -1 : formData.ticketsAmount,
        event_start_date: eventStart,
        event_end_date: eventEnd,
        sale_start_date: saleStart,
        sale_end_date: saleEnd
      };
      
      // await sendBlockchainTransaction(txData);
      console.log(txData);
      sendBlockchainTransaction(txData);

    } catch (error) {
      console.error('Error:', error);
      alert('Creation failed: ' + error.message);
    }
  };

  const sendBlockchainTransaction = async (txData) => {
    // Здесь будет логика взаимодействия с блокчейном
    console.log('Sending transaction for event:', txData);
   const ticketContentBuilder = new Builder();
         ticketContentBuilder.storeInt(0x01, 8) 
         ticketContentBuilder.storeStringTail(txData.ticket_content.toString())
         const ticketContentCell = ticketContentBuilder.endCell();
     
         const collectionContentBuilder = new Builder();
         collectionContentBuilder.storeInt(0x01, 8) 
         collectionContentBuilder.storeStringTail(txData.event_content.toString())
         const collectionContentCell = collectionContentBuilder.endCell();
     
         // const EventCell = new CreateEvent(Address.parse(address), collectionContentCell, ticketContentCell, toNano(formState.ticketCost), Address.parse(formState.guardAddress), BigInt(formState.ticketsAmount));
         const createEvent: CreateEvent = {
           $$type: 'CreateEvent',
           owner_address: Address.parse(txData.ownerAddress),
           collection_content: collectionContentCell,
           ticketContent: ticketContentCell,
           ticketCost: txData.ticketPrice,
           guardAddress: Address.parse(txData.ticketGuard),
           tickets_amount: BigInt(txData.ticketsAmount),
           start_sale_time: BigInt(txData.sale_start_date),
           end_sale_time: BigInt(txData.sale_end_date),
           start_event_time: BigInt(txData.event_start_date),
           end_event_time: BigInt(txData.event_end_date),
         };
     
         const builder = new Builder();
         storeCreateEvent(createEvent)(builder);
         const cell = builder.endCell();
     
         try {
           const transaction = {
             validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes
             messages: [
               {
                 address: `${import.meta.env.VITE_EVENTFACTORY_ADDRESS}`, // Замените на адрес вашего контракта
                 amount: '50000000', // 0.05 TON
                 payload: cell.toBoc().toString('base64')
               }
             ]
           };
     
           const result = await tonConnectUI.sendTransaction(transaction);
           console.log(result)
           getEventAddressFunction(txData);
           
          } catch (error) {
            console.error('Error:', error);
            alert('Creation failed: ' + error.message);
          } finally {
            setIsGenerating(false);
          }
  };

  const [faqOpen, setFaqOpen] = useState(false);

  const toggleFaq = () => {
    setFaqOpen(!faqOpen);
  };

  // Массив вопросов и ответов
  const faqItems = [
    {
      question: "Как установить цену билета?",
      answer: "Цена указывается в TON. Укажите стоимость, которая покроет ваши расходы и будет привлекательна для посетителей."
    },
    {
      question: "Что делать, если я хочу изменить данные после создания?",
      answer: "Данные в блокчейне неизменямые. Так что вам придется создать Ивент заново."
    },
    {
      question: "Как работает проверка билетов?",
      answer: "Вы можете указать адрес охранника, который будет проверять билеты через отдельную страницу. Ссылка на страницу проверки билетов появится на странице мероприятия. Если не указать, проверка будет доступна вам как организатору."
    },
    {
      question: "Что означает неограниченное количество билетов?",
      answer: "При выборе этой опции система не будет ограничивать продажи. Используйте когда точное количество участников не важно."
    }
  ];

  return (
    <div className="create-event-container">
      <h1>TiTON | Create New Event</h1>
      
      <div className="wallet-connect-section">
        <TonConnectButton />
      </div>

      <div className="form-section">
        {/* Основные поля */}
        <div className="form-group">
          <label>
            Event Title
            <span className="hint-container" tabIndex="0">
                <span className="hint-icon">?</span>
                <span className="hint-tooltip">
                    Название вашего мероприятия, которое будет отображаться на странице события. 
                    Рекомендуется 3-5 слов.
                </span>
            </span>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleChange} 
              required 
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Description <span className="hint-container" tabIndex="0">
                <span className="hint-icon">?</span>
                <span className="hint-tooltip">
                    Развернутое описание вашего мероприятия
                </span>
            </span>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleChange} 
              rows={5} 
              required 
            />
          </label>
        </div>

        {/* Социальные сети */}
        <div className="form-group">
          <label>
            Social Links <span className="hint-container" tabIndex="0">
                <span className="hint-icon">?</span>
                <span className="hint-tooltip">
                    Полезные ссылки мероприятия. Ваша группа или ссылка на место проведения.
                </span>
            </span>
            {formData.socialLinks.map((link, index) => (
              <div key={index} className="social-link-input">
                <input
                  type="url"
                  value={link}
                  onChange={(e) => handleSocialLinkChange(index, e.target.value)}
                  placeholder="https://example.com"
                />
                {index > 0 && (
                  <button 
                    type="button" 
                    onClick={() => removeSocialLink(index)}
                    className="remove-link"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button 
              type="button" 
              onClick={addSocialLink}
              className="add-link"
            >
              + Add another link
            </button>
          </label>
        </div>

        {/* Поле аватарки */}
      <div className="form-group">
        <label>
          Event Avatar
          <input
            type="file"
            accept="image/*"
            ref={avatarRef}
            onChange={(e) => handleImageUpload(e, 'avatar')}
            required
          />
          {uploadStatus.avatar.loading && <span>Uploading...</span>}
          {uploadStatus.avatar.error && <span className="error">{uploadStatus.avatar.error}</span>}
          {formData.avatarUrl && !uploadStatus.avatar.loading && (
            <span className="success">✓ Uploaded</span>
          )}
        </label>
      </div>

      {/* Поле обложки */}
      <div className="form-group">
        <label>
          Event Cover
          <input
            type="file"
            accept="image/*"
            ref={coverRef}
            onChange={(e) => handleImageUpload(e, 'cover')}
            required
          />
          {uploadStatus.cover.loading && <span>Uploading...</span>}
          {uploadStatus.cover.error && <span className="error">{uploadStatus.cover.error}</span>}
          {formData.coverUrl && !uploadStatus.cover.loading && (
            <span className="success">✓ Uploaded</span>
          )}
        </label>
      </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="ticketImageSameAsEvent"
              checked={formData.ticketImageSameAsEvent}
              onChange={handleChange}
            />
            Use event avatar for tickets <span className="hint-container" tabIndex="0">
                <span className="hint-icon">?</span>
                <span className="hint-tooltip">
                    Для аватарки билета можно загрузить отдельную аватарку
                </span>
                </span>
          </label>
        </div>

        {/* Поле изображения билета (если отличается) */}
        {!formData.ticketImageSameAsEvent && (
          <div className="form-group">
            <label>
              Ticket Image
              <input
                type="file"
                accept="image/*"
                ref={ticketRef}
                onChange={(e) => handleImageUpload(e, 'ticket')}
              />
              {uploadStatus.ticket.loading && <span>Uploading...</span>}
              {uploadStatus.ticket.error && <span className="error">{uploadStatus.ticket.error}</span>}
              {formData.ticketImageUrl && !uploadStatus.ticket.loading && !formData.ticketImageSameAsEvent && (
                <span className="success">✓ Uploaded</span>
              )}
            </label>
          </div>
        )}

        {/* Даты мероприятия */}
        <div className="form-group">
          <label>
            Event Start Date <span className="hint-container" tabIndex="0">
                <span className="hint-icon">?</span>
                <span className="hint-tooltip">
                    Время, когда ваше мероприятие начинается. Будет отображено на странице мероприятия
                </span>
                </span>
            <input
              type="datetime-local"
              name="eventStart"
              value={formData.eventStart}
              onChange={handleChange}
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Event End Date <span className="hint-container" tabIndex="0">
                <span className="hint-icon">?</span>
                <span className="hint-tooltip">
                    Время конца мероприятия (Опционально)
                </span>
                </span>
            <input
              type="datetime-local"
              name="eventEnd"
              value={formData.eventEnd}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Продажи билетов */}
        <div className="form-group">
          <label>
            Ticket Sale Start <span className="hint-container" tabIndex="0">
                <span className="hint-icon">?</span>
                <span className="hint-tooltip">
                    Время старта продаж билетов (Опционально). В ином случае будет выбрана дата создания мероприятия
                </span>
                </span>
            <input
              type="datetime-local"
              name="saleStart"
              value={formData.saleStart}
              onChange={handleChange}
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            Ticket Sale End <span className="hint-container" tabIndex="0">
                <span className="hint-icon">?</span>
                <span className="hint-tooltip">
                    Время конца продаж
                </span>
                </span>
            <input
              type="datetime-local"
              name="saleEnd"
              value={formData.saleEnd}
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Настройки билетов */}
        <div className="form-group">
          <label>
            Ticket Price (TON) <span className="hint-container" tabIndex="0">
                <span className="hint-icon">?</span>
                <span className="hint-tooltip">
                    Стоимость одного билета в TON
                </span>
                </span>
            <input
              type="number"
              name="ticketPrice"
              value={formData.ticketPrice}
              onChange={handleChange}
              min="0"
              step="0.1"
              required
            />
          </label>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="unlimitedTickets"
              checked={formData.unlimitedTickets}
              onChange={handleChange}
            />
            Unlimited Tickets <span className="hint-container" tabIndex="0">
                <span className="hint-icon">?</span>
                <span className="hint-tooltip">
                    Если выбрано, то будет неограниченное количество билетов
                </span>
                </span>
          </label>
        </div>

        {!formData.unlimitedTickets && (
          <div className="form-group">
            <label>
              Tickets Amount <span className="hint-container" tabIndex="0">
                <span className="hint-icon">?</span>
                <span className="hint-tooltip">
                    Количество билетов выставленное на продажу
                </span>
                </span>
              <input
                type="number"
                name="ticketsAmount"
                value={formData.ticketsAmount}
                onChange={handleChange}
                min="1"
                required
              />
            </label>
          </div>
        )}

        {/* Дополнительные поля */}
        <div className="form-group">
          <label>
            Ticket Guard Address <span className="hint-container" tabIndex="0">
                <span className="hint-icon">?</span>
                <span className="hint-tooltip">
                    Адрес кошелька проверяющего билеты. По умолчанию стоит адрес владельца мероприятия. После создания адрес можно будет поменять.
                </span>
                </span>
            <input
              type="text"
              name="ticketGuard"
              value={formData.ticketGuard}
              onChange={handleChange}
              placeholder="TON wallet address"
            />
          </label>
        </div>

        <button onClick={handleGenerate} disabled={isGenerating}>
          {isGenerating ? 'Generating...' : 'Generate Event'}
        </button>

        {/* Модальное окно */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>{isGenerating ? 'Creating Event' : 'Event Created!'}</h3>
              
              {isGenerating ? (
                <div className="loading-animation">
                  <div className="spinner"></div>
                  <p>Processing blockchain transaction...</p>
                  <p>This may take a few seconds</p>
                </div>
              ) : (
                <>
                  <p>Your event was successfully created! Wait 1-2 minutes until Transaction would be complete! Share this link with your visitors.</p>
                  <div className="generated-link">
                    <input 
                      type="text" 
                      value={generatedLink} 
                      readOnly 
                    />
                    <button 
                      onClick={() => navigator.clipboard.writeText(generatedLink)}
                    >
                      Copy
                    </button>
                  </div>
                  <a 
                    href={generatedLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="view-button"
                  >
                    View Event
                  </a>
                </>
              )}

              <button 
                onClick={() => setShowModal(false)}
                className="close-button"
                disabled={isGenerating}
              >
                {isGenerating ? 'Please wait...' : 'Close'}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="faq-section">
        <button 
          onClick={toggleFaq}
          className="faq-toggle-button"
        >
          {faqOpen ? 'Скрыть F.A.Q.' : 'Показать F.A.Q.'}
        </button>
        
        {faqOpen && (
          <div className="faq-content">
            <h2>Часто задаваемые вопросы</h2>
            <div className="faq-items">
              {faqItems.map((item, index) => (
                <div key={index} className="faq-item">
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateEventPage;