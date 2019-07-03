export default function ({ $axios, app }) {
  $axios.onRequest(config => {
      if (config.method === 'post' || config.method === 'patch' || config.method === 'delete') {
          config.headers.common['X-CSRFTOKEN'] = app.$cookies.get('csrftoken');
      }
  })
}
