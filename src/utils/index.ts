export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export const asyncInterval = (callback: () => Promise<void>, ms: number) => {
    let timeoutId: number
    const executeCallback = async () => {
        try {
            await callback()
        } catch (error) {
            console.error(error)
        } finally {
            timeoutId = setTimeout(executeCallback, ms)
        }
    }
    executeCallback()
    return () => clearTimeout(timeoutId)
}

export const pLimit = (max: number) => {
    const queue: Array<() => Promise<any>> = []
    let currentRequests = 0
    const runTask = async (task: () => Promise<any>) => {
        currentRequests++
        try {
            await task()
        } catch (error) {
            console.log('error: ', error)
        } finally {
            currentRequests--
            if (queue.length > 0) {
                const nextTask = queue.shift()
                nextTask && runTask(nextTask)
            }
        }
    }
    const enqueueTask = async (task: () => Promise<any>) => {
        if (currentRequests < max) {
            return runTask(task)
        } else {
            queue.push(task)
        }
    }
    return enqueueTask
}

/**
 * 创建一个定时器，每隔ms执行一遍cb，默认不会立即执行cb
 * @param cb - 回调函数
 * @param ms - 每隔多少毫秒执行一次
 * @param {Object} [options] - 可选参数
 * @param {boolean} [options.immediate=false] - 是否立即执行cb
 * @returns {Function} - 一个取消定时器的函数
 */
export const mySetInterval = (
    cb: () => void,
    ms: number,
    options: { immediate?: boolean } = { immediate: false }
) => {
    let timeoutId: number
    const excute = () => {
        if (timeoutId) {
            clearTimeout(timeoutId)
        }
        try {
            cb()
            timeoutId = setTimeout(excute, ms)
        } catch (e) {
            console.error(e)
        }
    }
    if (options?.immediate) {
        cb()
    } else timeoutId = setTimeout(excute, ms)
    return () => clearTimeout(timeoutId)
}

/**
 * 批量导入图片
 * @param images
 * @returns
 */
export async function AutoloadImages(images: Record<string, () => Promise<any>>) {
    const imagesModules = await Promise.all(Object.keys(images).map((key: string) => images[key]()))
    return imagesModules.map((module) => module.default)
}
