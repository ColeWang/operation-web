import { Directive } from 'vue'
import { getUsername } from '@/common/auth'

let targetImg: string = ''

function buildTargetImg (text: string): string {
  const canvas: HTMLCanvasElement = document.createElement('canvas')
  const context: CanvasRenderingContext2D = (canvas.getContext('2d') as CanvasRenderingContext2D)
  const scale: number = window.devicePixelRatio
  canvas.style.width = '160px'
  canvas.style.height = '160px'
  canvas.width = 160 * scale
  canvas.height = 160 * scale
  context.scale(scale, scale)
  context.fillStyle = 'transparent'
  context.fillRect(0, 0, 160, 160)
  context.translate(80, 80)
  context.rotate(-20 * Math.PI / 180)
  context.translate(-80, -80)
  context.font = '14px sans-serif'
  context.textAlign = 'center'
  context.textBaseline = 'middle'
  context.fillStyle = '#999'
  context.fillText(text, 80, 80)
  targetImg = canvas.toDataURL('image/png')
  canvas.remove()
  return targetImg
}

function createWatermark (el: HTMLElement, target: string): void {
  const markNode: HTMLElement = document.createElement('div')
  markNode.style.position = 'absolute'
  markNode.style.zIndex = '50'
  markNode.style.top = '0'
  markNode.style.left = '0'
  markNode.style.right = '0'
  markNode.style.bottom = '0'
  markNode.style.opacity = '0.2'
  markNode.style.pointerEvents = 'none'
  markNode.style.backgroundImage = `url("${target}")`
  markNode.style.backgroundSize = '160px 160px'
  el.style.position = 'relative'
  el.appendChild(markNode)
  const mo: MutationObserver = new MutationObserver(() => {
    el.removeChild(markNode)
    markNode.remove()
    mo.disconnect()
    fire(el)
  })
  mo.observe(markNode, {
    attributes: true,
    attributeOldValue: true
  })
}

function fire (el: HTMLElement): void {
  if (targetImg) {
    createWatermark(el, targetImg)
  } else {
    const depText: string | undefined = getUsername()
    if (depText) {
      createWatermark(el, buildTargetImg(depText))
    }
  }
}

const watermark: Directive = {
  mounted (el: Element) {
    fire((el as HTMLElement))
  }
}

export default watermark
