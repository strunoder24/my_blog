export default function(req, res, next) {
  const paths = ['/admin', '/admin/add', '/admin/edit', '/admin/tags'];
  
  if (paths.includes(req.originalUrl)) {
    // Will trigger the "traditional SPA mode"
    res.spa = true
  }
  next()
}