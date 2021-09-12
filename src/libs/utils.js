export const getCharactersId = (arrayCharacters) => {
  const idsArray = [];
  arrayCharacters.forEach((item) => idsArray.push(item.id));
  return idsArray;
};
