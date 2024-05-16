import * as w from '@components/MyPage/style/MyWalletStyle'
import useCheckBalance from '@/hooks/useCheckBalance'
import { useEffect } from 'react'

const MyWallet = () => {
  const { handleCheckBalance, balance } = useCheckBalance()
  useEffect(() => {
    handleCheckBalance()
  }, [handleCheckBalance])
  return (
    <w.WalletWrapper>
      <w.WalletContainer onClick={handleCheckBalance}>
        <w.BalanceBox>
          <div className="title">나의 지갑 잔액</div>
          <div className="balance">{balance} ETH</div>
        </w.BalanceBox>
        <img className="wallet" src="image/image_wallet.png" alt="지갑" />
      </w.WalletContainer>
    </w.WalletWrapper>
  )
}

export default MyWallet
