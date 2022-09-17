import { create, CID, IPFSHTTPClient } from 'ipfs-http-client'
import { v4 as uuidv4 } from 'uuid'

export const uploadToIpfs = async (title: string, category: string, body: string) => {
  console.log('arranca....')
  const auth = 'Basic ' + Buffer.from('2EtmssEEVuUmjGjyOZlgY8Umij0' + ':' + '15ecec7a77558fa48a45582898213cd6').toString('base64')
  // const ipfs = await IPFS.create()
  let ipfs: IPFSHTTPClient | undefined
  try {
    ipfs = create({
      url: 'https://ipfs.infura.io:5001/api/v0',
      headers: {
        authorization: auth
      }
    })
    console.log('hola', create)
  } catch (error) {
    console.error('IPFS error ', error)
    ipfs = undefined
  }

  const metadata = {
    version: '1.0.0',
    metadata_id: uuidv4(),
    description: category,
    content: body,
    external_url: null,
    animation_url: 'https://ipfs.infura.io/ipfs/QmNMYMMBiMWbPUJKU6M2dRUScX4xniB99eKVRrtERqT96i',
    image: 'https://ipfs.infura.io/ipfs/QmWHB8e3MdxcVMxGLnB1N1ZsCSPPuuBWJseEZ6tP3YaKZn',
    cover: 'https://ipfs.infura.io/ipfs/QmWHB8e3MdxcVMxGLnB1N1ZsCSPPuuBWJseEZ6tP3YaKZn',
    imageMimeType: 'image/jpeg',
    name: title,
    attributes: [{ displayType: 'string', traitType: 'Publication', value: 'LenstubeVideo' }],
    media: [
      { item: 'https://ipfs.infura.io/ipfs/QmNMYMMBiMWbPUJKU6M2dRUScX4xniB99eKVRrtERqT96i', type: 'video/mp4' },
      { item: 'https://livepeercdn.com/asset/746b9zxagtln4u54/video', type: 'video/mp4' }
    ],
    appId: 'Lenstube'
  }

  console.log('hola')
  const result = await (ipfs as IPFSHTTPClient).add(JSON.stringify(metadata))
  console.log('result', result, result.path)
  /* return 'ipfs://QmQgv6rWdBe28fiqxkC88LTPKYHGVHp2Y9DvSF35tRgk4M' */
  return result.path
  //   console.log(result)
  // }
}
