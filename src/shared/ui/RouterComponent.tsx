import { useEffect } from 'react'
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom'

import { useIsLoggedIn, useUserData } from '@/features/login/model/auth.store'
import { Admin } from '@/pages/admin/Admin'
import { AdminBusApplicationStatus } from '@/pages/admin/AdminBusApplicationStatus'
import { AdminOverview } from '@/pages/admin/AdminOverview'
import { AdminTrainingSchedule } from '@/pages/admin/AdminTrainingSchedule'
import { LoginPage } from '@/pages/auth/LoginPage'
import { SignupCompletePage } from '@/pages/auth/SignupCompletePage'
import { SignupPage } from '@/pages/auth/SignupPage'
import { Board } from '@/pages/board/Board'
import { CreatePost } from '@/pages/board/CreatePost'
import { EditPost } from '@/pages/board/EditPost'
import { PostDetail } from '@/pages/board/PostDetail'
import { SearchPost } from '@/pages/board/SearchPost'
import { BusApplication } from '@/pages/bus/BusApplication'
import { BusApplicationStatus } from '@/pages/bus/BusApplicationStatus'
import { CreateBusApplication } from '@/pages/bus/CreateBusApplication'
import { Chat } from '@/pages/chat/Chat'
import { ChatRoom } from '@/pages/chat/ChatRoom'
import { ErrorPage } from '@/pages/home/ErrorPage'
import { Home } from '@/pages/home/Home'
import { Onboarding } from '@/pages/home/Onboarding'
import { AccountInformation } from '@/pages/mypage/AccountInformation'
import { BookmarkedPost } from '@/pages/mypage/BookmarkedPost'
import { Mypage } from '@/pages/mypage/Mypage'
import { MypageMyPost } from '@/pages/mypage/MypageMyPost'
import { PasswordUpdate } from '@/pages/mypage/PasswordUpdate'
import { UpdateAccountDetails } from '@/pages/mypage/UpdateAccountDetails'

const LoginPrivateRoute = () => {
  const isLoggedIn = useIsLoggedIn()
  const user = useUserData()

  const path = user?.role === 'ROLE_MEMBER' ? '/home' : '/kw/broom'

  return isLoggedIn ? <Navigate to={path} /> : <Outlet />
}

const PrivateRoute = () => {
  const navigate = useNavigate()
  const isLoggedIn = useIsLoggedIn()

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/login', { replace: true })
    }
  }, [isLoggedIn, navigate])

  return isLoggedIn ? <Outlet /> : null
}

export const RouterComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Onboarding />} />
      <Route path="/home" element={<Home />} />

      <Route path="/board" element={<Board />} />
      <Route path="/board/detail/:id" element={<PostDetail />} />
      <Route path="/board/search" element={<SearchPost />} />

      <Route path="/bus-application" element={<BusApplication />} />
      <Route path="/bus-application/create" element={<CreateBusApplication />} />
      <Route path="/bus-application/status" element={<BusApplicationStatus />} />

      <Route element={<LoginPrivateRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/sign-up/complete" element={<SignupCompletePage />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/board/create" element={<CreatePost />} />
        <Route path="/board/edit/:id" element={<EditPost />} />

        <Route path="/chat" element={<Chat />} />
        <Route path="/chat/:id" element={<ChatRoom />} />

        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypage/account-information" element={<AccountInformation />} />
        <Route path="/mypage/account-information/edit" element={<UpdateAccountDetails />} />
        <Route path="/mypage/password" element={<PasswordUpdate />} />
        <Route path="/mypage/my-post" element={<MypageMyPost />} />
        <Route path="/mypage/bookmark" element={<BookmarkedPost />} />

        <Route path="/kw/broom" element={<Admin />} />
        <Route path="/kw/broom/bus" element={<AdminBusApplicationStatus />} />
        <Route path="/kw/broom/dates" element={<AdminTrainingSchedule />} />
        <Route path="/kw/broom/overview" element={<AdminOverview />} />
      </Route>

      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}
