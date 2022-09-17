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
 }`

export const createFollowTypedData = (followRequestInfo: { profile: string }[]) => {
  return apolloClientWithToken.mutate({
    mutation: gql(CREATE_FOLLOW_TYPED_DATA),
    variables: {
      request: followRequestInfo
    }
  })
}

export const follow = async (followsId: string) => {
  // hard coded to make the code example clear
  const followRequest = [
    {
      profile: followsId
    }
  ]
  console.log(followRequest)
  console.log(await createFollowTypedData(followRequest))
  const result = await createFollowTypedData(followRequest)
  const typedData = result.data.createFollowTypedData.typedData
  console.log('222222')

  const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value)
  const { v, r, s } = splitSignature(signature)

  const tx = await lensHub.followWithSig({
    follower: getAddressFromSigner(),
    profileIds: typedData.value.profileIds,
    datas: typedData.value.datas,
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
