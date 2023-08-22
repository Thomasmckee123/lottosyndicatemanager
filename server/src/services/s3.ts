import { S3 } from 'aws-sdk';
import fileUpload from 'express-fileupload';


interface Response {
  location: string;
  key: string;
}

export const uploadImage = async (data: fileUpload.FileArray, userId: string) => {
  const s3 = new S3({ apiVersion: '2006-03-01' });

  s3.config.region = 'eu-west-1';

  s3.config.credentials = {
    accessKeyId: process.env.ACCESS_KEY ?? '',
    secretAccessKey: process.env.SECRET_ACCESS_KEY ?? '',
  };
console.log("DATA", data)
  let uploadFiles: Promise<S3.ManagedUpload.SendData>[] = [];
  for (const fileKey in data) {
    const file = data[fileKey] as any;
    const params = {
      Bucket: `lottosyndicatebucket/users/${userId}`,
      Key: file.name,
      Body: file.data,
    };
    const upload = s3.upload(params).promise();
    uploadFiles.push(upload);
  }

  const responses = await Promise.all(uploadFiles);

  const locations: Response[] = responses.map((x) => ({
    location: x.Location,
    key: x.Key,
  }));

  return locations;
};

const S3Service = { uploadImage };

export { S3Service }; 