import React, { useState, FormEvent } from 'react';
import { connect } from 'react-redux';
import { State } from 'redux/reducers';
import { bindActionCreators } from 'redux';
import { GameActivityState } from 'redux/reducers/gameActivity';
import { requestGameActivity, requestGameActivityDeckSuccess } from 'redux/actions';
import styles from './Header.module.scss';

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
      <form onSubmit={onSubmit}>
        {!isConnected && <>
          <input type='text' value={deckCode} onChange={(e) => setDeckCode(e.currentTarget.value)} placeholder='Deck code' />
          <span>or</span>
          <button type='button' onClick={startCalls}>Connect</button>
        </>}
        {isConnected && <>
          <span>{gameActivityState.gameActivity.gameState}</span>
          {gameActivityState.gameActivity.gameState === 'Not connected' && <span>Loading..</span>}
          <button type='button' onClick={stopCalls}>Disconnect</button>
        </>}
      </form>
    </header>
  )
}

const mapStateToProps = (state: State) => ({ gameActivityState: state.gameActivity });
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ requestGameActivity, requestGameActivityDeckSuccess }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
