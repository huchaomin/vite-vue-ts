const apiPrefix: string = API_PREFIX

function setUrlPrefix(url: string): string {
  if (url.startsWith('http')) {
    return url
  }
  if (apiPrefix) {
    return `/${apiPrefix}/${url.replace(/^\/+/, '')}`
  }
  return `/${url.replace(/^\/+/, '')}`
}

export { apiPrefix, setUrlPrefix }
