
  $(function(){
    //伸缩式菜单
    $("#allsp").next().css("display","none");
    $("#allsp").mouseover(function(){
      if($(this).next().is(":hidden")){
        $(this).next().show(500);  //显示
       // $(this).next().fadeIn(3000);  //淡入
       $(this).next().slideDown(1000);  //向下滑入
        // $(this).css("background-image","url(images/title_hide.gif)")
      }else{
        // $(this).css("background-image","url(images/title_show.gif)")
      }
      $(this).next().toggle();  //是一个合成方法，相当于在show和hide之间进行切换
    })

    //自动完成插件
        datas=[
            "d-《斗破苍穹》",
            "z-《遮天》",
            "l-《灵域》",
            "d-《斗罗大陆》",
            "m-《莽荒纪》",
            "g-《鬼神工作室》",
            "z-《诸天剑帝》"
        ]
        $("#tags").autocomplete({
            source:datas
        });

        //功能模块
        //点击“加入书架”
        $("#products input").click(function () {
            var img1 = $(this).parent().siblings().eq(1).html(); //找到图片
            var name = $(this).parent().siblings().eq(2).html();//找到书名
            var price = $(this).parent().siblings().eq(3).html();//找到价格
            var flag = false;//默认为false（定义一个开关）
            //找到goods里面的tr
            //进行书架里面的小说进行判断，如果里面没有小说则添加小说。
            if ($("#goods tr").length == 0) {
                //找到goods里面的tr
                var newtr = $('<tr><td><input type="checkbox"/></td><td class="togyi" >' + img1 + '</td><td class="togyi" study="margin-top:100px;">' + name + '</td><td class="togyi">' + price + '</td><td>已完结</td><td><input type="button" name="del" value="删除"/>&nbsp/&nbsp<input type="button" name="select" value="查看"/></td></tr>');
                //把新建的行追加到添加小说里面。
                $("#goods").append(newtr);
                return;
            }
            //如果里面有小说则对里面的小说进行判重。
            else {
                //循环里面的每一个小说
                $("#goods tr").each(function () {
                    //找到小说的名称与上面获取到的小说名称进行对比
                    if ($(this).children().eq(2).html() == name) {
                        //找到点击次数
                        //对小说的数量进行重新复制
                        $(this).children().eq(4).html("已完结");
                        alert("此小说已加入书架");
                        //开关为true
                        flag = true;
                        //跳出循环
                        return false;
                    }
                    else {
                        //如果没有循环到位默认值.
                        flag = false;
                    }
                });
            }
            //如果为默认值也就是说里面没有此小说，所以添加此小说。
            if (flag == false) {
                var newtr = $('<tr><td><input type="checkbox"/></td><td class="togyi">' + img1 + '</td><td class="togyi" study="margin-top:100px;">' + name + '</td><td class="togyi">' + price + '</td><td>已完结</td><td><input type="button" name="del" value="删除"/>&nbsp/&nbsp<input type="button" name="select" value="查看"/></td></tr>');
                $("#goods").append(newtr);
            }
        });

        //添加进去的按钮没有类似的点击事件，要进行手动添加点击事件。
        $("#goods ").on("click", "input[name=del]", function () {
            //找到当前对象的父级的父级进行移除
            $(this).parent().parent().remove();
        });

        //查看操作
        $("#goods ").on("click", "input[name=select]", function () {
            $(".popDiv").css("display","block");
            var img1 = $(this).parent().siblings().eq(1).html(); //找到图片
            var name = $(this).parent().siblings().eq(2).html();//找到书名
            var price = $(this).parent().siblings().eq(3).html();
            var rate = $(this).parent().siblings().eq(4).html();
            $("<b><font>封面：</font>"+img1+"</b>").appendTo("p:eq(0)");
            $("<b><font>书名：</font>"+name+"</b>").appendTo("p:eq(1)");
            $("<b><font>进度：</font>"+rate+"</b>").appendTo("p:eq(2)");
            $("<b><font>价格：</font>"+price+"</b>").appendTo("p:eq(3)");
             //取消<b></b>标签的字体加粗样式
            $("span b").css("font-weight","normal")
            // console.log(bName);
            //遮罩层的定义
            var hei = $(document).height();
            var wid = $(document).width();
            $("#hidebg").css("width",wid);
            $("#hidebg").css("height",hei);
        });
        //关闭查看时，清除内容并去除遮罩层
        $(".close").bind("click",function(){
           $(".ppppp").html("");
           $(".popDiv").css("display","none");
           //去除遮罩层
           $("#hidebg").css("width",0);
           $("#hidebg").css("height",0);
        })

        //事件冒泡
        $(".conversion").bind("mouseover",function(event){
            $(this).addClass("redBorder");
            event.stopPropagation(); //阻止事件冒泡
        }).bind("mouseout",function(){
            $(this).removeClass("redBorder");
        })

        //图片提示效果
        $("conversion tr").mouseover(function(event){
            //event对象代表事件的状态，比如事件在其中发生的元素、键盘按键状态、鼠标状态、鼠标位置等等
            this.myTitle=this.title;
            // this.title="";
            this.title="";
            var tooltip="<div id='tooltip'>"+this.myTitle+"</div>";
            $("body").append(tooltip);
            $("#tooltip").css({
                "position":"absolute",
                "top":(event.pageY+10)+"px",
                "left":(event.pageX+10)+"px"    
            })
        }).mouseout(function(){
            $("#tooltip").remove();
            this.title=this.myTitle;  //将myTitle值赋给title，以方便下次鼠标滑入时可以获取到title属性值
        })

        //导航菜单效果
        $("ul .fj").each(function(index){
            //each实现对选择元素的循环操作，index是每个执行循环元素的索引值
                $(this).mouseover(function(){
                    var obj=$(this).offset();  //offset方法可以获取元素相对页面的位置
                    console.log("横轴："+obj.left);
                    console.log("纵轴："+obj.top);
                    var objx=obj.left*50%+"px";
                    // var objy=-50+"px";
                    // $(this).css({"width":190,"background":"blue","border-right":"none"})
                    $("ul .zj:eq("+index+")").show().css({"left":objx,"top":-120+"px","width":720+"px"});
                }).mouseout(function(){
                    $("ul .zj").hide();
                    // $(this).css({"width":188,"background":"#FFFDD2","border-right":"1px solid #E5D1A1"})
                })
        })
        $(".zj").each(function(index){
            $(this).mouseover(function(){
                $(this).show();
            }).mouseout(function(){
                $(this).hide();
            })
        })
  })

    //侧边栏效果
    var timer03=null;
    function startMove1(iTarget){
            //开始定时器之前先关闭定时器
            clearInterval(timer03);
            timer03=setInterval(function(){
                //速度为缓冲运动，且向上或向下取整
                var iSpeed=(iTarget-$("#div012")[0].offsetTop)/8;
                iSpeed=iSpeed>0?Math.ceil(iSpeed):Math.floor(iSpeed);
                if (iTarget==$("#div012")[0].offsetTop) {
                    clearInterval(timer03);
                }else{
                        $("#div012")[0].style.top=$("#div012")[0].offsetTop+iSpeed+"px";
                }
            },30)
        }
    window.onscroll=function(){
            //获取页面滚动的距离
            var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
            //获取(浏览器可视区的高度-物体的高度)/2
            var clientHeight=document.documentElement.clientHeight;
            //当前位置
            var t=scrollTop+(clientHeight-$("#div012")[0].offsetHeight)/2;
            t=parseInt(t);  //取整
            startMove1(t);
    }
    var timer=null;
    function startMove(iSpeed,iTarget){
        clearInterval(timer);
        timer=setInterval(function(){
            //var iSpeed=10;
            if( $("#div012")[0].offsetLeft==iTarget){
                clearInterval(timer);
            }else{
                $("#div012")[0].style.left=$("#div012")[0].offsetLeft+iSpeed+"px";
            }
        },30)
    }
    window.onload=function(){
        $("#div012")[0].onmouseover=function(){
            startMove(10,0);
        }
         $("#div012")[0].onmouseout=function(){
            startMove(-10,-80);
        }
    }