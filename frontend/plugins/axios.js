export default function ({ $axios, app }) {
  $axios.onRequest(config => {
      if (config.method === 'post' || config.method === 'patch' || config.method === 'delete') {
          config.headers.common['token'] = localStorage.getItem('token');
          // config.headers.common['token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkZDBjYThmYTY5YmY2MTU5ZTNkZmUwOSIsImlhdCI6MTU3NDczMzM5NSwiZXhwIjoxNTc0ODE5Nzk1fQ.On9mgz_Z8o7n47o0TMiZ591rzuSA2YJ7M0wk45lzvYg'
      }
  })
}
