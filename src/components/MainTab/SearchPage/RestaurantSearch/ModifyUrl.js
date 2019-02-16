export default {
  ModifyUrl: originUrl => {
    const newUrl = []
    originUrl.map(d => {
      newUrl.push(d.replace('w374-h213', 'w175-h104'))
    })
    return newUrl
  }
}
