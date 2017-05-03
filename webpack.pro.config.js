var path = require('path');
var webpack = require('webpack');
// index.html 生成
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
/**
 * webpack for es6
 * compile with babel, babel-preset-es2015
 */
var APP_PATH = path.resolve(ROOT_PATH, 'app/es6');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build/pro');
var TEM_PATH = path.resolve(ROOT_PATH, 'app/es6/templates');

module.exports = {
	//项目的文件夹
	entry: {
		app: path.resolve(APP_PATH, 'index.js'),
		mobile: path.resolve(APP_PATH, 'mobile.js'),
		//添加要打包在vendors里面的库
		vendors: ['jquery', 'moment']
	},
	//输出的文件名 合并以后的js会命名为bundle.js
	output: {
		path: BUILD_PATH,
		filename: '[name].[hash].js'
	},

	// loaders not allowed to omit the '-loader' suffix
	module: {
		loaders: [
			{
				test: /\.css$/,
				loaders: ['style-loader', 'css-loader'],
				include: APP_PATH
			},
			{
				test: /\.(png|jpg)$/,
				loader: 'url-loader?limit=40000'
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader',
				include: APP_PATH,
				query: {
					presets: ['es2015']
				}
			}
		]
	},

	//添加我们的插件 会自动生成一个html文件
	plugins: [
		// 这个使用uglifyJs压缩你的js代码
		new webpack.optimize.UglifyJsPlugin({minimize: true}),
		// 把入口文件里面的数组打包成verdors.js
		new webpack.optimize.CommonsChunkPlugin({name: 'vendors', filename: 'vendors.js'}),
		new HtmlwebpackPlugin({
			title: 'Hello World App',
			template: path.resolve(TEM_PATH, 'index.html'),
			filename: 'index.html',
			//chunks这个参数告诉插件要引用entry里面的哪几个入口
			chunks: ['app', 'vendors'],
			//要把script插入到标签里
			inject: 'body'
		}),
		new HtmlwebpackPlugin({
			title: 'Hello Mobile App',
			template: path.resolve(TEM_PATH, 'mobile.html'),
			filename: 'mobile.html',
			chunks: ['app', 'vendors'],
			inject: 'body'
		}),
	]
};