const prevData = ['one', 'two', 'three']

const updatedDataShift = ['zero', ...prevData];
console.log('updatedDataShift:', updatedDataShift)

const updatedDataPush = [...prevData, 'four'];
console.log('updatedDataPush:', updatedDataPush)

const copyPrevDataPartial = prevData.map((item, i) => {
  if (i < 2) {
    return item.toUpperCase()
  }
}).filter(item => !!item)
console.log('copyPrevDataPartial:', copyPrevDataPartial)

const copyPrevDataPartial2 = prevData.reduce((aggregate, item, i) => {
  if (i < 2) {
    aggregate.push(item)
  } 
  return aggregate;
}, [])
console.log('copyPrevDataPartial2:', copyPrevDataPartial2)

