export function formatDate(isoString: string): string {
  const date = new Date(isoString) // parsing ISO string jadi Date object
  
  return date.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

export function flattenPayload(obj: Record<string, any>, parentKey = '', res: Record<string, any> = {}) {
  for (const key in obj) {
    const newKey = parentKey ? `${parentKey}_${key}` : key
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      flattenPayload(obj[key], newKey, res)
    } else {
      res[newKey] = obj[key]
    }
  }
  return res
}

export function unflattenPayload(flat: Record<string, any>) {
  const result: Record<string, any> = {}
  for (const key in flat) {
    const keys = key.split('_')
    keys.reduce((acc, part, idx) => {
      if (idx === keys.length - 1) {
        acc[part] = flat[key]
      } else {
        acc[part] = acc[part] || {}
      }
      return acc[part]
    }, result)
  }
  return result
}