package com.blockhomes.tradings.dto.chat.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ListChatRoomsRes {

    private List<ChatRoomInstance> chatRoomList;
    private Integer count;

}
