/**
 * <p>
 * website theme
 * </p>
 *
 * @version: v1.0
 * @author: Clover
 * @create: 2024-10-25 10:27
 */

import { ThemeProvider as ThemeProviderLib } from 'next-themes'
import { PropsWithChildren } from 'react'

type ThemeProviderProps = PropsWithChildren

export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <ThemeProviderLib enableSystem attribute="class">
      {children}
    </ThemeProviderLib>
  )
}
