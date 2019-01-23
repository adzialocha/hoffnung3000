import Scroll from 'react-scroll'

export const SCROLL_TO_TOP = Symbol('app-scroll-to-top')

export default next => action => {
  if (SCROLL_TO_TOP in action) {
    Scroll.animateScroll.scrollToTop()
  }

  return next(action)
}
