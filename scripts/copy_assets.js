var fs =require('fs-extra');
// fs-extra is a package used for manipulating files in a Node environment. It has a method called copySync, which we'll use here.
fs.copySync('public', 'build', {
	dereference:true, 
	filter: file => file !== 'public/index/html'
});