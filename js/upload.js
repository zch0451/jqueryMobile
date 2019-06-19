//     template:'',//模板
//     $previewBox:null,//预览的容器jquery对象
//     $toggle:null,//促发上传的按钮jquery对象
//     $input:null,//保存返回数据的信息的文本框jquery对象
//     fileElementId:'',//file input id
//     removeSelect:'',//删除按钮的选择器
//     url:'',//上传图片的接口
//     data:{},//要上传的额外参数
//     resMap:{},//保存返回数据的map key(newName) value(file信息)
//     previewMsg:{},//初始化图片预览 格式与resMap相同
//     success:null,//上传图片成功回调方法
//     _setting:{
//         secureuri:false,//是否需要安全协议，一般设置为false
//         dataType:"JSON",//返回值类型
//         error:function(data,status,e){//失败方法
//             throw  new Error(JSON.parse(data.responseText).error);
//         }
//     },
function UploadApi(setting){
    this.resMap={};
    this.template='  <div class="upload-item upload" >\n' +
        '                        <div class="img-close" data-id="{#newName#}"></div>\n' +
        '                        <img src="{#newPath#}" alt="">\n' +
        '                    </div>'
    this.$previewBox=setting.$previewBox;
    this.removeSelect=setting.removeSelect;
    this.url=setting.url||'';
    this.fileElementId=setting.fileElementId;
    this.$input=setting.$input;
    this.success=setting.success;
    this.bindEvent();
}
UploadApi.prototype={
    preview:function(file){
        var tpl= this.template.replace(/\{#(\w+)#\}/g,function(match,key,index,source){
            return file[key]
        })
        this.$previewBox.append(tpl);

    },
    deleteFun:function(id){
        delete this.resMap[id]
        this.$inputValueChange();
    },
    update:function(){
        var me=this;
        var inputValue=Object.values(this.resMap);
        inputValue.forEach(function(item){
            me.preview(item);
        })
        this.$inputValueChange(inputValue)
    },
    bindEvent:function(){
        var me=this;
        this.$previewBox.on('click',this.removeSelect,function(){
            me.deleteFun($(this).data('id'));
            me.$previewBox.html('<div tabindex="0" class="upload-item">\n' +
                '                            <i class="add"></i>\n' +
                '                            <input type="file" name="file" class="upload-input" id="upload-input" accept="image/*">\n' +
                '                        </div>');
            me.bindEvent();
            me.update();
        })
            $('#'+me.fileElementId).unbind('change').change(function(){
                myApi.loading($('section'));
                var $parent=$(this).parent();
                $(this).wrap('<form id="upload" enctype="multipart/form-data" method="POST" action="'+me.url+'"></form>');
                $('#upload').ajaxSubmit({
                    method:'post',
                    uploadProgress:function(event, position, total, percentComplete){

                    },
                    success:function(data){
                        myApi.stopLoading($('section'));
                        me.resMap[data.basefile.newName]=data.basefile;
                        me.$inputValueChange(myApi.getList(Object.values(me.resMap),'newPath').join(','));
                        me.preview(data.basefile);
                        $parent.html(' <i class="add"></i>\n' +
                            '                        <input type="file" name="file" class="upload-input" id="upload-input" accept="image/*">');
                        me.bindEvent();
                    },
                    error:function(e){
                        console.log(e)
                    }
                });
            })


    },
    $inputValueChange:function(inputValue){
        if(!this.$input)
            return;
        this.$input.val(inputValue);
    }
}
