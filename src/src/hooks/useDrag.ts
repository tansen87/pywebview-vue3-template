import { ref, shallowRef } from 'vue'
import { useEventListener } from '@vueuse/core'

interface UseDragOptions {
  onStart?: (e: MouseEvent) => void
  onEnd?: () => void
}

interface DragSession {
  x: number
  y: number
  movementX?: number
  movementY?: number
}

export default function(options?: UseDragOptions) {
  const el = shallowRef<HTMLElement | null>(null)
  const isDragging = ref(false)
  const dragSession = ref<DragSession | null>()

  function start(e: MouseEvent) {
    isDragging.value = true
    if (options && options.onStart) {
      options.onStart(e as MouseEvent)
    }
  }

  function move(e: MouseEvent) {
    if (!isDragging.value) return
    const { clientX: x, clientY: y } = e
    dragSession.value = {
      x,
      y,
      movementX: dragSession.value ? x - dragSession.value.x : 0,
      movementY: dragSession.value ? y - dragSession.value.y : 0,
    }
  }

  function end() {
    isDragging.value = false
    if (!dragSession.value) return
    dragSession.value = null
    if (options && options.onEnd) {
      options.onEnd()
    }
  }

  useEventListener(el, 'mousedown', start)
  useEventListener('mousemove', move)
  useEventListener('mouseup', end)

  return {
    el,
    dragSession,
  }
}
