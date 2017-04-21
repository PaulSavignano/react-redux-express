import AWS from 'aws-sdk'

const s3 = new AWS.S3()

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  subregion: 'us-west-2',
})

const uploadFile = (params) => {
  const buf = new Buffer(params.Body.replace(/^data:image\/\w+;base64,/, ""),'base64')
  return s3.upload({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: params.Key,
    Body: buf,
    ACL: 'public-read'
  }).promise()
}

export default uploadFile
