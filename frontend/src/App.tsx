import '@/App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import MainPage from '@pages/MainPage'
import { GlobalStyle } from '@style/GlobalStyles'
import RealEstatePage from '@pages/RealEstatePage'
import SmartContract from './pages/SmartContract/SmartContract'
import RealEstateMapPage from '@pages/RealEstateMapPage'
import RealEstateListPage from '@pages/RealEstateListPage'
import KlipSignInPage from '@pages/KlipSignInPage.tsx'

const HomeRoutes = () => (
  <Routes>
    {/*<Route path="/intro" element={<IntroPage />} />*/}
    <Route path="/klip-signin" element={<KlipSignInPage />} />
    <Route path="/" element={<MainPage />} />
    <Route path="/estate" element={<RealEstatePage />}>
      <Route path="" element={<RealEstateListPage />} />
      <Route path="map" element={<RealEstateMapPage />} />
    </Route>
    <Route path="/smart-contract" element={<SmartContract />} />
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
