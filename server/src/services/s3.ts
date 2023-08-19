import { S3 } from 'aws-sdk';

export const uploadS3 = async () => {
  const s3 = new S3({ apiVersion: '2006-03-01' });

  s3.config.region = 'eu-west-1';

  s3.config.credentials = {
    accessKeyId: process.env.ACCESS_KEY ?? '',
    secretAccessKey: process.env.SECRET_ACCESS_KEY ?? '',
  };

  const params = {
    Bucket: 'test-09834838434',
    Key: `${Date.now()}-test.txt`,
    Body: 'hello-world',
  };

  const response = await s3.upload(params).promise();

  return response.Location;
};