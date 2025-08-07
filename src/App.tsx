import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Admin from './routes/Admin';
import AdminHome from './routes/Admin/AdminHome';
import ClientHome from './routes/ClientHome';
import Catalog from './routes/ClientHome/Catalog';
import Login from './routes/ClientHome/Login';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { history } from './utils/history';
import { PrivateRoute } from './components/PrivateRoute';
import { AccessTokenPayloadDTO } from './models/auth';
import { ContextToken } from './utils/context-token';
import * as authService from './services/auth-service';
import ItemlostListing from './routes/Admin/ItemLostListing';
import ItemLostForm from './routes/Admin/ItemLostForm';
import ItemLostDetails from './routes/ClientHome/ItemLostDetails';
import DeliverForm from './routes/Admin/DeliveryForm';
import PublicCatalog from './routes/ClientHome/PublicCatalog';

export default function App() {

  const [contextTokenPayload, setContextTokenPayload] = useState<AccessTokenPayloadDTO>();

  useEffect(() => {
    if (authService.isAuthenticated()) {
      const payload = authService.getAccessTokenPayload();
      setContextTokenPayload(payload);
    }
  }, []);

  return (
    <ContextToken.Provider value={{ contextTokenPayload, setContextTokenPayload }}>
      <HistoryRouter history={history}>
        <Routes>
          <Route path="/" element={<ClientHome />}>
            {/* CORREÇÃO AQUI: A rota principal agora redireciona */}
            <Route index element={<Navigate to="/public-catalog" />} />
            
            <Route path="catalog" element={<Catalog />} />
            <Route path="public-catalog" element={<PublicCatalog />} />
            <Route path="itemlost-details/:itemlostId" element={<ItemLostDetails />} />
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/admin/" element={<PrivateRoute roles={['ROLE_ADMIN', 'ROLE_VIGILANTE']}><Admin /></PrivateRoute>}>
              <Route index element={<Navigate to="/admin/home" />} />
              <Route path="home" element={<AdminHome />} />
              <Route path="itemlosts" element={<ItemlostListing />} />
              <Route path="itemlosts/:itemlostId" element={<ItemLostForm />} />
              <Route path="itemlosts/:itemlostId/deliver" element={<DeliverForm />} />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </HistoryRouter>
    </ContextToken.Provider>
  );
}