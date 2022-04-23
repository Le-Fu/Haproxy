export const genId = (type) => {
    return `haproxy_${type}_${Date.now()}`;
}

export const stringToId = (str) => {
    let id = str.length
    Array.from(str).forEach((it) => {
        id += it.charCodeAt()
    })
    return id * 10000 + 1234
}

export const isHaprxyId = (id) => {
    return /\d+1234$/.test(`${id}`)
}