var path = require('path');
var webpack = require('webpack');
// index.html 生成
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
/**
 * webpack for es6
 * compile with babel, babel-preset-es2015
 */
var APP_PATH = path.resolve(ROOT_PATH, 'app/react-sreach-webpack');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build/react');

module.exports = {
	//项目的文件夹
	entry: {
		app: path.resolve(APP_PATH, 'index.jsx')
	},
	//输出的文件名 合并以后的js会命名为bundle.js
	output: {
		path: BUILD_PATH,
		filename: 'bundle.js'
	},

	devtool: 'eval-source-map',
	// 构建速度更快，但是不利于调试，推荐在大型项目考虑da时间成本是使用
	// devtool: 'cheap-module-eval-source-map',

	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true
	},

	// 把jsx扩展名添加进去，就可以在js中import加载jsx这种扩展名的脚本
	resolve: {
		extensions: ['.js', '.jsx']
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
				test: /\.scss$/,
				loaders: ['style-loader', 'css-loader', 'sass-loader']
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
					presets: ['es2015', 'react']
				}
			}
		]
	},

	//添加我们的插件 会自动生成一个html文件
	plugins: [
		new HtmlwebpackPlugin({
			title: 'Hello Mobile App'
		}),
	]
};