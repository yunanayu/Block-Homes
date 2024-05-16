package com.blockhomes.tradings.dto.chat.response;

import com.blockhomes.tradings.dto.chat.MessageType;
import com.blockhomes.tradings.entity.chat.ContractStep;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatRes {

    private Integer chatNo;
    private Integer chatRoomNo;
    private String senderWalletAddress;
    private String senderName;
    private Integer messageType;
    private String image;
    private Integer contractStep;
    private LocalDateTime createdAt;

    @Builder
    public ChatRes(
        Integer chatNo,
        Integer chatRoomNo,
        String senderWalletAddress,
        String senderName,
        MessageType messageType,
        String image,
        ContractStep contractStep,
        LocalDateTime createdAt
    ) {
        this.chatNo = chatNo;
        this.chatRoomNo = chatRoomNo;
        this.senderWalletAddress = senderWalletAddress;
        this.senderName = senderName;
        this.messageType = MessageType.enumToValue(messageType);
        this.image = image;
        this.contractStep = ContractStep.enumToValue(contractStep);
        this.createdAt = createdAt;
    }

}
