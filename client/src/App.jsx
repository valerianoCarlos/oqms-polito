import CssBaseline from "@mui/material/CssBaseline";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./routes/AdminPage";
import ClientPage from "./routes/ClientPage";
import ErrorPage from "./routes/ErrorPage";
import LandingPage from "./routes/LandingPage";
import OfficerPage from "./routes/OfficerPage";
import RootPage from "./routes/RootPage";
import CountersTable from "./components/CountersTable";
import EditCounterForm from "./components/EditCounterForm";
import ServicesTable from "./components/ServicesTable";
import UsersTable from "./components/UsersTable";

import { bs_counters, bs_services } from "./data";

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <Main />
    </BrowserRouter>
  );
}

function Main() {
  const [user, setUser] = useState("");
  const [services, setServices] = useState([]);
  const [counters, setCounters] = useState([]);
  const [dirty, setDirty] = useState(true);

  useEffect(() => {
    if (dirty) {
      // TODO: - Call GET apis to get all the counters and all the services
      setCounters(bs_counters);
      setServices(bs_services);
      setDirty(false);
    }
  }, [dirty]);

  return (
    <Routes>
      {/* prettier-ignore */}
      <Route path="/" element={<RootPage user={user} setUser={setUser} />}>
        <Route index element={<LandingPage setUser={setUser} />} />
        <Route path="admin" element={<AdminPage setUser={setUser} />}>
          <Route index path="counters" element={<CountersTable counters={counters}/>} />
          <Route path="edit-counters/:counterId" element={<EditCounterForm services={services} setDirty={setDirty}/>}/>
          <Route path="services" element={<ServicesTable services={services}/>}/>
          <Route path="users" element={<UsersTable />}/>
        </Route>
        <Route path="officer/:officerId" element={<OfficerPage />} />
        <Route path="client" element={<ClientPage />} />
        <Route path="*" element={<ErrorPage setUser={setUser} />} />
      </Route>
    </Routes>
  );
}

export default App;
