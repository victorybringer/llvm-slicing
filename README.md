# Info
 基于nuptzyz/llvm-slicing,在此镜像基础上配置了Node.js模块，实现C语言程序在线切片<br>
 更多信息请查看 https://github.com/zhangyz/llvm-slicing<br>
# Install 
## 1.使用预构建的docker镜像<br>
 `docker run -it -p:8000:8000 victorybringer/slice`<br>
## 2.或使用Dockerfile进行构建<br>
 `docker build -t victorybringer/slice .`<br>
 `构建完成后`<br>
 `docker run -it -p:8000:8000 victorybringer/slice`<br>
# Run
 `在浏览器输入localhost:8000`<br>


