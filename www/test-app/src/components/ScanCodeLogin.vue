<script lang="ts" setup>
import {
  reactive,
  computed,
  onBeforeMount,
  onMounted,
  onBeforeUnmount,
} from 'vue';

const state = reactive<{
  qrcode_id: string;
  img: string;
  qrcode_info?: QrCodeInfo;
  timeId?: string;
}>({
  qrcode_id: '',
  img: '',
});

async function checkQRCodeStatus() {
  await fetch(`http://localhost:3000/auth/qrcode/check?id=${state.qrcode_id}`)
    .then((res) => res.json())
    .then((res: { data: QrCodeInfo }) => (state.qrcode_info = res.data));
}

async function generateQRCode() {
  await fetch('http://localhost:3000/auth/qrcode/generate')
    .then((res) => res.json())
    .then((res: { data: { img: string; qrcode_id: string } }) => {
      state.qrcode_id = res.data.qrcode_id;
      state.img = res.data.img;
    });
}

onMounted(async () => {
  await generateQRCode();
  setInterval(checkQRCodeStatus, 1000);
});

onBeforeUnmount(() => {
  state.timeId && clearInterval(state.timeId);
});

const statusTitle = computed(() => {
  return (
    {
      noscan: '未扫码',
      'scan-wait-confirm': '已扫码，待确认',
      'scan-confirm': '已确认',
      'scan-cancel': '已取消',
      expired: '已过期',
    }[state.qrcode_info?.status] || '未扫码'
  );
});
</script>

<template>
  <div>
    <img :src="state.img" alt="" />
    <div>二维码状态：{{ statusTitle }}</div>
  </div>
</template>

<style lang="" scoped></style>
