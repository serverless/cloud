import { useEffect } from 'react';
import { useSnapshot } from 'valtio';

import SystemWarning from '@components/SystemWarning';
import auth from '@state/auth';
import Link from 'next/link';

import Image from 'next/image';
import Loading from '@components/Loading';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  const { systemWarning, user, loading } = useSnapshot(auth);

  useEffect(() => {
    auth.init();
  }, []);

  if (loading) {
    return <Loading width='100vw' height='100vh' />;
  }
  return (
    <div>
      {systemWarning && <SystemWarning message={systemWarning} />}
      <div style={{ background: 'black' }}>
        <nav className='container'>
          <ul>
            <li style={{ display: 'flex', color: '#fff' }}>
              <strong>Share Files</strong>
            </li>
          </ul>
          <ul>
            <li style={{ display: 'flex' }}>
              <Image
                width={250}
                height={40}
                style={{ margin: 'auto' }}
                src='https://assets-global.website-files.com/60acbb950c4d6606963e1fed/60ed73cdb8a175727181d1ee_serverless-cloud.svg'
                alt='serverless cloud'
              />
            </li>
          </ul>
          <ul>
            <li>
              {user ? (
                <a
                  href='#'
                  onClick={(e) => {
                    e.preventDefault();
                    auth.logout();
                  }}
                >
                  Logout
                </a>
              ) : (
                <Link href='/'>
                  <a role='button'>Login</a>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
      {/* {systemWarning && <SystemWarning message={systemWarning} />} */}
      <div className='container'>
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp;
