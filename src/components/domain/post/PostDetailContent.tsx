type ContentType = {
  label: string
  content: string | string[]
}

type DetailContentProps = {
  title: string
  contents: ContentType[]
}

const ContentRow = ({ label, content }: ContentType) => {
  if (Array.isArray(content)) {
    return (
      <ul className="flex-between-align">
        {content.map((item) => (
          <li key={label} className="flex-column w-full gap-1">
            <p className="p-800 text-black-600">{label}</p>
            <p className="p-600 text-black-400">{item}</p>
          </li>
        ))}
      </ul>
    )
  }
  return (
    <li className="flex-column w-full gap-1">
      <p className="p-800 text-black-600">{label}</p>
      <p className="p-600 text-black-400">{content}</p>
    </li>
  )
}

export const PostDetailContent = ({ title, contents }: DetailContentProps) => {
  return (
    <div className="scroll mt-6 grow">
      <div className="flex-column px-4">
        <h3 className="p-500 mb-8 text-black-600">{title}</h3>
        <div className="flex-column gap-6">
          {contents.map((content, index) => (
            <ContentRow key={index} {...content} />
          ))}
        </div>
      </div>
    </div>
  )
}
