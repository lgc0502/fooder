export default {
  DistanceFormat: (distance, vehicle) => {
    /* if (distance < 1) {
      return (Math.round(distance * 100) / 100) * 1000 + '公尺'
    } else if (distance >= 1) {
      // return Math.round(distance * 10) / 10 + '公里'
      return `步行約 ${Math.round(distance * 15)} 分鐘`
    }*/
    let type = 0
    let typeString = ''
    switch(Number(vehicle)) {
      case 0:
        typeString = '步行'
        type = 16
        break
      case 1:
        typeString = '腳踏車'
        type = 8
        break
      case 2:
        typeString = '汽機車'
        type = 4
        break
      default:
    }
    return `${typeString}約 ${Math.round(distance * type)} 分鐘`
  }
}
