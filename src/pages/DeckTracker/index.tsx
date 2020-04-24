import React, { useState, useEffect } from 'react';
import { decode, Card as LoRCard } from 'lor-deckcode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DeckCard, Set, Card } from 'interfaces';
import { State } from 'redux/reducers';
import { requestSetsData, requestGameActivityDeck } from 'redux/actions';
import { SetsDataState } from 'redux/reducers/setsData';
import DeckDisplay from 'components/DeckDisplay';
import styles from './DeckTracker.module.scss';
import { GameActivityState } from 'redux/reducers/gameActivity';

interface Props {
  gameActivityState: GameActivityState,
  requestGameActivityDeck: () => Object,
  setsDataState: SetsDataState,
  requestSetsData: () => Object,
}

const DeckTrackerPage: React.FC<Props> = ({ gameActivityState, requestGameActivityDeck, setsDataState, requestSetsData }) => {
  const [deckCode, setDeckCode] = useState<string>(gameActivityState.gameActivity.deckCode || '');
  const [deckCards, setDeckCards] = useState<DeckCard[]>([]);
  const [playedCards, setPlayedCards] = useState<DeckCard[]>([]);
  const [prevGameState, setPrevGameState] = useState<string | undefined>(gameActivityState.gameActivity.gameState);

  useEffect(() => {
    requestSetsData();
  }, [requestSetsData]);

  useEffect(() => {
    if(prevGameState !== gameActivityState.gameActivity.gameState) {
      setPrevGameState(gameActivityState.gameActivity.gameState);
      setPlayedCards([]);

      if(gameActivityState.gameActivity.gameState === 'InProgress') {
        requestGameActivityDeck();
      }
      updateDeck();
    }
  }, [gameActivityState.gameActivity.gameState, requestGameActivityDeck, prevGameState]);

  useEffect(() => {
    if(gameActivityState.gameActivity.deckCode) {
      setDeckCode(gameActivityState.gameActivity.deckCode);
    }
  }, [gameActivityState.gameActivity.deckCode]);

  useEffect(() => {
    updateDeck();
  }, [deckCode, setsDataState]);

  const updateDeck = () => {
    const lorDeck: LoRCard[] = decode(deckCode);
    const deck: DeckCard[] = [];

    lorDeck.forEach((card: LoRCard) => {
      const setCode = card.code.substr(0, 2);
      const set = setsDataState.setsData.filter((a: Set) => a.code === setCode)[0];
      if(set) {
        const fullCard = set.cards.filter((a: Card) => a.cardCode === card.code)[0];
        if(fullCard) {
          deck.push({
            card: fullCard,
            count: card.count,
          });
        }
      }
    });

    setDeckCards(deck);
  }

  const moveCard = (
    cardToMove: DeckCard,
    moveFrom: DeckCard[],
    moveTo: DeckCard[],
    moveFromSetter: (newMoveFrom: DeckCard[]) => void,
    moveToSetter: (newMoveTo: DeckCard[]) => void
  ) => {
    const moveFromCard: DeckCard = moveFrom[moveFrom.indexOf(cardToMove)];
    const moveToCard = moveTo.filter((a: DeckCard) => a.card.cardCode === moveFromCard.card.cardCode)[0];

    // Add card to new location
    if(moveToCard) {
      moveToCard.count += 1;
    } else {
      moveTo.push({
        card: moveFromCard.card,
        count: 1,
      });
    }
    moveToSetter(moveTo);

    // Remove card from current location
    moveFromCard.count -= 1;
    if(moveFromCard.count === 0) {
      setTimeout(() => {
        moveFrom.splice(moveFrom.indexOf(moveFromCard), 1);
        moveFromSetter(moveFrom);
      }, 250);
    }
  }

  const playCard = (cardToMove: DeckCard) =>
    moveCard(cardToMove, [...deckCards], [...playedCards], setDeckCards, setPlayedCards);

  const returnCard = (cardToMove: DeckCard) =>
    moveCard(cardToMove, [...playedCards], [...deckCards], setPlayedCards, setDeckCards);

  return (
    <div className={styles.decks}>
      <DeckDisplay title={'Deck'} cards={deckCards} removeCard={playCard} />
      <div className={styles.divider}>
        <FontAwesomeIcon icon={faExchangeAlt} className={styles.icon} title='Reset' onClick={() => {updateDeck(); setPlayedCards([]);}}/>
      </div>
      <DeckDisplay title={'Played'} cards={playedCards} removeCard={returnCard} moveLeft />
    </div>
  )
}

const mapStateToProps = (state: State) => ({ gameActivityState: state.gameActivity, setsDataState: state.setsData });
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ requestSetsData, requestGameActivityDeck }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DeckTrackerPage);
