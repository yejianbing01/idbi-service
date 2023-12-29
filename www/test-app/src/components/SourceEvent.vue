<script lang="ts" setup>
import { onMounted, reactive } from 'vue';

const state = reactive({ msg: '', content: '' });
onMounted(() => {
  const eventSource = new EventSource(
    'http://localhost:3000/event-source/stream',
  );
  eventSource.onmessage = (e: MessageEvent<string>) => {
    const data: { data: { msg: string } } = JSON.parse(e.data);
    state.msg += data.data.msg + ' ';
  };

  const eventSource3 = new EventSource(
    'http://localhost:3000/event-source/stream3',
  );
  // 解析 Buffer
  eventSource3.onmessage = (e: MessageEvent<string>) => {
    const { data } = JSON.parse(e.data);
    const uint8Array = new Uint8Array(data.msg.data);
    // 可能需要根据实际情况选择适当的编码格式
    // 这里假设是将二进制数据转换为 UTF-8 编码的字符串
    const decodedString = new TextDecoder('utf-8').decode(uint8Array);
    state.content = decodedString;
  };
});
</script>

<template>
  <div>
    <h2>SourceEvent 服务端消息推送</h2>
    <p>{{ state.msg }}</p>
    <!-- <pre style="white-space: pre">{{ state.content }}</pre> -->
  </div>
</template>
