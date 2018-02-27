import React from 'react';
import { Link, NavLink } from 'react-router-dom';

class NavSide extends React.Component{
	constructor(props){
		super(props);
	}
	render(){
		return (
			<div className="navbar-default navbar-side">
	            <div className="sidebar-collapse">
	                <ul className="nav">
	                    <li>
	                		{/*表示完全匹配/,才会给我们加上一个activeClassName*/}
	                        <NavLink exact activeClassName="active-menu" to="/">
	                        	<i className="fa fa-dashboard"></i>
	                        	 <span>首页</span>
	                        </NavLink>
	                    </li>
	                    <li className="active">
	                        <Link className="" to="/product">
	                        	<i className="fa fa-sitemap"></i> 
	                        	<span>商品</span>
	                        	<span className="fa arrow"></span>
	                        </Link>
	                        <ul className="nav nav-second-level collapse in">
	                            <li>
	                                <NavLink to="/product" activeClassName="active-menu">商品管理</NavLink>
	                            </li>
	                            <li>
	                                <NavLink to="/product-category" activeClassName="active-menu">品类管理</NavLink>
	                            </li>
	                        </ul>
	                    </li>
	                    <li className="active">
	                        <Link className="" to="/order">
	                        	<i className="fa fa-sitemap"></i> 
	                        	<span>订单</span>
	                        	<span className="fa arrow"></span>
	                        </Link>
	                        <ul className="nav nav-second-level collapse in">
	                            <li>
	                                <NavLink to="/order" activeClassName="active-menu">订单管理</NavLink>
	                            </li>
	                        </ul>
	                    </li>
	                    <li className="active">
	                        <Link className="" to="/user">
	                        	<i className="fa fa-sitemap"></i> 
	                        	<span>用户</span>
	                        	<span className="fa arrow"></span>
	                        </Link>
	                        <ul className="nav nav-second-level collapse in">
	                            <li>
	                                <NavLink to="/user" activeClassName="active-menu">用户管理</NavLink>
	                            </li>
	                        </ul>
	                    </li>
	                </ul>

	            </div>
	        </div>
		);
	}
}
export default NavSide;