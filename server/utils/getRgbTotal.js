const getRgbTotal = (rgb) => {
  const rgbString = rgb.replace(/[^\d,]/g, '').split(',');
  const rgbInt = rgbString.map(color => parseInt(color, 10))
  const total = rgbInt.reduce((total, value) => total + value)
  return total
}

export default getRgbTotal
