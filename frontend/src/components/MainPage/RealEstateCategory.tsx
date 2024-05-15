import * as r from '@components/MainPage/style/RealEstateCategoryStyle'
import { RealEstateCategoryType } from '@/types/components/estateListType'
import { useNavigate } from 'react-router-dom'

const RealEstateCategory = () => {
  const navigate = useNavigate()
  const realEstateCategoryList: RealEstateCategoryType[] = [
    {
      src: '/image/image_apartment.png',
      title: '아파트',
      transactionType1: '매매',
      transactionType2: '전 · 월세',
    },
    {
      src: '/image/image_villa_or_tworoom.png',
      title: '빌라 · 투룸 +',
      transactionType1: '매매',
      transactionType2: '전 · 월세',
    },
    {
      src: '/image/image_oneroom.png',
      title: '원룸',
      transactionType1: '전 · 월세',
      transactionType2: null,
    },
    {
      src: '/image/image_officetels.png',
      title: '오피스텔',
      transactionType1: '전 · 월세',
      transactionType2: null,
    },
  ]

  const navigateToCategory = () => {
    navigate('/estate')
  }

  return (
    <r.RealEstateCategoryContainer>
      <div className="real-estate-category-info-text">
        어떤 집을 찾고 계세요?
      </div>
      <r.RealEstateCategories>
        {realEstateCategoryList.map((realEstateCategory, index) => (
          <r.CategoryContainer key={index} onClick={navigateToCategory}>
            <div className="category-title">{realEstateCategory.title}</div>
            <div className="category-transaction-type">
              {realEstateCategory.transactionType1}
            </div>
            <div className="category-transaction-type">
              {realEstateCategory.transactionType2}
            </div>
            <img
              alt={`${realEstateCategory.title}`}
              src={`${realEstateCategory.src}`}
              className="category-img"
            />
          </r.CategoryContainer>
        ))}
      </r.RealEstateCategories>
    </r.RealEstateCategoryContainer>
  )
}

export default RealEstateCategory
