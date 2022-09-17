import { signedTypeData, getAddressFromSigner, splitSignature } from './EtherService'
import { gql } from '@apollo/client'
import { apolloClientWithToken } from './Apollo-Client'
import { lensHub } from './lensHub'

const CREATE_COMMENT_TYPED_DATA = `
      mutation($request: CreatePublicCommentRequest!) { 
        createCommentTypedData(request: $request) {
          id
          expiresAt
          typedData {
            types {
              CommentWithSig {
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
            profileIdPointed
            pubIdPointed
            referenceModuleData
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

const createCommentTypedData = (createCommentTypedDataRequest: any) => {
  return apolloClientWithToken.mutate({
    mutation: gql(CREATE_COMMENT_TYPED_DATA),
    variables: {
      request: createCommentTypedDataRequest
    }
  })
}

export const createComment = async (profileId: string, contentURI: string, postId: string) => {
  // hard coded to make the code example clear
  const createCommentRequest = {
    profileId: profileId,
    publicationId: postId,
    contentURI,
    collectModule: {
      freeCollectModule: {
        followerOnly: true
      }
    },
    referenceModule: {
      followerOnlyReferenceModule: false
    }
  }

  const result = await createCommentTypedData(createCommentRequest)
  const typedData = result.data.createCommentTypedData.typedData

  const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value)
  const { v, r, s } = splitSignature(signature)

  const tx = await lensHub.commentWithSig({
    profileId: typedData.value.profileId,
    contentURI: typedData.value.contentURI,
    profileIdPointed: typedData.value.profileIdPointed,
    pubIdPointed: typedData.value.pubIdPointed,
    referenceModuleData: typedData.value.referenceModuleData,
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
