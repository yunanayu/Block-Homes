import * as o from '@components/MainPage/style/OwnEstateDidListStyle'
import EstateDidCard from '@common/EstateDidCard'
import Carousel from '@components/MainPage/Carousel'

const OwnEstateDidList = () => {
  const cards = [
    {
      key: 1,
      content: (
        <EstateDidCard />
      ),
    },
    {
      key: 2,
      content: (
        <EstateDidCard />
      ),
    },
    {
      key: 3,
      content: (
        <EstateDidCard />
      ),
    },
  ]

  return (
    <o.OwnEstateDidListContainer>
      <div className="estate-did-info-text">내 부동산 DID 목록</div>
      <o.DidListCarousel>
        <Carousel
          cards={cards}
          offset={50}
          showArrows={true}
          showNavigation={true}
        />
      </o.DidListCarousel>
    </o.OwnEstateDidListContainer>
  )
}

export default OwnEstateDidList
