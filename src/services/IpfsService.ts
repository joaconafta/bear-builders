import { create, CID, IPFSHTTPClient } from 'ipfs-http-client'
import { v4 as uuidv4 } from 'uuid'

export const uploadToIpfs = async () => {
  // const ipfs = await IPFS.create()
  let ipfs: IPFSHTTPClient | undefined
  try {
    ipfs = create({
      url: 'https://ipfs.infura.io:5001/api/v0'
    })
  } catch (error) {
    console.error('IPFS error ', error)
    ipfs = undefined
  }

  let metadata = {
    version: '1.0.0',
    metadata_id: uuidv4(),
    description: 'This should be stored on-chain and showed to next generations.',
    content: '',
    external_url: null,
    animation_url: '',
    image: '',
    cover: '',
    imageMimeType: '',
    name: 'Bear Builders Hackathon',
    attributes: [{ displayType: 'string', traitType: 'Publication', value: 'LenstubeVideo' }],
    media: [],
    appId: 'Lenstube'
  }

  const result = await (ipfs as IPFSHTTPClient).add(metadata)

  console.log(result)
}
