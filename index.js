// require("@babel/register");

const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const app = new Koa();


app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
  });
  
  // logger
  
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });

//bodyParser 需要在routes注册之前注册上
app.use(bodyParser());

app.use(router.routes());


router.get('/', async (ctx, next) => {
    ctx.response.body = '<h1>Index</h1>';
});

router.get('/hello/:name', async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
});
router.post('/signin', async (ctx, next) => {
    var name = ctx.request.body.name || '',
        password = ctx.request.body.password || '';
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
    } else {
        ctx.response.body = `<h1>Login failed!</h1>
        <p><a href="/">Try again</a></p>`;
    }
});




app.on('error', err => {
    console.error('server error', err)
});
// 监听端口、启动程序
app.listen(3000, err => {
    if (err) throw err;
    console.log('runing...2224444');
})