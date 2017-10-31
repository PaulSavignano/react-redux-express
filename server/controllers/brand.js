import express from 'express'
import { ObjectID } from 'mongodb'
import url from 'url'
import moment from 'moment'

import Brand from '../models/Brand'
import { uploadFile, deleteFile } from '../utils/s3'

export const add = (req, res) => {
  const { hostname } = req
  const newBrand = new Brand({ hostname })
  newBrand.save()
  .then(brand => res.send(brand))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}


export const get = (req, res) => {
  const { hostname } = req
  Brand.find({ hostname })
  .then(doc => {
    if (!doc) return Promise.reject('brand not found')
    res.send(doc)
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}



export const updateAppBarWithImage = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    body: {
      newImage,
      pageSlug,
      oldImageSrc,
      values
    },
    hostname,
    params: { _id }
  } = req
  const imageKey = `${hostname}/brand-${_id}-appbar-image_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return uploadFile({ Key: imageKey }, newImage.src, oldImageSrc)
  .then(data => {
    return Brand.findOneAndUpdate(
      { _id, hostname },
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
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    body: {
      oldImageSrc,
      values
    },
    hostname,
    params: { _id }
  } = req
  return deleteFile({ Key: oldImageSrc })
  .then(data => {
    console.log(data)
    return Brand.findOneAndUpdate(
      { _id, hostname },
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
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    body: {
      values
    },
    hostname,
    params: { _id },
  } = req
  return Brand.findOneAndUpdate(
    { _id, hostname },
    { $set: {
      'appBar.values': values
    }},
    { new: true }
  )
  .then(brand => res.send(brand))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}



export const updateArticleStyle = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalide id'})
  const {
    body: { values },
    hostname,
    params: { _id }
  } = req
  Brand.findOneAndUpdate(
    { _id, hostname },
    { $set: { articleStyle: { values }}},
    { new: true }
  )
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send()})
}



export const updateBodyWithBackgroundImage = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    body: {
      newBackgroundImage,
      pageSlug,
      oldBackgroundImageSrc,
      values
    },
    hostname,
    params: { _id }
  } = req
  const backgroundImageKey = `${hostname}/brand-${_id}-body-background-image_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return uploadFile({ Key: backgroundImageKey }, newBackgroundImage.src, oldBackgroundImageSrc)
  .then(data => {
    return Brand.findOneAndUpdate(
      { _id, hostname },
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
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    body: {
      oldBackgroundImageSrc,
      values
    },
    hostname,
    params: { _id }
  } = req
  return deleteFile({ Key: oldBackgroundImageSrc })
  .then(data => {
    console.log(data)
    return Brand.findOneAndUpdate(
      { _id, hostname },
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
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    body: { values },
    hostname,
    params: { _id }
  } = req
  return Brand.findOneAndUpdate(
    { _id, hostname },
    { $set: {
      'body.values': values
    }},
    { new: true }
  )
  .then(brand => res.send(brand))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}



export const updateBusinessWithImage = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    body: {
      newImage,
      pageSlug,
      oldImageSrc,
      values
    },
    hostname,
    params: { _id }
  } = req
  const imageKey = `${hostname}/brand-${_id}-business-image_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return uploadFile({ Key: imageKey }, newImage.src, oldImageSrc)
  .then(data => {
    return Brand.findOneAndUpdate(
      { _id, hostname },
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
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    body: {
      oldImageSrc,
      values
    },
    hostname,
    params: { _id }
  } = req
  return deleteFile({ Key: oldImageSrc })
  .then(data => {
    console.log(data)
    return Brand.findOneAndUpdate(
      { _id, hostname },
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
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    body: { values },
    hostname,
    params: { _id },
  } = req
  return Brand.findOneAndUpdate(
    { _id, hostname },
    { $set: {
      'business.values': values
    }},
    { new: true }
  )
  .then(brand => res.send(brand))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}





export const updateCardStyle = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalide id'})
  const {
    body: { values },
    hostname,
    params: { _id },
  } = req
  Brand.findOneAndUpdate(
    { _id, hostname },
    { $set: { cardStyle: { values }}},
    { new: true }
  )
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send()})
}







export const updateFooterWithImageAndBackgroundImage = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    body: {
      newImage,
      newBackgroundImage,
      pageSlug,
      oldImageSrc,
      oldBackgroundImageSrc,
      values
    },
    hostname,
    params: { _id }
  } = req
  const imageKey = `${hostname}/brand-${_id}-footer-image_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  const backgroundImageKey = `${hostname}/brand-${_id}-footer-background-image_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return uploadFile({ Key: imageKey }, newImage.src, oldImageSrc)
  .then(imageData => {
    return Brand.findOneAndUpdate(
      { _id, hostname },
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
          { _id, hostname },
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
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    body: {
      newImage,
      pageSlug,
      oldImageSrc,
      oldBackgroundImageSrc,
      values
    },
    hostname,
    params: { _id }
  } = req
  const imageKey = `${hostname}/brand-${_id}-footer-image_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return deleteFile({ Key: oldBackgroundImageSrc })
  .then(data => {
    console.log(data)
    return uploadFile({ Key: imageKey }, newImage.src, oldImageSrc)
    .then(data => {
      return Brand.findOneAndUpdate(
        { _id, hostname },
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
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    body: {
      newBackgroundImage,
      pageSlug,
      oldImageSrc,
      oldBackgroundImageSrc,
      type,
      values
    },
    hostname,
    params: { _id }
  } = req
  const backgroundImageKey = `${hostname}/brand-${_id}-footer-background-image_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return deleteFile({ Key: oldImageSrc })
  .then(data => {
    console.log(data)
    return uploadFile({ Key: backgroundImageKey }, newBackgroundImage.src, oldBackgroundImageSrc)
    .then(data => {
      return Brand.findOneAndUpdate(
        { _id, hostname },
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
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    body: {
      oldImageSrc,
      oldBackgroundImageSrc,
      values
    },
    hostname,
    params: { _id }
  } = req
  return deleteFile({ Key: oldImageSrc })
  .then(dataOne => {
    console.log(dataOne)
    return deleteFile({ Key: oldBackgroundImageSrc })
    .then(dataTwo => {
      console.log(dataTwo)
      return Brand.findOneAndUpdate(
        { _id, hostname },
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
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    body: {
      newImage,
      pageSlug,
      oldImageSrc,
      values
    },
    hostname,
    params: { _id }
  } = req
  const imageKey = `${hostname}/brand-${_id}-footer-image_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return uploadFile({ Key: imageKey }, newImage.src, oldImageSrc)
  .then(data => {
    return Brand.findOneAndUpdate(
      { _id, hostname },
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
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    body: {
      newBackgroundImage,
      pageSlug,
      oldBackgroundImageSrc,
      values
    },
    hostname,
    params: { _id }
  } = req
  const backgroundImageKey = `${hostname}/brand-${_id}-footer-background-image_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return uploadFile({ Key: backgroundImageKey }, newBackgroundImage.src, oldBackgroundImageSrc)
  .then(data => {
    return Brand.findOneAndUpdate(
      { _id, hostname },
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
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    body: {
      oldImageSrc,
      values
    },
    hostname,
    params: { _id }
  } = req
  return deleteFile({ Key: oldImageSrc })
  .then(deleteData => {
    console.log(deleteData)
    return Brand.findOneAndUpdate(
      { _id, hostname },
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
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    body: {
      oldBackgroundImageSrc,
      values
    },
    hostname,
    params: { _id }
  } = req
  return deleteFile({ Key: oldBackgroundImageSrc })
  .then(deleteData => {
    console.log(deleteData)
    return Brand.findOneAndUpdate(
      { _id, hostname },
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
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    body: {
      values
    },
    hostname,
    params: { _id }
  } = req
  return Brand.findOneAndUpdate(
    { _id, hostname },
    { $set: {
      'footer.values': values
    }},
    { new: true }
  )
  .then(brand => res.send(brand))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}




export const updateHeroStyle = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalide id'})
  const {
    body: {
      values
    },
    hostname,
    params: { _id }
  } = req
  Brand.findOneAndUpdate(
    { _id, hostname },
    { $set: { heroStyle: { values }}},
    { new: true }
  )
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}


export const updatePalette = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id'})
  const {
    body: { values },
    hostname,
    params: { _id }
  } = req
  Brand.findOneAndUpdate(
    { _id, hostname },
    { $set: { palette: { values }}},
    { new: true }
  )
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const updateProductStyle = (req, res) => {
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalide id'})
  const {
    body: { values },
    hostname,
    params: { _id }
  } = req
  Brand.findOneAndUpdate(
    { _id, hostname },
    { $set: { productStyle: { values }}},
    { new: true }
  )
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}


export const updateTypography = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send({ error: 'Invalid id'})
  const {
    body: { values },
    hostname,
    params: { _id }
  } = req
  Brand.findOneAndUpdate(
    { _id, hostname },
    { $set: { typography: { values }}},
    { new: true }
  )
  .then(doc => res.send(doc))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}



// Delete
export const remove = (req, res) => {
  if (!ObjectID.isValid(req.params._id)) return res.status(404).send()
  const { _id, hostname } = req
  Brand.findOneAndRemove({ _id, hostname })
  .then(_id => res.send(_id))
  .catch(error => { console.error(error); res.status(400).send({ error })})
}
