import React from 'react';
import { DeckCard } from 'interfaces';

const CardDisplay: React.FC<DeckCard> = ({ card, count }) => {
  return (
    <div>
      <span>{card.cost} {card.name} {count}</span>
    </div>
  )
}

export default CardDisplay;
