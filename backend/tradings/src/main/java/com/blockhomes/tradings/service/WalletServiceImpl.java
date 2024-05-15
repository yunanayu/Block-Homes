package com.blockhomes.tradings.service;

import com.blockhomes.tradings.dto.BaseResponseBody;
import com.blockhomes.tradings.dto.wallet.request.CheckWalletReq;
import com.blockhomes.tradings.dto.wallet.request.GetWalletReq;
import com.blockhomes.tradings.dto.wallet.request.RegisterWalletReq;
import com.blockhomes.tradings.dto.wallet.response.CheckWalletRes;
import com.blockhomes.tradings.dto.wallet.response.GetWalletRes;
import com.blockhomes.tradings.dto.wallet.response.RegisterWalletRes;
import com.blockhomes.tradings.entity.wallet.Wallet;
import com.blockhomes.tradings.exception.wallet.WalletNotFoundException;
import com.blockhomes.tradings.repository.wallet.WalletRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("walletService")
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class WalletServiceImpl implements WalletService {

    private final WalletRepository walletRepository;

    @Override
    public CheckWalletRes checkWallet(CheckWalletReq req) {
        Wallet wallet = walletRepository
            .getWalletByNameAndPhoneNumber(req.getName(), req.getPhoneNumber())
            .orElseThrow(WalletNotFoundException::new);

        return CheckWalletRes.builder()
            .walletAddress(wallet.getWalletAddress())
            .userDID(wallet.getUserDID())
            .build();
    }

    @Override
    public GetWalletRes getWallet(GetWalletReq req) {
        Wallet wallet = walletRepository
            .getWalletByWalletAddress(req.getWalletAddress())
            .orElseThrow(WalletNotFoundException::new);

        return GetWalletRes.builder()
            .walletAddress(wallet.getWalletAddress())
            .userDID(wallet.getUserDID())
            .encPrivateKey(wallet.getEncPrivateKey())
            .name(wallet.getName())
            .build();
    }

    @Override
    @Transactional
    public BaseResponseBody deleteWallet(String walletAddress) {
        Wallet wallet = walletRepository.getWalletByWalletAddress(walletAddress)
            .orElseThrow(WalletNotFoundException::new);

        walletRepository.delete(wallet);

        return BaseResponseBody.builder()
            .statusCode(HttpStatus.ACCEPTED)
            .message("지갑 " + walletAddress + " 삭제 완료")
            .build();
    }

    @Override
    @Transactional
    public RegisterWalletRes registerWallet(RegisterWalletReq req) {
        Wallet registeredWallet = walletRepository.save(Wallet.builder()
            .walletAddress(req.getWalletAddress())
            .encPrivateKey(req.getEncPrivateKey())
            .name(req.getName())
            .phoneNumber(req.getPhoneNumber())
            .build());

        return RegisterWalletRes.builder()
            .walletAddress(registeredWallet.getWalletAddress())
            .encPrivateKey(registeredWallet.getEncPrivateKey())
            .name(registeredWallet.getName())
            .phoneNumber(registeredWallet.getPhoneNumber())
            .createdAt(registeredWallet.getCreatedAt())
            .build();
    }

}
