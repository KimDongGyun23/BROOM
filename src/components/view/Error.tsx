import type { PropsWithChildren } from 'react'

export const EmptyMessage = ({ children }: PropsWithChildren) => {
  return <p className="p-700 flex-center size-full p-5 text-black-500">{children}</p>
}
