<template>
  <footer id="footer">
    <section class="copyright">
      <p> Copyright © 2017 Story.
        <br> Powered by vue2.x - elementUi - MongoDB
        <br>Bootstrap3.x - NodeJs - Express
        <br> 浙ICP备16027109号
        <br> 爱我你怕了吗 </p>
    </section>
  </footer>
</template>
<style lang="less">
  #footer {
    height: 160px;
    width: 100%;
    /*border-top: 1px solid rgb(238, 238, 238);*/
    color: rgba(255, 255, 255, 0.69);
    font-size: 12px;
    text-align: center;
    /*border-top: 2px dashed rgb(152, 183, 255);*/
    transition: height .1s 1s;
  }
  .copyright{
    position: relative;
    background: rgb(14, 14, 14);
    width: 100%;
    height: 100%;
    transform-origin: 100% 0;
    transition: all .5s;
    z-index: 2;
    p{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      line-height: 2;
    }
  }
</style>
