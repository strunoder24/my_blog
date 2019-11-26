export default function ({ $axios, app }) {
  $axios.onRequest(config => {
      if (config.method === 'post' || config.method === 'patch' || config.method === 'delete') {
          config.headers.common['token'] = localStorage.getItem('token');
          // config.headers.common['token'] = ''
      }
  })
}
