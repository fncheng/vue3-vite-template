// 定义一个加载目录的函数
const requireAll = (requireContext: Record<string, () => Promise<any>>) =>
    Object.keys(requireContext).map((key) => requireContext[key])
// 批量导入svg目录下的svg文件

const svgFiles = import.meta.glob('./*.svg')

requireAll(svgFiles)
