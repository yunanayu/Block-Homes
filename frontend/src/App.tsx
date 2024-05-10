import '@/App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MainPage from '@pages/MainPage'
import { GlobalStyle } from '@style/GlobalStyles'
import RealEstatePage from '@pages/RealEstatePage'
import SmartContractPage from './pages/SmartContractPage'
import IntroPage from '@pages/IntroPage'
import SignInPage from '@pages/SignInPage'
import CheckDidPage from '@pages/CheckDidPage'
import SelfCheckDidPage from '@pages/SelfCheckDidPage'
import RealEstateDetailPage from '@pages/RealEstateDetailPage'
import ReportPage from './pages/ReportPage'
import EstateRegistrationPage from '@pages/EstateRegistrationPage'
import MyPage from './pages/MyPage'
import CallBackPage from '@pages/CallBackPage'
import ChatPage from '@pages/ChatPage'
import InfoProcessPage from '@pages/InfoProcessPage'
import InfoSafePage from '@pages/InfoSafePage'
import TransactionProgress from './pages/TransactionProgress'

function RealEstateCheckListPage() {
  return null
}

const HomeRoutes = () => (
  <Routes>
    <Route path="/intro" element={<IntroPage />} />
    <Route path="/signin" element={<SignInPage />} />
    <Route path="/" element={<MainPage />} />
    <Route path="/check-did" element={<CheckDidPage />} />
    <Route path="/self-check-did" element={<SelfCheckDidPage />} />
    <Route path="/estate" element={<RealEstatePage />} />
    <Route path="/estate-detail" element={<RealEstateDetailPage />} />
    <Route path="/smart-contract" element={<SmartContractPage />} />
    <Route path="/report" element={<ReportPage />} />
    <Route path="/estate-registration" element={<EstateRegistrationPage />} />
    <Route path="/mypage" element={<MyPage />} />
    <Route path="/callback/:result" element={<CallBackPage />} />
    <Route path="/chat" element={<ChatPage />} />
    <Route path="/info-transaction-process" element={<InfoProcessPage />} />
    <Route path="/info-how-safe" element={<InfoSafePage />} />
    <Route path="/transaction-progress" element={<TransactionProgress />} />
    <Route path="/estate-checklist" element={<RealEstateCheckListPage />} />
  </Routes>
)

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <HomeRoutes />
      <ReactQueryDevtools initialIsOpen={false} />
    </BrowserRouter>
  )
}

export default App
