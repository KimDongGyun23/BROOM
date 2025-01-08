type KebabItem = {
  label: string
  onClick: () => void
  isRed?: boolean
}

type KebabProps = {
  items: KebabItem[]
  position: string
}

const KebabListItem = ({ label, onClick, isRed, isLast }: KebabItem & { isLast: boolean }) => (
  <li className="w-full">
    <button
      type="button"
      className={`w-full ${isRed ? 'text-red-200' : 'text-grey-700'}`}
      onClick={onClick}
    >
      {label}
    </button>
    {!isLast && <hr className="my-2 h-px w-full bg-grey-200" aria-hidden="true" />}
  </li>
)

export const Kebab = ({ items, position }: KebabProps) => {
  return (
    <nav
      className={`flex-column-align p-small absolute w-fit rounded bg-white px-3 py-[10px] text-center shadow-md ${position}`}
      aria-label="추가 옵션"
    >
      <ul className="w-full list-none p-0">
        {items.map((item, index) => (
          <KebabListItem
            key={item.label}
            label={item.label}
            onClick={item.onClick}
            isRed={item.isRed}
            isLast={index === items.length - 1}
          />
        ))}
      </ul>
    </nav>
  )
}
