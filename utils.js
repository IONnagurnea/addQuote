const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}


const generateId = () => {
  const ids = quotes.map(quote => Number(quote.id));
  let newId = 1;
  while (newId === ids.find(id => id === newId)) {
    newId++;
  }
  return newId;
};


module.exports = {
  getRandomElement,
  generateId
};
