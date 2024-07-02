require('dotenv').config({ path: "./.env.deploy" });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF, DEPLOY_REPOSITORY,
} = process.env;

module.exports = {
  // pm2 не будет ничего запускать -> поэтому в этом конфиге нет команд и настроек для него

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPOSITORY,
      path: DEPLOY_PATH,
      // вариант проще - билдить локально и отправлять на сервер уже готовый билд
      'post-deploy': 'cd frontend && npm ci && npm run build'
    },
  },
}
