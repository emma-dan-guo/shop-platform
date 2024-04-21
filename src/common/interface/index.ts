export interface IRes<T extends Record<string, any>> {
  data: T
  // error_code result=1: success
  result: number
  msg: string
}
