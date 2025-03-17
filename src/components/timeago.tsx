'use client'

import TimeAgo, { Props as TimeAgoPros } from 'react-timeago'

export default function TimeAgoComponent({
  date,
}: Readonly<{
  date: string;
}>) {
  // In JavaScript, Date conversion uses local timezone if the date string contains timezone information
  const timestamp = new Date(date).getTime()

  const formatter: TimeAgoPros['formatter'] = (
    value,
    unit,
    suffix,
    epochMiliseconds,
    nextFormatter,
    now,
  ) => {
    if (unit === 'second')
      return 'now'
    return nextFormatter(value, unit, suffix, epochMiliseconds, nextFormatter, now)
  }

  return <TimeAgo date={timestamp} minPeriod={10} formatter={formatter} />
}
