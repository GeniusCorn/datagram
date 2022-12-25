import { read, utils } from 'xlsx'

export async function excelToJson(file: File): Promise<any[]> {
  const f = await file.arrayBuffer()
  const wb = read(f)
  const data = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 1 })

  return data
}
