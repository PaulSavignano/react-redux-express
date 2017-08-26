import AWS from 'aws-sdk'

const s3 = new AWS.S3()

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  subregion: 'us-west-2',
})

const Bucket = process.env.AWS_S3_BUCKET
const ACL = 'public-read'

export const uploadFile = ({ Key }, imageSrc, oldImageSrc) => {
  const Body = new Buffer(imageSrc.replace(/^data:image\/\w+;base64,/, ""),'base64')
  const params = { Bucket, Key, Body, ACL }
  if (oldImageSrc) s3.deleteObject({ Bucket, Key: oldImageSrc }).promise()
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
