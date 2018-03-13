/*
* @Author: wrma
* @Date:   2018-02-24 20:17:16
* @Last Modified by:   wrma
* @Last Modified time: 2018-02-24 20:54:11
*/
import React from 'react';
import { BrowserRouter as Router,Redirect, Switch, Route, Link } from 'react-router-dom'; 

import Pagination from 'util/pagination/index.jsx';
import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';
import ListSearch from './index-list-search.jsx';

import Mutil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm = new Mutil();
const _product = new Product();

import './index.scss';

class ProductList extends React.Component{
	constructor(){
		super();
		this.state = {
			list 			: [],
			pageNum 		: 1,
			listType 		: 'list' 
		}
	}
	componentDidMount(){
		this.loadProductList();
	}
	//加载商品列表
	loadProductList(){
		let listParam = {};
		listParam.listType = this.state.listType;
		listParam.pageNum = this.state.pageNum;
		//如果是搜索的话，需要传入搜索类型和关键字
		if (this.state.listType === 'search') {
			listParam.searchType = this.state.searchType;
			listParam.searchKeyword = this.state.searchKeyword;
		}
		_product.getProductList(listParam)
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
	//搜索
	onSearch(searchType,searchKeyword){
		//console.log(searchType,searchKeyword);
		//当搜索关键字为空时，列表类型为list，之后可根据列表类型判断
		//传过去的参数和请求的接口url
		let listType = searchKeyword === '' ? 'list' : 'search';
		this.setState({
			listType 	: listType,
			pageNum 	: 1,
			searchType 	:searchType,
			searchKeyword: searchKeyword,
		},() => {
			this.loadProductList();
		})

	}
	//页数变化
	onPageNumChange(pageNum){
		//setState是一个异步的函数
		this.setState({
			pageNum : pageNum
		},() => {
			this.loadProductList();
		})
	}
	//改变商品状态
	onSetProductStatus(e,productId,currentStatus){
		let newStatus = currentStatus === 1 ? 2 : 1;
		let confirmTips = currentStatus === 1 ? '确定要下架该商品？' : '确定要上架该上品？'; 
		if (window.confirm(confirmTips)) {
			_product.setProductStatus({
				productId : productId,
				status : newStatus,
			}).then(res => {
				_mm.successTips(res);
				this.loadProductList();
			},errMsg => {
				_mm.errorTips(errMsg);
			});
		} 
	}
	render(){	
		let tableHeads = [
			{name: '商品ID',width : '10%'},
			{name: '商品信息',width : '50%'},
			{name: '价格',width : '10%'},
			{name: '状态',width : '15%'},
			{name: '操作',width : '15%'},
		];								
		return (
			<div id="page-wrapper">
				<PageTitle title='商品列表'>
					<div className="page-header-right">
						<Link to='/product/save' className='btn btn-primary'>
							<i className="fa fa-plus"></i>
							<span>添加商品</span>
						</Link>
					</div>
				</PageTitle>
				<ListSearch onSearch={(searchType,searchKeyword) => {this.onSearch(searchType,searchKeyword)}}></ListSearch>
				<TableList tableHeads={tableHeads}>
					{
						this.state.list.map((product,index) => {
							return ( 
								<tr key={index}>
									<td>{product.id}</td>
									<td>
										<p>{product.name}</p>
										<p>{product.subtitle}</p>
									</td>
									<td>￥{product.price}</td>
									<td>
										<p>{product.status === 1 ? '在售' : '已下架'}</p>
										<button className='btn btn-warning btn-xs'
											onClick={e => {this.onSetProductStatus(e,product.id,product.status)}}>
												{product.status === 1 ? '下架' : '上架'}
										</button>
									</td>
									<td>
										<Link className='opera' to={`/product/details/${product.id}`}>查看详情</Link>
										{/*添加和编辑公用的一个页面,有id则编辑，无则添加*/}
										<Link className='opera' to={`/product/save/${product.id}`}>编辑</Link>
									</td>
								</tr>
							);
						})
					}
				</TableList>
				<Pagination current={this.state.pageNum} 
					total={this.state.total} 
					onChange={(pageNum) => {this.onPageNumChange(pageNum);}}/>
			</div>						
		);
	}
}

export default ProductList;