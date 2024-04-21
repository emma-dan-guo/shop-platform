export const locationIDs = [
  {
    id: 1000,
    name: 'GuangZhou'
  },
  {
    id: 1001,
    name: 'BeiJing'
  },
  {
    id: 1002,
    name: 'QingDao'
  },
  {
    id: 1003,
    name: 'WeiHai'
  },
  {
    id: 1004,
    name: 'ChangSha'
  },
  {
    id: 1005,
    name: 'WuHan'
  },
  {
    id: 1006,
    name: 'ShenYang'
  },
  {
    id: 1007,
    name: 'ChangChun'
  },
  {
    id: 1008,
    name: 'MuDanJiang'
  },
  {
    id: 1009,
    name: 'Jilin'
  },
  {
    id: 1010,
    name: 'ChangChun'
  }
]
export const categoryIDs = [
  {
    id: 1,
    name: 'Grocery'
  },
  {
    id: 2,
    name: 'MakeUp'
  },
  {
    id: 3,
    name: 'Food'
  },
  {
    id: 4,
    name: 'Clothes'
  },
  {
    id: 5,
    name: 'Transportation'
  },
  {
    id: 6,
    name: 'Accommodation'
  }
]

export const getRandom = (list: any[]) => {
  const randomIdx = Math.floor(Math.random() * list.length)
  return list.find((_, index) => index === randomIdx)
}
