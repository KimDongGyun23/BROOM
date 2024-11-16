import type { SvgIconProps } from '@/types'

export const TeammateIcon = ({ active = false }: SvgIconProps) => {
  const fillStyle = active ? '#4196FD' : '#E2E2E2'
  return (
    <svg width="45" height="52" viewBox="0 0 45 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.7431 9.86463L13.5365 3.5547C13.0934 2.89015 13.5698 2 14.3685 2H18.4296C19.0983 2 19.7228 2.3342 20.0937 2.8906L22.5 6.50003L24.9063 2.8906C25.2772 2.3342 25.9017 2 26.5704 2H30.6315C31.4302 2 31.9066 2.89015 31.4636 3.5547L27.2569 9.86463C28.6365 11.1432 29.5 12.9707 29.5 15C29.5 18.866 26.366 22 22.5 22C18.634 22 15.5 18.866 15.5 15C15.5 12.9707 16.3635 11.1432 17.7431 9.86463ZM21.1792 8.12442L18.4296 4L16.237 4L19.3888 8.72767C19.9474 8.45008 20.5483 8.2449 21.1792 8.12442ZM25.6112 8.72767L28.763 4L26.5704 4L23.8208 8.12442C24.4517 8.2449 25.0526 8.45008 25.6112 8.72767ZM27.5 15C27.5 17.7614 25.2614 20 22.5 20C19.7386 20 17.5 17.7614 17.5 15C17.5 12.2386 19.7386 10 22.5 10C25.2614 10 27.5 12.2386 27.5 15Z"
        fill={fillStyle}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22.5 16C23.0523 16 23.5 15.5523 23.5 15C23.5 14.4477 23.0523 14 22.5 14C21.9477 14 21.5 14.4477 21.5 15C21.5 15.5523 21.9477 16 22.5 16ZM25.5 15C25.5 16.6569 24.1569 18 22.5 18C20.8431 18 19.5 16.6569 19.5 15C19.5 13.3431 20.8431 12 22.5 12C24.1569 12 25.5 13.3431 25.5 15Z"
        fill={fillStyle}
      />
      <path
        d="M10.5467 45.2H9.33333V39.2133H10.5467V45.2ZM8.58667 44.4C8.29333 44.5422 7.87556 44.6533 7.33333 44.7333C6.79111 44.8133 6.18222 44.8533 5.50667 44.8533H1.85333V39.4533H7.90667V40.44H3.05333V41.68H7.70667V42.6133H3.05333V43.8533H5.6C6.24 43.8533 6.82222 43.8178 7.34667 43.7467C7.87111 43.6667 8.28444 43.5556 8.58667 43.4133V44.4ZM10.5467 45.7467V49.3333H2.24V45.7467H10.5467ZM9.34667 48.3067V46.7733H3.42667V48.3067H9.34667ZM19.9719 39.2133H21.1719V47.2133H19.9719V46.5733H17.0519V45.64H19.9719V39.2133ZM15.4519 43.2267C14.5808 43.2267 13.8786 43.0533 13.3453 42.7067C12.8119 42.3511 12.5453 41.8533 12.5453 41.2133C12.5453 40.5822 12.8119 40.0933 13.3453 39.7467C13.8786 39.3911 14.5808 39.2133 15.4519 39.2133C16.323 39.2133 17.0208 39.3911 17.5453 39.7467C18.0697 40.0933 18.3319 40.5822 18.3319 41.2133C18.3319 41.8533 18.0697 42.3511 17.5453 42.7067C17.0208 43.0533 16.323 43.2267 15.4519 43.2267ZM15.4519 40.1867C14.9275 40.1867 14.5053 40.2756 14.1853 40.4533C13.8741 40.6311 13.7186 40.8844 13.7186 41.2133C13.7186 41.5511 13.8741 41.8089 14.1853 41.9867C14.5053 42.1644 14.9275 42.2533 15.4519 42.2533C15.9675 42.2533 16.3808 42.1644 16.6919 41.9867C17.003 41.8089 17.1586 41.5511 17.1586 41.2133C17.1586 40.8844 17.003 40.6311 16.6919 40.4533C16.3808 40.2756 15.9675 40.1867 15.4519 40.1867ZM11.9719 44.9333V43.92H16.0519C17.5364 43.92 18.5764 43.7822 19.1719 43.5067V44.5333C18.5941 44.8 17.483 44.9333 15.8386 44.9333V46.76H14.6386V44.9333H11.9719ZM21.4119 49.3333H12.8519V46.2H14.0653V48.2533H21.4119V49.3333ZM32.2639 48.9733H22.5305V47.7867H26.7839V45.4H23.1705V39.5733H31.6239V45.4H27.9972V47.7867H32.2639V48.9733ZM30.4239 44.2267V40.7467H24.3705V44.2267H30.4239ZM42.2224 44.5333H41.0091V39.2133H42.2224V44.5333ZM36.5558 42.5467C36.218 43.0711 35.7691 43.4978 35.2091 43.8267C34.658 44.1556 34.0313 44.36 33.3291 44.44V43.32C34.1024 43.2044 34.7291 42.8978 35.2091 42.4C35.6891 41.9022 35.9691 41.2756 36.0491 40.52H33.4491V39.4533H39.7558V40.52H37.2891C37.2713 40.8311 37.2047 41.1867 37.0891 41.5867L40.0891 43.4L39.5158 44.3467L36.5558 42.5467ZM42.2224 44.9733V49.3333H33.9158V44.9733H35.0891V46.0667H41.0358V44.9733H42.2224ZM41.0358 47.08H35.0891V48.3067H41.0358V47.08Z"
        fill={fillStyle}
      />
    </svg>
  )
}

