const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const src = url
    img.src = src
    if (img.complete) {
      console.log(img.complete)
      return resolve(img)
    }
    img.onload = () => resolve(img)
  })
}

const loadImages = (urls) => {
  const promises = urls.map(url => loadImage(url));
  return Promise.all(promises).catch((err) => {
      console.warn(err.message)
  })
}

export default loadImages
