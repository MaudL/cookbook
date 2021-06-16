import React, { ReactNode } from 'react'
import { Typography } from '@material-ui/core'

export const HTMLContent = ({ content }: { content: any }) => (
  <Typography dangerouslySetInnerHTML={{ __html: content }} />
)

const Content = ({ content }: { content: any }) => (
  <Typography>{content}</Typography>
)

export default Content