export const ChattingIcon = ({ active = false }: SvgIconProps) => {
  const fillStyle = active ? '#4196FD' : '#E2E2E2'

  return (
    <svg width="45" height="52" viewBox="0 0 45 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.5 9C17.5 8.44772 17.9477 8 18.5 8H26.5C27.0523 8 27.5 8.44772 27.5 9C27.5 9.55228 27.0523 10 26.5 10H18.5C17.9477 10 17.5 9.55228 17.5 9Z"
        fill={fillStyle}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.5 13C17.5 12.4477 17.9477 12 18.5 12H22.5C23.0523 12 23.5 12.4477 23.5 13C23.5 13.5523 23.0523 14 22.5 14H18.5C17.9477 14 17.5 13.5523 17.5 13Z"
        fill={fillStyle}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.2196 17.4636C17.5791 17.164 18.0321 17 18.5 17H29.5C30.0523 17 30.5 16.5523 30.5 16V6C30.5 5.44771 30.0523 5 29.5 5H15.5C14.9477 5 14.5 5.44772 14.5 6V19.7299L17.2196 17.4636ZM18.5 19H29.5C31.1569 19 32.5 17.6569 32.5 16V6C32.5 4.34315 31.1569 3 29.5 3H15.5C13.8431 3 12.5 4.34315 12.5 6V19.7299C12.5 21.4256 14.4777 22.3519 15.7804 21.2664L18.5 19Z"
        fill={fillStyle}
      />
      <path
        d="M14.98 41.84C14.9622 42.7467 14.9133 43.5022 14.8333 44.1067L17.1533 48.16L16.22 48.7467L14.5133 45.7067C14.0422 47.6178 13.1889 48.6667 11.9533 48.8533V47.64C12.5578 47.5067 13.0156 46.9289 13.3267 45.9067C13.6378 44.8756 13.8022 43.52 13.82 41.84H12.0733V40.6933H13.82V39.1867H14.98V40.6933H16.7133V41.84H14.98ZM21.3133 49.4533H20.1667V44.4933H18.6467V49.28H17.5267V39.2667H18.6467V43.3067H20.1667V39.2133H21.3133V49.4533ZM30.3919 45.3067V39.2133H31.6053V45.3067H30.3919ZM29.6453 44.4C29.3519 44.5422 28.9341 44.6533 28.3919 44.7333C27.8497 44.8133 27.2408 44.8533 26.5653 44.8533H22.9119V39.4533H28.9653V40.44H24.1119V41.68H28.7653V42.6133H24.1119V43.8533H26.6586C27.2986 43.8533 27.8808 43.8178 28.4053 43.7467C28.9297 43.6667 29.343 43.5556 29.6453 43.4133V44.4ZM27.4853 45.6133C28.783 45.6133 29.8141 45.7689 30.5786 46.08C31.3519 46.3822 31.7386 46.8711 31.7386 47.5467C31.7386 48.2222 31.3519 48.7111 30.5786 49.0133C29.8141 49.3156 28.783 49.4667 27.4853 49.4667C26.1964 49.4667 25.1653 49.3156 24.3919 49.0133C23.6275 48.7111 23.2453 48.2222 23.2453 47.5467C23.2453 46.8711 23.6275 46.3822 24.3919 46.08C25.1653 45.7689 26.1964 45.6133 27.4853 45.6133ZM27.4853 48.4667C28.3741 48.4667 29.0897 48.3911 29.6319 48.24C30.183 48.0889 30.4586 47.8578 30.4586 47.5467C30.4586 47.2267 30.1875 46.9911 29.6453 46.84C29.103 46.6889 28.383 46.6133 27.4853 46.6133C26.5964 46.6133 25.8808 46.6889 25.3386 46.84C24.7964 46.9911 24.5253 47.2267 24.5253 47.5467C24.5253 47.8667 24.7964 48.1022 25.3386 48.2533C25.8808 48.3956 26.5964 48.4667 27.4853 48.4667Z"
        fill={fillStyle}
      />
    </svg>
  )
}

