import flattenArray from './flattenArray'

const getHeroImages = (pages) => {
  const itemsArray = pages.map(page => {
    return page.sections.map(section => {
      return section.items.filter(item => item.kind === 'Hero').map(item => item)
    })
  })
  const items = flattenArray(itemsArray)
  const images = items.filter(({ item }) => item.image && item.image.src).map(({ item: { image: { src }}}) => src)
  const backgroundImages = items.filter(({ item }) => item.backgroundImage && item.backgroundImage.src).map(({ item: { backgroundImage: { src }}}) => src)
  return [
    ...images,
    ...backgroundImages
  ]
}

export default getHeroImages
