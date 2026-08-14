const GIF_SRC = "assets/demo-video.gif";

const sections = [
  {
    index: "01",
    title: "通用视频生成",
    subtitle: "多风格、多场景，高质量生成多样化视频内容",
    theme: "blue",
    videos: [
      ["自然风光", "湖光山色 · 云雾缭绕"],
      ["城市夜景", "霓虹灯下 · 车流如织"],
      ["萌宠日常", "可爱瞬间 · 生活日常"],
    ],
    highlights: [
      ["多样风格生成", "写实、国风、童萌"],
      ["高保真画面生成", "视觉细节丰富"],
      ["时长灵活可控", "多种时长比例"],
    ],
  },
  {
    index: "02",
    title: "通用物理视频生成",
    subtitle: "基于物理规律模拟，生成更真实可信的动态视频",
    theme: "green",
    videos: [
      ["小球轨道", "重力反馈 · 轨迹真实"],
      ["复杂碰撞", "连续运动 · 状态稳定"],
      ["液体流动", "流体自然 · 细节丰富"],
    ],
    highlights: [
      ["遵循物理规律", "碰撞、重力、流体"],
      ["高真实感", "光影、材质、力学"],
      ["可控且稳定", "参数可调、结果可控"],
    ],
  },
  {
    index: "03",
    title: "机器人视频生成",
    subtitle: "面向机器人运动与操作，生成高一致性训练视频",
    theme: "purple",
    videos: [
      ["机器人行走", "步态稳定 · 自然流畅"],
      ["机械臂操作", "抓取精准 · 动作连贯"],
      ["机器人导航", "路径规划 · 自主避障"],
    ],
    highlights: [
      ["机器人动作可控", "运动规划、协同操作"],
      ["场景适配性强", "工业、仓储、物流"],
      ["合成数据赋能", "训练与仿真加速"],
    ],
  },
  {
    index: "04",
    title: "施工风险预判视频生成",
    subtitle: "理解真实业务场景，预演风险并辅助科学决策",
    theme: "orange",
    videos: [
      ["高空作业风险", "识别高处坠落隐患"],
      ["吊装作业风险", "预判碰撞与倾覆风险"],
      ["基坑塌陷风险", "识别基坑坍塌隐患"],
    ],
    highlights: [
      ["面向真实场景", "下游业务赋能"],
      ["潜在风险预判", "提前发现安全隐患"],
      ["培训方案演练", "安全管理闭环"],
    ],
  },
];

const activeIndexes = [0, 0, 0, 0];
const grid = document.querySelector("#demo-grid");
const modal = document.querySelector("#video-modal");
const modalTitle = document.querySelector("#modal-title");

function sectionMarkup(section, sectionIndex) {
  const thumbnails = section.videos.map((video, videoIndex) => `
    <button class="gif-thumb${videoIndex === 0 ? " active" : ""}" type="button" data-section="${sectionIndex}" data-video="${videoIndex}" aria-label="展示 ${video[0]}" aria-pressed="${videoIndex === 0}">
      <span class="thumb-index">0${videoIndex + 1}</span>
      <img src="${GIF_SRC}" alt="" />
      <strong>${video[0]}</strong>
    </button>`).join("");

  const dots = section.videos.map((video, videoIndex) => `
    <button class="${videoIndex === 0 ? "active" : ""}" type="button" data-section="${sectionIndex}" data-video="${videoIndex}" aria-label="切换到 ${video[0]}"></button>`).join("");

  const highlights = section.highlights.map((item) => `
    <div class="highlight-item"><i>✓</i><div><strong>${item[0]}</strong><span>${item[1]}</span></div></div>`).join("");

  return `
    <article class="demo-panel theme-${section.theme}" data-section-panel="${sectionIndex}" style="animation-delay:${120 + sectionIndex * 90}ms">
      <div class="panel-corner corner-tl"></div><div class="panel-corner corner-br"></div>
      <header class="section-header">
        <div class="section-number">${section.index}</div>
        <div class="section-copy">
          <div class="section-title-row"><h2>${section.title}</h2>${section.index === "04" ? '<span class="downstream-tag">下游赋能</span>' : ""}</div>
          <p>${section.subtitle}</p>
        </div>
        <div class="ratio-tag">16:9 横屏</div>
      </header>
      <div class="section-body">
        <div class="gallery-wrap">
          <div class="gif-showcase">
            <div class="gif-thumbnails" aria-label="${section.title} 视频列表">${thumbnails}</div>
            <button class="featured-gif" type="button" data-featured-section="${sectionIndex}" aria-label="放大查看 ${section.videos[0][0]}">
              <img src="${GIF_SRC}" alt="${section.videos[0][0]} 自动播放演示" />
              <div class="video-vignette"></div>
              <span class="live-badge"><i></i> AUTO PLAY</span>
              ${section.theme === "orange" ? '<span class="risk-scan">RISK SCAN</span>' : ""}
              <div class="featured-caption"><span>NOW SHOWING</span><strong>${section.videos[0][0]}</strong><p>${section.videos[0][1]}</p></div>
            </button>
          </div>
          <div class="gallery-dots" aria-label="自动轮播位置">${dots}</div>
        </div>
        <aside class="highlight-panel"><div class="highlight-title"><span>✦</span> 核心优势</div><div class="highlight-list">${highlights}</div></aside>
      </div>
    </article>`;
}

grid.innerHTML = sections.map(sectionMarkup).join("");

function selectVideo(sectionIndex, videoIndex) {
  activeIndexes[sectionIndex] = videoIndex;
  const panel = document.querySelector(`[data-section-panel="${sectionIndex}"]`);
  const video = sections[sectionIndex].videos[videoIndex];

  panel.querySelectorAll(".gif-thumb").forEach((button, index) => {
    button.classList.toggle("active", index === videoIndex);
    button.setAttribute("aria-pressed", String(index === videoIndex));
  });
  panel.querySelectorAll(".gallery-dots button").forEach((button, index) => button.classList.toggle("active", index === videoIndex));

  const featured = panel.querySelector(".featured-gif");
  featured.setAttribute("aria-label", `放大查看 ${video[0]}`);
  featured.querySelector("img").alt = `${video[0]} 自动播放演示`;
  featured.querySelector(".featured-caption strong").textContent = video[0];
  featured.querySelector(".featured-caption p").textContent = video[1];
}

grid.addEventListener("click", (event) => {
  const switcher = event.target.closest("[data-video]");
  if (switcher) selectVideo(Number(switcher.dataset.section), Number(switcher.dataset.video));

  const featured = event.target.closest("[data-featured-section]");
  if (featured) {
    const sectionIndex = Number(featured.dataset.featuredSection);
    modalTitle.textContent = `${sections[sectionIndex].index} · ${sections[sectionIndex].videos[activeIndexes[sectionIndex]][0]}`;
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.querySelector("#modal-close").focus();
  }
});

function closeModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

document.querySelector("#modal-close").addEventListener("click", closeModal);
modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeModal(); });

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  window.setInterval(() => {
    sections.forEach((section, sectionIndex) => selectVideo(sectionIndex, (activeIndexes[sectionIndex] + 1) % section.videos.length));
  }, 4800);
}
