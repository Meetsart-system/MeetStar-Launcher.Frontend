import type { LauncherApp } from '../types'

/**
 * WebView2 宿主对象（C# LauncherBridge）的类型化封装。
 * 在浏览器中调试时 host 为 null，所有方法降级为空实现。
 */
interface LauncherHost {
  LoadAppsJson(): Promise<string>
  SaveAppsJson(json: string): Promise<void>
  LaunchApp(name: string): Promise<void>
}

function getHost(): LauncherHost | null {
  const w = window as unknown as {
    chrome?: { webview?: { hostObjects?: { launcher?: LauncherHost } } }
  }
  return w.chrome?.webview?.hostObjects?.launcher ?? null
}

export const isDesktop = () => getHost() !== null

export async function loadApps(): Promise<LauncherApp[]> {
  const host = getHost()
  if (!host) return []
  return JSON.parse(await host.LoadAppsJson()) as LauncherApp[]
}

export async function saveApps(apps: LauncherApp[]): Promise<void> {
  const host = getHost()
  if (!host) return
  await host.SaveAppsJson(JSON.stringify(apps))
}

export async function launchApp(name: string): Promise<void> {
  const host = getHost()
  if (!host) {
    console.warn(`[browser] launchApp('${name}') 仅在 WebView2 内可用`)
    return
  }
  await host.LaunchApp(name)
}
