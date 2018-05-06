/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2018-04-18 14:55:26
 * @version $Id$
 */
var cate; //分类
var childCate; //子分类
var task; //任务

var cateText= 
'['
	+'{'
	+	'"id":0,'
	+	'"name":"默认分类",'
	+	'"child":[0]'
	+'},'
	+'{'
	+	'"id":1,'
	+	'"name":"个人分类",'
	+	'"child":[1,2]'
	+'}'
+']';

var childCateText=
'['
	+'{'
	+	'"id":0,'
	+	'"name":"默认子分类",'
	+	'"child":[],'
	+	'"father":0'
	+'},'
	+'{'
	+	'"id":1,'
	+	'"name":"task1",'
	+	'"child":[0,1,2],'
	+	'"father":1'
	+'},'
	+'{'
	+	'"id":2,'
	+	'"name":"task2",'
	+	'"child":[3],'
	+	'"father":1'
	+'}'
+']';

var taskText=
'['
	+'{'
	+	'"id":0,'
	+	'"name":"to do 1",'
	+	'"father":1,'
	+	'"finish":true,'
	+	'"date":"2018-04-18",'
	+	'"contents":"学习js并开始编码。"'
	+'},'
	+'{'
	+	'"id":1,'
	+	'"name":"to do 3",'
	+	'"father":1,'
	+	'"finish":true,'
	+	'"date":"2018-04-20",'
	+	'"contents":"完成编码。"'
	+'},'
	+'{'
	+	'"id":2,'
	+	'"name":"to do 2",'
	+	'"father":1,'
	+	'"finish":false,'
	+	'"date":"2018-04-22",'
	+	'"contents":"重构任务"'
	+'},'
	+'{'
	+	'"id":3,'
	+	'"name":"to do 4",'
	+	'"father":3,'
	+	'"finish":false,'
	+	'"date":"2018-04-29",'
	+	'"contents":"完成任务。"'
	+'}'
+']';


//生成任务分类列表
function makeType(){
	setNum();
	var oldChoose=$('.type-wrap .choose');
	$('#type-all').innerHTML='<i class="icon-menu"></i><span>所有任务</span>(' +task.length+')';
	var html='';
	for (var i = 0; i < cate.length; i++) {
		html+=''
			+'<li>'
			+	'<h3 onclick="typeClick(this)">'
			+		'<i class="icon-folder-open-empty"></i><span>'+cate[i].name+'</span>('+cate[i].num+')<i class="delete icon-minus-circled" onclick="del(event,this)"></i>'
			+	'</h3>'
			+	'<ul class="item">';

		for (var j = 0; j < cate[i].child.length; j++) {
			var childNode=getObjByKey(childCate,'id',cate[i].child[j]);
			html+=''
			+'<li>'
			+	'<h4 onclick="typeClick(this)">'
			+		'<i class="icon-doc-text"></i><span>'+childNode.name+'</span>('+childNode.child.length+')<i class="delete icon-minus-circled" onclick="del(event,this)"></i>'
			+	'</h4>'
			+'</li>'
		}
		html+=''
			+	'</ul>'
			+'</li>'
	}
	html=html.replace(/<i class="delete icon-minus-circled" onclick="del\(event,this\)"><\/i>/,'');
	html=html.replace(/<i class="delete icon-minus-circled" onclick="del\(event,this\)"><\/i>/,'');
	$('.item-wrap').innerHTML = html;
	
	if (oldChoose) {
		var tag=oldChoose.tagName.toLowerCase();
		var name=oldChoose.getElementsByTagName('span')[0].innerHTML;
		var isClick=false;
		switch(tag){
			case 'h2':
				$('h2').click();
				isClick=true;
				break;
			case 'h3':
				var cateEle=document.getElementsByTagName('h3');
				for (var i = 0; i < cateEle.length; i++) {
					if (cateEle[i].getElementsByTagName('span')[0].innerHTML===name) {
						cateEle[i].click();
						isClick=true;
						break;
					}
				}
				break;
			case 'h4':
				var childEle=document.getElementsByTagName('h4');
				for (var i = 0; i < childEle.length; i++) {
					if (childEle[i].getElementsByTagName('span')[0].innerHTM===name) {
						childEle[i].click();
						isClick=true;
						break;
					}
				}
				break;
		}
		if (!isClick) {
			$('h2').click();
		}
	}
	else{
		$('h2').click();
	}
	makeTask();
}

