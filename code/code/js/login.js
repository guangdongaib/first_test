
    $(function(){
        //对话框插件
        $("#dialog-form").dialog({
            height:350,
            width:400,
            draggable:false,
            center:true,
            //对话框插件定位
            position: { using:function(pos){
            console.log(pos)
            var topOffset = $(this).css(pos).offset().top;
            if (topOffset = 0||topOffset>0) {
                $(this).css('top', 250);
            }
            }},
            // modal:true,  //以模式方式打开对话框,即页面背景变为灰色
            // autoOpen:false,  //不自动打开对话框
            buttons:{
                "登录":function(){
                        $("#submit").trigger('click');
                        $("#dialog-form").dialog("close");  //关闭对话框
                },
                "没有账号，去注册":function(){
                    window.location.href="register.html";
                },
                "返回":function(){
                    // $("#dialog-form").dialog("close");  //关闭对话框
                    window.location.href="index.html";
                }
            },
            close:function(){
                allFields.val(null).removeClass("ui-state-error");
                $(".validateTips").text("请输入要登录的账号和密码");
            }
        });
        //取消注册页面时返回index.html页面
        $(".ui-button-icon").click(function(){
            window.location.href="index.html";
        })

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

        //日历插件
        $("#datepicker").datepicker({
          inline: true
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