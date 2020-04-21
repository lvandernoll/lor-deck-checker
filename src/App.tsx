import React from 'react';
import { Provider } from 'react-redux';
import store from 'redux/store';
import DeckTrackerPage from 'pages/DeckTracker';
import styles from './App.module.scss';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <div className={styles.headerCircle} />
        </header>
        <div className={styles.content}>
          <DeckTrackerPage />
        </div>
      </div>
    </Provider>
  )
}

export default App;
