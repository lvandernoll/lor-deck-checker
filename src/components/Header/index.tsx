import React, { useState, FormEvent } from 'react';
import { connect } from 'react-redux';
import { State } from 'redux/reducers';
import { bindActionCreators } from 'redux';
import { GameActivityState } from 'redux/reducers/gameActivity';
import { requestGameActivity, requestGameActivityDeckSuccess } from 'redux/actions';
import styles from './Header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPlug, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

interface Props {
  gameActivityState: GameActivityState,
  requestGameActivity: () => Object,
  requestGameActivityDeckSuccess: (newDeckCode: string) => Object,
}

const Header: React.FC<Props> = ({ gameActivityState, requestGameActivity, requestGameActivityDeckSuccess }) => {
  const [deckCode, setDeckCode] = useState<string>('');
  const [callInterval, setCallInterval] = useState<NodeJS.Timeout>();
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const startCalls = () => {
    setIsConnected(true);
    requestGameActivity();
    setCallInterval(setInterval(() => {
      if(!gameActivityState.isLoading) {
        requestGameActivity();
      }
    }, 2500));
  }

  const stopCalls = () => {
    setIsConnected(false);
    if(callInterval) {
      clearInterval(callInterval);
    }
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    requestGameActivityDeckSuccess(deckCode);
  }

  return (
    <header className={styles.wrapper}>
      <span>LoR Deck Tracker</span>
      <form onSubmit={onSubmit} className={styles.menu}>
        {!isConnected && <>
          <input type='text' className={styles.input} value={deckCode} onChange={(e) => setDeckCode(e.currentTarget.value)} placeholder='Enter deck code' />
          <button className={styles.button}><FontAwesomeIcon icon={faPaperPlane} /></button>
          <span className={styles.seperator}>or</span>
          <span onClick={startCalls} className={styles.button}>
            <FontAwesomeIcon icon={faPlug} />
            <span>Connect</span>
          </span>
        </>}
        {isConnected && <>
          {gameActivityState.gameActivity.gameState === 'Not connected'
          ? <FontAwesomeIcon icon={faSpinner} spin className={styles.spinner} />
          : <span className={styles.gameState}>{gameActivityState.gameActivity.gameState}</span>
          }
          <span onClick={stopCalls} className={styles.button}>
            <span className={styles.disconnect}>
              <FontAwesomeIcon icon={faPlug} />
            </span>
            <span>Disconnect</span>
          </span>
        </>}
      </form>
    </header>
  )
}

const mapStateToProps = (state: State) => ({ gameActivityState: state.gameActivity });
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ requestGameActivity, requestGameActivityDeckSuccess }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
