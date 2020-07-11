
/**
 * 监听元素大小改变，改变时调用回调
 * @param {HTMLElement} el 监听的元素，el要相对定位，这里已经手动添加到style
 * @param {Function} handler 回调函数
 */
// 这段样式要么放到样式里，要么自己手动加到style
// /* 监听元素尺寸变化(monitorElementResize)需要的css */
// .monitor-size-expand,
// .monitor-size-shrink {
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   overflow: scroll;
//   visibility: hidden;
// }

// /* 监听变大,则子元素宽高 > 父容器宽高 即可，一般动态设置，避免到达一定程度后不满足该条件 */
// .monitor-size-expand-content {
// }

// /* 监听变小,则子元素宽高要 >= 200%父容器宽高 */
// .monitor-size-shrink-content {
//   width: 240%;
//   height: 240%;
// }

function monitorElementResize (el, handler) {
  // 判断是否是元素
  if (!(el instanceof HTMLElement)) {
    throw new TypeError('Parameter 1 is not instance of \'HTMLElement\'.')
  }
  // https://www.w3.org/TR/html/syntax.html#writing-html-documents-elements，部分元素无法监听大小
  if (
    /^(area|base|br|col|embed|hr|img|input|keygen|link|menuitem|meta|param|source|track|wbr|script|style|textarea|title)$/i.test(
      el.tagName,
    )
  ) {
    throw new TypeError(
      'Unsupported tag type. Change the tag or wrap it in a supported tag(e.g. div).',
    )
  }
  // 判断回调函数
  if (typeof handler !== 'function') {
    throw new TypeError('Parameter 2 is not of type \'function\'.')
  }

  const expand = document.createElement('div')
  const shrink = document.createElement('div')
  const expandChild = document.createElement('div')
  const shrinkChild = document.createElement('div')
  let resetEmitTimes = 0 // 因为重置scroll，而需要取消滚动事件回调的次数

  expand.className = 'monitor-size-expand'
  shrink.className = 'monitor-size-shrink'
  expandChild.className = 'monitor-size-expand-content'
  shrinkChild.className = 'monitor-size-shrink-content'

  function resetExpandChildSize (resizeType) {
    /* 变小时，改变expandChild的宽高，scroll自动会变小，导致resetScroll这里检测不到 */
    if (resizeType === 'shrink') {
      resetEmitTimes += 1
    }
    const styleObj = getComputedStyle(el)
    expandChild.style.width = parseFloat(styleObj.width) * 2 + 'px'
    expandChild.style.height = parseFloat(styleObj.height) * 2 + 'px'
  }

  resetExpandChildSize('')
  expand.appendChild(expandChild)
  shrink.appendChild(shrinkChild)
  el.style.position = 'relative' // 被监听元素要相对定位，
  el.appendChild(expand)
  el.appendChild(shrink)

  function resetScroll () {
    const expandScrollMaxTop = expand.scrollHeight - expand.clientHeight
    const expandScrollMaxLeft = expand.scrollWidth - expand.clientWidth
    const shrinkScrollMaxTop = shrink.scrollHeight - shrink.clientHeight
    const shrinkScrollMaxLeft = shrink.scrollWidth - shrink.clientWidth

    // 如果滚动条没有到底部，则设置到底部，让滚动条一直处于底部
    if (
      expand.scrollTop !== expandScrollMaxTop ||
          expand.scrollLeft !== expandScrollMaxLeft
    ) {
      resetEmitTimes += 1
      expand.scrollTop = expandScrollMaxTop
      expand.scrollLeft = expandScrollMaxLeft
    }
    if (
      shrink.scrollTop !== shrinkScrollMaxTop ||
          shrink.scrollLeft !== shrinkScrollMaxLeft
    ) {
      resetEmitTimes += 1
      shrink.scrollTop = shrinkScrollMaxTop
      shrink.scrollLeft = shrinkScrollMaxLeft
    }
  }
  resetScroll()

  function onScroll (resizeType) {
    if (resetEmitTimes > 0) {
      resetEmitTimes--
      return
    }
    resetExpandChildSize(resizeType)
    resetScroll()

    // 触发回调函数
    handler()
  }
  expand.addEventListener('scroll', function () {
    onScroll('expand')
  })
  shrink.addEventListener('scroll', function () {
    onScroll('shrink')
  })
}

export default monitorElementResize
