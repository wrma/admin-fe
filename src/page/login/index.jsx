
import React from 'react';
import Mutil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

const _mm = new Mutil();
const _user = new User();

import './index.scss'

class Login extends React.Component{
	constructor(){
		super();
		this.state = {
			username : '',
			password : '',
			redirect : _mm.getUrlParam('redirect') || '/'
		}
	}
	componentWillMount(){
		document.title = '登录 - MMALL ADMIN';
	}
	onInputChange(e){
		// console.log(e.target.value);
		// e.target 指的就是对应的html元素
		let inputName = e.target.name;
		let inputValue = e.target.value;
		this.setState({
			// es6中允许属性名是变量
			[inputName] : inputValue
		});
	}
	//用户提交表单
	onSubmit(e){
		let loginInfo = {
			username : this.state.username,
			password : this.state.password
		};
		let checkResult = _user.checkLoginInfo(loginInfo);
		//验证通过
		if (!!checkResult.status) {
			_user.login(loginInfo)
			.then((res) => {
				_mm.setStorage('userInfo',res);
				//返回之前的页面，如果之前是从用户页面跳转到登录页面，那登录成功后就自动跳转到用户页面
				//这里的props指的是引用他的Route/???
				this.props.history.push(this.state.redirect);
			},(err) => {
				_mm.errorTips(err);
			});
		}
		//验证信息不通过
		else{
			_mm.errorTips(checkResult.msg);
		}	
	}
	onInputKeyUp(e){
		if (e.keyCode === 13) {
			this.onSubmit();
		}
	}
	render(){
		return (
			<div className="col-md-4 col-md-offset-4">					
				<div className="panel panel-default login-panel">
					<div className="panel-heading">欢迎登陆 - MMALL管理系统</div>
					<div className="panel-body">
						<div>
							<div className="form-group">
								{/*for在jsx里是处理逻辑用的，所以这里的for要改为htmlFor*/}
								{/*<label htmlFor="exampleInputEmail1">用户名</label>*/}
								<input type="text" 
									name="username"
									className="form-control" 
									placeholder="请输入用户名"
									onKeyUp={e => this.onInputKeyUp(e)}
									onChange={e => this.onInputChange(e)}/>
							</div>
							<div className="form-group">
								<input type="password" 
									name="password"
									className="form-control" 
									placeholder="请输入密码"
									onKeyUp={e => this.onInputKeyUp(e)}
									onChange={e => this.onInputChange(e)}/>
							</div>
							<button className="btn btn-primary btn-lg btn-block"
								onClick={e => this.onSubmit(e)}>登陆</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Login;