//刷新分类对象的num属性
function setNum(){
	var sum;
	for (var i = 0; i < cate.length; i++) {
		sum=0;
		for (var j = 0; j < cate[i].child.length; j++) {
			var childNum=getObjByKey(childCate,'id',cate[i].child[j]).child.length;
			sum += childNum;
		}
		cate[i].num=sum;
	}
}

//根据某对象的某属性获取此对象
function getObjByKey(obj,key,value){
	for (var i = 0; i < obj.length; i++) {
		if (obj[i][key] === value) {
			return obj[i];
		}
	}
}

//生成任务列表
function makeTask(){
	var oldChoose = $('.task-wrap .choose');
	$('.status li').click();
	var ele=$('.type-wrap .choose');
	var eleTag=ele.tagName.toLowerCase();
	var name=ele.getElementsByTagName('span')[0].innerHTML;
	var taskIdArr=[];
	switch(eleTag){
		case 'h2':
			for (var i = 0; i < task.length; i++) {
				taskIdArr.push(task[i].id);
			}
			makeTaskById(taskIdArr);
			break;
		case 'h3':
			var cateObj=getObjByKey(cate,'name',name);
			for (var i = 0; i < cateObj.child.length; i++) {
				var childObj=getObjByKey(childCate,'id',cateObj.child[i]);
				for (var j = 0; j < childObj.child.length; j++) {
					taskIdArr.push(childObj.child[j]);
				}
			}
			makeTaskById(taskIdArr);
			break;
		case 'h4':
			var childObj=getObjByKey(childCate,'name',name);
			for (var i = 0; i < childObj.child.length; i++) {
				taskIdArr.push(childObj.child[i]);
			}
			makeTaskById(taskIdArr);
			break;
	}

	if (oldChoose) {
		var childEle=document.getElementsByTagName('h6');
		var oldName=oldChoose.getElementsByTagName('sapn')[0].innerHTML;
		var isClick=false;
		for (var i = 0; i < childEle.length; i++) {
			if(childEle[i].getElementsByTagName('span')[0].innerHTML===oldName){
				childEle[i].click();
				isClick=true;
				break;
			}
			if (!isClick&& $('h6')) {
				$('h6').click();
			}
		}
	}
	else if ($('h6')) {
		$('h6').click();
	}
	makeDetails();
}

//根据传入的ID生成任务列表
function makeTaskById(taskIdArr){
	var date=[];
	var taskObj;
	for (var i = 0; i < taskIdArr.length; i++) {
		taskObj=getObjByKey(task,'id',taskIdArr[i]);
		date.push(taskObj.date);
	}
	date=uniqArray(date);
	date=sortDate(date);
	
	var html='';
	for (var i = 0; i < date.length; i++) {
		html+=''
			+'<li>'
			+	'<h5>'+date[i]+'</h5>'
			+	'<ul class="item">'
		for (var j = 0; j < taskIdArr.length; j++) {
			taskObj=getObjByKey(task,'id',taskIdArr[j]);
			if (taskObj.date===date[i]) {
				if (taskObj.finish===true) {
					html += ''
			+ 			'<li class="task-item task-finish">'
				}
				else if (taskObj.finish===false) {
					html += ''
			+			'<li class="task-item">'
				}
				html += ''
			+				'<h6 onclick="taskClick(this)">'
			+					'<i class="icon-check"></i><span>'+ taskObj.name + '</span><i class="delete icon-minus-circled" onclick="del(event,this)"></i>'
			+				'</h6>'
			+			'</li>'
			}
		}
		html +=''
			+	'</ul>'
			+'</li>'
	}
	$('.task-wrap').innerHTML=html;
}

//生成任务详细描述部分
function makeDetails(){
	var ele = $('.task-wrap .choose');
	var info = $('.details').getElementsByTagName('span');
	if (ele) {
		var name = ele.getElementsByTagName('span')[0].innerHTML;
		var taskObj = getObjByKey(task,'name',name);
		if (taskObj) {
			info[0].innerHTML=taskObj.name;
			info[1].innerHTML=taskObj.date;
			info[2].innerHTML=taskObj.content;
		}
		else{
			info[0].innerHTML='';
			info[1].innerHTML='';
			info[2].innerHTML='';
		}
		$('.set').style.display='inline';
	}
	else{
		info[0].innerHTML='';
		info[1].innerHTML='';
		info[2].innerHTML='';
		$('.set').style.display='none';
	}
}

//对任务时间进行排序
function sortDate(date){
	return date.sort(function(a,b){
		return a.replace(/-/g,'')-b.replace(/-/g,'');
	})
}

