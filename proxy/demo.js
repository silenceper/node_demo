var http = require('http');
var url= require('url');
http.createServer(req_res).listen(8090, '127.0.0.1');
console.log('Server running at http://127.0.0.1:8090/');

//处理请求的方法
function req_res(req, res) {
	//console.log(req.url);
	var srvUrl = url.parse(req.url);
	var options = {
		hostname:srvUrl.hostname,
		port: srvUrl.port,
		path:srvUrl.path,
		headers:req.headers
	};

	//发起一个http请求
	var request = http.request(options,function(result){
		console.log(options);
		//console.log(result.statusCode);
		res.writeHeader(result.statusCode,result.headers);
		result.on('data', function (chunk) {
			res.write(chunk);
		});
		result.on('end',function(){
			res.end();
		})
	});
	request.on('error',function(e){
		console.log('problem with request: ' + e.message);
	});
	request.end();
}