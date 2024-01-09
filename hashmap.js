function hashMap() {
  const loadFactor = 0.75;
  let bucketList = Array(16);
  let size = 0;

  const hash = (key) => {
    let hashCode = 0;
    const prime = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = prime * hashCode + key.charCodeAt(i);
    }
    return hashCode % bucketList.length;
  };

  const resize = () => {
    const oldList = bucketList;
    bucketList = Array(oldList.length * 2)
    size = 0;
    for (let bucket of oldList) {
      if (bucket !== undefined) {
        for (let item of bucket) {
          set(item[0], item[1]);
        }
      }
    }
  };

  const set = (key, value) => {
    const index = hash(key);
    if (size / bucketList.length > loadFactor) {
      resize();
    }

    size += 1;
    if (bucketList[index] === undefined) {
      bucketList[index] = [[key, value]];
    } else {
      bucketList[index].push([key, value]);
    }
  };

  const get = (key) => {
    const index = hash(key);
    if (bucketList[index] === undefined) {
      return null;
    }
    for (let item of bucketList[index]) {
      if (item[0] === key) {
        return item[1];
      } 
    }
    return null;
  };

  const has = (key) => {
    const index = hash(key);
    if (bucketList[index] === undefined) {
      return false;
    }
    for (let item of bucketList[index]) {
      if (item[0] === key) {
        return true;
      } 
    }
    return false;
  };

  const remove = (key) => {
    const index = hash(key);
    if (bucketList[index] === undefined) {
      return;
    }
    // i is for deleting the right key in the possible array
    let i = 0;
    for (let item of bucketList[index]) {
      if (item[0] === key) {
        bucketList[index].splice(i, 1);
        size -= 1;
      } 
      i += 1;
    }
    console.log(bucketList);
  };

  return {
    set,
    get,
    has,
    remove
  };
}

const thing = hashMap();
thing.set('bob', 7);
thing.set('mark', 78);
thing.set('Tim', 12);
console.log(thing.get('mark'));
console.log(thing.get('bobby'));
console.log(thing.has('mark'));
console.log(thing.has('bobby'));
thing.remove('Tim');


