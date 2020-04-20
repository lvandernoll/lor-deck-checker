import { Card, Set } from "interfaces";

export const getSetsData = async () => {
  try {
    const setsResponse = await fetch(`/data/sets/sets.json`);
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
