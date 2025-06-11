import React from "react";
import { AppProvider } from "./context/AppContext";
import Masters from "./pages/Masters";
import Orders from "./pages/Orders";
// import SchedulerCalendar from "./components/SchedulerCalendar";

function App() {
  return (
    <AppProvider>
      <div style={{ padding: 20 }}>
        <h2>Garment Order Scheduler</h2>
        <Masters />
        <Orders />
        {/* <SchedulerCalendar /> */}
      </div>
    </AppProvider>
  );
}

export default App;
