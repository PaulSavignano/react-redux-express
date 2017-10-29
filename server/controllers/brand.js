import express from 'express'
import { ObjectID } from 'mongodb'
import url from 'url'
import moment from 'moment'

import Brand from '../models/Brand'
import { uploadFile, deleteFile } from '../utils/s3'


export const add = (req, res) => {
  const _id = new ObjectID()
  const brand = new Brand({ _id })
  brand.save()
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}


export const get = (req, res) => {
  Brand.find({})
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}


export const getId = (req, res) => {
  const _id = req.params._id
  Brand.find({ _id })
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}






export const updateAppBarWithImage = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    newImage,
    pageSlug,
    oldImageSrc,
    values
  } = req.body
  const rootUrl = req.get('host')
  const imageKey = `${rootUrl}/brand-${_id}-appbar-image_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return uploadFile({ Key: imageKey }, newImage.src, oldImageSrc)
  .then(data => {
    return Brand.findOneAndUpdate(
      { _id },
      { $set: {
        'appBar.image': {
          src: data.Location,
          width: newImage.width,
          height: newImage.height
        },
        'appBar.values': values
      }},
      { new: true }
    )
    .then(brand => res.send(brand))
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const updateAppBarWithDeleteImage = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    oldImageSrc,
    values
  } = req.body
  return deleteFile({ Key: oldImageSrc })
  .then(data => {
    console.log(data)
    return Brand.findOneAndUpdate(
      { _id },
      { $set: {
        'appBar.image.src': null,
        'appBar.values': values
      }},
      { new: true }
    )
    .then(brand => res.send(brand))
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const updateAppBarValues = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    values
  } = req.body
  return Brand.findOneAndUpdate(
    { _id },
    { $set: {
      'appBar.values': values
    }},
    { new: true }
  )
  .then(brand => res.send(brand))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}














export const updateArticleStyle = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalide id'})
  const { values } = req.body
  Brand.findOneAndUpdate(
    { _id },
    { $set: { articleStyle: { values }}},
    { new: true }
  )
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send()})
}









export const updateBodyWithBackgroundImage = (req, res) => {
  console.log('inside update body')
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    newBackgroundImage,
    pageSlug,
    oldBackgroundImageSrc,
    values
  } = req.body
  const rootUrl = req.get('host')
  const backgroundImageKey = `${rootUrl}/brand-${_id}-body-background-image_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return uploadFile({ Key: backgroundImageKey }, newBackgroundImage.src, oldBackgroundImageSrc)
  .then(data => {
    return Brand.findOneAndUpdate(
      { _id },
      { $set: {
        'body.backgroundImage': {
          src: data.Location,
          width: newBackgroundImage.width,
          height: newBackgroundImage.height
        },
        'body.values': values
      }},
      { new: true }
    )
    .then(brand => res.send(brand))
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const updateBodyWithDeleteBackgroundImage = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    oldBackgroundImageSrc,
    values
  } = req.body
  return deleteFile({ Key: oldBackgroundImageSrc })
  .then(data => {
    console.log(data)
    return Brand.findOneAndUpdate(
      { _id },
      { $set: {
        'body.backgroundImage.src': null,
        'body.values': values
      }},
      { new: true }
    )
    .then(brand => res.send(brand))
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const updateBodyValues = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    values
  } = req.body
  return Brand.findOneAndUpdate(
    { _id },
    { $set: {
      'body.values': values
    }},
    { new: true }
  )
  .then(brand => res.send(brand))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}








export const updateBusinessWithImage = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    newImage,
    pageSlug,
    oldImageSrc,
    values
  } = req.body
  const rootUrl = req.get('host')
  const imageKey = `${rootUrl}/brand-${_id}-business-image_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return uploadFile({ Key: imageKey }, newImage.src, oldImageSrc)
  .then(data => {
    return Brand.findOneAndUpdate(
      { _id },
      { $set: {
        'business.image': {
          src: data.Location,
          width: newImage.width,
          height: newImage.height
        },
        'business.values': values
      }},
      { new: true }
    )
    .then(brand => res.send(brand))
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const updateBusinessWithDeleteImage = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    oldImageSrc,
    values
  } = req.body
  return deleteFile({ Key: oldImageSrc })
  .then(data => {
    console.log(data)
    return Brand.findOneAndUpdate(
      { _id },
      { $set: {
        'business.image.src': null,
        'business.values': values
      }},
      { new: true }
    )
    .then(brand => res.send(brand))
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const updateBusinessValues = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    values
  } = req.body
  return Brand.findOneAndUpdate(
    { _id },
    { $set: {
      'business.values': values
    }},
    { new: true }
  )
  .then(brand => res.send(brand))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}





export const updateCardStyle = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalide id'})
  const { values } = req.body
  Brand.findOneAndUpdate(
    { _id },
    { $set: { cardStyle: { values }}},
    { new: true }
  )
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send()})
}







export const updateFooterWithImageAndBackgroundImage = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    newImage,
    newBackgroundImage,
    pageSlug,
    oldImageSrc,
    oldBackgroundImageSrc,
    values
  } = req.body
  const rootUrl = req.get('host')
  const imageKey = `${rootUrl}/brand-${_id}-footer-image_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  const backgroundImageKey = `${rootUrl}/brand-${_id}-footer-background-image_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return uploadFile({ Key: imageKey }, newImage.src, oldImageSrc)
  .then(imageData => {
    return Brand.findOneAndUpdate(
      { _id },
      { $set: {
        'footer.image': {
          src: imageData.Location,
          width: newImage.width,
          height: newImage.height
        },
      }},
      { new: true }
    )
    .then(() => {
      return uploadFile({ Key: backgroundImageKey }, newBackgroundImage.src, oldBackgroundImageSrc)
      .then(backgroundImageData => {
        return Brand.findOneAndUpdate(
          { _id },
          { $set: {
            'footer.backgroundImage': {
              src: backgroundImageData.Location,
              width: newBackgroundImage.width,
              height: newBackgroundImage.height
            },
            'footer.values': values
          }},
          { new: true }
        )
        .then(brand => res.send(brand))
        .catch(error => { console.error(error); res.status(400).send({ error })})
      })
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const updateFooterWithImageAndDeleteBackgroundImage = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    newImage,
    pageSlug,
    oldImageSrc,
    oldBackgroundImageSrc,
    values
  } = req.body
  const rootUrl = req.get('host')
  const imageKey = `${rootUrl}/brand-${_id}-footer-image_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return deleteFile({ Key: oldBackgroundImageSrc })
  .then(data => {
    console.log(data)
    return uploadFile({ Key: imageKey }, newImage.src, oldImageSrc)
    .then(data => {
      return Brand.findOneAndUpdate(
        { _id },
        { $set: {
          'footer.backgroundImage': {
            src: data.Location,
            width: newBackgroundImage.width,
            height: newBackgroundImage.height
          },
          'footer.image.src': null,
          'footer.values': values
        }},
        { new: true }
      )
      .then(brand => res.send(brand))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const updateFooterWithBackgroundImageAndDeleteImage = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    newBackgroundImage,
    pageSlug,
    oldImageSrc,
    oldBackgroundImageSrc,
    type,
    values
  } = req.body
  const rootUrl = req.get('host')
  const backgroundImageKey = `${rootUrl}/brand-${_id}-footer-background-image_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return deleteFile({ Key: oldImageSrc })
  .then(data => {
    console.log(data)
    return uploadFile({ Key: backgroundImageKey }, newBackgroundImage.src, oldBackgroundImageSrc)
    .then(data => {
      return Brand.findOneAndUpdate(
        { _id },
        { $set: {
          'footer.backgroundImage': {
            src: data.Location,
            width: newBackgroundImage.width,
            height: newBackgroundImage.height
          },
          'footer.image.src': null,
          'footer.values': values
        }},
        { new: true }
      )
      .then(brand => res.send(brand))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const updateFooterWithDeleteImageAndDeleteBackgroundImage = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    oldImageSrc,
    oldBackgroundImageSrc,
    values
  } = req.body
  return deleteFile({ Key: oldImageSrc })
  .then(dataOne => {
    console.log(dataOne)
    return deleteFile({ Key: oldBackgroundImageSrc })
    .then(dataTwo => {
      console.log(dataTwo)
      return Brand.findOneAndUpdate(
        { _id },
        { $set: {
          'footer.backgroundImage.src': null,
          'footer.image.src': null,
          'footer.values': values
        }},
        { new: true }
      )
      .then(brand => res.send(brand))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const updateFooterWithImage = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    newImage,
    pageSlug,
    oldImageSrc,
    values
  } = req.body
  const rootUrl = req.get('host')
  const imageKey = `${rootUrl}/brand-${_id}-footer-image_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return uploadFile({ Key: imageKey }, newImage.src, oldImageSrc)
  .then(data => {
    return Brand.findOneAndUpdate(
      { _id },
      { $set: {
        'footer.image': {
          src: data.Location,
          width: newImage.width,
          height: newImage.height
        },
        'footer.values': values
      }},
      { new: true }
    )
    .then(brand => res.send(brand))
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const updateFooterWithBackgroundImage = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    newBackgroundImage,
    pageSlug,
    oldBackgroundImageSrc,
    values
  } = req.body
  const rootUrl = req.get('host')
  const backgroundImageKey = `${rootUrl}/brand-${_id}-footer-background-image_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return uploadFile({ Key: backgroundImageKey }, newBackgroundImage.src, oldBackgroundImageSrc)
  .then(data => {
    return Brand.findOneAndUpdate(
      { _id },
      { $set: {
        'footer.backgroundImage': {
          src: data.Location,
          width: newBackgroundImage.width,
          height: newBackgroundImage.height
        },
        'footer.values': values
      }},
      { new: true }
    )
    .then(brand => res.send(brand))
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const updateFooterWithDeleteImage = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    oldImageSrc,
    values
  } = req.body
  return deleteFile({ Key: oldImageSrc })
  .then(deleteData => {
    console.log(deleteData)
    return Brand.findOneAndUpdate(
      { _id },
      { $set: {
        'footer.image.src': null,
        'footer.values': values
      }},
      { new: true }
    )
    .then(brand => res.send(brand))
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const updateFooterWithDeleteBackgroundImage = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    oldBackgroundImageSrc,
    values
  } = req.body
  return deleteFile({ Key: oldBackgroundImageSrc })
  .then(deleteData => {
    console.log(deleteData)
    return Brand.findOneAndUpdate(
      { _id },
      { $set: {
        'footer.backgroundImage.src': null,
        'footer.values': values
      }},
      { new: true }
    )
    .then(brand => res.send(brand))
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const updateFooterValues = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    values
  } = req.body
  return Brand.findOneAndUpdate(
    { _id },
    { $set: {
      'footer.values': values
    }},
    { new: true }
  )
  .then(brand => res.send(brand))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}






export const updateHeroStyle = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalide id'})
  const { values } = req.body
  Brand.findOneAndUpdate(
    { _id },
    { $set: { heroStyle: { values }}},
    { new: true }
  )
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}


export const updatePalette = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  const { values } = req.body
  Brand.findOneAndUpdate(
    { _id },
    { $set: { palette: { values }}},
    { new: true }
  )
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const updateProductStyle = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalide id'})
  const { values } = req.body
  Brand.findOneAndUpdate(
    { _id },
    { $set: { productStyle: { values }}},
    { new: true }
  )
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}


export const updateTypography = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  const { values } = req.body
  Brand.findOneAndUpdate(
    { _id },
    { $set: { typography: { values }}},
    { new: true }
  )
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}



// Delete
export const remove = (req, res) => {
  const _id = req.params._id
  if (!ObjectID.isValid(_id)) return res.status(404).send()
  Brand.findOneAndRemove({ _id })
  .then(_id => res.send(_id))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}
