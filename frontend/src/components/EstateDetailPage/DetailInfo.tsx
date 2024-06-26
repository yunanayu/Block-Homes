import * as d from '@components/EstateDetailPage/style/DetailInfoStyle'
import { useParams } from 'react-router-dom'
import DetailTabMenu from './DetailTabMenu'
import DetailFooter from './DetailFooter'
import ItemSafetyCard from './ItemSafetyCard'
import RoomInfo from './RoomInfo'
import { useGetDetailItem } from '@/apis/itemApi'
import ItemLoading from '@/common/ItemLoading'
import { useAtom } from 'jotai'
import { userAtom } from '@/stores/atoms/userStore'

const DetailInfo = () => {
  const [user] = useAtom(userAtom)
  const { id } = useParams()
  const {
    data: detailInfoData,
    isLoading,
    isError,
    error,
  } = useGetDetailItem(Number(id), user.walletAddress)
  // console.log(detailInfoData)

  if (isLoading) {
    return <ItemLoading />
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  console.log(detailInfoData)
  const accessChat = (): boolean => {
    const ownerDIDValue = detailInfoData.ownerDID.split('did:klay:')[1]
    if (user.walletAddress && ownerDIDValue !== user.walletAddress) {
      return true
    } else {
      return false
    }
  }

  //임시

  return (
    <d.DetailInfoWrapper>
      <>
        <DetailTabMenu imgUrl={detailInfoData.itemImageList} />
        {/* <button onClick={handleDelete}>삭제(임시)</button> */}
        <ItemSafetyCard condition={detailInfoData.reportRank} />
        <RoomInfo info={detailInfoData} />
        <DetailFooter info={detailInfoData} accessChat={accessChat} />
      </>
    </d.DetailInfoWrapper>
  )
}

export default DetailInfo
