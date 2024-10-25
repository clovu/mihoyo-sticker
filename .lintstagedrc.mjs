import path from 'node:path'

function createCommand(prefix, join) {
  return (filenames) =>
    `${prefix} ${filenames.map((f) => path.relative(process.cwd(), f)).join(`${join} `)}`
}

export default {
  '*.{js,jsx,ts,tsx}': [
    createCommand('pnpm eslint --fix', ''),
    // unlock the code to enable prettier format if you use it
    // createCommand('prettier --write', '--write')
  ],
}
