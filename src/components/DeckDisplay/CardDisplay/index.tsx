import React, { useState, useEffect } from 'react';
import { DeckCard } from 'interfaces';
import styles from './CardDisplay.module.scss';

interface Props extends DeckCard {
  moveLeft?: boolean,
}

interface TemplateProps extends DeckCard {
  className?: string,
  onClick?: () => void,
}

const CardDisplayTemplate: React.FC<TemplateProps> = ({ card, count, className, onClick }) => {
  return (
    <>
      <div onClick={onClick} className={`${styles.wrapper} ${className || ''}`}>
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
    </>
  )
}

const CardDisplay: React.FC<Props> = ({ card, count, moveLeft }) => {
  const [animationClass] = useState<string>(moveLeft ? styles.moveLeft : styles.moveRight);
  const [animationElements, setAnimationElements] = useState<JSX.Element[]>([]);
  const [animationCount, setAnimationCount] = useState<number>(0);
  const [timeouts, setTimeouts] = useState<NodeJS.Timeout[]>([]);

  useEffect(() => () => {
    timeouts.forEach((timeout: NodeJS.Timeout) => {
      clearTimeout(timeout);
    });
  });

  const animateCard = () => {
    const newAnimationElements = [...animationElements];
    newAnimationElements.push(<CardDisplayTemplate card={card} count={count} className={animationClass} key={animationCount} />);
    setAnimationElements(newAnimationElements);
    setAnimationCount(animationCount + 1);

    setTimeouts([...[...timeouts], setTimeout(() => {
      const newAnimationElements = [...animationElements];
      newAnimationElements.shift();
      setAnimationElements(newAnimationElements);
    }, 500)]);
  }

  return (
    <div className={styles.fullWrap}>
      <CardDisplayTemplate card={card} count={count} onClick={animateCard} />
      <div className={styles.animationWrapper}>
        {animationElements}
      </div>
    </div>
  )
}


export default CardDisplay;
