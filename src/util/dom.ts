export function on (
  el: Element,
  type: string,
  listener: EventListener,
  options?: boolean | EventListenerOptions
): void {
  el.addEventListener(type, listener, options)
}

export function off (
  el: Element,
  type: string,
  listener: EventListener,
  options?: boolean | EventListenerOptions
): void {
  el.removeEventListener(type, listener, options)
}

export function once (
  el: Element,
  type: string,
  listener: EventListener,
  options?: boolean | EventListenerOptions
): void {
  function handler (evt: Event): void {
    listener.call(undefined, evt)
    off(el, type, handler, options)
  }

  on(el, type, handler, options)
}

export function hasClass (node: Element, className: string): boolean {
  if (node.classList) {
    return node.classList.contains(className)
  }
  const originClass = node.className
  return ` ${originClass} `.indexOf(` ${className} `) > -1
}

export function addClass (node: Element, className: string): void {
  if (node.classList) {
    node.classList.add(className)
  } else {
    if (!hasClass(node, className)) {
      node.className = `${node.className} ${className}`
    }
  }
}

export function removeClass (node: Element, className: string): void {
  if (node.classList) {
    node.classList.remove(className)
  } else {
    if (hasClass(node, className)) {
      const originClass = node.className
      node.className = ` ${originClass} `.replace(` ${className} `, ' ')
    }
  }
}
