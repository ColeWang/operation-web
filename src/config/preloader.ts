function imgPreloader (url: string): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const image = new Image()
    image.src = url
    image.onload = () => {
      resolve()
    }
    image.onerror = () => {
      reject()
    }
  })
}

function preloader (imgs: string[]): Promise<void[]> {
  const promiseArr: Promise<void>[] = []
  imgs.forEach((element) => {
    promiseArr.push(imgPreloader(element))
  })
  return Promise.all(promiseArr)
}

export default preloader
