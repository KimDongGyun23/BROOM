type EmptyMessageProps = {
  label: string
}

export const EmptyMessage = ({ label }: EmptyMessageProps) => {
  return <p className="p-700 flex-center size-full p-5 text-black-500">{label}</p>
}
