import fs from 'fs'
import path from 'path'

const appEnv = process.env.APP_ENV || 'development'
const isStaging = appEnv === 'staging'
const isProduction = appEnv === 'production'

// 환경에 따라 적절한 _redirects 파일을 선택
let redirectsFile = null
if (isStaging) {
  redirectsFile = '.cf/_redirects_staging'
} else if (isProduction) {
  redirectsFile = '.cf/_redirects_production'
}

// _redirects 파일이 존재하면 dist 폴더로 복사
if (redirectsFile && fs.existsSync(redirectsFile)) {
  const distPath = path.join(process.cwd(), 'dist')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const targetPath = path.join(distPath, '_redirects')

  // dist 폴더가 존재하는지 확인
  if (!fs.existsSync(distPath)) {
    fs.mkdirSync(distPath, { recursive: true })
  }

  // _redirects 파일 복사
  // fs.copyFileSync(redirectsFile, targetPath)
} else {
  console.log(`${appEnv} 환경에서는 _redirects 파일을 생성하지 않습니다.`)
}
