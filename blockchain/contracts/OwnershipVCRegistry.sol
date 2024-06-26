// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract OwnershipVCRegistry is Ownable{

    struct Proof{
        bytes32 r;
        bytes32 s;
        uint8 v;
    }

    struct Credential{
        string issuer;
        string subject;
        uint256 issuanceDate;
        string value; //소유 부동산의 DID
        Proof proof;
    }

    mapping( string => Credential) credentials;
    mapping( string => string[] ) CredentialsToUser;
    constructor() Ownable(msg.sender) {} 

    event VCcreated(string id);
    event VCdeleted(string id);

    function getMessageHash(
        string memory _subject, uint256 _issuanceDate, string memory  _value
    ) private pure returns (bytes32){
        return keccak256(abi.encodePacked(_subject, _issuanceDate,_value));
    }

    function claimCredential(
        string calldata _subject, uint256 _issuanceDate, bytes32 _r, bytes32 _s, uint8 _v,string calldata _value
        ) external onlyOwner{

        Credential storage newCredential = credentials[_value];
        newCredential.issuer="did:klay:0xb5496deda0d1aa1f7ba39d0217642bcd74ae6cd4"; //국토교통부의 DID
        newCredential.subject=_subject;
        newCredential.issuanceDate=_issuanceDate;
        newCredential.value=_value;
        newCredential.proof=Proof(_r,_s,_v);

        CredentialsToUser[_subject].push(_value);

        emit VCcreated(newCredential.value);
    }
    
    function verifyCredential(string memory _id) public view returns (bool) {
        Credential storage vc = credentials[_id];
        bytes32 messageHash = getMessageHash(vc.subject, vc.issuanceDate, vc.value);
        bytes32 ethSignedMessageHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash)
        );

        // ecrecover를 사용하여 서명자 주소 복구
        address recoveredSigner = ecrecover(ethSignedMessageHash, vc.proof.v, vc.proof.r, vc.proof.s);
        return (recoveredSigner==owner());
    }

    function getVC(string calldata id) external view returns (Credential memory) {
        return credentials[id];
    }

    function deleteVC(string calldata id) external onlyOwner {
        string[] storage allCredentials = CredentialsToUser[credentials[id].subject];
        for (uint256 i = 0; i < allCredentials.length; i++) {
            if(keccak256(abi.encodePacked(allCredentials[i]))==keccak256(abi.encodePacked(id))){
                allCredentials[i] = allCredentials[allCredentials.length - 1];
                allCredentials.pop();
            }
        }
        delete credentials[id];
        emit VCdeleted(id);
    }

    function getAllVCofUser(string calldata _userDID) external view returns (string[] memory) {
        return CredentialsToUser[_userDID];
    }

}