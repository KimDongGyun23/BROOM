import { useEffect } from 'react'
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'

import { LoginPage } from '@/components/container/auth/LoginPage'
import { SignupCompletePage } from '@/components/container/auth/SignupCompletePage'
import { SignupPage } from '@/components/container/auth/SignupPage'
import { BusReserve } from '@/components/container/bus/BusReserve'
import { ReserveCreate } from '@/components/container/bus/ReserveCreate'
import { ReserveInfo } from '@/components/container/bus/ReserveInfo'
import { Carpool } from '@/components/container/carpool/Carpool'
import { CarpoolCreate } from '@/components/container/carpool/CarpoolCreate'
import { CarpoolDetail } from '@/components/container/carpool/CarpoolDetail'
import { CarpoolEdit } from '@/components/container/carpool/CarpoolEdit'
import { CarpoolSearch } from '@/components/container/carpool/CarpoolSearch'
import { CarpoolChattingRoom } from '@/components/container/chatting/CarpoolChattingRoom'
import { Chatting } from '@/components/container/chatting/Chatting'
import { ErrorPage } from '@/components/container/home/ErrorPage'
import { Home } from '@/components/container/home/Home'
import { Onboarding } from '@/components/container/home/Onboarding'
import { AccountInfo } from '@/components/container/mypage/AccountInfo'
import { Bookmark } from '@/components/container/mypage/Bookmark'
import { Mypage } from '@/components/container/mypage/Mypage'
import { MyPost } from '@/components/container/mypage/MyPost'
import { NewPassword } from '@/components/container/mypage/NewPassword'
import { instance } from '@/services/query'

import { AccountInfoEdit } from '../container/mypage/AccountInfoEdit'

const LoginPrivateRoute = () => {
  const session = instance.hasToken()
  return session ? <Navigate to="/home" /> : <Outlet />
}

const PrivateRoute = () => {
  const navigate = useNavigate()
  const session = instance.hasToken()

  useEffect(() => {
    if (!session) {
      navigate('/login', { replace: true })
    }
  }, [session, navigate])

  return session ? <Outlet /> : null
}

export const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route path="/home" element={<Home />} />

      <Route path="/carpool" element={<Carpool />} />
      <Route path="/carpool/detail/:id" element={<CarpoolDetail />} />
      <Route path="/carpool/search" element={<CarpoolSearch />} />

      <Route path="/bus-reserve" element={<BusReserve />} />
      <Route path="/bus-reserve/create" element={<ReserveCreate />} />
      <Route path="/bus-reserve/info" element={<ReserveInfo />} />

      <Route element={<LoginPrivateRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-up/complete" element={<SignupCompletePage />} />
      </Route>

      <Route path="/carpool/create" element={<CarpoolCreate />} />
      <Route element={<PrivateRoute />}>
        <Route path="/carpool/edit/:id" element={<CarpoolEdit />} />

        <Route path="/chatting" element={<Chatting />} />
        <Route path="/chatting/chatting-room/carpool/:id" element={<CarpoolChattingRoom />} />

        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage/account-info" element={<AccountInfo />} />
        <Route path="/mypage/account-info/edit" element={<AccountInfoEdit />} />
        <Route path="/mypage/password" element={<NewPassword />} />
        <Route path="/mypage/myboard" element={<MyPost />} />
        <Route path="/mypage/bookmark" element={<Bookmark />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}
