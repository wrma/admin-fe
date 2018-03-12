/*
* @Author: wrma
* @Date:   2018-02-24 20:17:16
* @Last Modified by:   wrma
* @Last Modified time: 2018-02-24 20:54:11
*/
import React from 'react';
import { BrowserRouter as Router,Redirect, Switch, Route, Link } from 'react-router-dom'; 

//页面
import ProductList from 'page/product/index/index.jsx';
import ProductSave from 'page/product/index/save.jsx';
import ProductDetail from 'page/product/index/detail.jsx';

class ProductRouter extends React.Component{
	render(){
		return (
			<Switch>
				<Route path='/product/index' component={ProductList}></Route>
				<Route path='/product/save/:pid?' component={ProductSave}></Route>
				<Route path='/product/details/:pid' component={ProductDetail}></Route>
				<Redirect exact from='/product' to='/product/index'></Redirect>
			</Switch>
		);
	}
}

export default ProductRouter;