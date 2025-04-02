import { css } from 'styled-components'

import calendarIcon from '@/assets/Calendar.svg'

import { colors } from './colors'

const baseStyle = css`
  input,
  textarea {
    font: inherit;
    border: none;
    outline: none;
    background-color: transparent;

    &:focus {
      background-color: transparent;
      outline: none;
    }

    &::placeholder {
      color: ${colors.black[300]};
    }
  }
`

const resetStyle = css`
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input::-ms-clear,
  input::-ms-reveal {
    display: none;
    width: 0;
    height: 0;
  }
  input::-webkit-search-decoration,
  input::-webkit-search-cancel-button,
  input::-webkit-search-results-button,
  input::-webkit-search-results-decoration {
    display: none;
  }
`

const numberStyle = css`
  input[type='number'] {
    -moz-appearance: textfield;
  }
`

const dateStyle = css`
  input[type='date'] {
    position: relative;
    background-image: url(${calendarIcon});
    background-repeat: no-repeat;
    background-position: right center;
    padding-right: 10px;
  }

  input[type='date']::-webkit-calendar-picker-indicator {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    color: transparent;
    cursor: pointer;
  }

  input[type='date']::before {
    content: attr(data-placeholder);
    display: flex;
    align-items: center;
    position: absolute;
    top: 0;
    bottom: 0;
    background-color: white;
    color: ${colors.black[300]};
  }

  input[type='date']:focus::before,
  input[type='date']:valid::before {
    display: none;
  }
`

export const inputStyle = {
  baseStyle,
  resetStyle,
  numberStyle,
  dateStyle,
}
