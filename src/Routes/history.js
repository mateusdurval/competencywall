import { createBrowserHistory } from "history"

export const history = createBrowserHistory({
    basename: '/'
})

window.redirect = history.push