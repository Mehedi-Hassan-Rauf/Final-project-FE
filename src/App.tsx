import './App.scss';
import { Header } from './components/Header/Header';
import Mainbody from './components/Mainbody/Mainbody';
import Templates from './components/Mainbody/Templates';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import { ROUTE_PATHS } from './utils/constants';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './components/contexts/auth-context';
import { DocumentsNameContextProvider } from './components/contexts/documents-context';
import { GuideProvider } from './components/contexts/guide-context';

function App() {
  // true if user is logged in
  let { isLoggedIn } = useAuth();
  return (
    <div style={{ overflow: 'hidden' }}>
      <BrowserRouter>
        <DocumentsNameContextProvider>
          <GuideProvider>
            <Routes>
              {/* login and register page  */}
              <Route path={ROUTE_PATHS.LOGIN}
                element={!isLoggedIn ? (<Login />) : (
                  <Navigate to={ROUTE_PATHS.HOME} replace />
                )} />

              {/* main page to display templates and documents  */}
              <Route
                path={ROUTE_PATHS.HOME}
                element={
                  <ProtectedRoute
                    element={
                      <>
                        <Header />
                        <Templates />
                        <Mainbody />
                      </>
                    }
                  />
                }
              />

              

              {/* navigates to home page if user visits invalid route */}
              <Route path={"*"} element={<Navigate to={ROUTE_PATHS.LOGIN} replace />}></Route>
            </Routes>
          </GuideProvider>
        </DocumentsNameContextProvider>
      </BrowserRouter >
      <Toaster />
    </div >
  );
}

const ProtectedRoute: React.FC<{ element: any }> = ({ element }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  return isLoggedIn ? element : <Navigate to={ROUTE_PATHS.LOGIN} state={{ from: location.pathname }} />;
}

export default App;
