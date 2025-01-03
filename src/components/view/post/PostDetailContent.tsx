type ContentType = {
  label: string
  content: string | string[]
}

type DetailContentProps = {
  title: string
  contents: ContentType[]
}

const PostInfoField = ({ label, content }: ContentType) => {
  return (
    <li className="flex-column w-full gap-1">
      <p className="p-small font-medium text-blue-5">{label}</p>
      <p className="p-large text-grey-6">{content}</p>
    </li>
  )
}

const ContentRow = ({ label, content }: ContentType) => {
  if (Array.isArray(content)) {
    return (
      <ul className="flex-between-align">
        {content.map((item, index) => (
          <PostInfoField key={index} label={label} content={item} />
        ))}
      </ul>
    )
  }
  return <PostInfoField label={label} content={content} />
}

export const PostDetailContent = ({ title, contents }: DetailContentProps) => {
  return (
    <div className="scroll mt-6 grow">
      <div className="flex-column px-4">
        <h5 className="mb-8 font-bold text-blue-6">{title}</h5>
        <div className="flex-column gap-6">
          {contents.map((content, index) => (
            <ContentRow key={index} {...content} />
          ))}
        </div>
      </div>
    </div>
  )
}
