export const SEARCH_OPTIONS = [
  { label: '제목', key: 'title', placeholder: '제목을 입력해주세요.' },
  { label: '출발 장소', key: 'place', placeholder: '출발 장소를 입력해주세요.' },
] as const
export type SearchOption = (typeof SEARCH_OPTIONS)[number]
