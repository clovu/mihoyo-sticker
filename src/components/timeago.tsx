'use client'

import TimeAgo from 'react-timeago'

export default function TimeAgoComponent({
  date,
}: Readonly<{
  date: string;
}>) {
  // In JavaScript, Date conversion uses local timezone if the date string contains timezone information
  const timestamp = new Date(date).getTime()
  return <TimeAgo date={timestamp} suppressHydrationWarning />
}
