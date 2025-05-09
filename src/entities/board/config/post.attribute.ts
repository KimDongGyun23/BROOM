export const postAttribute = {
  TITLE: { section: 'title', label: '제목', input: { placeholder: '제목을 입력해주세요.' } },
  TRAINING_DATE: {
    section: 'trainingDate',
    label: '훈련 날짜',
    input: { 'data-placeholder': '훈련 날짜를 선택해주세요.', type: 'date' },
  },
  PLACE: {
    section: 'place',
    label: '출발 장소',
    input: { placeholder: '출발 장소를 입력해주세요.' },
  },
  PERSONNEL: {
    section: 'personnel',
    label: '모집 인원',
  },
  TIME: { section: 'hour', label: '시간', input: { hourSection: 'hour', minuteSection: 'minute' } },
  CONTENT: {
    section: 'content',
    label: '메모',
    input: { placeholder: '원하시는 메모 내용을 적어주세요.' },
  },
}
