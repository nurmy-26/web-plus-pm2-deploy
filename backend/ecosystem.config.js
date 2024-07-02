require('dotenv').config({ path: "./.env.deploy" });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF, DEPLOY_REPOSITORY,
} = process.env;

module.exports = {
  apps: [{
    name: "mesto",
    script: "dist/app.js",
    env_production: {
      NODE_ENV: "production"
    }
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPOSITORY,
      path: DEPLOY_PATH,
      // 1) pre-deploy-local - указанная справа команда запустится ЛОКАЛЬНО (в папке с проектом на компе):
      // копируем файл env на сервер по указанному адресу с помощью bash-скрипта
      // 'pre-deploy': `scp ./*.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}`,
      'pre-deploy-local': `bash scripts/deployEnv.sh ${DEPLOY_USER}@${DEPLOY_HOST} ${DEPLOY_PATH}`,

      // 2) деплой - заливаем изменения на сервер в папку source
      // 3) post-deploy - после деплоя, уже на сервере устанавливаем зависимости, делаем сборку и тд
      // cd backend - т.к. после деплоя будем находиться в корне репозитория и нужно сперва зайти в папку бэкенда
      'post-deploy': 'cd backend && npm ci && npm run build && pm2 startOrRestart ecosystem.config.js --env production'
    },
  },
}
