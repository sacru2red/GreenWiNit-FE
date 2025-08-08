export async function throwResponseStatusThenChaining(response: Response) {
  const body = await response.clone().json()
  if (response.ok) {
    if ('success' in body) {
      // success가 있는데 falsy하면 throw하기 위해 아래쪽으로 흐름을 가짐
      if (body.success) {
        return response
      }
      // success가 없는 경우 그대로 반환
    } else {
      return response
    }
  }

  return response
    .clone()
    .json()
    .then((body) => {
      throw new Error(body.message || `HTTP ${response.status}: ${response.statusText}`)
    })
}
