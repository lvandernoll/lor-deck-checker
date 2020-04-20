import React, { useState, useEffect } from 'react';
import { decode, Card as LoRCard } from 'lor-deckcode';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { DeckCard, Set, Card } from 'interfaces';
import { State } from 'redux/reducers';
import { requestSetsData } from 'redux/actions';
import { SetsDataState } from 'redux/reducers/setsData';
import DeckDisplay from 'components/DeckDisplay';

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

  return (
    <>
      {deckCode}
      <DeckDisplay cards={deckCards} />
    </>
  )
}

const mapStateToProps = (state: State) => ({ setsDataState: state.setsData });
const mapDispatchToProps = (dispatch: any) => bindActionCreators({ requestSetsData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DeckTrackerPage);
