export interface Card {
  cardCode: string,
  set: string,
  name: string,
  regionRef: string, // DE | FR | IO | NX | PZ | SI
  supertype: string, // Champion
  type: string, // Spell | Unit
  cost: number,
}

export interface DeckCard {
  card: Card,
  count: number,
}

export interface Set {
  code: string,
  cards: Card[],
}

export interface GameActivity {
  playerName?: string | null,
  opponentName?: string | null,
  gameState?: string, // Not connected | In Progress | Menus
  deckCode?: string,
}
