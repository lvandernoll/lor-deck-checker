import React, { useState, useEffect } from 'react';
import { decode, Card as LoRCard } from 'lor-deckcode';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DeckCard, Set, Card } from 'interfaces';
import { State } from 'redux/reducers';
import { requestSetsData } from 'redux/actions';
import { SetsDataState } from 'redux/reducers/setsData';
import DeckDisplay from 'components/DeckDisplay';
import styles from './DeckTracker.module.scss';

interface Props {
  setsDataState: SetsDataState,
  requestSetsData: () => Object,
}

const DeckTrackerPage: React.FC<Props> = ({ setsDataState, requestSetsData }) => {
  const [deckCode] = useState<string>('CEBACAICHEDACBIEDYQDAMJUAIBQCAQCAMYQKAIFA4FRIGRIAEBQCBIBCMLA');
  const [deckCards, setDeckCards] = useState<DeckCard[]>([]);
  const [playedCards, setPlayedCards] = useState<DeckCard[]>([]);

  useEffect(() => {
    requestSetsData();
  }, [requestSetsData]);

  useEffect(() => {
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
  }, [deckCode, setsDataState]);

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
    <>
      {deckCode}
      <div className={styles.decks}>
        <DeckDisplay title={'Deck'} cards={deckCards} removeCard={playCard} />
        <div className={styles.divider}>
          <span className={styles.line} />
          <FontAwesomeIcon className={styles.icon} icon={faExchangeAlt} />
          <span className={styles.line} />
        </div>
        <DeckDisplay title={'Played'} cards={playedCards} removeCard={returnCard} moveLeft />
      </div>
    </>
  )
}

const mapStateToProps = (state: State) => ({ setsDataState: state.setsData });
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ requestSetsData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DeckTrackerPage);