//根据某对象的某属性得到某对象的序号
function getIndexByKey(obj,key,value){
	for (var i = 0; i < obj.length; i++) {
		if (obj[i][key] === value) {
			return i;
		}
	}
}

//任务分类列表点击效果
function typeClick(ele){
	var otherChoose=ele.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('*');
	for (var i = 0; i < otherChoose.length; i++) {
		if (otherChoose[i].className==='choose') {
			otherChoose[i].className='';
			break;
		}
	}
	ele.className='choose';
	makeTask();
}

//任务列表点击效果
function taskClick(ele){
	var otherChoose=ele.parentNode.parentNode.parentNode.parentNode.parentNode.getElementsByTagName('*');
	for(var i=0;i<otherChoose.length;i++)	{
		if (otherChoose[i].className === 'choose') {
			otherChoose[i].className = '';
			break;
		}
	}
	ele.className='choose';
	makeDetails();
}

//筛选菜单点击效果
function statusClick(ele){
	var otherChoose=ele.parentNode.getElementsByTagName('*');
	for(var i=0; i< otherChoose.length; i++){
		if (otherChoose[i].className==='choose') {
			otherChoose[i].className = '';
			break;
		}
	}
	ele.className = 'choose';
	var myEle;
	if (ele.innerHTML.indexOf('所有') !== -1) {
		myEle = $('.task-wrap').getElementsByTagName('li');
		for (var i = 0; i < myEle.length; i++) {
			myEle[i].style.display = 'block';
		}
	}
	else if (ele.innerHTML.indexOf('已完成') !== -1) {
		myEle=$('.task-wrap').getElementsByTagName('li');
		for (var i = 0; i < myEle.length; i++) {
			myEle[i].style.display='none';
		}
		for(var i=0;i < myEle.length; i++){
			if (myEle[i].className.indexOf('task-finish') !== -1) {
				myEle[i].style.display='block';
				myEle[i].parentNode.parentNode.style.display='block';
			}
		}	
	}
	else if (ele.innerHTML.indexOf('未完成')!==-1) {
		myEle = $('.task-wrap').getElementsByTagName('li');
		for (var i = 0; i < myEle.length; i++) {
			myEle[i].style.display='none';
		}
		for (var i = 0; i < myEle.length; i++) {
			if (myEle[i].className.indexOf('task-finish')===-1 && myEle[i].parentNode.className === 'item') {
				myEle[i].style.display='block';
				myEle[i].parentElement.parentElement.style.display = 'block';
			}
		}
	}
	var h6=document.getElementsByTagName('h6');
	for (var i = 0; i < h6.length; i++) {
		if (h6[i].parentNode.style.display !=='none') {
			h6[i].onclick();
			break;	
		}
	}
}

//新分类弹窗，编辑新分类
function newType(){
	$('.pop').style.display = 'block';
	$('.overlay').style.display='block';
	$('.pop-name').innerHTML='新增分类';
	var html = ''
		+ '<p>'
		+	'新分类名称'
		+	'<input type="text" class="myText typeText" placeholder="再次输入内容">'
		+ '</p>'
		+ '<p>'
		+	'新分类父节点：'
		+	'<select class="mySelect">'
		+		'<option value="-1">无</option>'

	var itemWrap = $('.item-wrap');
	var itemName = itemWrap.getElementsByTagName('h3');
	for (var i = 0; i < itemName.length; i++) {
		html +=''
		+		'<option value="'+ i +'">' + itemName[i].getElementsByTagName('span')[0].innerHTML + '</option>'	
	}

	html +=''
		+	'</select>'
		+ '<p>'
		+ '<p class="error"></p>'
		+ '<button class="myButton btn1" onclick="closePop()">取消</button>'
		+ '<button class="myButton btn2" onclick="typeAdd()">确定</button>'

	$('.pop-content').innerHTML = html;
}

//关闭弹窗
function closePop(){
	$('.pop').style.display = 'none';
	$('.overlay').style.display = 'none';
}

//添加新分类
function typeAdd(){
	var name = $('.typeText').value;
	var fatherName = $('.mySelect').value;
	if (name.length === 0) {
		$('.error').innerHTML = '分类名称不能为空';
		return;
	}
	else if (name.length >= 15){
		$('.error').innerHTML = '分类名称不能多于15字符';
		return;
	}
	else if (getObjByKey(cate,'name',name)) {
		$('.error').innerHTML='分类已存在';
		return;
	}
	else if (getObjByKey(cateText,'name',name)) {
		$('.error').innerHTML = '子分类已存在';
		return;
	}
	if (fatherName === '-1') {
		var newCate = {
			"id":cate[cate.length-1].id + 1,
			"name":name,
			"num":0,
			"child":[]
		};
		cate.push(newCate);
		save();
	}
	else {
		var newChild={
			"id":childCate[childCate.length - 1].id + 1,
			"name":name,
			"child":[],
			"father": cate[$('.mySelect').value].id
		};
		var father = getObjByKey(cate,'id',newChild.father)
		father.child.push(newChild.id);
		childCate.push(newChild);
		save();
	}
	makeType();
	closePop();
}

