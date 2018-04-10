var layerUtil = {
    info: function (msg) {
        layer.msg(msg,
            {
                offset: 't',
                area: ['100%', '1.1rem'],
            });
    },
    load: function(){
        return layer.load(1, {
            shade: [0.1, '#000'] //0.1透明度的白色背景
        });
    }
}