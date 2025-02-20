export async function startPostSSE(): Promise<(reason?: any) => void> {
    const ctrl = new AbortController()
    const signal = ctrl.signal
    const res = await fetch('/proxyApi/events', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: '123', token: 'abcdef' }),
        signal
    })
    const reader = res.body?.getReader()
    const decoder = new TextDecoder('utf-8')

    if (reader) {
        let loop = true
        while (loop) {
            const { value, done } = await reader.read()
            const chunk = decoder.decode(value)
            const events = chunk.split('\n\n') // SSE 以两个换行分隔事件
            for (const event of events) {
                console.log('event: ', event)
                const data = event.replace('data: ', '')
                console.log('Received:', data)
                // 更新界面或处理逻辑
            }
            if (done) {
                loop = false
            }
        }
    }
    return ctrl.abort

    // while (true) {
    //     const data = await reader?.read()
    //     console.log('data: ', data);
    //     // const { value, done } = await reader?.read()
    //     if (done) break
    //     // 处理分块数据（假设服务器返回 SSE 格式）
    //     const chunk = decoder.decode(value)
    //     const events = chunk.split('\n\n') // SSE 以两个换行分隔事件
    //     for (const event of events) {
    //         const data = event.replace('data: ', '')
    //         console.log('Received:', data)
    //         // 更新界面或处理逻辑
    //     }
    // }
    // console.log('data: ', sseUrl)
    // const source = new EventSource(sseUrl)
    // source.onmessage = (e) => {
    //     console.log('收到 SSE 消息:', e.data)
    //     // content.value += `${e.data}\n\n`
    //     const message = e.data
    //     if (message === '[DONE]') {
    //         source.close()
    //     }
    // }
    // return res
}