//保存数据
function save(){
	localStorage.childCate=JSON.stringify(childCate);
	localStorage.cate = JSON.stringify(cate);
	localStorage.task = JSON.stringify(task);
}

//进入编辑模式，编辑新任务
function newTask(){
	$('.task .add').onclick = ''; 

	document.getElementsByClassName('taskText')[0].value = '';
	document.getElementsByClassName('taskText')[1].value = '';
	$('.myTextArea').value='';
	$('.task-title span').style.display = 'none';
	$('.task-date span').style.display = 'none';
	$('.task-content span').style.display = 'none';
	$('.set').style.display = 'none';
	$('.taskError').style.display = 'inline';
	document.getElementsByClassName('taskText')[0].style.display='inline';
	document.getElementsByClassName('taskText')[1].style.display='inline';
	$('.myTextArea').style.display = 'inline';
	document.getElementsByClassName('btn3')[0].style.display='inline';
	document.getElementsByClassName('btn3')[1].style.display='inline';
}

//退出编辑模式，放弃添加新任务
function cancelAdd(){
	$.click($('.task .add'),newTask);
	$('.task-title span').style.display = 'inline';
	$('.task-date span').style.display = 'inline';
	$('.task-content span').style.display = 'inline';
	$('.set').style.display = 'inline';
	$('.taskError').style.display ='none';
	document.getElementsByClassName('taskText')[0].style.display='none';
	document.getElementsByClassName('taskText')[1].style.display='none';
	$('.myTextArea').style.display = 'none';
	document.getElementsByClassName('btn3')[0].style.display = 'none';
	document.getElementsByClassName('btn3')[1].style.display = 'none';
	$('.taskError').innerHTML = '';
}

//添加新任务
function taskAdd(){
	var name = document.getElementsByClassName('taskText')[0].value;
	var date = document.getElementsByClassName('taskText')[1].value;
	var content = $('.myTextArea').value;
	var dateSplit = date.split('-');

	if (name.length === 0) {
		$('.taskError').innerHTML= '任务标题不能为空';
		return;
	}
	else if (date.length === 0) {
		$('.taskError').innerHTML = '任务日期不能为空';
		return;
	}
	else if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
		$('.taskError').innerHTML = '任务日期格式错误';
		return;
	}
	else if (dateSplit[1]<1 || dateSplit[1] >12 || dateSplit[2] <1|| dateSplit[2] >31) {
		$('.taskError').innerHTML = '不要骗我，根本没有这一天';
		return;
	}
	else if (getObjByKey(task,'name',name)) {
		$('.taskError').innerHTML = '检测到相同名称的任务已存在';
		return;
	}

	var father;
	var typeChoose = $('.type-wrap .choose');
	var eleTag = typeChoose.tagName.toLowerCase();
	switch (eleTag){
		case 'h2':
			father = 0;
			break;
		case 'h3':
			var typeName = typeChoose.getElementsByTagName('span')[0].innerHTML;
			var typeObj = getObjByKey(cate,'name',typeName);
			if (typeObj.child.length > 0) {
				father = typeObj.child[0];
			}
			else{
				father = 0;
			}
			break;
		case 'h4':
			var childName = typeChoose.getElementsByTagName('span')[0].innerHTML;
			father = getObjByKey(childCate,'name',childName).id;
			break;
	}
	var newTask = {
		"id":task[task.length - 1].id +1,
		"name":name,
		"father":father,
		"finish":false,
		"date":date,
		"content":content
	};
	task.push(newTask);
	var fatherObj = getObjByKey(childCate,'id',newTask.father);
	fatherObj.child.push(newTask.id);

	save();
	makeType();
	var h6 =document.getElementsByTagName('h6');
	for (var i = 0; i < h6.length; i++) {
		var span = h6[i].getElementsByTagName('span')[0];
		if (span.innerHTML === name) {
			span.click();
			break;
		}
	}
	cancelAdd();
}

