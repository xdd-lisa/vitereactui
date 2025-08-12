/*
 * @Author: xudandan xudandan@lattebank.com
 * @Date: 2025-08-11 16:15:00
 * @LastEditors: xudandan xudandan@lattebank.com
 * @LastEditTime: 2025-08-11 16:15:00
 * @FilePath: /my-react-vite-ts/scripts/compile-less.js
 * @Description: Less文件编译脚本
 */
import fs from 'fs'
import path from 'path'
import less from 'less'
import { glob } from 'glob'

const srcDir = 'src'
const outputDir = 'src/styles/compiled'

// 确保输出目录存在
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// 查找所有Less文件
const lessFiles = glob.sync(`${srcDir}/**/*.less`)

console.log(`找到 ${lessFiles.length} 个Less文件`)

// 编译每个Less文件
lessFiles.forEach(async (lessFile) => {
  try {
    const lessContent = fs.readFileSync(lessFile, 'utf8')
    const result = await less.render(lessContent, {
      filename: lessFile,
      sourceMap: {
        outputSourceFiles: true
      }
    })
    
    // 生成CSS文件路径
    const relativePath = path.relative(srcDir, lessFile)
    const cssPath = path.join(outputDir, relativePath.replace('.less', '.css'))
    const cssDir = path.dirname(cssPath)
    
    // 确保CSS目录存在
    if (!fs.existsSync(cssDir)) {
      fs.mkdirSync(cssDir, { recursive: true })
    }
    
    // 写入CSS文件
    fs.writeFileSync(cssPath, result.css)
    
    // 写入Source Map
    if (result.map) {
      fs.writeFileSync(cssPath + '.map', result.map)
    }
    
    console.log(`✅ 编译完成: ${lessFile} → ${cssPath}`)
  } catch (error) {
    console.error(`❌ 编译失败: ${lessFile}`, error.message)
  }
})

console.log('🎉 Less编译完成！')

