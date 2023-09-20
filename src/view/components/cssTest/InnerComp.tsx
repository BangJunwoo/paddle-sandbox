import React, { CSSProperties } from 'react'

type Props = {
  styles: CSSProperties
}

const InnerComp = ({ styles }: Props) => {
  return (
    <div className="innerComp">
      <div style={{ ...styles }}>{JSON.stringify(styles, null, 2)}</div>
    </div>
  )
}

export default InnerComp
