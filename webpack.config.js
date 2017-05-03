var path = require('path');
var webpack = require('webpack');
// index.html 生成
var HtmlwebpackPlugin = require('html-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);
// webpack for es5
// var APP_PATH = path.resolve(ROOT_PATH, 'app/es5');
/**
 * webpack for es6
 * compile with babel, babel-preset-es2015
 */
var APP_PATH = path.resolve(ROOT_PATH, 'app/es6');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build/test');

module.exports = {
	//项目的文件夹
	entry: APP_PATH,
	//输出的文件名 合并以后的js会命名为bundle.js
	output: {
		path: BUILD_PATH,
		filename: 'bundle.js'
	},

	devServer: {
		historyApiFallback: true,
		hot: true,
		inline: true
	},

	// 出错以后就会采用source-map的形式直接显示你出错代码的位置
	devtool: 'eval-source-map',

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
		new HtmlwebpackPlugin({
			title: 'Hello World App',
			filename: 'app.html'
		}),

		// 使用webpack.ProvidePlugin 
		// 把一个全局变量插入到所有的代码中
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		})
	]
};