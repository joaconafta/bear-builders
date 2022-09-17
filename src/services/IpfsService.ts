import { create, CID, IPFSHTTPClient } from 'ipfs-http-client'
import { v4 as uuidv4 } from 'uuid'

export const uploadToIpfs = async (title: string, category: string, body: string) => {
  console.log('arranca...')
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
    animation_url: '',
    image: '',
    cover: '',
    imageMimeType: '',
    name: title,
    attributes: [{ displayType: 'string', traitType: 'Publication', value: 'LenstubeVideo' }],
    media: [],
    appId: 'Lenstube'
  }

  console.log('hola')
  const result = await (ipfs as IPFSHTTPClient).add(JSON.stringify(metadata))
  return result.cid.toString()
  //   console.log(result)
  // }
}
