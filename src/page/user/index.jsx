

import React from 'react';
import { Link } from 'react-router-dom';

import Mutil from 'util/mm.jsx';
import TableList from 'util/table-list/index.jsx';
import User from 'service/user-service.jsx';

import Pagination from 'util/pagination/index.jsx';
import PageTitle from 'component/page-title/index.jsx';

const _mm = new Mutil();
const _user = new User();

class UserList extends React.Component{
	constructor(){
		super();
		this.state = {
			list 			: [],
			pageNum 		: 1
		}
	}
	componentDidMount(){
		this.loadUserList();
	}
	loadUserList(){
		_user.getUserList(this.state.pageNum)
		.then(res => {
			this.setState(res);
		},errMsg => {
			//接口错误时，要把列表信息清空
			this.setState({
				list : []
			});
			_mm.errorTips(errMsg);
		})
	}
	//页数变化
	onPageNumChange(pageNum){
		//setState是一个异步的函数
		this.setState({
			pageNum : pageNum
		},() => {
			this.loadUserList();
		})
	}
	render(){
		let listBody = this.state.list.map((user,index) => {
			return ( 
				<tr key={index}>
					<td>{user.id}</td>
					<td>{user.username}</td>
					<td>{user.email}</td>
					<td>{user.phone}</td>
					{/*将时间戳转化成时间*/}
					<td>{new Date(user.createTime).toLocaleString()}</td>
				</tr>
			);
		});
		return (
			<div id="page-wrapper">
				<PageTitle title='用户列表'/>
				<TableList tableHeads={['ID','用户名','邮箱','电话','注册时间']}>
					{listBody}
				</TableList>
				<Pagination current={this.state.pageNum} 
					total={this.state.total} 
					onChange={(pageNum) => {this.onPageNumChange(pageNum);}}/>
			</div>			
			
		);
	}
}
export default UserList;