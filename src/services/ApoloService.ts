import { ApolloClient, InMemoryCache, gql } from '@apollo/client'
import { apolloClientWithToken } from './Apollo-Client'

const APIURL = 'https://api-mumbai.lens.dev/'

export const apolloClient = new ApolloClient({
  uri: APIURL,
  cache: new InMemoryCache()
})

//QUERYS

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

const GET_PROFILES = `
  query($request: ProfileQueryRequest!) {
    profiles(request: $request) {
      items {
        id
        name
        bio
        attributes {
          displayType
          traitType
          key
          value
        }
        followNftAddress
        metadata
        isDefault
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        handle
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        ownedBy
        dispatcher {
          address
          canUseRelay
        }
        stats {
          totalFollowers
          totalFollowing
          totalPosts
          totalComments
          totalMirrors
          totalPublications
          totalCollects
        }
        followModule {
          ... on FeeFollowModuleSettings {
            type
            amount {
              asset {
                symbol
                name
                decimals
                address
              }
              value
            }
            recipient
          }
          ... on ProfileFollowModuleSettings {
          type
          }
          ... on RevertFollowModuleSettings {
          type
          }
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }
`

const RECOMMENDED_PROFILES = `
  query {
    recommendedProfiles {
        id
        name
        bio
        attributes {
            displayType
            traitType
            key
            value
        }
        metadata
        isDefault
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              width
              height
              mimeType
            }
            small {
              url
              width
              height
              mimeType
            }
            medium {
              url
              width
              height
              mimeType
            }
          }
          __typename
        }
        handle
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              width
              height
              mimeType
            }
            small {
              height
              width
              url
              mimeType
            }
            medium {
              url
              width
              height
              mimeType
            }
          }
          __typename
        }
        ownedBy
        dispatcher {
          address
          canUseRelay
        }
        stats {
          totalFollowers
          totalFollowing
          totalPosts
          totalComments
          totalMirrors
          totalPublications
          totalCollects
        }
        followModule {
          ... on FeeFollowModuleSettings {
            type
            amount {
              asset {
                symbol
                name
                decimals
                address
              }
              value
            }
            recipient
          }
          ... on ProfileFollowModuleSettings {
           type
          }
          ... on RevertFollowModuleSettings {
           type
          }
      }
    }
  }
`

//FUNCTIONS

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
    fetchPolicy: 'no-cache',
    variables: {
      request: {
        address
      }
    }
  })
}

export const getProfiles = (address: string) => {
  return apolloClient.query({
    query: gql(GET_PROFILES),
    variables: {
      request: {
        ownedBy: [address],
        limit: 10
      }
    }
  })
}

export const getRecommendedProfiles = () => {
  return apolloClient.query({
    query: gql(RECOMMENDED_PROFILES)
  })
}

const CREATE_PROFILE = `
mutation CreateProfile {
    createProfile(request:{ 
                  handle: "devjoshstevens",
                  profilePictureUri: null,
                  followNFTURI: null,
                  followModule: null
                  }) {
      ... on RelayerResult {
        txHash
      }
      ... on RelayError {
        reason
      }
      __typename
    }
  }
`

export const createProfile = (handle: string) => {
  const createProfileRequest = {
    handle,
    profilePictureUri: 'https://ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX',
    followModule: {
      freeFollowModule: true
    }
  }
  console.log(createProfileRequest)
  return apolloClientWithToken.mutate({
    mutation: gql(CREATE_PROFILE),
    variables: {
      request: {
        handle,
        profilePictureUri: 'https://ipfs.io/ipfs/QmY9dUwYu67puaWBMxRKW98LPbXCznPwHUbhX5NeWnCJbX',
        followModule: {
          freeFollowModule: true
        }
      }
    }
  })
}
