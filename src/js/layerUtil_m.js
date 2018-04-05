var layerUtil = {
    info: function (msg) {
        layer.open({
            content: msg,
            skin: 'msg',
            anim: false,
            time: 3
        });
    },
    infoTop: function (msg, x) {
        layer.open({
            content: msg,
            skin: 'msg',
            anim: false,
            time: 3,
            fixed: false,
            top: 100
        });
    },
    load: function () {
        return layer.open({
            shadeClose: false,
            shade: 'background-color: rgba(0,0,0,0.3)',
            type: 2
        });
    }
}