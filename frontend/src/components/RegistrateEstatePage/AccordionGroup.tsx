import Accordion from "@components/RegistrateEstatePage/Accordion";
import CheckEstate from "@components/RegistrateEstatePage/CheckEstate";
import {AccordionGroupContainer} from "@components/RegistrateEstatePage/style/AccordionGroupStyle";

const AccordionGroup = ({maxOpenIndex, isOpenArray, setIsOpenArray}) => {
    const accordions = [
        {title: "1. 임대목적물 확인", children: <CheckEstate/>},
        {title: "2. 거래 상세 정보", children: <CheckEstate/>},
        {title: "3. 방 정보", children: <CheckEstate/>},
        {title: "4. 사진 등록", children: <CheckEstate/>},
    ]

    const handleAccordionClick = (index) => {
        const newIsOpenArray = isOpenArray.map((isOpen, idx) =>
            idx === index ? !isOpen : false // 선택된 인덱스만 토글하고 나머지는 모두 false로 설정
        );
        setIsOpenArray(newIsOpenArray);
    }
    return (
        <AccordionGroupContainer>
            {
                accordions.map(
                    (accordion, index) =>
                        <Accordion
                            key={index}
                            title={accordion.title}
                            isOpen={isOpenArray[index]}
                            show={index <= maxOpenIndex} // 이 아코디언을 보여줄지 결정
                            onToggle={() => handleAccordionClick(index)}
                        >
                            {accordion.children}
                        </Accordion>
                )
            }
        </AccordionGroupContainer>
    )
}

export default AccordionGroup
