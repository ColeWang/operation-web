type OneOfDefine = string | number;

/**
 * 判断要查询的数组是否至少有一个元素包含在目标数组中
 * @param target 目标 [1]
 * @param arr 靶 [1, 2, 3]
 * @return boolean
 */
export function hasOneOf<T extends OneOfDefine> (target: T[], arr: T[]): boolean {
  return target.some((item) => {
    return arr.indexOf(item) > -1
  })
}

/**
 * 判断元素存在数组中
 */
export function oneOf<T extends OneOfDefine> (value: T, validList: T[]): boolean {
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true
    }
  }
  return false
}
