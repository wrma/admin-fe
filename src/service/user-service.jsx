
import Mutil from 'util/mm.jsx';
const _mm = new Mutil();

class User{
	login(loginInfo){
		//这里返回的是一个promise对象（request方法），之前在mm.jsx中已经定义过
		return _mm.request({
			type : 'post',
			url : '/manage/user/login.do',
			data : loginInfo
		})
	}
	//检查登陆接口数据是否合法
	checkLoginInfo(loginInfo){
		let username = $.trim(loginInfo.username);
		let password = $.trim(loginInfo.password);
		if (typeof username !== 'string' || username.length === 0) {
			return {
				status : false,
				msg : '用户名不能为空'
			}
		}
		if (typeof password !== 'string' || password.length === 0) {
			return {
				status : false,
				msg : '密码不能为空'
			}
		}
		return{
			status : true,
			msg : '验证通过'
		}
	}	
	//退出登录
	logout(){
		return _mm.request({
			type : 'post',
			url : '/user/logout.do'
		});
	}
	getUserList(pageNum){
		return _mm.request({
			type : 'post',
			url : '/manage/user/list.do',
			data : {
				pageNum : pageNum
			}
		});
	}
}

export default User;