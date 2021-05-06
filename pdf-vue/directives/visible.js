import 'intersection-observer'


const instances = new WeakMap()

function createObserver (el, vnode, modifiers, callback) {
  const observer = new IntersectionObserver(entries => {
    const entry = entries[0]
    if (entry.isIntersecting) {
      callback()
      if (modifiers.once) {
        // eslint-disable-next-line no-use-before-define
        disconnectObserver(observer, el)
      }
    }
  })

  // Observe when element is inserted in DOM
  vnode.context.$nextTick(() => observer.observe(el))

  return observer
}
function disconnectObserver (observer, el) {
  console.log('Disconnecting observer', el)
  if (observer) observer.disconnect()
}

function bind (el, { value, modifiers }, vnode) {
  console.log("Binding element", el)
  if (typeof window.IntersectionObserver === 'undefined') {
    console.log('IntersectionObserver API is not available in your browser.')
  } else {
    const observer = createObserver(el, vnode, modifiers, () => {
      console.log("Element is visible", el)
      const callback = value
      if (typeof callback === "function") callback()
    })
    instances.set(el, { observer })
  }
}

function update (el, { value, oldValue }, vnode) {
  if (value === oldValue) return

  const { observer } = instances.get(el)
  disconnectObserver(observer, el)
  bind(el, { value }, vnode)
}

function unbind (el) {
  if (instances.has(el)) {
    const { observer } = instances.get(el)
    disconnectObserver(observer, el)
    instances.delete(el)
  }
}

export default {
  bind,
  update,
  unbind
}
