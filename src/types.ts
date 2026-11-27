/** 启动器应用条目 —— 与 C# 侧 Models/LauncherApp.cs 对应 */
export interface LauncherApp {
  name: string
  executablePath: string
  arguments?: string | null
  workingDirectory?: string | null
  iconPath?: string | null
}
