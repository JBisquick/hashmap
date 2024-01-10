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
            set(item);
          }
        }
      }
    };
  
    const set = (key) => {
      const index = hash(key);
      if (size / bucketList.length > loadFactor) {
        resize();
      }
  
      size += 1;
      if (bucketList[index] === undefined) {
        bucketList[index] = [key];
      } else {
        bucketList[index].push([key]);
      }
    };
  
    const has = (key) => {
      const index = hash(key);
      if (bucketList[index] === undefined) {
        return false;
      }
      for (let item of bucketList[index]) {
        if (item === key) {
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
        if (item === key) {
          bucketList[index].splice(i, 1);
          size -= 1;
        } 
        i += 1;
      }
    };
  
    const length = () => {
      return size;
    };
  
    const clear = () => {
      size = 0;
      bucketList = Array(16);
    };
  
    const keys = () => {
      const keyList = [];
      for (let bucket of bucketList) {
        if (bucket !== undefined) {
          for (let item of bucket) {
            keyList.push(item);
          }
        }
      }
      return keyList;
    };
  
  
    return {
      set,
      has,
      remove,
      length,
      clear,
      keys
    };
  }
  
  const thing = hashMap();
  thing.set('bob');
  thing.set('mark');
  thing.set('Tim');
  console.log(thing.has('mark'));
  console.log(thing.has('bobby'));
  console.log(thing.keys());
  thing.remove('Tim');
  console.log(thing.length());
  thing.clear();