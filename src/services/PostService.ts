import { gql } from '@apollo/client'
import { ProfileType } from '../types/ProfileType'
import { apolloClientWithToken as apolloClientWithToken } from './Apollo-Client'
import { signedTypeData, getAddressFromSigner, splitSignature } from './EtherService'
import { lensHub } from './lensHub'

const CREATE_POST_TYPED_DATA = `
  mutation($request: CreatePublicPostRequest!) { 
    createPostTypedData(request: $request) {
      id
      expiresAt
      typedData {
        types {
          PostWithSig {
            name
            type
          }
        }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
        contentURI
        collectModule
        collectModuleInitData
        referenceModule
        referenceModuleInitData
      }
     }
   }
 }
`

export const createPostTypedData = (createPostTypedDataRequest: any) => {
  return apolloClientWithToken.mutate({
    mutation: gql(CREATE_POST_TYPED_DATA),
    variables: {
      request: createPostTypedDataRequest
    }
  })
}

export const createPost = async (profile: ProfileType) => {
  // hard coded to make the code example clear
  const createPostRequest = {
    profileId: profile.id,
    contentURI: 'ipfs://QmP9QAeZijDsPFFQQNgZhANWAw64yY87vtUz4AgQF1SZ3M',
    collectModule: {
      freeCollectModule: {
        followerOnly: true
      }
    },
    referenceModule: {
      followerOnlyReferenceModule: false
    }
  }
  const result = await createPostTypedData(createPostRequest)
  const typedData = result.data.createPostTypedData.typedData

  const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value)
  const { v, r, s } = splitSignature(signature)

  const tx = await lensHub.postWithSig({
    profileId: typedData.value.profileId,
    contentURI: typedData.value.contentURI,
    collectModule: typedData.value.collectModule,
    collectModuleInitData: typedData.value.collectModuleInitData,
    referenceModule: typedData.value.referenceModule,
    referenceModuleInitData: typedData.value.referenceModuleInitData,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline
    }
  })
  console.log(tx.hash)
  // 0x64464dc0de5aac614a82dfd946fc0e17105ff6ed177b7d677ddb88ec772c52d3
  // you can look at how to know when its been indexed here:
  //   - https://docs.lens.dev/docs/has-transaction-been-indexed
}
