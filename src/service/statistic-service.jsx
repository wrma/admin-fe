
import Mutil from 'util/mm.jsx';
const _mm = new Mutil();

class Statistic{
	//首页数据统计
	getHomeCount(){
		//这里返回的是一个promise对象（request方法），之前在mm.jsx中已经定义过
		return _mm.request({
			url : '/manage/statistic/base_count.do' 
		})
	}
	
}

export default Statistic;