import flattenArray from './flattenArray'

const getPageImages = (pages) => {

  const pageItemsArray = pages.map(page => {
    return page.sections.map(section => {
      return section.items.map(item => item)
    })
  })

  const pageItems = flattenArray(pageItemsArray)
  const itemImages = pageItems.filter(({ item }) => item.image && item.image.src).map(({ item: { image: { src }}}) => src)
  const itemBackgroundImages = pageItems.filter(({ item }) => item.backgroundImage && item.backgroundImage.src).map(({ item: { backgroundImage: { src }}}) => src)
  const sectionBackgroundImages = pages.map(page => page.sections.filter(section => section.backgroundImage.src).map(({ backgroundImage: { src }}) => src))

  return [
    ...itemImages,
    ...itemBackgroundImages,
    ...sectionBackgroundImages
  ]
}

export default getPageImages
