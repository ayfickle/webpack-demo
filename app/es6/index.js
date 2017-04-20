import './main.css';
import sub from './sub.js';
import $ from 'jquery';
import moment from 'moment';

let app = document.createElement('div');
const myPromise = Promise.resolve(42);
myPromise.then((num) => {
	$('body').append('<p>promise result is ' + num + ' now is ' + moment().format() +'</p>');
});
app.innerHTML = '<h1>Hello World</h1>';
document.body.appendChild(app);
app.appendChild(sub());