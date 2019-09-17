// require("@babel/register");

const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const app = new Koa();


//连接数据库
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/local');
var db = mongoose.connection;

db.once('open',function(err){
	if(err){
		console.log('数据库连接失败');
		throw err;
	}
    console.log('数据库连接成功')
    
})


//定义模式对象
var userSchema = new mongoose.Schema({
	name:String,
	age:Number,
	sex:String
})

// var userList = [
// 	{id:1,name:'小明',age:14,sex:'男'},
// 	{id:2,name:'小红',age:12,sex:'女'},
// 	{id:3,name:'小花',age:16,sex:'女'},
// 	{id:4,name:'小白',age:11,sex:'男'}
// ]
//mongoose.model() 用来根据Schema来创建模型对象，需要两个参数
//第一个参数数据库中集合的名字  第二个参数约束集合文档的Schema
//mongoose会自动将集合名变成复数
//定义模型
var userModel = mongoose.model('user',userSchema);


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
    ctx.response.body = '<h1>服务启动成功</h1>';
});

router.get('/add', async (ctx, next) => {
    
    var name = ctx.request.query.name || ''
    var age = ctx.request.query.age || ''
    var sex = ctx.request.query.sex || ''
    var doc = await userModel.findOne({name:name})
    if (!doc) {
        var res =await userModel.create({
            name:name,age:age,sex:sex
        })
        console.log(res)
        ctx.response.body = `<h1>Hello, ${name},你的信息已经保存!</h1>`;
    } else {
        ctx.response.body = `<h1>Hello, ${name},你的信息已经存在!</h1>`;
    }
    
});

router.get('/clear/:name', async (ctx, next) => {
    
    var name = ctx.params.name || ''

    var res = await userModel.deleteMany({
        'name':name
    })
    console.log(res)    
    if (res.n) {
        ctx.response.body = `<h1>Hello, ${name},你的信息删除成功!</h1>`;
    } else {
        ctx.response.body = `<h1>Hello, ${name},你的信息删除不成功!</h1>`
    }
    
});

router.get('/check/:name', async (ctx, next) => {
    var name = ctx.params.name;
    var doc = await userModel.findOne({name:name})
    console.log(doc)
    if (doc) {
        ctx.response.body = `<h1>Welcome, ${doc.name}!</h1><p>你的年龄是${doc.age},性别是${doc.sex}</p>`;
    } else {
        ctx.response.body = `<h1>不存在用户${name}! ！！</h1>`;
    }
    
});




app.on('error', err => {
    console.error('server error', err)
});
// 监听端口、启动程序
app.listen(3000, err => {
    if (err) throw err;
    console.log('服务启动成功端口3000');
})