<template>
  <div
    ref="container"
    style="
      width: 800px;
      height: 600px;
      border: 1px solid grey;
      text-align: left;
    "
  ></div>
</template>

<script>
import * as monaco from "monaco-editor"; // 包体很大了 但是demo可以跑起来

/**
 ** 得到浏览器每秒帧数fps
 **
 ** @Date Mar 13 2013
 **/
const showFPS = (function () {
  var requestAnimationFrame =
    window.requestAnimationFrame || //Chromium
    window.webkitRequestAnimationFrame || //Webkit
    window.mozRequestAnimationFrame || //Mozilla Geko
    window.oRequestAnimationFrame || //Opera Presto
    window.msRequestAnimationFrame || //IE Trident?
    function (callback) {
      // Fallback function
      window.setTimeout(callback, 1000 / 60);
    };
  var e, pe, pid, fps, last, offset, step, appendFps;

  fps = 0;
  last = Date.now();
  step = function () {
    offset = Date.now() - last;
    fps += 1;
    if (offset >= 1000) {
      last += offset;
      appendFps(fps);
      fps = 0;
    }
    requestAnimationFrame(step);
  };
  // 显示fps; 如果未指定元素id，默认<body>标签
  appendFps = function (fps) {
    if (!e) e = document.createElement("span");
    pe = pid
      ? document.getElementById(pid)
      : document.getElementsByTagName("body")[0];
    e.innerHTML = "<span style={color:red}>fps: " + fps + "</span>";
    pe.appendChild(e);
  };
  return {
    setParentElementId: function (id) {
      pid = id;
    },
    go: function () {
      step();
    },
  };
})();

export default {
  mounted() {
    showFPS.go(); // go!

    monaco.editor.create(this.$refs.container, {
      value: ["function x() {", '\tconsole.log("Hello world!");', "}"].join(
        "\n"
      ),
      language: "javascript",
      minimap: {
        enabled: false,
      },
      selectOnLineNumbers: true,
      roundedSelection: false,
      cursorStyle: "line", // 光标样式
      automaticLayout: false, // 自动布局
      glyphMargin: true, // 字形边缘
      useTabStops: false,
      fontSize: 16, // 字体大小
      autoIndent: false, //自动布局
    });
  },
};
</script>
