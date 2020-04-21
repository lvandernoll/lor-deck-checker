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


  const removeCard = (cardToMove: DeckCard) => {
    let cardInDeck: DeckCard;
    deckCards.forEach((card: DeckCard) => {
      if(cardToMove === card) {
        cardInDeck = card;
        console.log(cardInDeck);
        return;
      }
    });
  }

  return (
    <>
      {deckCode}
      <div className={styles.decks}>
        <DeckDisplay title={'Deck'} cards={deckCards} removeCard={removeCard} />
        <div className={styles.divider}>
          <span className={styles.line} />
          <FontAwesomeIcon className={styles.icon} icon={faExchangeAlt} />
          <span className={styles.line} />
        </div>
        <DeckDisplay title={'Played'} cards={[]} />
      </div>
    </>
  )
}

const mapStateToProps = (state: State) => ({ setsDataState: state.setsData });
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ requestSetsData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DeckTrackerPage);
