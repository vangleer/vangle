let tableIndex = 1
let columnIndex = 1

export const createTableName = () => {
  return `table_${tableIndex++}`
}
export const createColumnName = () => {
  return `column_${columnIndex++}`
}