// code version: 202308071130

/* 这里的任何JavaScript将为所有用户在每次页面载入时加载。 */
/* 参见[[模板:ResourceLoader]]*/

// This console log line is used to track code versions, 
// and will execute despite later bugs

// mw.loader.load("//wiki.biligame.com"+mw.config.values.wgScriptPath+"/index.php?title="+"MediaWiki:StudentTemplate.js"+"&action=raw&ctype=text/javascript", "text/javascript");

/*
// This piece of code is faulty as the regular expression fails to locate script names, 
// and there are way too much redundancies
$('.resourceLoader').each(function() {
	var $x = $(this);
	var text = $.trim($x.text());
	
	if (!text) return;
	
	//加载模块
	if ($x.data('isModule') == true) 
		return mw.loader.load(text);	
	
	//自动补充MediaWiki命名空间
	var ns = text.match('^.*?:');
	if (!ns) text = 'MediaWiki:' + text;
	
	//加载CSS样式表
	var mime = ($x.data('mime') || "text/javascript").toLowerCase();
	if (mime == "text/css") {
		if (text.slice(-4).toLowerCase() !== '.css') text = text + '.css';
		//if ($x.data('debug') !== true) text = text + '&debug=false';
		return mw.loader.load("//wiki.biligame.com"+mw.config.values.wgScriptPath+"/index.php?title="+text+"&action=raw&ctype=text/css", "text/css");
	}
	
	console.log("importing scripts");
	//加载JS脚本
	if (ns && ns[0].toLowerCase() !== 'mediawiki:') {
		return console.log('ResourceLoader: 不允许加载MediaWiki以外的js脚本');
	}
	if (text.slice(-3).toLowerCase() !== '.js') {
		text = text + '.js';
		console.log("imported script: " + text);
	}
	//if ($x.data('debug') !== true) text = text + '&debug=false';
	return mw.loader.load("//wiki.biligame.com"+mw.config.values.wgScriptPath+"/index.php?title="+text+"&action=raw&ctype=text/javascript", "text/javascript");
});
*/

console.log("Running common.js");


var GlobalAronaAssistantExtraInfo;


// Altered version of loader, separated for clarity
$('.jsScriptLoader').each(function() {
	// Assumes the HTML elements has this format
	// <div class="jsScriptLoader">example.js</div>
	console.log("jsScriptLoad trigger");
	var $text = $(this);
	var name = $.trim($text.text());
	console.log(name);
	
	var pattern = /^|\.|\*|\?|:/;
	if (!name) return;
	//if (name.search(pattern) !== -1) return;

	console.log(name);

	return mw.loader.load("//wiki.biligame.com"+mw.config.values.wgScriptPath+"/index.php?title=MediaWiki:"+name+"&action=raw&ctype=text/javascript", "text/javascript");
})


$('.loader').each(function() {
	// Updated general loader for JS and CSS
	// Due to the simplicity of loading files, this loader assumes its usage is correct
	// Example usage: <div class="jsScriptLoader">example.js</div>
	var $text = $(this);
	var name = $.trim($text.text());

	if (!name) return;
	
	if (name.slice(-3) === "css"){
		return mw.loader.load("//wiki.biligame.com"+mw.config.values.wgScriptPath+"/index.php?title=MediaWiki:"+name+"&action=raw&ctype=text/css", "text/css");
	}
	else if (name.slice(-2) === "js") {
		return mw.loader.load("//wiki.biligame.com"+mw.config.values.wgScriptPath+"/index.php?title=MediaWiki:"+name+"&action=raw&ctype=text/javascript", "text/javascript");
	}
})



$(function() {

	//解决手机上按键选项hover效果不消失的问题
	 
	
	//筛选页面列表筛选
	$('.filter li').on('mouseenter touchstart',function(e) {
		$(this).children().addClass('hover');
	});
	
	$('.filter li').on('mouseleave touchend',function(e) {
		$(this).children().removeClass('hover');
	});
	
	$('.filter li').on('click',function(e) {
		$(this).siblings().children().removeClass('active');
		$(this).children().toggleClass('active');
		var item = new Array();
		$('.filter').find('.active').parent().each(function() {
			var data_type = $(this).parent().attr('data-type');
			item.push("[data-param" + data_type + "='" + $(this).attr("data-value") + "']");
		});
		
		if(item.length != 0) {
			$('#wiki_table tbody').children().hide(400);
			$('#wiki_table tbody').children(item.toString().replace(/,/g, '')).show(300);
			//$('#wiki_table tbody').children().not(item.toString().replace(/,/g, '')).hide(1000);
		} else {
			$('#wiki_table tbody').children().show(300);
		}
	});
});