export const HomeIcon = ({ active = false }: SvgIconProps) => {
  const fillStyle = active ? '#4196FD' : '#E2E2E2'

  return (
    <svg width="45" height="52" viewBox="0 0 45 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.0181 2C19.0054 1.99976 18.9926 1.99976 18.98 2H17.0522C15.815 2 14.7046 2.75954 14.2562 3.91266L12.4682 8.51023C12.0339 9.62723 12.5111 10.8522 13.5 11.4121V19C13.5 20.6568 14.8431 22 16.5 22H28.5C30.1569 22 31.5 20.6568 31.5 19V11.4121C32.4889 10.8522 32.9662 9.62723 32.5318 8.51023L30.7438 3.91266C30.2954 2.75955 29.185 2 27.9478 2H26.0201C26.0074 1.99976 25.9947 1.99976 25.9819 2H19.0181ZM29.5 11.7384C29.0515 11.6859 28.6119 11.5559 28.2016 11.3508L27.5005 11.0002L27.4994 11.0002L26.857 11.2572C25.6649 11.734 24.3351 11.734 23.1431 11.2572L22.5 11L21.857 11.2572C20.6649 11.734 19.3351 11.734 18.1431 11.2572L17.5006 11.0002L17.4995 11.0002L16.7984 11.3508C16.3881 11.5559 15.9485 11.6859 15.5 11.7384V19C15.5 19.5523 15.9477 20 16.5 20H18.5V17C18.5 15.3431 19.8431 14 21.5 14H23.5C25.1569 14 26.5 15.3431 26.5 17V20H28.5C29.0523 20 29.5 19.5523 29.5 19V11.7384ZM28.3944 9.21115C28.3793 9.2036 28.3642 9.19626 28.349 9.18912L27.237 4H27.9478C28.3602 4 28.7303 4.25318 28.8798 4.63755L30.6678 9.23512C30.7451 9.4341 30.6304 9.65585 30.4233 9.70763C29.9776 9.81904 29.5069 9.76736 29.096 9.56193L28.3944 9.21115ZM26.3303 9.31382L25.1916 4H23.5V9.24593L23.8858 9.40027C24.6011 9.68636 25.3989 9.68636 26.1142 9.40027L26.3303 9.31382ZM21.5 4H19.8084L18.6698 9.31384L18.8858 9.40027C19.6011 9.68636 20.3989 9.68636 21.1142 9.40027L21.5 9.24594V4ZM16.6511 9.1891L17.763 4H17.0522C16.6398 4 16.2697 4.25318 16.1202 4.63755L14.3323 9.23512C14.2549 9.4341 14.3696 9.65585 14.5767 9.70763C15.0224 9.81904 15.4932 9.76736 15.904 9.56193L16.6056 9.21115C16.6207 9.2036 16.6358 9.19625 16.6511 9.1891ZM24.5 17V20H20.5V17C20.5 16.4477 20.9477 16 21.5 16H23.5C24.0523 16 24.5 16.4477 24.5 17Z"
        fill={fillStyle}
      />
      <path
        d="M17.8 40.6133V39.7067H21.6667V38.8H22.88V39.7067H26.76V40.6133H17.8ZM27.1467 45.6133H17.4133V44.68H21.68V43.96C20.5867 43.9244 19.7289 43.7911 19.1067 43.56C18.4844 43.3289 18.1733 42.9867 18.1733 42.5333C18.1733 42.0444 18.5378 41.68 19.2667 41.44C20.0044 41.2 21.0089 41.08 22.28 41.08C23.5511 41.08 24.5511 41.2 25.28 41.44C26.0178 41.68 26.3867 42.0444 26.3867 42.5333C26.3867 42.9778 26.0756 43.32 25.4533 43.56C24.8311 43.7911 23.9733 43.9244 22.88 43.96V44.68H27.1467V45.6133ZM19.3733 42.5333C19.3733 42.7378 19.64 42.8933 20.1733 43C20.7067 43.0978 21.4089 43.1467 22.28 43.1467C23.1511 43.1467 23.8533 43.0978 24.3867 43C24.92 42.8933 25.1867 42.7378 25.1867 42.5333C25.1867 42.3289 24.92 42.1733 24.3867 42.0667C23.8533 41.96 23.1511 41.9067 22.28 41.9067C21.4089 41.9067 20.7067 41.96 20.1733 42.0667C19.64 42.1733 19.3733 42.3289 19.3733 42.5333ZM26.48 46.36V49.3333H18.08V46.36H26.48ZM25.3067 48.4533V47.2533H19.2667V48.4533H25.3067Z"
        fill={fillStyle}
      />
    </svg>
  )
}

