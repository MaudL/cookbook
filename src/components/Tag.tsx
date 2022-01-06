import clsx from 'clsx'
import toMaterialStyle from 'material-color-hash'
import React, { MouseEvent } from 'react'

interface Props {
  name: string
  selected?: boolean
  color?: string
  onClick?: (e: MouseEvent<HTMLElement>) => void
}

export default function Tag({ name, selected, color: colorProp, onClick }: Props) {
  const colorHash = toMaterialStyle(name, 700).backgroundColor
  const color = colorProp ?? colorHash

  const Component = onClick ? 'button' : 'div'

  return (
    <Component
      className={clsx(
        'border rounded-full px-3 text-white text-sm whitespace-nowrap',
        onClick && 'hover:border-2 hover:-m-[1px] hover:font-bold',
      )}
      style={{
        backgroundColor: selected ? colorHash : undefined,
        color: selected ? '#fff' : color,
        borderColor: selected ? colorHash : color,
      }}
      onClick={onClick}
    >
      {name}
    </Component>
  )
}
