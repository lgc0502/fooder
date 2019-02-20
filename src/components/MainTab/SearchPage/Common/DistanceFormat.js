export default {
  DistanceFormat: distance => {
    if (distance < 1) {
      return (Math.round(distance * 100) / 100) * 1000 + '公尺'
    } else if (distance >= 1) {
      return Math.round(distance * 10) / 10 + '公里'
    }
  }
}