$(function InitCardSelect() {
	var self = {};
	
	var selectOptions;			//所有筛选按钮
	var filters = {};			//当前筛选规则
	var filterKeys = [];		//所有筛选Key
	var showAll = true;			//不筛选，显示全部
	var tableRows;				//所有要被筛选的行
	var computedRows;			//筛选后的行
	var $sorter;				//当前进行排序的表头
	var sortDesent = false;		//反向排序
	
	function isNil(s) {
		return s === '' || s === undefined || s === null || s === false
	}
	
	//点击筛选按钮时
	function OnSelectOptionClick(e) {
		var $x = e.data;
		e.preventDefault();
		
		var label = '['+$.trim($x.text())+'] 筛选';
		console.time(label);
		
		//显示全部
		if ($x.FilterKey == 0) {
			for (i in selectOptions) {
				selectOptions[i].Select = false;
				selectOptions[i].removeClass('selected');
			}
			filters = {};
			showAll = true;
			
			//更新表格
			self.FilterRows();
			console.timeEnd(label);
			return;
		}
		showAll = false;
		
		var select = !$x.Select;
		$x.Select = select;
		
		//变更筛选状态
		var key = $x.FilterKey;
		filters[key] = filters[key] || {};
		
		var opt = $x.FilterOpt == "AND" ? "AND" : "OR";
		filters[key][opt] = filters[key][opt] || [];
		if (select) {
			filters[key][opt].push($x.FilterValue);
		} else {
			filters[key][opt] = filters[key][opt].filter(function(x) {
				return x !== $x.FilterValue;
			});
			if (filters[key][opt].length < 1) delete filters[key][opt];
		}
		
		
		select ? $x.addClass('selected') : $x.removeClass('selected');
		self.FilterRows();
		console.timeEnd(label);
		
	}
	
	
	function OnHeaderSortClick(e) {
		var $x = e.data;
		e.preventDefault();
		
		var label = '['+$.trim($x.text())+'] 排序';
		console.time(label);
		if ($sorter !== $x) {
			//第一次：新的排序
			$sorter = $x;
			sortDesent = false;
		} else if (!sortDesent) {
			//第二次：切换排序
			sortDesent = true;
		} else {
			//第三次：不进行排序
			$sorter = null;
		}
		
		self.SortRows();
		
		console.timeEnd(label);
	}

	//初始化
	self.Init = function () {
		selectOptions = $('.cardSelectOption').toArray().map(function(x) {
			var $x = $(x);
			
			var dataOption = $.trim($x.data('option'));
			var dataGroup = $.trim($x.data('group'));
			
			if (isNil(dataOption) || isNil(dataGroup)) return $x;
			var splt = dataOption.split('|');
			$x.FilterKey = dataGroup;
			$x.FilterValue = $.trim(splt[1]);
			$x.FilterOpt = $.trim($x.data('opt') || 'OR').toUpperCase();
			
			if (filterKeys.indexOf(dataGroup) < 0)
				filterKeys.push(dataGroup);
			
			$x.click($x, OnSelectOptionClick);
			
			return $x;
		});
		
		//$head = $('#CardSelectTabHeader');
		
		tableRows = $('#CardSelectTr>tbody>tr').toArray().map( function(x) {
			var $x = $(x);
			
			//if (x == $head[0]) continue;
			
			for (i in filterKeys) {
				var key = filterKeys[i];
				var val = $x.data('param'+key);
				if (val === undefined) continue;
				
				if (typeof val == 'number'){
					val = val.toString(10);
				}
				
				var splt = val.split(',');
				for (j in splt) {
					var s = $.trim(splt[j]);
					if (!isNil(s)) {
						$x.FilterData = $x.FilterData || {};
						$x.FilterData[key] = $x.FilterData[key] || [];
						$x.FilterData[key].push(s);
					}
				}
				
			}
			
			return $x;
		});
		
		//computedRows = tableRows.concat([]);
		
		$('#CardSelectTr>thead>tr>th').each(function(index, x) {
			var $x = $(x);
			$x.off('click').off('mousedown');
			
			if ($x.hasClass('headerSort')) {
				$x.Index = index;
				//$x.SortKey = $x.data('group');
				$x.click($x, OnHeaderSortClick);
			}
		});
		
	}
	
	//t1中包含t2中所有项
	function includeAll(t1, t2) {
		for (i in t2) {
			if (t1.indexOf(t2[i]) < 0) return false;
		}
		return true;
	}
	//t1中包含t2中的任一项
	function includeAny(t1, t2) {
		if (t2.length == 0) return true;
		for (i in t2) {
			if (t1.indexOf(t2[i]) > -1) return true;
		}
		return false;
	}
	
	
	//使用show/hide来显示表格行
	self.FilterRows = function() {
		if (showAll) {
			filters = {};
		}
		
		$('#CardSelectTr>tbody').hide();
		
		for (var idx in tableRows) {
			var $x = tableRows[idx];
			var data = $x.FilterData;
			var hide = false;
			
			for (key in filters) {
				hide = !data || !data[key];
				
				if (!hide && filters[key]['AND']) {
					hide = !includeAll(data[key],filters[key]['AND']);
				}
				if (!hide && filters[key]['OR']) {
					hide = !includeAny(data[key],filters[key]['OR']);
				}
				if (hide) break;
			}
			
			if (!hide != !$x.Hide) {
				$x.Hide = hide;
				hide ? $x.hide() : $x.show();
			}
		}
		
		
		$('#CardSelectTr .headerSort').removeClass('headerSortDown headerSortUp');
		$('#CardSelectTr>tbody').show();
		$sorter = null;
	}
	
	
	function grabSortData($tr, index) {
		$tr.SortData = $tr.SortData || [];
		if ($tr.SortData[index] !== undefined) return $tr.SortData[index];
		
		var td = $tr.children('td')[index];
		if (!td) {
			$tr.SortData[index] = -1;
			return -1;
		}
		
		var text = $.trim(td.textContent);
		$tr.SortData[index] = text;
		return text;
	}
	
	//对行排序，不显示的行会被移除
	self.SortRows = function() {
		
		//var residues = [];
		
		if (!$sorter) {
			computedRows = tableRows.filter(function($x) { return !$x.Hide; });
			$('#CardSelectTr .headerSort').removeClass('headerSortDown headerSortUp');
		}
		else if (!sortDesent) {
			var index = $sorter.Index;
			computedRows = tableRows.filter(function($x) { return !$x.Hide; });
			computedRows.sort(function compareFunction($x, $y) {
				var x = grabSortData($x, index);
				var y = grabSortData($y, index);
				var nx = + x;
				var ny = + y;
				
				return (isNaN(nx) || isNaN(ny)) 
						? isNaN(nx) && isNaN(ny) 
							? x < y ? -1 : 1
							: isNaN(nx) ? 1 : -1	//字符串排后
						: nx === ny
							? 0
							: nx < ny ? -1 : 1;		//数值小的排前
				//console.log (`${x} ~ ${y} => ${ret}`);
				//return ret;
			});
			$('#CardSelectTr .headerSort').removeClass('headerSortDown headerSortUp');
			$sorter.addClass('headerSortDown');
			
		}
		else {
			computedRows.reverse();
			$('#CardSelectTr .headerSort').removeClass('headerSortDown headerSortUp');
			$sorter.addClass('headerSortUp');
		}
		
		$('#CardSelectTr>tbody').hide()
			.prepend(computedRows)
			.show();
	}
	
	
	$('.cardSelectOption').off('click').off('mousedown');

	if ($('#CardSelectTabHeader').parent().is('tbody')){
		$('#CardSelectTr').prepend( $('<thead/>').append($('#CardSelectTabHeader')));
	}
	
	self.Init();
	
	return self;
});
