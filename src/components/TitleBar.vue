<script setup lang="ts">
import { ref } from 'vue'
import { isDesktop, minimizeWindow, toggleMaximizeWindow, closeWindow } from '../api/bridge'

const maximized = ref(false)

async function onToggleMaximize() {
  maximized.value = (await toggleMaximizeWindow()) === 'maximized'
}
</script>

<template>
  <header class="titlebar">
    <span class="title">MeetStar Launcher</span>
    <div v-if="isDesktop()" class="controls">
      <button class="wc" title="最小化" @click="minimizeWindow()">
        <svg width="12" height="12" viewBox="0 0 12 12">
          <path d="M1 6h10" stroke="currentColor" stroke-width="1.2" />
        </svg>
      </button>
      <button class="wc" :title="maximized ? '还原' : '最大化'" @click="onToggleMaximize">
        <svg v-if="!maximized" width="12" height="12" viewBox="0 0 12 12">
          <rect x="1.5" y="1.5" width="9" height="9" fill="none" stroke="currentColor" stroke-width="1.2" />
        </svg>
        <svg v-else width="12" height="12" viewBox="0 0 12 12">
          <rect x="1.5" y="3.5" width="7" height="7" fill="none" stroke="currentColor" stroke-width="1.2" />
          <path d="M3.5 3.5v-2h7v7h-2" fill="none" stroke="currentColor" stroke-width="1.2" />
        </svg>
      </button>
      <button class="wc close" title="关闭" @click="closeWindow()">
        <svg width="12" height="12" viewBox="0 0 12 12">
          <path d="M1.5 1.5l9 9M10.5 1.5l-9 9" stroke="currentColor" stroke-width="1.2" />
        </svg>
      </button>
    </div>
  </header>
</template>

<style scoped>
/* app-region: drag 由 WebView2 非客户区支持映射为标题栏拖拽区域 */
.titlebar {
  app-region: drag;
  height: 40px;
  flex: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px 0 16px;
  user-select: none;
  background: #161920;
  border-bottom: 1px solid #2b2f3a;
}

.title {
  font-size: 13px;
  color: #e6e8ee;
}

.controls {
  app-region: no-drag;
  display: flex;
  gap: 2px;
}

.wc {
  width: 40px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  color: #a8b0bd;
  cursor: pointer;
  border-radius: 6px;
}

.wc:hover {
  background: #262b36;
  color: #e6e8ee;
}

.wc.close:hover {
  background: #e24b4a;
  color: #fff;
}
</style>
