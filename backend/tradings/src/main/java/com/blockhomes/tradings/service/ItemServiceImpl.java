package com.blockhomes.tradings.service;

import com.blockhomes.tradings.dto.item.request.GetLikeItemsReq;
import com.blockhomes.tradings.dto.item.request.LikeItemReq;
import com.blockhomes.tradings.dto.item.request.ListItemReq;
import com.blockhomes.tradings.dto.item.request.RegisterItemReq;
import com.blockhomes.tradings.dto.item.response.*;
import com.blockhomes.tradings.entity.common.Image;
import com.blockhomes.tradings.entity.item.*;
import com.blockhomes.tradings.entity.item.enums.*;
import com.blockhomes.tradings.entity.wallet.Likes;
import com.blockhomes.tradings.entity.wallet.Wallet;
import com.blockhomes.tradings.exception.common.ImageNotSavedException;
import com.blockhomes.tradings.exception.item.ItemNotFoundException;
import com.blockhomes.tradings.exception.wallet.WalletNotFoundException;
import com.blockhomes.tradings.repository.common.ImageRepository;
import com.blockhomes.tradings.repository.item.ItemAdditionalOptionRepository;
import com.blockhomes.tradings.repository.item.ItemAdministrationFeeRepository;
import com.blockhomes.tradings.repository.item.ItemImageRepository;
import com.blockhomes.tradings.repository.item.ItemRepository;
import com.blockhomes.tradings.repository.wallet.LikesRepository;
import com.blockhomes.tradings.repository.wallet.WalletRepository;
import com.blockhomes.tradings.util.AreaUtil;
import com.blockhomes.tradings.util.LocalDateTimeUtil;
import com.blockhomes.tradings.util.S3BucketUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Service("itemService")
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class ItemServiceImpl implements ItemService {

    private final ItemRepository itemRepository;
    private final WalletRepository walletRepository;
    private final ImageRepository imageRepository;
    private final ItemImageRepository itemImageRepository;
    private final ItemAdditionalOptionRepository itemAdditionalOptionRepository;
    private final ItemAdministrationFeeRepository itemAdministrationFeeRepository;
    private final LikesRepository likesRepository;

    private final S3BucketUtil s3BucketUtil;

    private final String BASE_FOLDER_NAME = "items";

    @Transactional
    @Override
    public RegisterItemRes registerItem(RegisterItemReq req,
                                        MultipartFile mainImage,
                                        MultipartFile[] roomImages,
                                        MultipartFile[] kitchenToiletImages) {
        Wallet ownerWallet = walletRepository.getWalletByUserDID(req.getOwnerWalletDID())
            .orElseThrow(WalletNotFoundException::new);

        // 이미지 제외 아이템 정보 저장
        Item item = itemRepository.save(Item.builder()
            .ownerWallet(ownerWallet)
            .realEstateDID(req.getRealEstateDID())
            .roadNameAddress(req.getRoadNameAddress())
            .transactionType(TransactionType.valueToEnum(req.getTransactionType()))
            .area(req.getArea())
            .price(req.getPrice())
            .monthlyPrice(req.getMonthlyPrice())
            .administrationCost(req.getAdministrationCost())
            .latitude(req.getLatitude())
            .longitude(req.getLongitude())
            .realEstateType(RealEstateType.valueToEnum(req.getRealEstateType()))
            .roomNumber(req.getRoomNumber())
            .toiletNumber(req.getToiletNumber())
            .description(req.getDescription())
            .reportRank(ReportRank.valueToEnum(req.getReportRank()))
            .buildingFloor(req.getBuildingFloor())
            .itemFloor(req.getItemFloor())
            .moveInDate(LocalDateTimeUtil.stringToLocalDateTime(req.getMoveInDate()))
            .parkingRate(req.getParkingRate())
            .haveElevator(req.getHaveElevator())
            .build());

        // 관리비 카테고리 저장
        List<Integer> feeCategoryList = req.getAdministrationFeeCategoryList();
        List<ItemAdministrationFee> feeEntityList = new ArrayList<>();

        for (Integer category : feeCategoryList) {
            feeEntityList.add(ItemAdministrationFee.builder()
                .item(item)
                .administrationFeeCategory(AdministrationFeeCategory.valueToEnum(category))
                .build());
        }

        itemAdministrationFeeRepository.saveAll(feeEntityList);

        // 추가 옵션 카테고리 저장
        List<Integer> optionCategoryList = req.getAdditionalOptionCategoryList();
        List<ItemAdditionalOption> optionEntityList = new ArrayList<>();

        for (Integer category : optionCategoryList) {
            optionEntityList.add(ItemAdditionalOption.builder()
                .item(item)
                .additionalOptionCategory(AdditionalOptionCategory.valueToEnum(category))
                .build());
        }

        itemAdditionalOptionRepository.saveAll(optionEntityList);

        String folderName = BASE_FOLDER_NAME + "/" + item.getItemNo();

        // 대표 이미지 저장
        String mainImageKey = s3BucketUtil.uploadFile(mainImage, folderName);
        Image mainImageEntity = Image.builder()
            .imageUrl(s3BucketUtil.getFileUrl(mainImageKey, folderName))
            .build();

        // 거실 & 방 이미지 저장
        List<Image> roomImageEntityList = new ArrayList<>();
        List<String> roomImageKeys = new ArrayList<>();

        for (MultipartFile file : roomImages) {
            String imageKey = s3BucketUtil.uploadFile(file, folderName);
            roomImageKeys.add(imageKey);

            roomImageEntityList.add(Image.builder()
                .imageUrl(s3BucketUtil.getFileUrl(imageKey, folderName))
                .build());
        }

        // 주방 & 화장실 이미지 저장
        List<Image> kitchenToiletEntityList = new ArrayList<>();
        List<String> kitchenToiletImageKeys = new ArrayList<>();

        for (MultipartFile file : kitchenToiletImages) {
            String imageKey = s3BucketUtil.uploadFile(file, folderName);
            kitchenToiletImageKeys.add(imageKey);

            kitchenToiletEntityList.add(Image.builder()
                .imageUrl(s3BucketUtil.getFileUrl(imageKey, folderName))
                .build());
        }

        List<ItemImage> itemImageList = new ArrayList<>();

        try {
            Image savedMainImage = imageRepository.save(mainImageEntity);

            itemImageList.add(ItemImage.builder()
                .image(savedMainImage)
                .item(item)
                .itemImageCategory(ItemImageCategory.MAIN)
                .build());

            if (!roomImageEntityList.isEmpty()) {
                List<Image> savedRoomImages = imageRepository.saveAll(roomImageEntityList);

                for (Image image : savedRoomImages) {
                    itemImageList.add(ItemImage.builder()
                        .image(image)
                        .item(item)
                        .itemImageCategory(ItemImageCategory.ROOMS)
                        .build());
                }
            }

            if (!kitchenToiletEntityList.isEmpty()) {
                List<Image> savedKitchenToiletImages = imageRepository.saveAll(kitchenToiletEntityList);

                for (Image image : savedKitchenToiletImages) {
                    itemImageList.add(ItemImage.builder()
                        .image(image)
                        .item(item)
                        .itemImageCategory(ItemImageCategory.KITCHEN_TOILET)
                        .build());
                }

            }

            itemImageRepository.saveAll(itemImageList);



        } catch (Exception e) {
            s3BucketUtil.deleteFile(mainImageKey, folderName);

            if (!roomImageKeys.isEmpty()) {
                for (String key : roomImageKeys) {
                    s3BucketUtil.deleteFile(key, folderName);
                }
            }

            if (!kitchenToiletImageKeys.isEmpty()) {
                for (String key : kitchenToiletImageKeys) {
                    s3BucketUtil.deleteFile(key, folderName);
                }
            }

            throw new ImageNotSavedException();
        }

        return RegisterItemRes.builder()
            .itemNo(item.getItemNo())
            .ownerWalletAddress(item.getOwnerWallet().getWalletAddress())
            .realEstateDID(item.getRealEstateDID())
            .createdAt(item.getCreatedAt())
            .build();
    }

    @Override
    public ListItemRes listItems(ListItemReq req) {
        List<ListItemInstance> itemsList = itemRepository.listItemsByFiltering(req);

        if (itemsList.isEmpty()) {
            return ListItemRes.builder()
                .itemList(List.of())
                .count(0)
                .build();
        }

        return ListItemRes.builder()
            .itemList(itemsList)
            .count(itemsList.size())
            .build();
    }

    @Override
    public DetailItemRes getDetailItem(Integer itemNo) {
        Item item = itemRepository.getItemByItemNo(itemNo).orElseThrow(ItemNotFoundException::new);

        List<ItemImage> itemImages = itemImageRepository.getItemImagesByItem(item);
        List<ItemAdministrationFee> itemAdministrationFees = itemAdministrationFeeRepository.getItemAdministrationFeesByItem(item);
        List<ItemAdditionalOption> itemAdditionalOptions = itemAdditionalOptionRepository.getItemAdditionalOptionsByItem(item);

        List<ItemImageInstance> itemImageInstanceList = new ArrayList<>();

        for (ItemImage itemImage : itemImages) {
            itemImageInstanceList.add(ItemImageInstance.builder()
                    .imageUrl(itemImage.getImage().getImageUrl())
                    .itemImageCategory(ItemImageCategory.enumToValue(itemImage.getItemImageCategory()))
                    .build());
        }

        List<Integer> administrationFeeList = new ArrayList<>();

        for (ItemAdministrationFee itemAdministrationFee : itemAdministrationFees) {
            administrationFeeList.add(AdministrationFeeCategory.enumToValue(itemAdministrationFee.getAdministrationFeeCategory()));
        }

        List<Integer> additionalOptionList = new ArrayList<>();

        for (ItemAdditionalOption itemAdditionalOption : itemAdditionalOptions) {
            additionalOptionList.add(AdditionalOptionCategory.enumToValue(itemAdditionalOption.getAdditionalOptionCategory()));
        }

        return DetailItemRes.builder()
            .itemNo(item.getItemNo())
            .ownerDID(item.getOwnerWallet().getUserDID())
            .realEstateDID(item.getRealEstateDID())
            .roadNameAddress(item.getRoadNameAddress())
            .realEstateType(RealEstateType.enumToValue(item.getRealEstateType()))
            .reportRank(ReportRank.enumToValue(item.getReportRank()))
            .transactionStatus(TransactionStatus.enumToValue(item.getTransactionStatus()))
            .area(item.getArea())
            .pyeong((int) Math.round(AreaUtil.squareMeterToPyeong(item.getArea())))
            .price(item.getPrice())
            .monthlyPrice(item.getMonthlyPrice())
            .administrationCost(item.getAdministrationCost())
            .latitude(item.getLatitude())
            .longitude(item.getLongitude())
            .roomNumber(item.getRoomNumber())
            .toiletNumber(item.getToiletNumber())
            .description(item.getDescription())
            .buildingFloor(item.getBuildingFloor())
            .itemFloor(item.getItemFloor())
            .moveInDate(item.getMoveInDate())
            .parkingRate(item.getParkingRate())
            .haveElevator(item.getHaveElevator())
            .createdAt(item.getCreatedAt())
            .itemImageList(itemImageInstanceList)
            .itemAdministrationFeeList(administrationFeeList)
            .itemAdditionalOptionList(additionalOptionList)
            .build();
    }

    @Override
    public LikeItemRes likeItem(LikeItemReq req) {
        Wallet userWallet = walletRepository
            .getWalletByWalletAddress(req.getWalletAddress())
            .orElseThrow(WalletNotFoundException::new);

        Item item = itemRepository
            .getItemByItemNo(req.getItemNo())
            .orElseThrow(ItemNotFoundException::new);

        Likes likes = likesRepository.save(Likes.builder()
            .wallet(userWallet)
            .item(item)
            .build());

        return LikeItemRes.builder()
            .walletAddress(likes.getWallet().getWalletAddress())
            .itemNo(likes.getItem().getItemNo())
            .createdAt(likes.getCreatedAt())
            .build();
    }

    @Override
    public GetLikeItemsRes getLikeItems(GetLikeItemsReq req) {
        Wallet userWallet = walletRepository
            .getWalletByWalletAddress(req.getUserAddress())
            .orElseThrow(WalletNotFoundException::new);

        List<Likes> likesList = likesRepository.getLikesByWallet(userWallet);

        List<ListItemInstance> itemInstances = new ArrayList<>();

        for (Likes likes : likesList) {
            Item item = likes.getItem();

            itemInstances.add(ListItemInstance.builder()
                    .itemNo(item.getItemNo())
                    .realEstateDID(item.getRealEstateDID())
                    .roadNameAddress(item.getRoadNameAddress())
                    .transactionType(item.getTransactionType())
                    .realEstateType(item.getRealEstateType())
                    .reportRank(item.getReportRank())
                    .area(item.getArea())
                    .price(item.getPrice())
                    .monthlyPrice(item.getMonthlyPrice())
                    .administrationCost(item.getAdministrationCost())
                    .latitude(item.getLatitude())
                    .longitude(item.getLongitude())
                    .build());
        }

        return GetLikeItemsRes.builder()
            .likedItems(itemInstances)
            .count(itemInstances.size() )
            .build();
    }


}
