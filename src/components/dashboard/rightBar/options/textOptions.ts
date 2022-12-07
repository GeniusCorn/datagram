export interface Option {
  bold: boolean
  fontSize: number
  lineHeight: number
  textAlign: 'start' | 'end' | 'center' | 'justify'
}

export const textOptions: Option = {
  bold: false,
  fontSize: 16,
  lineHeight: 30,
  textAlign: 'start'
}
