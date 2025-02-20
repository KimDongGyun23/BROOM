import styled from 'styled-components'

import { SkullIcon } from './icons/NonActiveIcons'

type MilitaryClassProps = {
  reserveYear: number
}

export const MilitaryClass = ({ reserveYear }: MilitaryClassProps) => {
  return (
    <Container>
      {reserveYear === 0 ? (
        <SkullIcon />
      ) : (
        Array.from({ length: reserveYear }, (_, index) => <Line key={index} />)
      )}
    </Container>
  )
}

const Container = styled.div`
  ${({ theme }) => theme.flexBox('column', undefined, 'space-evenly')};
  width: 20px;
  height: 20px;
`

const Line = styled.div`
  ${({ theme }) => theme.borderRadius('xs')};
  height: 3px;
  background-color: ${({ theme }) => theme.colors.yellow};
`
