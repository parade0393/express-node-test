const express = require('express');
const app = express();
const port = 3000;
// 中间件：为所有路由设置 Content-Type
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method' )
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
  res.header('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
  next();
});
app.use(express.json());



const baseResponse = {
    errorCode: 0,
    errorMsg: 'success',
  data: {}
}

app.get('/api/user',(req,res)=>{
  res.json({
    errorCode: 0,
    errorMsg: '请求成功',
    data: {
      name:"小明",
      age:22
    }
  })
})

// 模拟GET请求
app.get('/api/users', (req, res) => {
    res.json([
      { id: 1, name: '张三' },
      { id: 2, name: '李四' }
    ]);
  });
  
  // 模拟POST请求
  app.post('/api/users', (req, res) => {
    const newUser = req.body;
    res.status(201).json({ message: '用户创建成功', user: newUser });
  });
  
  // 模拟延迟响应
  app.get('/api/slow-response', (req, res) => {
    setTimeout(() => {
      res.json({ message: '这是一个延迟响应' });
    }, 2000);
  });
  
  // 模拟400错误 (Bad Request)
  app.get('/api/error/400', (req, res) => {
    res.status(400).json({
      error: 'Bad Request',
      message: '请求参数不正确'
    });
  });
  
  // 模拟404错误 (Not Found)
  app.get('/api/error/404', (req, res) => {
    res.status(404).json({
      error: 'Not Found',
      message: '请求的资源不存在'
    });
  });
  
  // 模拟500错误 (Internal Server Error)
  app.get('/api/error/500', (req, res) => {
    res.status(500).json({
      error: 'Internal Server Error',
      message: '服务器内部错误'
    });
  });
  
  // 模拟随机错误
  app.get('/api/error/random', (req, res) => {
    const errors = [400, 401, 403, 404, 500];
    const randomError = errors[Math.floor(Math.random() * errors.length)];
    
    res.status(randomError).json({
      error: `Error ${randomError}`,
      message: `这是一个随机生成的${randomError}错误`
    });
  });

app.listen(port, () => {
    console.log(`Mock server running at http://localhost:${port}`);
  });