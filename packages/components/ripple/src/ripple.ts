import { Directive } from 'vue'

function creareRipple(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()

  const rippleEle = document.createElement('div')

  rippleEle.classList.add('van-ripple')

  const rippleSize = Math.sqrt(rect.width ** 2 + rect.height ** 2)
  const radius = rippleSize / 2

  const rippleX = e.clientX - rect.left
  const rippleY = e.clientY - rect.top

  if (el.dataset.rippleColor) {
    rippleEle.style.background = el.dataset.rippleColor
  }

  rippleEle.style.left = rippleX - radius + 'px'
  rippleEle.style.top = rippleY - radius + 'px'

  rippleEle.style.width = rippleSize + 'px'
  rippleEle.style.height = rippleSize + 'px'
  rippleEle.dataset.createAt = String(performance.now())
  rippleEle.style.opacity = '0.3'

  el.appendChild(rippleEle)
}

function removeRipple(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  const ripples: NodeListOf<HTMLElement> = el.querySelectorAll('.van-ripple')

  if (!ripples.length) return

  for (let i = 0; i < ripples.length; i++) {
    const rippleEle = ripples[i]
    const delay = 300 - (performance.now() - Number(rippleEle.dataset.createAt))
    setTimeout(() => {
      rippleEle.style.opacity = '0'
      rippleEle.parentElement?.removeChild(rippleEle)
    }, delay)
  }
}

export const ripple: Directive = {
  mounted(el: HTMLElement, binding) {
    const value = binding.value
    if (typeof value === 'object') {
      if (value.disabled) return
      el.dataset.rippleColor = value.color
    } else {
      el.dataset.rippleColor = value
    }
    el.style.overflow = 'hidden'

    el.addEventListener('mousedown', creareRipple)
    document.addEventListener('mouseup', removeRipple)
  },
  unmounted(el: HTMLElement) {
    el.removeEventListener('mousedown', creareRipple)
    document.removeEventListener('mouseup', removeRipple)
  }
}