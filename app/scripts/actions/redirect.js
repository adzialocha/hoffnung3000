import { REDIRECT } from '../middlewares/redirect'

export function redirectTo(to) {
  return {
    [REDIRECT]: to,
  }
}
