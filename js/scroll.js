function initScroll(upCallback){
    var miniRefresh = new MiniRefresh({
        isScrollBar:false,
        container: '#minirefresh',
        down: {
            callback: function () {
                // 下拉事件
                miniRefresh.endDownLoading();
            }
        },
        up: {

            callback:function () {
                // 上拉事件
                console.log('up');
                if (upCallback)
                upCallback.bind(this)(miniRefresh)
                else
                    miniRefresh.endUpLoading(true);
            }
        }
    });
    return miniRefresh;
}