function del(e,ele){
	window.event ? window.event.cancelBubble = true : e.stopPropagation();
	//if window.event为真  执行window.event.cancelBubble=true 否则执行事件
	
	var con = confirm("删除操作不可逆，确定要删除吗？");
	if (!con) {
		return;
	}

	var ele = ele.parentNode;
	var tag = ele.tagName.toLowerCase();
	var index;
	var name = ele.getElementsByTagName('span')[0].innerHTML;
	switch(tag){
		case 'h3':
			index=getIndexByKey(cate,'name',name);

			for (var i = 0; i < cate[index].child.length; i++) {
				var childIndex = getIndexByKey(childCate,'id',cate[index].child[i]);
				for (var j = 0; j < childCate[childIndex].child.length; j++) {
					var taskIndex = getIndexByKey(task, 'id' ,childCate[childIndex].child[j])
					task.splice(taskIndex,1);
				}
				childCate.splice(childIndex,1);
			}
			cate.splice(index,1);
			break;
		case 'h4':
			index = getIndexByKey(childCate,'name',name);

			for (var i = 0; i < childCate[index].child.length; i++) {
				var taskIndex = getIndexByKey(task,'id',childCate[index].child[i])
				task.splice(taskIndex,1);
			}
			var fatherObj = getObjByKey(cate,'id',childCate[index].father);
			fatherObj.child.splice(fatherObj.child.indexOf(childCate[index].id),1);
			childCate.splice(index,1);
			break;
		case 'h6':
			index = getIndexByKey(task,'name',name);

			var fatherObj = getObjByKey(childCate, 'id',task[index].father);
			fatherObj.child.splice(fatherObj.child.indexOf(task[index].id),1);
			task.splice(index,1);
			break;
	}
	save();
	makeType();
}

//设置任务为已完成状态
function finishTask(){
	var taskName = $('.task-title span').innerHTML;
	var taskObj = getObjByKey(task,'name',taskName);
	if (taskObj.finish) {
		alert('任务已经完成了哦！');
		return;
	}
	var con = confirm("确定要设置任务为已完成状态吗？");
	if (!con) {
		return;
	}
	taskObj.finish = true;
	makeTask();
}

//修改已有的任务
function editTask(){
	$('.task .add').onclick = '';
	$.click(document.getElementsByClassName('btn3')[1],taskChange);

	document.getElementsByClassName('taskText')[0].value = '';
	document.getElementsByClassName('taskText')[1].value ='';
	$('.myTextArea').value = '';
	$('.task-date span').style.display = 'none';
	$('.task-content span').style.display = 'none';
	$('.set').style.display = 'none';
	$('.taskError').style.display = 'inline';
	document.getElementsByClassName('taskText')[1].style.display = 'inline';
	$('.myTextArea').style.display = 'inline';
	document.getElementsByClassName('btn3')[0].style.display = 'inline';
	document.getElementsByClassName('btn3')[1].style.display = 'inline';
	document.getElementsByClassName('taskText')[1].value = $('.task-date span').innerHTML;
	$('.myTextArea').value =$('.task-content span').innerHTML;
}

//保存修改
function taskChange(){
	var name= $('.task-title span').innerHTML;
	var taskObj = getObjByKey(task,'name',name);
	var date =document.getElementsByClassName('taskText')[1].value;
	var content = $('.myTextArea').value;
	var dateSplit = date.split('-');

	if (date.length === 0) {
		$('.taskError').innerHTML = '任务日期不能为空';
		return;
	}
	else if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) {
		$('.taskError').innerHTML = '任务日期格式错误';
		return;
	}
	else if (dateSplit[1] < 1 || dateSplit[1] > 12 || dateSplit[2] < 1 || dateSplit[2] >31) {
		$('.taskError').innerHTML = '不要骗我，根本没有这一天';
		return;
	}

	taskObj.date = date;
	taskObj.content = content;
	save();

	makeType();
	var h6 = document.getElementsByTagName('h6');
	for (var i = 0; i < h6.length; i++) {
		var span = h6[i].getElementsByTagName('span')[0];
		if (span.innerHTML ===name) {
			span.click();
			break;
		}
	}
	cancelAdd();
}
window.onload=function(){
	if (!localStorage.getItem('cate')) {
		localStorage.cate=cateText;
		localStorage.childCate=childCateText;
		localStorage.task=taskText;
		$('#type-all').className='choose';
	}
	cate=JSON.parse(localStorage.cate);
	childCate=JSON.parse(localStorage.childCate);
	task=JSON.parse(localStorage.task);
	makeType();
}
window.onunload=function(){
    localStorage.clear();
}