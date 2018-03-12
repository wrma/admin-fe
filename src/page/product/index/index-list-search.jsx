/*
* @Author: wrma
* @Date:   2018-02-24 20:17:16
* @Last Modified by:   wrma
* @Last Modified time: 2018-02-24 20:54:11
*/
import React from 'react';

class ListSearch extends React.Component{
	constructor(){
		super();
		this.state = {
			searchType : 'productId', //productID,productName
			searchKeyword : ''
		}
	}
	//数据变化的时候
	onValueChange(e){
		let name = e.target.name;
		let value = e.target.value.trim();
		this.setState({
			[name] : value
		})
	}
	//点击搜索按钮时
	onSearch(){
		//利用回调的形式向父元素传递数据
		this.props.onSearch(this.state.searchType,this.state.searchKeyword);
	}
	onSearchKeywordKeyUp(e){
		if (e.keyCode === 13) {
			this.onSearch(e);			
		}
	}
	render(){
		return (
			<div className="row search-wrap">
				<div className="col-md-12">
					<div className="form-inline">
						<div className="form-group">
							<select className="form-control"
								name='searchType'
								onChange={(e) => {
								 	this.onValueChange(e);
								}}>
								<option value="productId">按商品ID查询</option>
								<option value="productName">按商品名称查询</option>
							</select>
						</div>
						<div className="form-group">
							<input type="text"
								className="form-control"
								placeholder="关键词"
								name="searchKeyword"
								onChange={(e) => {
									this.onValueChange(e);
								}}
								onKeyUp={e => {
									this.onSearchKeywordKeyUp(e);
								}}/>
						</div>
						<button className="btn btn-primary"
							onClick={(e) => {this.onSearch()}}>搜索</button>
					</div>
				</div>
			</div>
		);
	}
}

export default ListSearch;