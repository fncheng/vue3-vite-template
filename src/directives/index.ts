import { nextTick, type DirectiveHook, type ObjectDirective } from 'vue'

const bgColorDirective: ObjectDirective<any, string> = {
    beforeMount: (el: HTMLElement, binding) => {
        el.style.backgroundColor = binding.value
    }
}

const colorDirective: DirectiveHook = (el: HTMLElement, binding) => {
    if (binding.value) {
        el.style.color = binding.value
    }
}

const lazyLoadDirective: ObjectDirective = {
    mounted: (el: HTMLElement) => {
        console.log('el: ', el)
        nextTick(() => {
            const imgObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = entry.target as HTMLImageElement
                        img.src = img.dataset.src || ''
                        img.dataset.src = ''
                        observer.unobserve(img)
                    }
                })
            })
            const imgs = Array.from(el.querySelectorAll('img'))
            console.log('imgs: ', imgs)
            imgs.forEach((img) => {
                imgObserver.observe(img)
            })
        })
    }
}

const lazyLoadImgDirective: ObjectDirective = {
    mounted: (el: HTMLElement) => {
        if (el.tagName === 'IMG') {
            const observer = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) {
                    const img = entry.target as HTMLImageElement
                    img.src = img.dataset.src || ''
                    img.dataset.src = ''
                    observer.unobserve(img)
                }
            })
            observer.observe(el)
        }
    }
}

export default {
    bgColor: bgColorDirective,
    color: colorDirective,
    lazyLoad: lazyLoadDirective,
    lazyLoadImg: lazyLoadImgDirective
}
