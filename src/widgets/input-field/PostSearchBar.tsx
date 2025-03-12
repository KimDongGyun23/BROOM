import { useCallback } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { styled } from 'styled-components'

import { useFilterLabel } from '@/features/search-post/model/filterDropdown.store'
import type { Search } from '@/shared/model/common.type'
import { SearchBar } from '@/shared/ui/SearchBar'

import { FilterToggleButton } from '../button/FilterToggleButton'
import { PostSearchKebab } from '../kebab/PostSearchKebab'

export const PostSearchBar = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const defaultSearchName = searchParams.get('searchName') || ''

  const currentFilter = useFilterLabel()

  const formMethod = useForm<Search>({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: { search: defaultSearchName },
  })

  const { handleSubmit } = useFormContext<Search>()

  const handleSearchPost = useCallback(
    ({ search }: Search) => {
      navigate(`/board/search?filterName=${currentFilter.label}&searchName=${search}`)
    },
    [navigate, currentFilter],
  )

  return (
    <FormProvider {...formMethod}>
      <Container>
        <FilterToggleButton />
        <PostSearchKebab />
        <SearchBar currentFilter={currentFilter} onSubmit={handleSubmit(handleSearchPost)} />
      </Container>
    </FormProvider>
  )
}

const Container = styled.section`
  ${({ theme }) => `
    ${theme.flexBox('row', 'center')};
    ${theme.margin(0, 'container')};
    ${theme.padding('sm', 'md', 'sm', 'lg')};
    ${theme.border('input')};
    ${theme.borderRadius('sm')};
  `}
`
