
import React from 'react';
import Simditor from 'simditor';

import 'simditor/styles/simditor.scss';
import './index.scss';

//通用的富文本编辑器，依赖于jq
class RichEditor extends React.Component{
	constructor(){
		super();
	}
	componentDidMount(){
		this.loadEditor();
	}
	componentWillReceiveProps(nextProps){
		if (this.props.defaultDetail !== nextProps.defaultDetail) {
			this.simditor.setValue(nextProps.defaultDetail);
		}
	}
	loadEditor(){
		let element = this.refs['textarea'];
		this.simditor = new Simditor({
			textarea : $(element),
			defaultValue : this.props.placeholder || '请输入内容',
			upload : {
				//这里是上传富文本中图片的地址
				url 			: '/manage/product/richtext_img_upload.do',
				defaultImage 	: '',
				filekey 		: 'upload_file'
			}
		});
		this.bindEditorEvent();
	}
	//初始化富文本编辑器的事件
	bindEditorEvent(){
		this.simditor.on('valuechanged',e => {
			//我们要把数据暴露给父元素，然后让父元素将他保存起来并上传到后台
			this.props.onValueChange(this.simditor.getValue());
		})
	}
	render(){
		return (
			<div className="rich-editor">
				<textarea ref='textarea'></textarea>
			</div>
		)
	}
}

export default RichEditor;
