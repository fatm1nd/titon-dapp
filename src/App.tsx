import { BrowserRouter, Routes, Route } from "react-router-dom";
import EventPage from "./pages/Event";
import CreateEventPage from "./pages/CreateEvent";
import TicketsPage from "./pages/MyTickets"
import GuardScannerPage from "./pages/GuardScanner";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/event" element={<EventPage />} />
        <Route path="/createEvent" element={<CreateEventPage />} />
        <Route path="/mytickets" element={<TicketsPage />} />
        <Route path="/guardScanner" element={<GuardScannerPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;