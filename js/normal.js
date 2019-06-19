var myApi={
    tpl:function(template,obj){
            var tpl= template.replace(/\{#(\w+)#\}/g,function(match,key,index,source){
                return obj[key]
            })
        return tpl;
    },
    callbackKeysrt: function (key, desc) {
        return function (a, b) {
            return desc ? b[key]-a[key]   : a[key] - b[key];
        }
    },
    getArgs: function () {
        var search = window.location.search.slice(1);
        var obj = {};
        var arr = search.split('&');
        for (var i = 0; i < arr.length; i++) {
            var arrSon = arr[i].split('=');
            obj[arrSon[0]] = arrSon[1];
        }
        return obj;
    },
    loading($dom){
        var tpl='<div class="loadingbox">' +
            '<div class="loading">\n' +
            '        <span></span>\n' +
            '        <span></span>\n' +
            '        <span></span>\n' +
            '        <span></span>\n' +
            '        <span></span>\n' +
            '</div>' +
            '</div>'
        $dom.append(tpl);

    },
    stopLoading($dom){
        $dom.children('.loadingbox').remove();
    },
    //baseUrl: 'http://183.136.198.62:81/hjzz',
    baseUrl: 'http://192.168.71.122:8080/hjzz',
    ajax:function(setting){

        myApi.loading($('section'));
        $.ajax({
            url:myApi.baseUrl+setting.url,
            contentType:setting.contentType||'application/x-www-form-urlencoded; charset=UTF-8',
            type:setting.type||'GET',
            data:setting.data||'',
            async:setting.async===false?false:true,
            success:setting.success
        }).always(function(){
            myApi.stopLoading($('section'));
        })
    },
    getList:function(arr,Key){
        if(arr instanceof  Array){
            var List=[];
            arr.forEach(function(item){
                List.push(item[Key]||'')
            })
            return List;
        }else{
            return [];
        }

    }

}
Date.prototype.Format = function(fmt)
{
    var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
    };
    if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
    return fmt;
}
