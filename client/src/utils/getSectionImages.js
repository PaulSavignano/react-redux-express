const getSectionImages = (section) => {
  const sectionImage = section.image && section.image.src ? [section.image.src] : []
  const images = section.items.filter(({ item }) => item.image && item.image.src).map(({ item: { image: { src }}}) => src)
  const backgroundImages = section.items.filter(({ item }) => item.backgroundImage && item.backgroundImage.src).map(({ item: { backgroundImage: { src }}}) => src)
  return [
    ...sectionImage,
    ...images,
    ...backgroundImages
  ]
}

export default getSectionImages
