
// 类相比对象的一个好处是，类具有隔离的作用域
/*如果是一个对象的话，当两个模块同时引用这个对象，如果某个模块把该
对象中的变量改掉了，其他的模块也会受影响
如果用类的话，每个模块引用时重新new一个就好了*/

class Mutil{
	request(param){
		return new Promise((resolve,reject) => {
			$.ajax({
				type    : param.type 		|| 'get',
				url     : param.url 		|| '',
				dataType: param.dataType 	|| 'json',
				data    : param.data 		|| null,
				success : res => {
					//数据请求成功
					if (res.status === 0) {
						typeof resolve === 'function' && resolve(res.data,res.msg);
					}
					//没有登录状态，强制登陆
					else if(res.status === 10){
						//由于success用的是箭头函数的形式，不占作用域，所以this指向的是外面那层对象
						//否则就要在外层用 let _this = this;的方式来保存this指向
						this.doLogin();
					}
					else{
						typeof reject === 'function' && reject(res.msg || res.data);
					}
				},
				error   : err => {
					//这里的错误是http的错误状态
					typeof reject === 'function' && reject(err.statusText);
				}
			})
		})
	}
	//跳转登陆,此时参数是跳转前的路径
	doLogin(){
		//encodeURIComponent()对传进来的字符进行处理
		window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
	}
	//获取url参数
	getUrlParam(name){
		//xxx.com?param=123&param1=456
		//取到问号后的东西
		let queryString = window.location.search.split('?')[1] || '';
		let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		let result = queryString.match(reg);
		//result: ['param=123','','123','&']
		return result ? decodeURIComponent(result[2]) : null;
	}
	//错误提示
	errorTips(errMsg){
		alert(errMsg || '好像哪里不对了~');
	}
	//本地存储
	setStorage(name,data){
		let dataType = typeof data;
		//json类型
		if (dataType === 'object') {
			window.localStorage.setItem(name,JSON.stringify(data));
		}
		//基础类型
		else if(['number','string','boolean'].indexOf(dataType) >= 0){
			window.localStorage.setItem(name,data);
		}
		//其他不支持的类型
		else{
			alert('该类型不能用于本地存储');
		}
	}
	//取出本地存储内容
	getStorage(name){
		let data = window.localStorage.getItem(name);
		if(!!data){
			//???这里取出的值万一是数字类型咋办
			return JSON.parse(data);
		}
		else{
			return '';
		}
	}
	//删除本地存储功能
	removeStorage(name){
		window.localStorage.removeItem(name);
	}

}

export default Mutil;