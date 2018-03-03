

import React from 'react';
import { Link } from 'react-router-dom';
import Mutil from 'util/mm.jsx';
import Statistic from 'service/statistic-service.jsx';

const _mm = new Mutil();
const _statistic = new Statistic();

import PageTitle from 'component/page-title/index.jsx';


class ErrorPage extends React.Component{
	constructor(){
		super();
	}
	render(){
		return (
			<div id="page-wrapper">
				<PageTitle title='出错啦'></PageTitle>
				<div className="row">
					<div className="col-md-12">
						<span>找不到该路径，</span>
						<Link to='/'>点我返回首页</Link>
					</div>
				</div>
			</div>			
			
		);
	}
}
export default ErrorPage;