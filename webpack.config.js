/*
* @Author: wrma
* @Date:   2018-02-24 19:59:58
* @Last Modified by:   wrma
* @Last Modified time: 2018-03-13 19:26:10
*/
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

module.exports = {
    entry: './src/app.jsx',
    output: {
    	//path.resolve()解析一个路径  __dirname指当前目录
    	//在当前目录下找到dist文件
        path: path.resolve(__dirname, 'dist'),
        //引用的文件是从根目录下的dist文件开始查找的
        publicPath: WEBPACK_ENV === 'dev' ? '/dist/' : '//s.wrma.top/admin-v2-fe/dist/',
        filename: 'js/bundle.js'
    },
    resolve: {
		alias : {
			page 		: path.resolve(__dirname, 'src/page'),
			component 	: path.resolve(__dirname, 'src/component'),
			util 		: path.resolve(__dirname, 'src/util'),
			service 	: path.resolve(__dirname, 'src/service'),
		}
    },
    plugins: [
    	//处理html文件
    	new HtmlWebpackPlugin({
    		// 该文件的默认输出为dist/index.html
    		template: './src/index.html',//入口html文件模板
    		favicon: './favicon.ico'
    	}),
    	//独立css文件
    	//将文件提取到dist/css/[name].css name为src里面css文件的名字
    	new ExtractTextPlugin("css/[name].css"),
    	//提取公共模块插件
    	new webpack.optimize.CommonsChunkPlugin({
    		name : 'common',
    		filename : 'js/base.js'
    	})
    ],
    module: {
	  rules: [
	    {
	    	//jsx语法处理
	      	test: /\.jsx$/,
	      	// 对这里的文件不做处理
	      	exclude: /(node_modules)/,
	      	use: {
	      	  	loader: 'babel-loader',
	      	  	options: {
	      	  		// 'env'可以自动根据环境(浏览器/node环境)来打包
	      	  	  	presets: ['env','react']
	      	  	}
	      	}
	    },
	    //css文件的处理
	    {
	    	test: /\.css$/,
	    	use: ExtractTextPlugin.extract({
		          	fallback: "style-loader",
		          	use: "css-loader"
		        })
	    },
	    //sass文件的处理
	    {
	        test: /\.scss$/,
	        use: ExtractTextPlugin.extract({
	          	fallback: 'style-loader',
	          	use: ['css-loader', 'sass-loader']
	        })
	    },
	    //图片处理
	    {
	        test: /\.(png|jpg|gif)$/,
	        use: [
		        {
		          	loader: 'url-loader',
		          	//当文件小于8k时将它转化为base64的形式
		          	options: {
		          	  limit: 8192,
		          	  name : 'resourse/[name].[ext]'
		          	}
		        }
	        ]
	      },
	      //字体配置
	      {
	        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
	        use: [
		        {
		          	loader: 'url-loader',
		          	//当文件小于8k时将它转化为base64的形式
		          	options: {
		          	  limit: 8192,
		          	  name : 'resourse/[name].[ext]'
		          	}
		        }
	        ]
	      }
	  ]
	},
	devServer: {
		// 已经设置了publicPath为dist,contentBase可以不用设置
		// contentBase: './dist'
		port: 8081,
		//当页面不存在的时候就会返回我们设置的这个页面
		historyApiFallback: {
			index: '/dist/index.html'
		},
		//配置代理，处理跨域请求的问题
		proxy : {
			//匹配到/manage开头的路径就自动代理过去
			'/manage' : {
				target : 'http://admintest.happymmall.com',
				//将localhost伪装成从target发过来的请求，实现跨域的作用
				changeOrigin : true
			},
			'/user/logout.do' : {
				target : 'http://admintest.happymmall.com',
				//将localhost伪装成从target发过来的请求，实现跨域的作用
				changeOrigin : true
			},
		}
	},
};