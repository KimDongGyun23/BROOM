import { useEffect } from 'react'
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'

import { LoginPage } from '@/components/container/auth/LoginPage'
import { SignupCompletePage } from '@/components/container/auth/SignupCompletePage'
import { SignupPage } from '@/components/container/auth/SignupPage'
import { BusReservation } from '@/components/container/bus/BusReservation'
import { BusReservationCheck } from '@/components/container/bus/BusReservationCheck'
import { BusReservationCreate } from '@/components/container/bus/BusReservationCreate'
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
import { AccountInformation } from '@/components/container/mypage/AccountInformation'
import { AccountInformationEdit } from '@/components/container/mypage/AccountInformationEdit'
import { Mypage } from '@/components/container/mypage/Mypage'
import { MypageBookmarkedPost } from '@/components/container/mypage/MypageBookmarkedPost'
import { MypageMyPost } from '@/components/container/mypage/MypageMyPost'
import { NewPassword } from '@/components/container/mypage/NewPassword'
import { instance } from '@/query'

import { Admin } from '../container/admin/Admin'
import { AdminBus } from '../container/admin/AdminBus'
import { AdminTrainingSchedule } from '../container/admin/AdminTrainingSchedule'

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

      <Route path="/bus-reserve" element={<BusReservation />} />
      <Route path="/bus-reserve/create" element={<BusReservationCreate />} />
      <Route path="/bus-reserve/info" element={<BusReservationCheck />} />

      <Route element={<LoginPrivateRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-up/complete" element={<SignupCompletePage />} />
      </Route>

      <Route path="/kw/broom" element={<Admin />} />
      <Route path="/kw/broom/bus" element={<AdminBus />} />
      <Route path="/kw/broom/dates" element={<AdminTrainingSchedule />} />

      <Route element={<PrivateRoute />}>
        <Route path="/carpool/create" element={<CarpoolCreate />} />
        <Route path="/carpool/edit/:id" element={<CarpoolEdit />} />

        <Route path="/chatting" element={<Chatting />} />
        <Route path="/chatting/chatting-room/carpool/:id" element={<CarpoolChattingRoom />} />

        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage/account-information" element={<AccountInformation />} />
        <Route path="/mypage/account-information/edit" element={<AccountInformationEdit />} />
        <Route path="/mypage/password" element={<NewPassword />} />
        <Route path="/mypage/my-post" element={<MypageMyPost />} />
        <Route path="/mypage/bookmark" element={<MypageBookmarkedPost />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}
