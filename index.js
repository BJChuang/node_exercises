const http = require('http')
const ejs = require('ejs')
const url = require('url')
const moment = require('moment')
moment.locale('zh-cn');
const DirPath = './view' // 建议换成绝对路径 
// 创建服务器
const service = http.createServer()
let indexData = [
    {name:'张三',message:'粘弹说带上飞机的萨芬计划',dateTime:'2019-10-11'},
    {name:'李四',message:'就是觉得发喀什酱豆腐立刻洒家发生',dateTime:'2019-10-12'},
    {name:'王二麻子',message:'健身房的空间赛季分解机而非',dateTime:'2019-10-13'},
    {name:'小淘气',message:'核武i肉片附件是JFK了撒法',dateTime:'2019-10-14'},
    {name:'栓蛋',message:'对方门将批评家恩恩分为哦附件',dateTime:'2019-10-15'},
]
service.on('request',(req,res)=>{
  const parseUrl = url.parse(req.url,true)
  const uri = parseUrl.pathname
  const queryGet = parseUrl.query
  if( uri == '/' ){
    ejs.renderFile(DirPath+'/index.html',{indexData},(_,data)=>{
        res.end(data)
    })
  }else if(uri == '/release'){
    ejs.renderFile(DirPath+'/release.html',(_,data)=>{
        res.end(data)
    })
  }else if(uri == '/relaseGet'){
    console.log(queryGet)
    let item = {name:queryGet.name,message:queryGet.message,dateTime:moment(new Date()).format('YYYY-MM-DD')}
    indexData.push(item)
    res.statusCode = 302
    res.setHeader('Location','/')
    res.end()
  }else{
    ejs.renderFile(DirPath+'/404.html',(_,data)=>{
        res.end(data)
    })
  }
})
service.listen(3000,()=>{console.log('server is runing.')})