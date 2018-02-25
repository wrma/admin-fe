/*
* @Author: wrma
* @Date:   2018-02-24 19:59:58
* @Last Modified by:   wrma
* @Last Modified time: 2018-02-25 20:44:07
*/
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: './src/app.jsx',
    output: {
    	//path.resolve()解析一个路径  __dirname指当前目录
    	//在当前目录下找到dist文件
        path: path.resolve(__dirname, 'dist'),
        //引用的文件是从根目录下的dist文件开始查找的
        publicPath: '/dist/',
        filename: 'js/bundle.js'
    },
    plugins: [
    	//处理html文件
    	new HtmlWebpackPlugin({
    		// 该文件的默认输出为dist/index.html
    		template: './src/index.html'
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
		port: 8086
	},
};