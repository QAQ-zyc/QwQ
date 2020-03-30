"use strict";
function removeDuplicatedItem(t){
    for(var e = 0; e < t.length-1; e++)
        for(var n = e+1; n < t.length; n++)
            t[e] == t[n] && (t.splice(n,1), n--);
    return t;
}
function fillBlanks(){
    var t = [],e = [],n = [];
    $(".blank-input").each(function(t,n){
        var o=$(n).parent().parent().parent().parent().parent().parent().parent().attr("id");
        o=o.replace("question",""),e.push(o);
    }),e=removeDuplicatedItem(e),$(e).each(function(t,e){
        $.ajax({async:!1,type:"get",url:"https://api.ulearning.cn/questionAnswer/"+e,datatype:"json",success:function(t){
            n.push(t.correctAnswerList);
        }});
    }),console.log(n),$(n).each(function(e,n){
        1==n.length?t.push(n[0]):$(n).each(function(e,n){
            t.push(n);
        });
    }),$(".blank-input").each(function(e,n){
        console.log(n),$(n).val(t.shift());
    });
}
function showAnswer(){
    var t=[],e=[];
    $(".question-wrapper").each(function(e,n){
        var o=$(n).attr("id");
        t.push(o.replace("question",""));
    }),$(t).each(function(t,n){
        $.ajax({async:!1,type:"get",url:"https://api.ulearning.cn/questionAnswer/"+n,datatype:"json",success:function(t){
            e.push(t.correctAnswerList)
        }});
    });
    var n=[];$(e).each(function(t,e){
        n.push(e.join(","))
    }),$(".question-wrapper").find(".question-title-html").each(function(t,e){
        $(e).after('<span style="color:red;">答案：'+n.shift()+"</span>");
    });
}
function quickVideo(){
    var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:2;$("video").each(function(e,n){
        n.playbackRate=t,console.log("视频速率为 "+t+" x")
    });
}
function addSpeed5x(){
    var t=$(".mejs__speed-selector-input").last();
    t.val("5.00"),t.next().text("5.00x");
}
function addStickyBar(){
    $("body").prepend($('
                        <div style="width: 500px;height: 60px;position: fixed;right: 0;top: 0;z-index: 9999;border: #808080 solid 1px;border-radius:3px;">
                            <div style="height: 30px;width: 100%;">
                            <button style="height: 30px;padding: 0px;border: none;border-radius: 3px;color: #fff;background-color: #ff6699;text-align: center;line-height: 30px;outline: none;margin:0px 15px 10px 0px;" onclick="showAnswer()">显示答案</button>
                            <button style="height: 30px;padding: 0px;border: none;border-radius: 3px;color: #fff;background-color: #ff6699;text-align: center;line-height: 30px;outline: none;margin:0px 15px 10px 0px;" onclick="fillBlanks()">自动填空</button>
                            <input type="text" id="speed-input" value="2.0" placeholder="倍速" style="width: 50px;">
                            <button style="height: 30px;padding: 0px;border: none;border-radius: 3px;color: #fff;background-color: #ff6699;text-align: center;line-height: 30px;outline: none;margin:0px 15px 10px 0px;" onclick="handlerSpeedClick()">添加倍速</button>
                            <button style="height: 30px;padding: 0px;border: none;border-radius: 3px;color: #fff;background-color: #ff6699;text-align: center;line-height: 30px;outline: none;margin:0px 15px 10px 0px;" onclick="autoNextVideo()">自动换视频</button>
                            </div>
                            <p>Author:Mustard</p>
                        </div>'));
}
function handlerSpeedClick(){
    quickVideo($("speed-input").val());
}
function autoNextVideo(){
    var t=$("video"),e=t.size();
    e&&t.get(0).play(),t.each(function(n,o){
        console.log("绑定视频事件！",n),o.addEventListener("ended",function(o){
            console.log("播放完成了一个视频。"),nextVideo(n+1===e,t,n);
        });
    });
}
function nextVideo(t,e,n){
    t?(console.log("下一个！go",t),$(".next-page-btn").click(),setTimeout(function(){
        autoNextVideo();
    },2e3)):(console.log("此页面还有视频"),e.get(n+1).play());
}
addSpeed5x(),addStickyBar();
