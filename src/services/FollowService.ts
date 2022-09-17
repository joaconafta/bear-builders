import { gql } from '@apollo/client'
import { apolloClientWithToken as apolloClientWithToken } from './Apollo-Client'
import { signedTypeData, getAddressFromSigner, splitSignature } from './EtherService'
import { lensHub } from './lensHub'

const CREATE_FOLLOW_TYPED_DATA = `
 mutation($request: FollowRequest!) { 
   createFollowTypedData(request: $request) {
     id
     expiresAt
     typedData {
       domain {
         name
         chainId
         version
         verifyingContract
       }
       types {
         FollowWithSig {
           name
           type
         }
       }
       value {
         nonce
         deadline
         profileIds
         datas
       }
     }
   }
}
`

export const createFollowTypedData = () => {
  return apolloClientWithToken.mutate({
    mutation: gql(CREATE_FOLLOW_TYPED_DATA),
    variables: {
      request: {
        follow: [
          {
            profile: '0x46c8'
          }
        ]
      }
    }
  })
}
