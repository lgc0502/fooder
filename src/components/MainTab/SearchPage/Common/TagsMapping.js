const diff = (array, target) => {
  return array.filter( element => target.indexOf(element) < 0 )
}

export default {
  maptags: (querytag, storetag) => {
    const difftag = []
    const temp = []
    const Tags = [
      { key: 0, label: ' 早午餐 ', choose: 0, id: '5c222d594bdbfc29bb7d47bf' },
      { key: 1, label: ' 下午茶 ', choose: 0, id: '5c222d594bdbfc29bb7d47c0' },
      { key: 2, label: '午餐', choose: 0, id: '5c222d594bdbfc29bb7d47c1' },
      { key: 3, label: '晚餐', choose: 0, id: '5c222d594bdbfc29bb7d47c2' },
      { key: 4, label: '宵夜', choose: 0, id: '5c222d594bdbfc29bb7d47c3' },
      { key: 5, label: ' 來點湯 ', choose: 0, id: '5c222d594bdbfc29bb7d47b8' },
      { key: 6, label: '  點心  ', choose: 0, id: '5c222d594bdbfc29bb7d47bc' },
      { key: 7, label: '  小吃  ', choose: 0, id: '5c222d594bdbfc29bb7d47bd' },
      { key: 8, label: '小編推薦', choose: 0, id: '5c222d594bdbfc29bb7d47d6' },
      { key: 9, label: '氣氛悠閒', choose: 0, id: '5c222d594bdbfc29bb7d47cc' },
      { key: 10, label: '相機先吃', choose: 0, id: '5c222d594bdbfc29bb7d47c6' },
      { key: 11, label: '  久坐  ', choose: 0, id: '5c222d594bdbfc29bb7d47ca' },
      { key: 12, label: ' 吃粗飽 ', choose: 0, id: '5c222d594bdbfc29bb7d47d2' },
      { key: 13, label: '氣氛歡樂', choose: 0, id: '5c222d594bdbfc29bb7d47cd' }
    ]
    for (let i = 0; i < diff(storetag, querytag).length; i++) {
      difftag.push(diff(storetag, querytag)[i]['text'])
    }
    for (let i = 0; i < Tags.length; i++) {
      for (let j = 0; j < difftag.length; j++) {
        if (Tags[i]['label'] === difftag[j]) {
          temp.push(Tags[i]['label'])
        }
      }
    }
    return temp
  },

  sametags: (querytag, storetag) => {
    const temp = []
    for (let i = 0; i < querytag.length; i++) {
      for (let j = 0; j < storetag.length; j++) {
        if (querytag[i] === storetag[j]['id']) {
          temp.push(storetag[j]['text'])
        }
      }
    }
    return temp
  }
}
