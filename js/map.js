function MyMap(id,level){//东经，北纬，级别
    this.level=level;
    this.point=null;
    this.map=new BMap.Map("container");
    this.init();
}
MyMap.prototype={
    init:function(){
        this.getLocal();
        this.bindEvent()
    },
    getLocal:function(){
        var geolocation = new BMap.Geolocation();
        var me=this;
        geolocation.getCurrentPosition(function(r){
            if(this.getStatus()== BMAP_STATUS_SUCCESS){
                me.point=r.point;
                me.getName();
                me.map.centerAndZoom(me.point, me.level);
            }else{
                var point = new BMap.Point(120.126, 30.287);
                me.map.centerAndZoom(point, 15);
            }
        })
    },
    getName:function(){
        var myGeo = new BMap.Geocoder();
        myGeo.getLocation(new BMap.Point(this.point.lng, this.point.lat), function(result){
            if (result){
                console.log(result)
                $('#mainAddress').html(result.address).data('x',result.point.lng).data('y',result.point.lat);
                var arround='';

                result.surroundingPois.forEach(function(item,index){
                    var tpl='<div class="addressItem" data-x="'+item.point.lng+'" data-y="'+item.point.lat+'">\n' +
                    '        <div class="title">{#title#}</div>\n' +
                    '        <div class="address">{#address#}</div>\n' +
                    '    </div>'
                    if(index>2){
                        return false;
                    }
                    arround+=myApi.tpl(tpl,item);
                })
                document.getElementById('around').innerHTML=arround;
                $('#mapAddress').html(result.address);
                form.coordinateX=result.point.lng;
                form.coordinateY=result.point.lat;
            }
        });
    },
    bindEvent:function(){
        var me=this;
        this.map.addEventListener("dragend", function(){
            me.point=me.map.getCenter();
            me.getName();
        })
    }

}

