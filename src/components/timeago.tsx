'use client'

import TimeAgo from 'react-timeago'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'

export default function TimeAgoComponent({
  date,
}: Readonly<{
  date: string;
}>) {
  // In JavaScript, Date conversion uses local timezone if the date string contains timezone information
  const timestamp = new Date(date).getTime()
  const formatter = buildFormatter({ seconds: 'now' })

  return <TimeAgo date={timestamp} minPeriod={10} formatter={formatter} />
}
