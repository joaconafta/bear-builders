export type ProfileType = {
  id: string
  bio: string
  metadata: string
  picture: MediaSet
  handle: string
  name: string
}

type MediaSet = {
  original: {
    url: string
    mimeType: string
  }
}
