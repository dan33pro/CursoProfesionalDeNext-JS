import Header from '@components/Header';
import Nav from '@common/Nav';
import { useAuth } from '@hooks/useAuth';
import { useEffect, useState } from 'react';

const MainLayout = ({ children }) => {
  const auth = useAuth();
  const [visualizar, setVisulizar] = useState(false);

  useEffect(() => {
    if (!auth?.user) {
      auth.refreshLogIn();
      setTimeout(() => setVisulizar(true), 500);
    }
  }, [auth.logInState]);

  return (
    <>
      {' '}
      {visualizar && (
        <div className="min-h-full">
          {auth.logInState && <Header />}
          <Nav />
          <main>
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
      )}
    </>
  );
};

export default MainLayout;