export const BusReservationIcon = ({ active = false }: SvgIconProps) => {
  const fillStyle = active ? '#4196FD' : '#E2E2E2'

  return (
    <svg width="45" height="52" viewBox="0 0 45 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.5 3C18.5 2.44772 18.0523 2 17.5 2C16.9477 2 16.5 2.44772 16.5 3V4H15.5C13.8431 4 12.5 5.34315 12.5 7V19C12.5 20.6569 13.8431 22 15.5 22H24.1822C23.4121 21.488 22.7671 20.8028 22.3027 20H15.5C14.9477 20 14.5 19.5523 14.5 19V7C14.5 6.44772 14.9477 6 15.5 6H16.5V7C16.5 7.55228 16.9477 8 17.5 8C18.0523 8 18.5 7.55228 18.5 7V6H26.5V7C26.5 7.55228 26.9477 8 27.5 8C28.0523 8 28.5 7.55228 28.5 7V6H29.5C30.0523 6 30.5 6.44771 30.5 7V11.8027C31.3028 12.2671 31.988 12.9121 32.5 13.6822V7C32.5 5.34315 31.1569 4 29.5 4H28.5V3C28.5 2.44772 28.0523 2 27.5 2C26.9477 2 26.5 2.44772 26.5 3V4H18.5V3Z"
        fill={fillStyle}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.5 21C29.7091 21 31.5 19.2091 31.5 17C31.5 14.7909 29.7091 13 27.5 13C25.2909 13 23.5 14.7909 23.5 17C23.5 19.2091 25.2909 21 27.5 21ZM27.5 23C30.8137 23 33.5 20.3137 33.5 17C33.5 13.6863 30.8137 11 27.5 11C24.1863 11 21.5 13.6863 21.5 17C21.5 20.3137 24.1863 23 27.5 23Z"
        fill={fillStyle}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.5 14C28.0523 14 28.5 14.4477 28.5 15V16.5858L29.2071 17.2929C29.5976 17.6834 29.5976 18.3166 29.2071 18.7071C28.8166 19.0976 28.1834 19.0976 27.7929 18.7071L26.7929 17.7071C26.6054 17.5196 26.5 17.2652 26.5 17V15C26.5 14.4477 26.9477 14 27.5 14Z"
        fill={fillStyle}
      />
      <path
        d="M10.6133 49.4533H9.4V44.5467H7.34667V48.8533H1.90667V39.5067H3.09333V42.9867H6.16V39.5067H7.34667V43.3733H9.4V39.2133H10.6133V49.4533ZM6.16 44.1467H3.09333V47.6933H6.16V44.1467ZM16.7186 42.6667C16.1497 43.5822 15.4653 44.3111 14.6653 44.8533C13.8653 45.3867 13.0297 45.6533 12.1586 45.6533V44.4533C12.843 44.4533 13.5008 44.2222 14.1319 43.76C14.7719 43.2889 15.3141 42.6578 15.7586 41.8667C16.2119 41.0667 16.5186 40.1911 16.6786 39.24L17.9186 39.4667C17.7675 40.2667 17.5408 41 17.2386 41.6667L21.5186 44.6933L20.8653 45.6933L16.7186 42.6667ZM21.7053 47.7867V48.9733H11.9719V47.7867H21.7053ZM31.9305 49.4533H30.7972V39.2133H31.9305V49.4533ZM29.5972 39.2667V49.28H28.4905V46.52H26.9705C26.8194 47.3556 26.5705 47.9778 26.2239 48.3867C25.8772 48.7867 25.4327 48.9867 24.8905 48.9867C24.1439 48.9867 23.5839 48.6044 23.2105 47.84C22.8372 47.0667 22.6505 45.8578 22.6505 44.2133C22.6505 42.5689 22.8372 41.3644 23.2105 40.6C23.5839 39.8267 24.1439 39.44 24.8905 39.44C25.9127 39.44 26.5839 40.1422 26.9039 41.5467H28.4905V39.2667H29.5972ZM24.8905 47.84C25.2816 47.84 25.5705 47.5467 25.7572 46.96C25.9439 46.3733 26.0372 45.4578 26.0372 44.2133C26.0372 42.9689 25.9439 42.0533 25.7572 41.4667C25.5705 40.88 25.2816 40.5867 24.8905 40.5867C24.5083 40.5867 24.2239 40.8844 24.0372 41.48C23.8594 42.0667 23.7705 42.9778 23.7705 44.2133C23.7705 45.4489 23.8594 46.3644 24.0372 46.96C24.2239 47.5467 24.5083 47.84 24.8905 47.84ZM28.4905 42.7067H27.0772C27.1305 43.1422 27.1572 43.6444 27.1572 44.2133C27.1572 44.6133 27.1439 44.9956 27.1172 45.36H28.4905V42.7067ZM41.9424 42.8667H43.2891V43.96H41.9424V45.32H40.7424V39.2133H41.9424V40.3467H43.2891V41.44H41.9424V42.8667ZM36.1158 45.0133C35.5113 45.0133 34.978 44.8933 34.5158 44.6533C34.0624 44.4044 33.7113 44.0622 33.4624 43.6267C33.2136 43.1911 33.0891 42.7022 33.0891 42.16C33.0891 41.6178 33.2136 41.1289 33.4624 40.6933C33.7113 40.2578 34.0624 39.92 34.5158 39.68C34.978 39.4311 35.5113 39.3067 36.1158 39.3067C36.7202 39.3067 37.2491 39.4311 37.7024 39.68C38.1647 39.92 38.5202 40.2578 38.7691 40.6933C39.018 41.1289 39.1424 41.6178 39.1424 42.16C39.1424 42.7022 39.018 43.1911 38.7691 43.6267C38.5202 44.0622 38.1647 44.4044 37.7024 44.6533C37.2491 44.8933 36.7202 45.0133 36.1158 45.0133ZM36.1158 40.36C35.5736 40.36 35.1336 40.5244 34.7958 40.8533C34.458 41.1733 34.2891 41.6089 34.2891 42.16C34.2891 42.7111 34.458 43.1511 34.7958 43.48C35.1336 43.8 35.5736 43.96 36.1158 43.96C36.658 43.96 37.098 43.8 37.4358 43.48C37.7736 43.1511 37.9424 42.7111 37.9424 42.16C37.9424 41.6089 37.7736 41.1733 37.4358 40.8533C37.098 40.5244 36.658 40.36 36.1158 40.36ZM41.9424 45.8667V49.4667H40.7158V46.96H33.7824V45.8667H41.9424Z"
        fill={fillStyle}
      />
    </svg>
  )
}

