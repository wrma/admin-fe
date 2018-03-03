/*
* @Author: wrma
* @Date:   2018-02-24 20:17:16
* @Last Modified by:   wrma
* @Last Modified time: 2018-02-24 20:54:11
*/
import React from 'react';
import ReactDOM from 'react-dom'; 
import { BrowserRouter as Router,Redirect, Switch, Route, Link } from 'react-router-dom'; 

import Layout from 'component/layout/index.jsx';
//页面
import Home from 'page/home/index.jsx';
import Login from 'page/login/index.jsx';
import ErrorPage from 'page/error/index.jsx';
import UserList from 'page/user/index.jsx';

class App extends React.Component{
	render(){
		let LayoutRouter = (
			<Layout>
				{/*如果用div的话,里面的路由就会依次执行，我们就重复会跳转到
				两个相同的路径上，用Switch的话就只进行一次匹配*/}
				<Switch>
					<Route exact path='/' component={Home} />
					{/*如果匹配不到/的话，就把所有的路径都跳到/*/}
					{/*<Redirect from='*' to="/"></Redirect>*/}
					<Route path='/product' component={Home} />
					<Route path='/product-category' component={Home} />
					<Route path='/user/index' component={UserList} />
					<Redirect exact from='/user' to='/user/index' />
					{/*所有路径都没有被匹配到，则跳转到错误页面*/}
					<Route component={ErrorPage} />
				</Switch>
			</Layout>
		);
		return (
			<Router>
				<Switch>
					<Route path='/login' component={Login}></Route>
					{/*其他所有的页面都让他匹配到有导航的部分*/}
					<Route path='/' render={(props) => {
						return LayoutRouter;
					}}></Route>
				</Switch>
			</Router>
		);
	}
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);