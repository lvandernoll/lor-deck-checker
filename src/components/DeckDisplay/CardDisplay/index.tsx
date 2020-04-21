import React from 'react';
import { DeckCard } from 'interfaces';
import styles from './CardDisplay.module.scss';

const CardDisplay: React.FC<DeckCard> = ({ card, count }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mana}>
        {card.supertype && <span className={styles[`${card.supertype}Border`]} />}
        <span className={`${styles.manaCircle} ${styles[card.supertype || card.type]}`}>{card.cost}</span>
      </div>
      <div className={styles.name} style={{
        borderColor: styles[card.regionRef],
        backgroundImage: `url(https://cdn-lor.mobalytics.gg/stable/images/cards-preview/${card.cardCode}.webp)`,
        }}>
          {card.name}
        </div>
      <div className={styles.count}>{count}</div>
    </div>
  )
}

export default CardDisplay;
