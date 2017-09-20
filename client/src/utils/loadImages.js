const loadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const src = url
    img.onload = () => resolve(img)
    img.src = src
  })
}

const loadImages = (urls) => {
  const promises = urls.map(url => loadImage(url));
  return Promise.all(promises).catch((err) => {
      console.warn(err.message)
  })
}

export default loadImages
