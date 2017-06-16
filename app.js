var express = require('express');
var app = require('express')();
var ejs = require('ejs');// 后台模板库
var http = require('http').Server(app);
var url = require('url');
// var expressJwt = require('express-jwt');//jwt
var jwt = require('jsonwebtoken');//jwt
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var io = require('socket.io')(http);
var mysql=require('mysql'); 
var compression = require('compression');//开启gzip
var xss = require('xss');

app.use(compression());//开启gzip

app.set('views', './myhome/dist');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(express.static('myhome/dist'));
// app.use(expressJwt({secret:'secret'}).unless({path:['/login']}));//jwt

//数据库
var connection = mysql.createConnection({
 // host   : '172.18.199.227',
 host   : '127.0.0.1',
 user   : 'root',
 password : 'root',
 // database : 'mysql'
 database : 'chat'
});
connection.connect();

// var myex = `<img src="images/expressions/喷.png" alt="#(喷)" onerror="this.style.display='none'">`
// var ppp = xss(`<img src="http://localhost:3000/img/haha.png" alt="">`)
// var ppps = `http://www.baidu.com`
// var options = {
//   whiteList: {
//     a: ['href', 'title', 'target']
//   }
// }
// var sss = xss(ppps,options)
// console.log(sss)
// var oooo = `&lt;img src="http://localhost:3000/img/haha.png" alt&gt;`

//注册
app.post('/regist', urlencodedParser, function(req, res){
	res.header("Access-Control-Allow-Origin", "*");    
  // console.log(req.body.username+req.body.password)

  connection.query("select * from chat_user where name='" + req.body.username + "'",function selectName(err, rows, fields){
  	// console.log(rows.RowDataPacket)
  	// var temp=new String(rows)
  	// console.log(temp.String)
  	// res.json(rows)
  	// console.log(rows==true)
  	if(rows.length==0){
  		connection.query(`insert into chat_user (name ,password ,create_time) values ("`+req.body.username+`" , "`+req.body.password+`" , UNIX_TIMESTAMP())`,function(err,result){
				if (err){
					throw err;
				}else{
					res.json({
		  			data:'success'
		  		})
				}
			});
  	}else{
  		res.json({
  			data:'default'
  		})
  	}
  })
});

//登录
app.post('/login', urlencodedParser, function(req, res){
	res.header("Access-Control-Allow-Origin", "*");    
  connection.query("select * from chat_user where name='" + req.body.username + "' and password='" + req.body.password + "'",function selectName(err, rows, fields){
  	if(rows.length==1){
  		var authToken = jwt.sign({username: req.body.username},'secret');
  		res.json({
  			data:'success',
  			token:authToken
  		})
  	}else{
  		res.json({
  			data:'default'
  		})
  	}
  })
});

//用token来验证当前用户
app.post('/user', urlencodedParser, function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	let temp = jwt.decode(req.body.token,'secret');
	if(temp){
		res.json({username:temp.username});
	}else{
		res.json({username:null});
	}
});

app.post('/aa', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	console.log(req.body)
  res.json({data:'data'});
});

app.get('/roomname', function(req, res){
	res.header("Access-Control-Allow-Origin", "*");
	let load_sql = "select * from chat_room order by id" 
	connection.query(load_sql, function selectTable(err, rows, fields){
		if (err){
			throw err;
		}
		if (rows){
			res.json(rows)
		}
	});
})

//主页面
app.get('/', function(req, res){
  // res.sendFile(__dirname + '/myhome/dist/index.html');
  res.render("index",{title:'header'});
});

// app.post('/enterroom', urlencodedParser, function(req, res){
// 	res.header("Access-Control-Allow-Origin", "*");
//   var roomname = req.body.roomname
//   console.log(req.body.roomname)
// 	var nsp = io.of(roomname)

// 	nsp.on('connection',function(socket){
// 		console.log('someone connected')
// 		socket.on('hi',(msg) => {
// 			console.log(msg)
// 		})
// 		nsp.emit('hi', 'sss');
// 	})
// });


// nsp.emit('hi','everyone!')

let options = {//设置白名单
  whiteList: {
    a: ['href', 'title', 'target']
  }
}

var roomIDpre = ''
var roomID = ''

//socket接收和传输
io.on('connection', function(socket){
	var url = socket.request.headers.referer;
	var splited = url.split('/');
  roomID = splited[splited.length - 1];   // 获取房间ID
	console.log(roomID)
	let user = ''

	socket.on('join',(username) => {
		socket.leave(roomIDpre)
		socket.join(roomID)
		roomIDpre = roomID
	})

	//加载数据
	socket.to(roomID).on('load message',function(msg, callback){
		var num = msg;
		if(num!=null&&num!=undefined){
			let load_sql = "select * from chat_content where room_id=? order by id desc limit ?,1" 
			let load_value = [roomID,num]
			connection.query(load_sql, load_value, function selectTable(err, rows, fields){
				if (err){
					throw err;
				}
				if (rows){
					callback(rows)
				}
			});
		}
	})

	socket.to(roomID).on('chat message', function(msg, callback){
		var content = xss(msg.content,options)
		var sql = "insert into chat_content set room_id=?, name=?, content=?,create_time=UNIX_TIMESTAMP()"
    var values = [roomID, msg.name, content];

    connection.query(sql, values, function(error, results){
      if(error) {
          console.log("插入记录出错: " + error.message);
          connection.end();
          return;
      }
      var select_sql = 'select * from chat_content where room_id=? order by id desc limit 1'
      var select_values = [roomID]

      connection.query(select_sql, select_values, function selectTable(err, rows, fields){
				if (err){
					throw err;
				}
				if (rows){
					io.to(roomID).emit('chat message', rows[0]);
				}
			});
    });
	});
});

http.listen(3000, function(){
	console.log('listening on *:3000');
});