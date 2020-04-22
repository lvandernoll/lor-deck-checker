import { Card, Set, GameActivity } from 'interfaces';

const API_URL = 'http://localhost:21337';

export const getGameActivity = async () => {
  try {
    const setsResponse = await fetch(`${API_URL}/positional-rectangles`);
    const data = await setsResponse.json();

    const parsedData: GameActivity = {
      playerName: data.PlayerName,
      opponentName: data.OpponentName,
      gameState: data.GameState,
    };

    return parsedData;
  } catch(e) {
    console.error(e);
    return false;
  }
}

export const getGameActivityDeck = async () => {
  try {
    const setsResponse = await fetch(`${API_URL}/static-decklist`);
    const data = await setsResponse.json();

    if(data.DeckCode) {
      const parsedData: GameActivity = {
        deckCode: data.DeckCode,
      };
      return parsedData;
    } else {
      return false;
    }
  } catch(e) {
    console.error(e);
    return false;
  }
}

export const getSetsData = async () => {
  try {
    const setsResponse = await fetch('/data/sets/sets.json');
    const setFiles: string[] = await setsResponse.json();

    const sets: Set[] = [];
    await Promise.all(setFiles.map(async (fileName: string) => {
      const response = await fetch(`/data/sets/${fileName}.json`);
      const cards: Card[] = await response.json();
      sets.push({
        code: fileName,
        cards
      });
    }));

    return sets;
  } catch(e) {
    console.error(e);
    return false;
  }
}
