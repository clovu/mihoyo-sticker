'use client'

import TimeAgo from 'react-timeago'

export default function TimeAgoComponent({
  date,
}: Readonly<{
  date: string;
}>) {
  // In JavaScript, Date conversion uses local timezone if the date string contains timezone information
  const timestamp = new Date(date).getTime()

  const formatter: TimeAgo.Formatter = (value, unit, suffix, epochMiliseconds, nextFormatter) => {
    if (unit === 'second')
      return 'now'
    return nextFormatter?.(value, unit, suffix, epochMiliseconds)
  }

  return <TimeAgo date={timestamp} minPeriod={10} formatter={formatter} />
}
