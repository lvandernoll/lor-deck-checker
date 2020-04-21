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

  const playCard = (cardToMove: DeckCard) => {
    const newDeckCards = [...deckCards];
    const newPlayedCards = [...playedCards];
    const cardInDeck: DeckCard = newDeckCards[newDeckCards.indexOf(cardToMove)];
    const playedCard = newPlayedCards.filter((a: DeckCard) => a.card.cardCode === cardInDeck.card.cardCode)[0];
    // Add card to playedCards
    if(playedCard) {
      playedCard.count += 1;
    } else {
      newPlayedCards.push({
        card: cardInDeck.card,
        count: 1,
      });
    }
    setPlayedCards(newPlayedCards);

    // Remove card from deck
    cardInDeck.count -= 1;
    if(cardInDeck.count === 0) {
      setTimeout(() => {
        newDeckCards.splice(newDeckCards.indexOf(cardInDeck), 1);
        setDeckCards(newDeckCards);
      }, 250);
    }
  }

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
        <DeckDisplay title={'Played'} cards={playedCards} moveLeft />
      </div>
    </>
  )
}

const mapStateToProps = (state: State) => ({ setsDataState: state.setsData });
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ requestSetsData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DeckTrackerPage);
