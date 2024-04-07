import OSS from 'ali-oss'
    
const client = new OSS({
    region: 'oss-cn-hangzhou',
    accessKeyId: process.env.NEXT_PUBLIC_OSS_ACCESS_KEY_ID,
    accessKeySecret: process.env.NEXT_PUBLIC_OSS_ACCESS_KEY_SECRET,
    bucket: 'anime123',
  });
  
export async function uploadAndDownloadFile(fileName, blob) {
  try {
    console.log('filename', blob)
    const uploadResult = await client.put(fileName, blob);
    console.log('上传成功:', uploadResult);

    return uploadResult.url;
  } catch (error) {
    console.error('uploadAndDownloadFile 发生错误:', error);
    return 
  }
}