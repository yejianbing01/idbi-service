import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

import SourceEventVue from '../components/SourceEvent.vue';
import ConfirmLoginVue from '../components/ConfirmLogin.vue';
import ScanCodeLoginVue from '../components/ScanCodeLogin.vue';

const routes: RouteRecordRaw[] = [
  { path: '/source-event', component: SourceEventVue },
  { path: '/scan-code-login', component: ScanCodeLoginVue },
  { path: '/confirm-login', component: ConfirmLoginVue },
];

export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});
