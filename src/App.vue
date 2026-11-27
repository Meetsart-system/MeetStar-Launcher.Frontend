<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { MiuixButton, MiuixSwitch } from 'miuix-vue'
import { loadApps, isDesktop, launchApp } from './api/bridge'
import type { LauncherApp } from './types'

const apps = ref<LauncherApp[]>([])
const desktop = isDesktop()
const darkMode = ref(false)

onMounted(async () => {
  apps.value = await loadApps()
})
</script>

<template>
  <main class="launcher">
    <header class="header">
      <h1>MeetStar Launcher</h1>
      <MiuixSwitch v-model="darkMode" />
    </header>
    <p v-if="!desktop" class="hint">浏览器预览模式：宿主功能不可用</p>
    <ul class="app-grid">
      <li v-for="app in apps" :key="app.name">
        <MiuixButton type="primary" @click="launchApp(app.name)">
          {{ app.name }}
        </MiuixButton>
      </li>
    </ul>
    <p v-if="apps.length === 0" class="empty">暂无应用，请在宿主配置中添加</p>
  </main>
</template>

<style scoped>
.launcher {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.hint {
  font-size: 13px;
  opacity: 0.7;
  margin-bottom: 16px;
}

.app-grid {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
}

.empty {
  margin-top: 24px;
  opacity: 0.5;
}
</style>
