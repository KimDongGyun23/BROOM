export const MYPAGE_MENU_ITEMS = [
  {
    sectionTitle: '내 정보',
    links: [
      { name: '계정 정보', path: '/mypage/account-information' },
      { name: '비밀번호 재설정', path: '/mypage/password' },
    ],
  },
  {
    sectionTitle: '게시글',
    links: [
      { name: '내가 올린 게시글', path: '/mypage/my-post' },
      { name: '북마크', path: '/mypage/bookmark' },
    ],
  },
] as const

export const CUSTOMER_SUPPORT = {
  sectionTitle: '고객 지원',
  links: [{ name: '문의하기' }, { name: '서비스 이용 약관' }, { name: '개인정보 처리 방침' }],
} as const
