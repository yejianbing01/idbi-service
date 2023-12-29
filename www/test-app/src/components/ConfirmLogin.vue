<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';

const route = useRoute();
const id = route.query.id as string;

onMounted(() => {
  document.title = '扫码登录';
  if (!id) return alert('无效的二维码');
  scan();
});

const scan = async function () {
  await fetch(`http://localhost:3000/auth/qrcode/scan?id=${id}`).catch((e) =>
    alert('二维码已过期'),
  );
};

const confirm = async function () {
  await fetch(`http://localhost:3000/auth/qrcode/confirm?id=${id}`).catch((e) =>
    alert('二维码已过期'),
  );
};

const cancel = async function () {
  await fetch(`http://localhost:3000/auth/qrcode/cancel?id=${id}`).catch((e) =>
    alert('二维码已过期'),
  );
};
</script>

<template>
  <header>
    <title>确认登录</title>
  </header>
  <div>
    <button @click="confirm">确认登录</button>
    <button @click="cancel">取消</button>
  </div>
</template>

<style lang="" scoped></style>
