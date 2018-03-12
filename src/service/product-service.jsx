
import Mutil from 'util/mm.jsx';
const _mm = new Mutil();

class Product{
	//获取商品列表
	getProductList(listParam){
		let url = '';
		let data = {};
		if (listParam.listType === 'list') {
			url = '/manage/product/list.do';
			data.pageNum = listParam.pageNum;
		}else if(listParam.listType === 'search'){
			url = '/manage/product/search.do';
			data.pageNum = listParam.pageNum;
			data[listParam.searchType] = listParam.searchKeyword;
		}
		return _mm.request({
			type : 'post',
			url : url,
			data : data
		});
	}
	//变更商品销售状态
	setProductStatus(productInfo){
		return _mm.request({
			type : 'post',
			url : '/manage/product/set_sale_status.do',
			data : productInfo
		});
	}
	//获取品类列表
	getCategoryList(parentCategoryId){
		return _mm.request({
			type : 'post',
			url : '/manage/category/get_category.do',
			data : {
				categoryId : parentCategoryId || 0
			}
		});
	}
	//检查保存商品表单的数据
	checkProduct(product){
		// console.log(product);
		// console.log(product.price < 0);
		let result = {
			status : true,
			msg : '验证通过'
		}
		//商品名称不能为空
		if (typeof product.name !== 'string' || product.name.length === 0) {
			return {
				status : false,
				msg : '商品名称不能为空'
			}
		}
		//判断描述不能为空
		if (typeof product.subtitle !== 'string' || product.subtitle.length === 0) {
			return {
				status : false,
				msg : '商品描述不能为空'
			}
		}
		//品类id
		if (typeof product.categoryId !== 'number' || !(product.categoryId >= 0)) {
			return {
				status : false,
				msg : '请选择商品品类'
			}
		}
		//判断商品价格为数字且大于0
		//注意！这里之所以要用取非的方式，是因为我们默认值里面为'',当取到默认值进行比较时
		//由于之前有过parseInt,空字符串被转换成了0
		//product.price<0 为 false
		if (typeof product.price !== 'number' || !(product.price >= 0)) {
			return {
				status : false,
				msg : '请输入正确的商品价格'
			}
		}
		//库存为数字且大于等于0
		if (typeof product.stock !== 'number' || !(product.stock > 0)) {
			return {
				status : false,
				msg : '请输入正确的库存数量'
			}
		}
		//如果验证全部通过则返回默认的result
		return result;
	}
	//保存商品
	saveProduct(product){
		return _mm.request({
			type : 'post',
			url : '/manage/product/save.do',
			data : product
		});
	}
	//获取商品详情
	getProduct(productId){
		return _mm.request({
			type : 'post',
			url : '/manage/product/detail.do',
			data : {
				productId : productId || 0
			}
		});
	}
}

export default Product;