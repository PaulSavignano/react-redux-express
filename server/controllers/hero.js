import { ObjectID } from 'mongodb'
import moment from 'moment'

import Page from '../models/Page'
import Section from '../models/Section'
import Hero from '../models/Hero'
import { deleteFile, uploadFile } from '../utils/s3'

// Find out why req is empty
export const add = (req, res) => {
  const { pageId, pageSlug, sectionId } = req.body
  const newDoc = new Hero({
    section: ObjectID(sectionId),
    page: ObjectID(pageId),
    pageSlug,
    image: null,
    values: {}
  })
  newDoc.save()
  .then(doc => {
    Section.findOneAndUpdate(
      { _id: doc.section },
      { $push: { items: { kind: 'Hero', item: doc._id }}},
      { new: true }
    )
    .then(section => {
      Page.findOne({ _id: section.page })
      .then(page => res.send({ editItem: doc, page }))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}






export const updateWithImageAndBackgroundImage = (req, res) => {
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
  const imageKey = `${rootUrl}/page-${pageSlug}/hero-${_id}_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  const backgroundImageKey = `${rootUrl}/page-${pageSlug}/hero-background-${_id}_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return uploadFile({ Key: imageKey }, newImage.src, oldImageSrc)
  .then(imageData => {
    return Hero.findOneAndUpdate(
      { _id },
      { $set: {
        image: {
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
        return Hero.findOneAndUpdate(
          { _id },
          { $set: {
            backgroundImage: {
              src: backgroundImageData.Location,
              width: newBackgroundImage.width,
              height: newBackgroundImage.height
            },
            values
          }},
          { new: true }
        )
        .then(hero => {
          return Page.findOne({ _id: hero.page })
          .then(page => res.send({ page }))
          .catch(error => { console.error(error); res.status(400).send({ error })})
        })
        .catch(error => { console.error(error); res.status(400).send({ error })})
      })
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const updateWithImageAndDeleteBackgroundImage = (req, res) => {
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
  const imageKey = `${rootUrl}/page-${pageSlug}/hero-${_id}_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return deleteFile({ Key: oldBackgroundImageSrc })
  .then(deleteData => {
    console.log(deleteData)
    return uploadFile({ Key: imageKey }, newImage.src, oldImageSrc)
    .then(data => {
      return Hero.findOneAndUpdate(
        { _id },
        { $set: {
          backgroundImage: {
            src: data.Location,
            width: newBackgroundImage.width,
            height: newBackgroundImage.height
          },
          'image.src': null,
          values
        }},
        { new: true }
      )
      .then(hero => {
        return Page.findOne({ _id: hero.page })
        .then(page => res.send({ page }))
        .catch(error => { console.error(error); res.status(400).send({ error })})
      })
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const updateWithBackgroundImageAndDeleteImage = (req, res) => {
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
  const backgroundImageKey = `${rootUrl}/page-${pageSlug}/hero-background-${_id}_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return deleteFile({ Key: oldImageSrc })
  .then(deleteData => {
    console.log(deleteData)
    return uploadFile({ Key: backgroundImageKey }, newBackgroundImage.src, oldBackgroundImageSrc)
    .then(data => {
      return Hero.findOneAndUpdate(
        { _id },
        { $set: {
          backgroundImage: {
            src: data.Location,
            width: newBackgroundImage.width,
            height: newBackgroundImage.height
          },
          'image.src': null,
          values
        }},
        { new: true }
      )
      .then(hero => {
        return Page.findOne({ _id: hero.page })
        .then(page => res.send({ page }))
        .catch(error => { console.error(error); res.status(400).send({ error })})
      })
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const updateWithDeleteImageAndDeleteBackgroundImage = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    oldImageSrc,
    oldBackgroundImageSrc,
    values
  } = req.body
  return deleteFile({ Key: oldImageSrc })
  .then(deleteData1 => {
    console.log(deleteData1)
    return deleteFile({ Key: oldBackgroundImageSrc })
    .then(deleteData2 => {
      console.log(deleteData2)
      return Hero.findOneAndUpdate(
        { _id },
        { $set: {
          'backgroundImage.src': null,
          'image.src': null,
          values
        }},
        { new: true }
      )
      .then(hero => {
        return Page.findOne({ _id: hero.page })
        .then(page => res.send({ page }))
        .catch(error => { console.error(error); res.status(400).send({ error })})
      })
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const updateWithImage = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    newImage,
    pageSlug,
    oldImageSrc,
    values
  } = req.body
  const rootUrl = req.get('host')
  const imageKey = `${rootUrl}/page-${pageSlug}/hero-${_id}_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return uploadFile({ Key: imageKey }, newImage.src, oldImageSrc)
  .then(data => {
    return Hero.findOneAndUpdate(
      { _id },
      { $set: {
        image: {
          src: data.Location,
          width: newImage.width,
          height: newImage.height
        },
        values
      }},
      { new: true }
    )
    .then(hero => {
      return Page.findOne({ _id: hero.page })
      .then(page => res.send({ page }))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const updateWithBackgroundImage = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    newBackgroundImage,
    pageSlug,
    oldBackgroundImageSrc,
    values
  } = req.body
  const rootUrl = req.get('host')
  const backgroundImageKey = `${rootUrl}/page-${pageSlug}/hero-background-${_id}_${moment(Date.now()).format("YYYY-MM-DD_h-mm-ss-a")}`
  return uploadFile({ Key: backgroundImageKey }, newBackgroundImage.src, oldBackgroundImageSrc)
  .then(data => {
    return Hero.findOneAndUpdate(
      { _id },
      { $set: {
        backgroundImage: {
          src: data.Location,
          width: newBackgroundImage.width,
          height: newBackgroundImage.height
        },
        values
      }},
      { new: true }
    )
    .then(hero => {
      return Page.findOne({ _id: hero.page })
      .then(page => res.send({ page }))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const updateWithDeleteImage = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    oldImageSrc,
    values
  } = req.body
  return deleteFile({ Key: oldImageSrc })
  .then(deleteData => {
    console.log(deleteData)
    return Hero.findOneAndUpdate(
      { _id },
      { $set: {
        'image.src': null,
        values
      }},
      { new: true }
    )
    .then(hero => {
      return Page.findOne({ _id: hero.page })
      .then(page => res.send({ page }))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const updateWithDeleteBackgroundImage = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    oldBackgroundImageSrc,
    values
  } = req.body
  return deleteFile({ Key: oldBackgroundImageSrc })
  .then(deleteData => {
    console.log(deleteData)
    return Hero.findOneAndUpdate(
      { _id },
      { $set: {
        'backgroundImage.src': null,
        values
      }},
      { new: true }
    )
    .then(hero => {
      return Page.findOne({ _id: hero.page })
      .then(page => res.send({ page }))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}

export const updateValues = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id' })
  const {
    values
  } = req.body
  return Hero.findOneAndUpdate(
    { _id },
    { $set: {
      values
    }},
    { new: true }
  )
  .then(hero => {
    return Page.findOne({ _id: hero.page })
    .then(page => res.send({ page }))
    .catch(error => { console.error(error); res.status(400).send({ error })})
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}










export const remove = (req, res) => {
  const { _id } = req.params
  if (!ObjectID.isValid(_id)) return res.status(404).send({ error: 'Invalid id'})
  Hero.findOneAndRemove({ _id })
  .then(doc => {
    Section.findOneAndUpdate(
      { _id: doc.section },
      { $pull: { items: { kind: 'Hero', item: doc._id }}},
      { new: true }
    )
    .then(section => {
      Page.findOne({ _id: section.page })
      .then(page => res.send({ page }))
      .catch(error => { console.error(error); res.status(400).send({ error })})
    })
  })
  .catch(error => { console.error(error); res.status(400).send({ error })})
}
