export function addClass(el: HTMLElement, className: string, isRemove: boolean = false) {
  if (!isRemove) {
    el.classList.add(className)
  } else {
    el.classList.remove(className)
  }
}