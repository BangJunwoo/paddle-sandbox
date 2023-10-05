import React from 'react'
const InputRemover = () => {
  return (
    <button
      type="button"
      tabIndex={-1}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.currentTarget.previousElementSibling instanceof HTMLInputElement) {
          console.log('hello', e.currentTarget.previousElementSibling)
          e.currentTarget.previousElementSibling.value = ''
        }
      }}
    >
      x
    </button>
  )
}

export default InputRemover
