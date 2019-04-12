
  $(function(){
    //伸缩式菜单效果
    // $("#allsp").next().css("display","none");
    $("#allsp").mouseover(function(){
      if($(this).next().is(":hidden")){
        // $(this).css("background-image","url(images/title_hide.gif)")
         $(this).next().show(500);  //显示
       // $(this).next().fadeIn(3000);  //淡入
       $(this).next().slideDown(1000);  //向下滑入
      }else{
         // $(this).next().hide(500);  //隐藏
       // $(this).next().fadeOut(3000);  //淡出
       // $(this).next().slideUp(2000);  //向上滑出
        // $(this).css("background-image","url(images/title_show.gif)")
      }
      $(this).next().toggle();  //是一个合成方法，相当于在show和hide之间进行切换
    })

    //日历插件
    $("#datepicker").datepicker({
          inline: true //显示日历
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

    //图片提示效果
    $(".book-img img").mouseover(function(event){
        //event对象代表事件的状态，比如事件在其中发生的元素、键盘按键状态、鼠标状态、鼠标位置等等
        this.myTitle=this.title;
        // this.title="";
        this.title="";
        var tooltip="<div id='tooltip' style='background:white'>"+this.myTitle+"</div>";
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
    var timer1212=null;
    function startMove123(iSpeed,iTarget){
        clearInterval(timer1212);
        timer1212=setInterval(function(){
            //var iSpeed=10;
            if( $("#div012")[0].offsetLeft==iTarget){
                clearInterval(timer1212);
            }else{
                $("#div012")[0].style.left=$("#div012")[0].offsetLeft+iSpeed+"px";
            }
        },30)
    }

  // 轮播图效果
  function onload2(){
    //先获取父元素
    var num=0;//定义变量保存编号
    //鼠标移到小圆点上就显示对应的小圆点和图片
    for(var i=0;i<$("#control li").length;i++){
        $("#control li")[i].index=i;
        $("#control li")[i].onmouseover=function(){
             //1、鼠标移入的时候记录编号
            num=this.index;
            //2、显示对应的圆点和图片的函数
             //调用函数
             switchImg(num);
        };
    }
    //专门定义一个函数，显示圆点和图片
    function switchImg(n){
        for(var i=0;i<$("#control li").length;i++){
            $("#control li")[i].className="";
            $("#imgList li")[i].className="";
        }
        $("#control li")[n].className="on";
        $("#imgList li")[n].className="on";
    }
    //向左
    //如果一个函数的执行依赖于某个事件
    //那么把函数赋值给某个事件的时候，是不能加括号的
    $("#prev")[0].onclick=prevImg;
    //向左播放图片单独写成一个函数，方便重复调用
    function prevImg(){
        num=num-1;
        num=num<0?$("#control li").length-1:num;
        switchImg(num);
    }
    //向右
    $("#next")[0].onclick=nextImg;
    //向右播放图片单独写成一个函数，方便重复调用
    function nextImg(){
    num=num+1;
        num=num>$("#control li").length-1?0:num;
        switchImg(num);
    }
    //让图片自动播放，就要用到定时器
    //鼠标移到图片区域停止播放
    //鼠标离开图片区域继续自动播放
    var timer=null;
    timer=setInterval(nextImg,1000);//自动播放
    // 鼠标经过图片，图片停止自动播放
    //获取到图片区域
    $("#slideBox")[0].onmouseover=function(){
        //关闭定时器
        clearInterval(timer);
    };
    //鼠标离开图片，图片继续自动轮播
    $("#slideBox")[0].onmouseout=function(){
        //重新开启定时器
        //先关闭定时器
        clearInterval(timer);
        //再重新开启
        timer=setInterval(nextImg,1000);
    };
};

// 图片滚动效果
var g_bMoveLeft=true;
var g_oTimer=null;
var g_oTimerOut=null;
var g_iSpeed=3;
window.onload=function ()
{
  //执行轮播图效果
  onload2();
  //执行图片滚动效果
  var aLi=$("#roll ul")[0].getElementsByTagName('li');
  var i=0;
  var str=$("#roll ul")[0].innerHTML+$("#roll ul")[0].innerHTML;
  
  $("#roll ul")[0].innerHTML=str;
  
  $("#roll ul")[0].style.width=aLi[0].offsetWidth*aLi.length+'px';
  
  for(i=0;i<aLi.length;i++)
  {
    aLi[i].onmouseover=function ()
    {
      stopMove();
    };
    
    aLi[i].onmouseout=function ()
    {
      startMove(g_bMoveLeft);
    };
  }
  
  $("#roll a")[0].onmouseover=function ()
  {
    startMove(true);
  };
  
  $("#roll a")[1].onmouseover=function ()
  {
    startMove(false);
  };
  
  startMove(true);
}

function startMove(bLeft)
{
  g_bMoveLeft=bLeft;
  
  if(g_oTimer)
  {
    clearInterval(g_oTimer);
  }
  g_oTimer=setInterval(doMove, 30);
}

function stopMove()
{
  clearInterval(g_oTimer);
  g_oTimer=null;
}

function doMove()
{
  var aLi=$("#roll ul")[0].getElementsByTagName('li');
  
  var l=$("#roll ul")[0].offsetLeft;
  
  if(g_bMoveLeft)
  {
    l-=g_iSpeed;
    if(l<=-$("#roll ul")[0].offsetWidth/2)
    {
      l+=$("#roll ul")[0].offsetWidth/2;
    }
  }
  else
  {
    l+=g_iSpeed;
    if(l>=0)
    {
      l-=$("#roll ul")[0].offsetWidth/2;
    }
  }
  $("#roll ul")[0].style.left=l+'px';

  //执行侧边栏分享效果
  $("#div012")[0].onmouseover=function(){
     startMove123(10,0);
    }
  $("#div012")[0].onmouseout=function(){
     startMove123(-10,-80);
    }
}