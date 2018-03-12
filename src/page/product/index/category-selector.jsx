/*
* @Author: wrma
* @Date:   2018-02-24 20:17:16
* @Last Modified by:   wrma
* @Last Modified time: 2018-02-24 20:54:11
*/
import React from 'react';

import './category-selector.scss';

import Mutil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm = new Mutil();
const _product = new Product();


class CategorySelector extends React.Component{
	constructor(){
		super();
		this.state = {
			firstCategoryList : [],
			firstCategoryId : 0,
			secondCategoryList : [],
			secondCategoryId : 0
		}
	}
	componentDidMount(){
		this.loadFirstCategory();
	}
	//品类选择器的回填
	componentWillReceiveProps(nextProps){
		let categoryIdChange = this.props.categoryId !== nextProps.categoryId;
		let parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId;
		//数据没有发生变化时不做处理
		if(!categoryIdChange && !parentCategoryIdChange){
			return ;
		}
		//假如只有一级品类
		if (nextProps.parentCategoryId === 0) {
			this.setState({
				firstCategoryId : nextProps.categoryId,
				secondCategoryId : 0
			})
		}
		//有两级品类
		else{
			this.setState({
				firstCategoryId : nextProps.parentCategoryId,
				secondCategoryId : nextProps.categoryId
			},() => {
				parentCategoryIdChange && this.loadSecondCategory();
			})
		}

	}
	//加载一级分类
	loadFirstCategory(){
		_product.getCategoryList().then(res => {
			this.setState({
				firstCategoryList : res,
			})
		},errMsg => {
			_mm.errorTips(errMsg);
		})
	}
	//加载二级品类
	loadSecondCategory(){
		_product.getCategoryList(this.state.firstCategoryId).then(res => {
				this.setState({
					secondCategoryList : res,
				})
		},errMsg => {
			_mm.errorTips(errMsg);
		})
	}
	//选择一级品类
	onFirstCategoryChange(e){
		if(this.props.readOnly){
			return
		}
		let newValue = e.target.value || 0;
		this.setState({
			firstCategoryId : newValue,
			//由于一级品类改变，所以要将之前的二级品类清0
			secondCategoryId : 0,
			secondCategoryList : []
		},() => {
			//更新二级品类
			this.loadSecondCategory();
			//把选中的结果传给父组件
			this.onPropsCategoryChange();
		})
	}
	//选择二级品类
	onSecondCategoryChange(e){
		if(this.props.readOnly){
			return
		}
		let newValue = e.target.value || 0;
		this.setState({
			secondCategoryId : newValue
		},() => {
			//如果选中了二级品类，就会覆盖之前所选的一级品类id
			this.onPropsCategoryChange();
		})
	}
	//传给父组件选中的结果
	onPropsCategoryChange(){
		//当我们利用回调的时候，一定要做安全性检查
		let categoryChangable = typeof this.props.onCategoryChange === 'function';
		//如果有二级品类
		if (this.state.secondCategoryId) {
			//第一个参数是品类id，第二个参数是父品类id
			categoryChangable && this.props.onCategoryChange(this.state.secondCategoryId,this.state.firstCategoryId);
		}
		//如果只有一级品类
		else{
			//当第一个参数为一级品类时，其父品类参数传0
			categoryChangable && this.props.onCategoryChange(this.state.firstCategoryId,0);
		}
	}
	render(){
		return (
			<div className="col-md-10">
				<select className="form-control cate-select"
					value={this.state.firstCategoryId}
					onChange={e => this.onFirstCategoryChange(e)}
					disabled={this.props.disabled}>
					<option value="">请选择一级分类</option>
					{
						this.state.firstCategoryList.map((category,index) => 
							<option value={category.id} key={index}>{category.name}</option>
						)
					}
				</select>
				{
					this.state.secondCategoryList.length 
					?
					(<select className="form-control cate-select"
						value={this.state.secondCategoryId}
						onChange={e => this.onSecondCategoryChange(e)}
						disabled={this.props.disabled}>
						<option value="">请选择二级分类</option>
						{
							this.state.secondCategoryList.map((category,index) => 
								<option value={category.id} key={index}>{category.name}</option>
							)
						}
					</select>)
					: null
				}				
			</div>
		);
	}
}

export default CategorySelector;