type ParamObj = Record<string, string>

/**
 * @param {String} url
 * @description 从URL中解析参数
 */
export function getParams (url: string): ParamObj {
  const keyValueArr: string[] = url.split('?')[1].split('&')
  const paramObj: ParamObj = {}
  keyValueArr.forEach((item) => {
    const keyValue: string[] = item.split('=')
    paramObj[keyValue[0]] = keyValue[1]
  })
  return paramObj
}
