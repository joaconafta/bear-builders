export type FormType = {
  interest: Interest | undefined
  email: string
  phone: string
  other: string
}

export const interests = [
  '¿Tenés un proyecto que te gustaría desarrollar con IT Rock?',
  '¿Sos de una agencia con la que podamos trabajar juntos como partners?',
  '¿Te gustaría ser un desarrolador en IT Rock?',
  `¿Sos artista y querés desarrollar una Collection de NFT's?`,
  'Otro'
] as const

export type Interest = typeof interests[number]
