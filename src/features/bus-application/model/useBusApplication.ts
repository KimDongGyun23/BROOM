export const useBusApplication = () => {
  const isBusFormOpen = import.meta.env.VITE_BUS_STATE === 'true'
  const busNoticeURL = import.meta.env.VITE_BUS_NOTICE_URL
  const busFormURL = import.meta.env.VITE_BUS_FORM_URL

  const handleRedirect = (url: string) => (window.location.href = url)

  return {
    isBusFormOpen,
    handleNoticeRedirect: () => handleRedirect(busNoticeURL),
    handleFormRedirect: () => handleRedirect(busFormURL),
  }
}
