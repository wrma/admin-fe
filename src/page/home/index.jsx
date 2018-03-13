

import React from 'react';
import { Link } from 'react-router-dom';
import Mutil from 'util/mm.jsx';
import Statistic from 'service/statistic-service.jsx';

const _mm = new Mutil();
const _statistic = new Statistic();

import PageTitle from 'component/page-title/index.jsx';

import './index.scss';

class Home extends React.Component{
	constructor(){
		super();
		this.state={
			userCount 		: 123,
			productCount 	: 123,
			orderCount 		: 123
		}
	}
	//如果数据返回的很快，但组件还没加载完成就会报错，所以放在componentDidMount里面比较保险
	componentDidMount(){
		this.loadCount();
	}
	loadCount(){
		_statistic.getHomeCount().then(res => {
			this.setState(res);
		},errMsg => {
			_mm.errorTips(errMsg)
		});
	}
	render(){
		return (			
			<div id="page-wrapper">
				<PageTitle title='首页'>
				</PageTitle>
				<div className="row">
					<div className="col-md-4">
						<Link to='/user' className='color-box brown'>
							<p className="count">{this.state.userCount}</p>
							<p className="desc">
								<i className="fa fa-user-o"></i>
								<span>用户总数</span>
							</p>
						</Link>
					</div>
					<div className="col-md-4">
						<Link to='/product' className='color-box green'>
							<p className="count">{this.state.productCount}</p>
							<p className="desc">
								<i className="fa fa-list"></i>
								<span>商品总数</span>
							</p>
						</Link>
					</div>
					<div className="col-md-4">
						<Link to='/order' className='color-box blue'>
							<p className="count">{this.state.orderCount}</p>
							<p className="desc">
								<i className="fa fa-check-square-o"></i>
								<span>订单总数</span>
							</p>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}
export default Home;