import type { PropsWithChildren } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { ArrowLeftIcon, CloseIcon, KebabIcon } from './icons/NonActiveIcons'

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
    <HeaderContainer>
      <button type="button" onClick={handleClickCancel}>
        <ArrowLeftIcon />
      </button>
      <Title>{title}</Title>
      {children}
    </HeaderContainer>
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
        <span className="null-icon" />
      ) : (
        <TextButton type="button" onClick={isEditMode ? onClickEdit : onClickComplete}>
          {isEditMode ? '수정' : '완료'}
        </TextButton>
      )}
    </BaseHeader>
  )
}

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: ${({ theme }) => theme.gap.xl};

  .null-icon {
    width: 24px;
  }
`

const Title = styled.h2`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: ${({ theme }) => theme.fontSize[500]};
  line-height: ${({ theme }) => theme.lineHeight[500]};
  text-align: center;
  color: ${({ theme }) => theme.colors.black[700]};
`

const TextButton = styled.button`
  padding-right: 2px;
  font-size: ${({ theme }) => theme.fontSize[700]};
  line-height: ${({ theme }) => theme.lineHeight[700]};
  color: ${({ theme }) => theme.colors.black[400]};
`
