import { useEffect } from 'react'
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'

import { LoginPage } from '@/components/container/auth/LoginPage'
import { SignupCompletePage } from '@/components/container/auth/SignupCompletePage'
import { SignupPage } from '@/components/container/auth/SignupPage'
import { Home } from '@/components/container/home/Home'
import { Onboarding } from '@/components/container/home/Onboarding'
import { AccountInformation } from '@/components/container/mypage/AccountInformation'
import { AccountInformationEdit } from '@/components/container/mypage/AccountInformationEdit'
import { Mypage } from '@/components/container/mypage/Mypage'
import { MypageBookmarkedPost } from '@/components/container/mypage/MypageBookmarkedPost'
import { MypageMyPost } from '@/components/container/mypage/MypageMyPost'
import { NewPassword } from '@/components/container/mypage/NewPassword'
import { Board } from '@/pages/board/Board'
import { PostCreate } from '@/pages/board/PostCreate'
import { PostDetail } from '@/pages/board/PostDetail'
import { PostEdit } from '@/pages/board/PostEdit'
import { PostSearch } from '@/pages/board/PostSearch'
import { BusReservation } from '@/pages/bus/BusReservation'
import { BusReservationCheck } from '@/pages/bus/BusReservationCheck'
import { BusReservationCreate } from '@/pages/bus/BusReservationCreate'
import { Chat } from '@/pages/chat/Chat'
import { ChatRoom } from '@/pages/chat/ChatRoom'
import { ErrorPage } from '@/pages/home/ErrorPage'
import { instance } from '@/query'

import { Admin } from '../../components/container/admin/Admin'
import { AdminBus } from '../../components/container/admin/AdminBus'
import { AdminOverview } from '../../components/container/admin/AdminOverview'
import { AdminTrainingSchedule } from '../../components/container/admin/AdminTrainingSchedule'

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

      <Route path="/carpool" element={<Board />} />
      <Route path="/carpool/detail/:id" element={<PostDetail />} />
      <Route path="/carpool/search" element={<PostSearch />} />

      <Route path="/bus-reserve" element={<BusReservation />} />
      <Route path="/bus-reserve/create" element={<BusReservationCreate />} />
      <Route path="/bus-reserve/info" element={<BusReservationCheck />} />

      <Route element={<LoginPrivateRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-up/complete" element={<SignupCompletePage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/carpool/create" element={<PostCreate />} />
        <Route path="/carpool/edit/:id" element={<PostEdit />} />

        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:id" element={<ChatRoom />} />

        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage/account-information" element={<AccountInformation />} />
        <Route path="/mypage/account-information/edit" element={<AccountInformationEdit />} />
        <Route path="/mypage/password" element={<NewPassword />} />
        <Route path="/mypage/my-post" element={<MypageMyPost />} />
        <Route path="/mypage/bookmark" element={<MypageBookmarkedPost />} />

        <Route path="/kw/broom" element={<Admin />} />
        <Route path="/kw/broom/bus" element={<AdminBus />} />
        <Route path="/kw/broom/dates" element={<AdminTrainingSchedule />} />
        <Route path="/kw/broom/overview" element={<AdminOverview />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}
