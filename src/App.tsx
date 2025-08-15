
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
import ItemlostListing from './routes/ClientHome/ItemLostListing';
import ItemLostForm from './routes/ClientHome/ItemLostForm';
import ItemLostDetails from './routes/ClientHome/ItemLostDetails';
import DeliverForm from './routes/ClientHome/DeliveryForm';
import PublicCatalog from './routes/ClientHome/PublicCatalog';
import Footer from './components/Footer'; 
import DeliveredItemsListing from './routes/ClientHome/DeliveredItemsListing'; 
import UserListing from './routes/Admin/UserListing';
import UserForm from './routes/Admin/UserForm';

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
                  {/* ... TODAS AS SUAS ROTAS CONTINUAM IGUAIS AQUI ... */}
                  <Route path="/" element={<ClientHome />}>
                      <Route index element={<Navigate to="/public-catalog" />} />
                      <Route path="public-catalog" element={<PublicCatalog />} />
                      <Route path="login" element={<Login />} />
                  </Route>
                  
                  <Route path="/client/" element={<PrivateRoute roles={['ROLE_ADMIN', 'ROLE_VIGILANTE']}><ClientHome /></PrivateRoute>}>
                        <Route index element={<Catalog />} />
                        <Route path="itemlosts" element={<ItemlostListing />} />
                         <Route path="delivered-items" element={<DeliveredItemsListing />} /> {/* Adicione esta linha */}
                        <Route path="itemlosts/:itemlostId" element={<ItemLostForm />} />
                        <Route path="itemlost-details/:itemlostId" element={<ItemLostDetails />} />
                        <Route path="itemlosts/:itemlostId/deliver" element={<DeliverForm />} />
                   </Route>

                   <Route path="/admin/" element={<PrivateRoute roles={['ROLE_ADMIN']}><Admin /></PrivateRoute>}>
                      <Route index element={<Navigate to="/admin/home" />} />
                      <Route path="home" element={<AdminHome />} />
                      {/* ADICIONAR ESTAS ROTAS */}
                      <Route path="users" element={<UserListing />} />
                      <Route path="users/create" element={<UserForm />} />
                      <Route path="users/:userId" element={<UserForm />} />
                    </Route>

                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
                <Footer /> {/* 2. ADICIONE O COMPONENTE FOOTER AQUI */}
       </HistoryRouter>
    </ContextToken.Provider>
  );
}