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
    console.log(bucketList);
  };

  return {
    set
  };
}

const thing = hashMap();
thing.set('bob', 7);
thing.set('mark', 78);
thing.set('Tim', 12);


