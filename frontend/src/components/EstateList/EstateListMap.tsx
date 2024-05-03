import { useEffect } from 'react'
import * as e from '@components/EstateList/styles/EstateListMapStyle'
import { renderToString } from 'react-dom/server'
import CustomOverlay from '@components/EstateList/CustomOverlay'
import useCurrentLocation from '@/hooks/useCurrentLocation'
import { useAtom } from 'jotai'
import {
  estateItemListAtom,
  // selectedItemAtom,
} from '@/stores/atoms/EstateListStore'
// import EstateItemCard from './EstateItemCard'

declare global {
  interface Window {
    kakao: any
  }
}
const { kakao } = window

const EstateListMap = () => {
  const { location, getCurrentLocation } = useCurrentLocation()
  // const [openCard, setOpenCard] = useState(false)
  // 부동산 매물 리스트
  const [estateItemList] = useAtom(estateItemListAtom)
  // 상세보기 선택한 부동산
  // const [item, setItem] = useAtom(selectedItemAtom)

  // 닫기 버튼
  // const handleDetailCardClose = () => {
  //   // setItem(null)
  // }

  useEffect(() => {
    getCurrentLocation()
  }, [])

  useEffect(() => {
    // 지도생성
    const container = document.getElementById('map')
    const options = {
      center: new kakao.maps.LatLng(
        location.location.latitude,
        location.location.longitude,
      ),
      level: 3,
      animate: true,
    }
    const map = new kakao.maps.Map(container, options)

    // 지도 확대 최대 레벨 설정
    map.setMaxLevel(10)

    // 지도 줌 컨트롤러
    const zoomControl = new kakao.maps.ZoomControl()
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT)

    // 지도 마커 생성
    const markerPosition = new kakao.maps.LatLng(
      location.location.latitude,
      location.location.longitude,
    )

    const marker = new kakao.maps.Marker({
      position: markerPosition,
    })
    marker.setMap(map)

    // 커스텀 오버레이 렌더링
    // 오버레이 위치 리스트에 대해 처리
    estateItemList.forEach(estateItem => {
      const position = new kakao.maps.LatLng(
        estateItem.latitude,
        estateItem.longitude,
      )
      const overlayDiv = document.createElement('div')
      overlayDiv.innerHTML = renderToString(
        <CustomOverlay condition={estateItem.condition} />,
      )
      const handleOverlayClick = () => {
        // setOpenCard(true)
        // console.log(typeof setItem)
        // setItem(estateItem)
      }

      const customOverlay = new kakao.maps.CustomOverlay({
        position: position,
        content: overlayDiv,
        xAnchor: 0.5,
        yAnchor: 0.91,
        clickable: true,
        zIndex: 4,
      })
      overlayDiv
        .querySelector('.circle')
        .addEventListener('click', handleOverlayClick)
      customOverlay.setMap(map)
    })
  }, [location, estateItemList])

  return (
    <>
      <e.EstateMapContainer id="map">
        {/* {item !== null && (
          <e.DetailCardContainer>
            <EstateItemCard {...item} />
            <e.CloseCardContainer>
              <div className="closeBtn" onClick={handleDetailCardClose}>
                닫기
              </div>
            </e.CloseCardContainer>
          </e.DetailCardContainer>
        )} */}
      </e.EstateMapContainer>
    </>
  )
}

export default EstateListMap
