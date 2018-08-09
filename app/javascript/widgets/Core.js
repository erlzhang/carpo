const Core = {
  dispathMouseEvent: (name, eleId) => {
    let e = document.createEvent("MouseEvents")
    e.initEvent(name, true, true, document.defaultView, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    document.getElementById(eleId).dispatchEvent(e)
  }
}

export default Core

