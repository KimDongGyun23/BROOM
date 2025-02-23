import type { SvgIconProps } from '@/app/model/common.type'

const colorStyle = (active: boolean) => (active ? '#5BA2F8' : '#D2D0CD')

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

export const CheckBoxIcon = ({ active = false }: SvgIconProps) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 3.33333H4C3.63181 3.33333 3.33333 3.63181 3.33333 4V12C3.33333 12.3682 3.63181 12.6667 4 12.6667H12C12.3682 12.6667 12.6667 12.3682 12.6667 12V4C12.6667 3.63181 12.3682 3.33333 12 3.33333ZM4 2C2.89543 2 2 2.89543 2 4V12C2 13.1046 2.89543 14 4 14H12C13.1046 14 14 13.1046 14 12V4C14 2.89543 13.1046 2 12 2H4Z"
      fill={colorStyle(active)}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.138 5.52851C11.3983 5.78886 11.3983 6.21097 11.138 6.47132L7.60939 9.99992C7.0887 10.5206 6.24448 10.5206 5.72378 9.99992L4.52851 8.80466C4.26816 8.54431 4.26816 8.1222 4.52851 7.86185C4.78886 7.6015 5.21097 7.6015 5.47132 7.86185L6.66659 9.05711L10.1952 5.52851C10.4555 5.26816 10.8776 5.26816 11.138 5.52851Z"
      fill={colorStyle(active)}
    />
  </svg>
)

export const BookmarkIcon = ({ active = false }: SvgIconProps) => {
  const fillStyle = active ? '#FF8E5D' : '#BAB7B3'

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

export const ArrowRightIcon = ({ active = false }: SvgIconProps) => {
  const fillStyle = active ? '#A09B96' : '#FBFBFB'

  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.70241 16.0059C6.37697 15.6805 6.37697 15.1528 6.70241 14.8274L11.5298 10L6.70241 5.17259C6.37697 4.84715 6.37697 4.31951 6.70241 3.99408C7.02785 3.66864 7.55548 3.66864 7.88092 3.99408L12.7083 8.82149C13.3592 9.47236 13.3592 10.5276 12.7083 11.1785L7.88092 16.0059C7.55548 16.3314 7.02785 16.3314 6.70241 16.0059Z"
        fill={fillStyle}
      />
    </svg>
  )
}
