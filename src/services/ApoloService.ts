import { ApolloClient, InMemoryCache, gql } from '@apollo/client'

const APIURL = 'https://api-mumbai.lens.dev/'

export const apolloClient = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache()
})

const AUTHENTICATION = `
  mutation($request: SignedAuthChallenge!) { 
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`

const GET_CHALLENGE = `
  query($request: ChallengeRequest!) {
    challenge(request: $request) { text }
  }`

export const authenticate = (address: string, signature: string) => {
  return apolloClient.mutate({
    mutation: gql(AUTHENTICATION),
    variables: {
      request: {
        address,
        signature
      }
    }
  })
}

export const generateChallenge = (address: string) => {
  return apolloClient.query({
    query: gql(GET_CHALLENGE),
    variables: {
      request: {
        address
      }
    }
  })
}
