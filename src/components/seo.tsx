export function SEO() {
  if (process.env.NEXT_PUBLIC_PLATFORM === 'desktop')
    return

  return <>
    <section className="sr-only">
      <h1>MiHoYo Sticker Archive</h1>

      <p>
        MiHoYo Sticker is an open-source sticker and emoji archive that
        collects and organizes stickers from HoYoverse’s MiYuShe platform.
        Users can browse, copy, and download high-quality stickers from
        HoYoverse games including Genshin Impact, Honkai Impact 3rd,
        Honkai: Star Rail, and Zenless Zone Zero.
      </p>

      <p>
        MiHoYo Sticker is designed to be lightweight and easy to use, making
        it suitable for Discord, Telegram, WhatsApp, and other chat
        platforms. All sticker assets belong to HoYoverse and are collected
        for personal use, reference, and learning purposes only.
      </p>
    </section>
    <section className="sr-only">
      <h2>米哈游表情包｜米游社表情包合集</h2>

      <p>
        MiHoYo Sticker 是一个专注于收集与整理
        <strong>米哈游表情包</strong> 与
        <strong>米游社表情包</strong> 的开源网站。
        所有表情均来源于米游社（MiYuShe），涵盖
        《原神》《崩坏3》《崩坏：星穹铁道》《绝区零》等
        HoYoverse 旗下游戏。
      </p>

      <p>
        本站支持米游社表情包的在线浏览、一键复制、下载与分享，
        适合用于微信、QQ、Telegram、Discord 等聊天平台。
        如果你正在寻找高清、完整、持续更新的米哈游表情包资源，
        这里可以直接使用，无需登录。
      </p>
    </section>
  </>
}
