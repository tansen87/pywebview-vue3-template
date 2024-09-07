import useDrag from '@/hooks/useDrag'
import { reactive, watch } from 'vue'

interface Coord {
  x: number
  y: number
}

interface Position {
  right?: number
  top?: number
}

function css(el: HTMLElement | null, styles: Partial<CSSStyleDeclaration>) {
  if (!el || !styles || typeof styles !== 'object') return
  Object.entries(styles).forEach(([name, style]) => {
    el.style[name] = style
  })
}

export default function() {
  const offset = reactive<Coord>({
    x: 0,
    y: 0,
  })
  const position = reactive<Position>({
    right: null,
    top: null,
  })
  const { el, dragSession } = useDrag({
    onStart: (e) => {
      if (!el.value) return
      const rect = el.value.getBoundingClientRect()
      Object.assign(offset, {
        x: e.clientX - rect.x,
        y: e.clientY - rect.y,
      })
    },
    onEnd,
  })

  watch(dragSession, () => {
    if (!dragSession.value) return
    const { x, y } = dragSession.value
    Object.assign(position, {
      top: y - offset.y,
      right: window.innerWidth - x - offset.x,
    })
  })

  function onEnd() {
    // 平滑贴边
    const animate = () => {
      window.requestAnimationFrame(() => {
        const next = position.right - 30
        position.right = next < 0 ? 0 : next
        if (position.right > 0) {
          animate()
        }
      })
    }
    animate()
  }

  watch(position, () => {
    css(el.value, {
      top: `${position.top}px`,
      bottom: 'auto',
      left: 'auto',
      right: `${position.right}px`,
    })
  })

  return {
    el,
  }
}
