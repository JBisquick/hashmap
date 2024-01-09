function hashMap() {

  const hash = (string) => {
    let hashCode = 0;
    const prime = 31;
    for (let i = 0; i < string.length; i++) {
      hashCode = prime * hashCode + string.charCodeAt(i);
    }
    return hashCode;
  };

  return {
    hash
  };
}

const thing = hashMap();
console.log(thing.hash('bob'));