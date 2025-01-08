import type { PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom'

import { ArrowLeftIcon, CloseIcon, KebabIcon } from '../icons/NonActiveIcons'

type SubHeaderProps = {
  title?: string
  type: 'close' | 'edit' | 'complete' | 'null' | 'kebab'
  onClickCancel?: VoidFunction
  onClickClose?: VoidFunction
  onClickKebab?: VoidFunction
  onClickEdit?: VoidFunction
  onClickComplete?: VoidFunction
}

type SubHeaderWithIconType = Pick<SubHeaderProps, 'title' | 'onClickCancel'>
type SubHeaderWithoutIconType = Omit<SubHeaderProps, 'onClickClose' | 'onClickKebab'>

const BaseHeader = ({
  title,
  onClickCancel,
  children,
}: PropsWithChildren<SubHeaderWithIconType>) => {
  const navigate = useNavigate()
  const handleClickCancel = onClickCancel ? onClickCancel : () => navigate(-1)

  return (
    <div className="flex-between-align relative p-4">
      <button type="button" onClick={handleClickCancel}>
        <ArrowLeftIcon />
      </button>
      <h6 className="absolute left-1/2 w-fit -translate-x-1/2 text-center font-bold text-blue-600">
        {title}
      </h6>
      {children}
    </div>
  )
}

export const SubHeaderWithIcon = ({
  title,
  type,
  onClickCancel,
  onClickClose,
  onClickKebab,
}: SubHeaderProps) => {
  const isCloseType = type === 'close'
  const handleIconClick = isCloseType ? onClickClose : onClickKebab

  return (
    <BaseHeader title={title} onClickCancel={onClickCancel}>
      <button type="button" onClick={handleIconClick}>
        {isCloseType ? <CloseIcon /> : <KebabIcon />}
      </button>
    </BaseHeader>
  )
}

export const SubHeaderWithoutIcon = ({
  title,
  type,
  onClickCancel,
  onClickEdit,
  onClickComplete,
}: SubHeaderWithoutIconType) => {
  const isEditMode = type === 'edit'

  return (
    <BaseHeader title={title} onClickCancel={onClickCancel}>
      {type === 'null' ? (
        <span className="w-6" />
      ) : (
        <button type="button" onClick={isEditMode ? onClickEdit : onClickComplete}>
          <p className="p-medium pr-[2px] font-medium text-grey-400">
            {isEditMode ? '수정' : '완료'}
          </p>
        </button>
      )}
    </BaseHeader>
  )
}
