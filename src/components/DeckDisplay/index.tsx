import React from 'react';
import { DeckCard } from 'interfaces';
import CardDisplay from './CardDisplay';
import styles from './DeckDisplay.module.scss';

interface Props {
  title: string,
  cards: DeckCard[],
  moveLeft?: boolean,
  removeCard?: (card: DeckCard) => void,
}

const DeckDisplay: React.FC<Props> = ({ title, cards, moveLeft, removeCard }) => {
  return (
    <div className={styles.deck}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cards}>
        {
          [...cards.sort((a: DeckCard, b: DeckCard) => a.card.cost - b.card.cost)].map((card: DeckCard) =>
            <div onClick={(e: React.MouseEvent) => {removeCard && removeCard(card)}} className={styles.card} key={card.card.cardCode}>
              <CardDisplay {...card} moveLeft={moveLeft} />
            </div>)
        }
      </div>
    </div>
  )
}

export default DeckDisplay;
