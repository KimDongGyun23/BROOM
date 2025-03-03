import { useEffect } from 'react'
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'

import { instance } from '@/app/api'
import { LoginPage } from '@/pages/auth/LoginPage'
import { SignupCompletePage } from '@/pages/auth/SignupCompletePage'
import { SignupPage } from '@/pages/auth/SignupPage'
import { Board } from '@/pages/board/Board'
import { PostCreate } from '@/pages/board/PostCreate'
import { PostDetail } from '@/pages/board/PostDetail'
import { PostEdit } from '@/pages/board/PostEdit'
import { PostSearch } from '@/pages/board/PostSearch'
import { BusApplication } from '@/pages/bus/BusApplication'
import { BusReservationCheck } from '@/pages/bus/BusReservationCheck'
import { BusReservationCreate } from '@/pages/bus/BusReservationCreate'
import { Chat } from '@/pages/chat/Chat'
import { ChatRoom } from '@/pages/chat/ChatRoom'
import { ErrorPage } from '@/pages/home/ErrorPage'
import { Home } from '@/pages/home/Home'
import { Onboarding } from '@/pages/home/Onboarding'
import { AccountInformation } from '@/pages/mypage/AccountInformation'
import { AccountInformationEdit } from '@/pages/mypage/AccountInformationEdit'
import { Mypage } from '@/pages/mypage/Mypage'
import { MypageBookmarkedPost } from '@/pages/mypage/MypageBookmarkedPost'
import { MypageMyPost } from '@/pages/mypage/MypageMyPost'
import { NewPassword } from '@/pages/mypage/NewPassword'

import { Admin } from '../../pages/admin/Admin'
import { AdminBus } from '../../pages/admin/AdminBus'
import { AdminOverview } from '../../pages/admin/AdminOverview'
import { AdminTrainingSchedule } from '../../pages/admin/AdminTrainingSchedule'

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

      <Route path="/board" element={<Board />} />
      <Route path="/board/detail/:id" element={<PostDetail />} />
      <Route path="/board/search" element={<PostSearch />} />

      <Route path="/bus-application" element={<BusApplication />} />
      <Route path="/bus-application/create" element={<BusReservationCreate />} />
      <Route path="/bus-application/status" element={<BusReservationCheck />} />

      <Route element={<LoginPrivateRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-up/complete" element={<SignupCompletePage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/board/create" element={<PostCreate />} />
        <Route path="/board/edit/:id" element={<PostEdit />} />

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
