import { defer, throwError, from } from 'rxjs'
import axios from 'axios'
import { catchError, map } from 'rxjs/operators'

export default props => {
  return defer(() => {
    const { url, params, data, method } = props
    const baseUrl = `https://hive-mind-000.herokuapp.com/api`
    const httpConfig = {
      baseURL: baseUrl,
      params,
      data,
      method,
      url,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    return from(axios.request(httpConfig)).pipe(
      map(res => res),
      catchError(err => throwError(err.response))
    )
  })
}
