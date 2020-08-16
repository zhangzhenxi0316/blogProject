# blogProject
## 需求分析
墨刀原型
https://modao.cc/app/88c5cb32c4794dbbdd344a1d4c4e7978144c8541?simulator_type=outside_artboard&sticky
### 前台部分
1.主页可以显示文章的片段，点击阅读全文跳转到详情页。
2.主页是响应式布局，当宽度大于750px的时候显示左侧导航栏，小于的时候隐藏
3.各个导航栏分配到各个页面，分类页面展示不同分类下的文章及其标题和链接，标签同样，时间线是按照时间排序的，点击github可以跳转到仓库，
4.搜索可以搜索到符合的文章标题
5.分享按钮可以弹出当前网址
### 后台 
1.文章列表 提供删除和修改的操作
2.写文章   提供书写blog的功能

### 后端
使用数据库

文章表
文章ID（key） 文章Title 文章Date 文章Categories（foreign key） 文章Tags（foreign key） 文章content 描述description

分类表
文章分类Categories（key） 文章id （foreign key）

标签表
标签Tags（key） 文章id（foreign key）

用户表
username password

node作为后端express作为框架，连接mysql，使用在云服务器中ubuntu中安装mysql进行数据操作，后端根据请求返回所需要的信息，
