## 前言
我前面文章讲过[数据大屏][1],里面的数据时时更新。还有时时更新的股票数据，Facebook/Twitter 更新、估价更新、新的博文、赛事结果等等，都需要数据时时更新。之前我们一般都是请求服务器，看看有没有可以更新的数据。html5提供了Server-Sent Events方法，通过服务器发送事件，更新能够自动到达。

## Server-Sent Events使用

Server-Sent Events使用很简单，通过EventSource 对象来接受服务器端消息。有如下事件：

> onopen	当通往服务器的连接被打开
> 
> onmessage	当接收到消息
> 
> onerror	当发生错误

<!--more-->


### 检测 Server-Sent 事件支持

    if(typeof(EventSource)!=="undefined")
    {
      // 浏览器支持 Server-Sent
      // 一些代码.....
    }
    else
    {
    // 浏览器不支持 Server-Sent..
    }

###接收 Server-Sent 事件通知

    var source=new EventSource("haorooms_sse.php");
    source.onmessage=function(event)
    {
        document.getElementById("result").innerHTML+=event.data + "<br>";
    };

### 服务器端代码实例

    <?php 
    header('Content-Type: text/event-stream'); 
    header('Cache-Control: no-cache'); 
    
    $time = date('r'); 
    echo "data: The server time is: {$time}\n\n"; 
    flush(); 
    ?>

### 链接事件和报错事件都加上

    if(typeof(EventSource)!=="undefined")
    {
    	var source=new EventSource("server.php");
    	source.onopen=function()
    	{
    		 console.log("Connection to server opened.");
    	};
    	source.onmessage=function(event)
    	{
    
    		document.getElementById("result").innerHTML+=event.data + "<br>";
    	};
    	source.onerror=function()
    	{
    		console.log("EventSource failed.");
    	};
    }
    else
    {
    	document.getElementById("result").innerHTML="抱歉，你的浏览器不支持 server-sent 事件...";
    }

我们会发现，控制台打印如下：

![enter image description here][2]

不停的进入链接、和错误，[详情请点击][3]

那是因为php代码只是简单的echo，并没有连续输出，我们把上面php代码做如下改进

    <?php 
    header('Content-Type: text/event-stream'); 
    header('Cache-Control: no-cache'); 
    
    $time = date('r'); 
    
      $i = 0;
      $c = $i + 100;
      while (++$i < $c) {
        echo "id: " . $i . "\n";
        echo "data: " . $time. ";\n\n";
        ob_flush();
        flush();
        sleep(1);
      }
    ?>

就不会出现不停错误了！

## IE浏览器兼容解决方案

我们知道，IE浏览器并不支持EventSource，有如下解决方案：

引入

    eventsource.min.js

就可以完美解决。可以查看其github地址：https://github.com/Yaffle/EventSource
结合nodejs使用也很方便，直接

    npm install event-source-polyfill

就可以了。


  [1]: http://www.haorooms.com/post/makebigdata_zj
  [2]: http://www.haorooms.com/uploads/images/errortips.png
  [3]: http://resource.haorooms.com/uploads/demo/other/serversent/