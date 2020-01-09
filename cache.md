#### 浏览器缓存
1. 根据是否向服务器发送http请求分为强缓存和协商缓存    
2. 根据缓存位置（针对强缓存）分为：Service Worker, Memory Cache, Disk Cache, Push Cache, 拿去缓存的
顺序Service Worker > memory cache > disk cache

#### 强缓存
1. expire    
> http1.0的标准，表示服务器的过期时间，缺点是客户端和服务端的时间有可能不一致

2. cache-control
> http1.1的标准。作为expire的补充，它使用相对时间。常用值：    
> max-age: 设置缓存的最大有效时间，单位秒。会覆盖掉expire    
> s-mageage: 设置代理服务器缓存的最大有效时间，单位秒，会覆盖max-age    
> public: 响应可以被任何对象缓存    
> no-cache: 表面意思是不缓存，实际上仍然对资源进行缓存，但每一次在使用缓存之前必须要向服务器进行缓存资源验证    
> no-store: 不会被缓存    

#### 强制缓存的几个位置    
1. memory Cache    
> 放在内存中的缓存：一般是页面刷新后，浏览器从内存中获取缓存。从内存读取缓存的速度比从硬盘快。当页面
关闭后，内存释放   
 
2. Disk Cache    
> 存在硬盘中的缓存：当页面重新打开，会从硬盘中读取缓存。和内存缓存最大的区别是，硬盘缓存不会在页面
关闭后被清楚

3. Push Cache 
> http2.0规范。推送缓存是属于session级别的缓存，用的的session失效，缓存就被释放。
