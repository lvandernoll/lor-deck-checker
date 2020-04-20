import React from 'react';
import { DeckCard } from 'interfaces';
import CardDisplay from './CardDisplay';
import styles from './DeckDisplay.module.scss';

interface Props {
  cards: DeckCard[],
  moveLeft?: boolean,
}

const DeckDisplay: React.FC<Props> = ({ cards, moveLeft }) => {
  return (
    <div className={styles.deck}>
      {
        [...cards.sort((a: DeckCard, b: DeckCard) => a.card.cost - b.card.cost)]
        .map((card: DeckCard) => <CardDisplay key={card.card.cardCode} {...card} />)
      }
    </div>
  )
}

export default DeckDisplay;
