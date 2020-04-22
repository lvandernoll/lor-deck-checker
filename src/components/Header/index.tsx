import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { State } from 'redux/reducers';
import { bindActionCreators } from 'redux';
import { GameActivityState } from 'redux/reducers/gameActivity';
import { requestGameActivity } from 'redux/actions';
import styles from './Header.module.scss';

interface Props {
  gameActivityState: GameActivityState,
  requestGameActivity: () => Object,
}

const Header: React.FC<Props> = ({ gameActivityState, requestGameActivity }) => {
  useEffect(() => {
    requestGameActivity();
    setInterval(() => {
      if(!gameActivityState.isLoading) {
        requestGameActivity();
      }
    }, 2500);
  }, []);

  return (
    <header className={styles.wrapper}>
      {gameActivityState.gameActivity.gameState}
    </header>
  )
}

const mapStateToProps = (state: State) => ({ gameActivityState: state.gameActivity });
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ requestGameActivity }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
