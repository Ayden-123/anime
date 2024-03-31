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
    // 上传文件到OSS，'object'是OSS中的文件名，'localfile'是本地文件的路径。
    const uploadResult = await client.put(fileName, blob);
    console.log('上传成功:', uploadResult);

    // TODO  存入数据库如果存入成功就返回true，否则为false
    return true;

    // 从OSS下载文件以验证上传成功。
    // const ossObj = await client.get(fileName);
    // const uint8ArrayStream = new Uint8Array(ossObj.content)
    // if (ossObj) {
    //     return uint8ArrayStream;
    // }
    // return false;;
  } catch (error) {
    console.error('uploadAndDownloadFile 发生错误:', error);
    return false;
  }
}