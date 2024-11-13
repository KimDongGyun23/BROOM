import type { SvgIconProps } from '@/types'

export const AllCheckIcon = ({ active = false }: SvgIconProps) => {
  const fillStyle = active ? '#4196FD' : '#777777'

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.6838 3.71359L5.68377 5.71359C5.27543 5.84971 5 6.23185 5 6.66228V12C5 14.0257 6.01463 15.7554 7.48432 17.2097C8.95718 18.6671 10.7303 19.684 11.8268 20.2266C11.9405 20.2828 12.0595 20.2828 12.1731 20.2266C13.2697 19.684 15.0428 18.6671 16.5157 17.2097C17.9854 15.7554 19 14.0257 19 12V6.66228C19 6.23184 18.7246 5.84971 18.3162 5.71359L12.3162 3.71359C12.111 3.64517 11.889 3.64517 11.6838 3.71359ZM5.05132 3.81623C3.82629 4.22457 3 5.37099 3 6.66228V12C3 17.502 8.56019 20.8417 10.9399 22.0192C11.6125 22.3519 12.3875 22.3519 13.0601 22.0192C15.4398 20.8417 21 17.502 21 12V6.66228C21 5.37099 20.1737 4.22457 18.9487 3.81623L12.9487 1.81623C12.3329 1.61096 11.6671 1.61096 11.0513 1.81623L5.05132 3.81623Z"
        fill={fillStyle}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.7071 9.29289C16.0976 9.68342 16.0976 10.3166 15.7071 10.7071L12.2728 14.1414C11.5698 14.8444 10.4302 14.8444 9.72721 14.1414L8.29289 12.7071C7.90237 12.3166 7.90237 11.6834 8.29289 11.2929C8.68342 10.9024 9.31658 10.9024 9.70711 11.2929L11 12.5858L14.2929 9.29289C14.6834 8.90237 15.3166 8.90237 15.7071 9.29289Z"
        fill={fillStyle}
      />
    </svg>
  )
}

export const CheckIcon = ({ active = false }: SvgIconProps) => {
  const fillStyle = active ? '#4196FD' : '#777777'

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M20.7071 6.29289C21.0976 6.68342 21.0976 7.31658 20.7071 7.70711L12.1213 16.2929C10.9497 17.4645 9.05026 17.4645 7.87868 16.2929L4.29289 12.7071C3.90237 12.3166 3.90237 11.6834 4.29289 11.2929C4.68342 10.9024 5.31658 10.9024 5.70711 11.2929L9.29289 14.8787C9.68342 15.2692 10.3166 15.2692 10.7071 14.8787L19.2929 6.29289C19.6834 5.90237 20.3166 5.90237 20.7071 6.29289Z"
        fill={fillStyle}
      />
    </svg>
  )
}

export const CheckBoxIcon = ({ active = false }: SvgIconProps) => {
  const fillStyle = active ? '#00A0FC' : '#9E9E9E'

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 4.16667H5C4.53976 4.16667 4.16667 4.53976 4.16667 5V15C4.16667 15.4602 4.53976 15.8333 5 15.8333H15C15.4602 15.8333 15.8333 15.4602 15.8333 15V5C15.8333 4.53976 15.4602 4.16667 15 4.16667ZM5 2.5C3.61929 2.5 2.5 3.61929 2.5 5V15C2.5 16.3807 3.61929 17.5 5 17.5H15C16.3807 17.5 17.5 16.3807 17.5 15V5C17.5 3.61929 16.3807 2.5 15 2.5H5Z"
        fill={fillStyle}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.9225 6.91083C14.248 7.23626 14.248 7.7639 13.9225 8.08934L9.5118 12.5001C8.86093 13.151 7.80566 13.151 7.15478 12.5001L5.6607 11.006C5.33527 10.6806 5.33527 10.1529 5.6607 9.82749C5.98614 9.50206 6.51378 9.50206 6.83921 9.82749L8.33329 11.3216L12.744 6.91083C13.0695 6.58539 13.5971 6.58539 13.9225 6.91083Z"
        fill={fillStyle}
      />
    </svg>
  )
}

export const BookmarkIcon = ({ active = false }: SvgIconProps) => {
  const fillStyle = active ? '#FF8E5D' : '#CBCBCB'

  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 2C5.34315 2 4 3.34315 4 5V19C4 21.0601 6.35191 22.2361 8 21L11.7 18.225C11.8778 18.0917 12.1222 18.0917 12.3 18.225L16 21C17.6481 22.2361 20 21.0601 20 19V5C20 3.34315 18.6569 2 17 2H7ZM9 6C8.44772 6 8 6.44772 8 7C8 7.55228 8.44772 8 9 8H15C15.5523 8 16 7.55228 16 7C16 6.44772 15.5523 6 15 6H9Z"
        fill={fillStyle}
      />
    </svg>
  )
}