export const CarpoolIcon = ({ active = false }: SvgIconProps) => {
  const fillStyle = active ? '#4196FD' : '#E2E2E2'

  return (
    <svg width="45" height="52" viewBox="0 0 45 52" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.5 18H29.5C31.1569 18 32.5 16.6569 32.5 15V12.7082C32.5 12.2425 32.3916 11.7831 32.1833 11.3666L30.3292 7.65836C29.821 6.64201 28.7822 6 27.6459 6H26.3293C25.9175 4.83481 24.8062 4 23.5 4H15.5C13.8431 4 12.5 5.34315 12.5 7V15C12.5 16.6569 13.8431 18 15.5 18ZM23.5 6H15.5C14.9477 6 14.5 6.44772 14.5 7V15C14.5 15.5523 14.9477 16 15.5 16H24.5V7C24.5 6.44772 24.0523 6 23.5 6ZM26.5 12V16H29.5C30.0523 16 30.5 15.5523 30.5 15V12.7082C30.5 12.553 30.4639 12.3998 30.3944 12.261L30.2639 12H26.5ZM29.2639 10H26.5V8H27.6459C28.0247 8 28.3709 8.214 28.5403 8.55279L29.2639 10Z"
        fill={fillStyle}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.5 20C18.6046 20 19.5 19.1046 19.5 18C19.5 16.8954 18.6046 16 17.5 16C16.3954 16 15.5 16.8954 15.5 18C15.5 19.1046 16.3954 20 17.5 20Z"
        fill={fillStyle}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28.5 20C29.6046 20 30.5 19.1046 30.5 18C30.5 16.8954 29.6046 16 28.5 16C27.3954 16 26.5 16.8954 26.5 18C26.5 19.1046 27.3954 20 28.5 20Z"
        fill={fillStyle}
      />
      <path
        d="M6.22667 41.1733C5.69333 41.7422 5.02667 42.1956 4.22667 42.5333C3.42667 42.8622 2.60444 43.0356 1.76 43.0533V42C2.39111 41.9733 3.01778 41.8311 3.64 41.5733C4.27111 41.3067 4.80889 40.9467 5.25333 40.4933C5.69778 40.04 5.97778 39.5289 6.09333 38.96L7.29333 39.1733C7.21333 39.5911 7.06667 39.9733 6.85333 40.32L10.8933 42.12L10.4533 43.08L6.22667 41.1733ZM11.1467 44.88H1.41333V43.8667H11.1467V44.88ZM6.28 45.7467C7.58667 45.7467 8.62667 45.8933 9.4 46.1867C10.1822 46.4711 10.5733 46.9422 10.5733 47.6C10.5733 48.2667 10.1822 48.7467 9.4 49.04C8.61778 49.3333 7.57778 49.48 6.28 49.48C4.99111 49.48 3.95111 49.3333 3.16 49.04C2.37778 48.7467 1.98667 48.2667 1.98667 47.6C1.98667 46.9422 2.37778 46.4711 3.16 46.1867C3.94222 45.8933 4.98222 45.7467 6.28 45.7467ZM6.28 48.4933C7.16 48.4933 7.88 48.4222 8.44 48.28C9.00889 48.1378 9.29333 47.9111 9.29333 47.6C9.29333 47.2889 9.00889 47.0667 8.44 46.9333C7.88 46.8 7.16 46.7333 6.28 46.7333C5.4 46.7333 4.67556 46.8 4.10667 46.9333C3.53778 47.0667 3.25333 47.2889 3.25333 47.6C3.25333 47.9111 3.53778 48.1378 4.10667 48.28C4.67556 48.4222 5.4 48.4933 6.28 48.4933ZM16.0519 41.9333C16.0164 42.7511 15.9275 43.5111 15.7853 44.2133L18.8386 48.0133L17.9586 48.84L15.3853 45.5867C15.0475 46.5467 14.5941 47.3111 14.0253 47.88C13.4564 48.44 12.8119 48.7644 12.0919 48.8533V47.6133C12.6253 47.5156 13.0875 47.2133 13.4786 46.7067C13.8786 46.2 14.1941 45.5333 14.4253 44.7067C14.6564 43.88 14.7941 42.9556 14.8386 41.9333H12.2653V40.76H14.8386V39.1867H16.0653V40.76H18.5053V41.9333H16.0519ZM20.8253 44.5333V49.4533H19.6253V39.2133H20.8253V43.32H22.1719V44.5333H20.8253ZM23.1705 40.3733V39.32H31.5705V42.7867H30.3572V40.3733H23.1705ZM32.2639 44.5333H22.5305V43.4933H26.1439V41.5333H27.3572V43.4933H32.2639V44.5333ZM27.3972 45.4533C28.6683 45.4533 29.6994 45.6178 30.4905 45.9467C31.2905 46.2667 31.6905 46.7689 31.6905 47.4533C31.6905 48.1378 31.295 48.6444 30.5039 48.9733C29.7127 49.3022 28.6772 49.4667 27.3972 49.4667C26.1261 49.4667 25.0905 49.3022 24.2905 48.9733C23.4994 48.6444 23.1039 48.1378 23.1039 47.4533C23.1039 46.76 23.4994 46.2533 24.2905 45.9333C25.0816 45.6133 26.1172 45.4533 27.3972 45.4533ZM27.3972 48.4667C28.2505 48.4667 28.9661 48.3822 29.5439 48.2133C30.1305 48.0356 30.4239 47.7822 30.4239 47.4533C30.4239 47.1333 30.1305 46.8889 29.5439 46.72C28.9572 46.5422 28.2416 46.4533 27.3972 46.4533C26.535 46.4533 25.815 46.5378 25.2372 46.7067C24.6594 46.8667 24.3705 47.1156 24.3705 47.4533C24.3705 47.7822 24.6594 48.0356 25.2372 48.2133C25.8239 48.3822 26.5439 48.4667 27.3972 48.4667ZM37.9558 44.72C37.0847 44.72 36.3202 44.6133 35.6624 44.4C35.0136 44.1867 34.5069 43.8756 34.1424 43.4667C33.7869 43.0578 33.6091 42.5689 33.6091 42C33.6091 41.4311 33.7869 40.9467 34.1424 40.5467C34.5069 40.1378 35.0136 39.8267 35.6624 39.6133C36.3202 39.4 37.0847 39.2933 37.9558 39.2933C38.8269 39.2933 39.5869 39.4 40.2358 39.6133C40.8936 39.8267 41.4002 40.1378 41.7558 40.5467C42.1202 40.9467 42.3024 41.4311 42.3024 42C42.3024 42.5689 42.1202 43.0578 41.7558 43.4667C41.4002 43.8756 40.8936 44.1867 40.2358 44.4C39.5869 44.6133 38.8269 44.72 37.9558 44.72ZM37.9558 40.4133C37.0313 40.4133 36.2847 40.5556 35.7158 40.84C35.1558 41.1156 34.8758 41.5022 34.8758 42C34.8758 42.4978 35.1558 42.8889 35.7158 43.1733C36.2847 43.4489 37.0313 43.5867 37.9558 43.5867C38.8802 43.5867 39.6224 43.4489 40.1824 43.1733C40.7513 42.8889 41.0358 42.4978 41.0358 42C41.0358 41.5022 40.7513 41.1156 40.1824 40.84C39.6224 40.5556 38.8802 40.4133 37.9558 40.4133ZM40.4624 46.8267V49.6933H39.2624V46.8267H36.6491V49.6933H35.4491V46.8267H33.0891V45.6533H42.8224V46.8267H40.4624Z"
        fill={fillStyle}
      />
    </svg>
  )
}
