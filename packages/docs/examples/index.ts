export const demos = import.meta.glob('./**/*.vue', { eager: true })
export const sourceCode = import.meta.glob('./**/*.vue', { eager: true, as: 'raw' })