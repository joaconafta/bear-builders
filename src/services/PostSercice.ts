import { gql } from '@apollo/client'
import { apolloClientForPost } from './Apollo-Client';
import { signedTypeData, getAddressFromSigner, splitSignature } from './EtherService';
import { lensHub } from './lensHub';

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
   return apolloClientForPost.mutate({
    mutation: gql(CREATE_POST_TYPED_DATA),
    variables: {
      request: createPostTypedDataRequest
    },
  })
}

export const createPost = async () => {
  // hard coded to make the code example clear
  const createPostRequest = {
    profileId: "0x46c1",
    contentURI: "https://t2.ea.ltmcdn.com/es/posts/1/3/2/como_hacer_feliz_a_tu_perro_24231_orig.jpg",
    collectModule: {
        freeCollectModule:  {
            "followerOnly": true
         }
    },
    referenceModule: {
        followerOnlyReferenceModule: false
    }
  };
  const result = await createPostTypedData(createPostRequest);
  console.log('resultttt ', result)
  const typedData = result.data.createPostTypedData.typedData;
  
  const signature = await signedTypeData(typedData.domain, typedData.types, typedData.value);
  const { v, r, s } = splitSignature(signature);
  
  console.log('signatureeee ', signature)
  console.log('vvvvv ', v)
  console.log('rrrrr ', r)
  console.log('sssss ', s)
  
  const tx = await lensHub.postWithSig({
    profileId: typedData.value.profileId,
    contentURI:typedData.value.contentURI,
    collectModule: typedData.value.collectModule,
    collectModuleInitData: typedData.value.collectModuleInitData,
    referenceModule: typedData.value.referenceModule,
    referenceModuleInitData: typedData.value.referenceModuleInitData,
    sig: {
      v,
      r,
      s,
      deadline: typedData.value.deadline,
    },
  });
  console.log(tx.hash);
  // 0x64464dc0de5aac614a82dfd946fc0e17105ff6ed177b7d677ddb88ec772c52d3
  // you can look at how to know when its been indexed here: 
  //   - https://docs.lens.dev/docs/has-transaction-been-indexed
}