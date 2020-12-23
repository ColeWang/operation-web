type EventType = keyof HTMLElementEventMap

interface Listener<K extends EventType> {
  (this: HTMLElement, ev: HTMLElementEventMap[K]): any;
}

export function on<K extends EventType> (element: HTMLElement, type: K, listener: Listener<K>): void {
  element.addEventListener(type, listener, false)
}

export function off<K extends EventType> (element: HTMLElement, type: K, listener: Listener<K>): void {
  element.removeEventListener(type, listener, false)
}

export function once<K extends EventType> (element: HTMLElement, type: K, fn: Function): void {
  function listener () {
    // eslint-disable-next-line
    fn.apply(undefined, arguments)
    off<K>(element, type, listener)
  }

  on<K>(element, type, listener)
}

export function hasClass (node: HTMLElement, className: string): boolean {
  if (node.classList) {
    return node.classList.contains(className)
  }
  const originClass = node.className
  return ` ${originClass} `.indexOf(` ${className} `) > -1
}

export function addClass (node: HTMLElement, className: string): void {
  if (node.classList) {
    node.classList.add(className)
  } else {
    if (!hasClass(node, className)) {
      node.className = `${node.className} ${className}`
    }
  }
}

export function removeClass (node: HTMLElement, className: string): void {
  if (node.classList) {
    node.classList.remove(className)
  } else {
    if (hasClass(node, className)) {
      const originClass = node.className
      node.className = ` ${originClass} `.replace(` ${className} `, ' ')
    }
  }
}
