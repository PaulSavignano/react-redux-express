import AWS from 'aws-sdk'

const s3 = new AWS.S3()

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  subregion: 'us-west-2',
})

const Bucket = process.env.AWS_S3_BUCKET
const ACL = 'public-read'

export const uploadFile = ({ Key }, image) => {
  const Body = new Buffer(image.replace(/^data:image\/\w+;base64,/, ""),'base64')
  const params = { Bucket, Key, Body, ACL }
  return s3.upload(params).promise()
}

export const deleteFile = ({ Key }) => {
  const params = { Bucket, Key }
  return s3.deleteObject(params).promise()
}

export const deleteFiles = (Keys) => {
  const params = {
    Bucket,
    Delete: {
      Objects: Keys
    }
  }
  return s3.deleteObjects(params).promise()
}

export const handleS3 = ({ imageType, Key, Body }) => {
  const hasImage = Body ? true : false
  const urlParse = hasImage ? url.parse(component.image) : null
  const hasUrl = urlParse.slashes ? true : false
  switch (imageType) {
    case 'HAS_IMAGE':
      if (hasUrl) return Promise.resolve({ data: { Location: Body }})
      if (hasImage) return uploadFile({ Key, Body })
      break
    case 'DELETE_IMAGE':
      deleteFile({ Key })
        .then(() => Promise.resolve({ data: { Location: null }}))
      break
    default:
      return Promise.resolve({ data: { Location: null }})
  }
}
