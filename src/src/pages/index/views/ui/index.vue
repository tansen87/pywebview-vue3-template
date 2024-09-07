<template>
  <el-alert class="mb-5" type="warning" title="注：">
    <div class="">1. 所有带有复制标记的文本可点击复制。</div>
    <div>2. 该规范为Arco Design的TailwindCSS实现。</div>
  </el-alert>

  <Example title="色彩">
    <div class="flex">
      <div v-for="color in colors" :key="color.name" class="mb-4 w-[240px] shrink-1 mr-2">
        <div v-for="(cls, idx) in color.list" :key="cls" class="p-4 transition-all duration-150 truncate" :class="[cls, { 'text-gray-200': idx > 6, 'text-gray-300': idx <= 6 && idx > 3 }]">
          <Copy :text="cls" />
        </div>
      </div>
    </div>
  </Example>

  <Example title="主题色">
    <div v-for="[colors, name] in bgColors" :key="name" class="mb-4 flex w-[600px]">
      <div class="flex">
        <div v-for="color in colors" :key="color">
          <div class="w-[150px] h-[50px]" :class="[color, , `dark: bg-b-dark-primary`]" />
          <div class="mt-1 text-sm">
            <Copy :text="color" />
          </div>
        </div>
      </div>
    </div>
  </Example>

  <!-- <Example title="色彩的应用">
    <el-alert :closable="false">
      调色盘与主题色中的色值可以用于任何可以设置颜色的地方（如文本、边框、背景等）。
    </el-alert>
    <div class="mt-5">
      <div class="text-h6 font-semibold">文字</div>
      <div
        v-for="[color] in primaryTextColors"
        :key="color"
        class="flex leading-relaxed font-semibold w-[600px]"
        :class="color">
        <Copy :text="color" />
      </div>
    </div>

    <div class="mt-5">
      <div class="text-h6 mb-2 font-semibold">边框</div>
      <div class="flex">
        <div
          v-for="cls in ['border-b-primary', 'border-b-success', 'border-b-warn', 'border-b-danger']"
          :key="cls"
          class="w-[160px] mr-2 border-2">
          <div class="flex items-center justify-center h-[100px] border-solid font-semibold" :class="cls">
            <Copy :text="cls" />
          </div>
        </div>
      </div>
    </div>

  </Example> -->

  <Example title="文字颜色">
    <div class="flex">
      <div v-for="[cls, name] in textColors" :key="cls" class="w-[150px]" :class="cls">
        <div class="h-[100px] bg-current" />
        <div class="p-2 text-h6">
          <div><Copy :text="cls" /></div>
          <div>{{ name }}</div>
        </div>
      </div>
    </div>
  </Example>

  <Example title="边框色">
    <div class="flex">
      <div v-for="[cls, name] in borderColors" :key="cls">
        <div class="w-[150px] h-[100px] mr-2 border border-solid rounded-md" :class="cls" />
        <div class="mt-2 text-h6">
          <div><Copy :text="cls" /></div>
          <div>{{ name }}</div>
        </div>
      </div>
    </div>
  </Example>

  <Example title="阴影">
    <div class="flex bg-gray-100 p-4">
      <div v-for="[cls, name] in shadows" :key="cls">
        <div class="w-[150px] h-[100px] mr-2 bg-white dark:bg-gray-300" :class="cls" />
        <div class="mt-2 text-h6">
          <div><Copy :text="cls" /></div>
          <div>{{ name }}</div>
        </div>
      </div>
    </div>
  </Example>

  <Example title="间距">
    <Spacing />
  </Example>

  <Example title="文字大小">
    <div v-for="[cls, name] in textSizes" :key="cls" class="font-semibold" :class="cls">{{ name }} <Copy :text="cls" /></div>
  </Example>

  <Example title="圆角">
    <div class="flex p-4">
      <div v-for="[cls, name] in radius" :key="cls">
        <div class="w-[150px] h-[100px] mr-4 bg-blue-200" :class="cls" />
        <div class="mt-2 text-h6">
          <div><Copy :text="cls" /></div>
          <div>{{ name }}</div>
        </div>
      </div>
    </div>
  </Example>
</template>

<script setup lang="ts">
import Copy from './Copy/index.vue'
import Example from './Example/index.vue'
import Spacing from './spacing.vue'

const colors = [
  {
    name: 'blue',
    list: ['bg-blue-100', 'bg-blue-200', 'bg-blue-300', 'bg-blue-400', 'bg-blue-500', 'bg-blue-600', 'bg-blue-700', 'bg-blue-800', 'bg-blue-900', 'bg-blue-1000'],
  },
  {
    name: 'blue',
    list: ['bg-orange-100', 'bg-orange-200', 'bg-orange-300', 'bg-orange-400', 'bg-orange-500', 'bg-orange-600', 'bg-orange-700', 'bg-orange-800', 'bg-orange-900', 'bg-orange-1000'],
  },
  {
    name: 'green',
    list: ['bg-green-100', 'bg-green-200', 'bg-green-300', 'bg-green-400', 'bg-green-500', 'bg-green-600', 'bg-green-700', 'bg-green-800', 'bg-green-900', 'bg-green-1000'],
  },
  {
    name: 'red',
    list: ['bg-red-100', 'bg-red-200', 'bg-red-300', 'bg-red-400', 'bg-red-500', 'bg-red-600', 'bg-red-700', 'bg-red-800', 'bg-red-900', 'bg-red-1000'],
  },
  {
    name: 'pink',
    list: ['bg-pink-100', 'bg-pink-200', 'bg-pink-300', 'bg-pink-400', 'bg-pink-500', 'bg-pink-600', 'bg-pink-700', 'bg-pink-800', 'bg-pink-900', 'bg-pink-1000'],
  },
  {
    name: 'cyan',
    list: ['bg-cyan-100', 'bg-cyan-200', 'bg-cyan-300', 'bg-cyan-400', 'bg-cyan-500', 'bg-cyan-600', 'bg-cyan-700', 'bg-cyan-800', 'bg-cyan-900', 'bg-cyan-1000'],
  },
  {
    name: 'gray',
    list: ['bg-gray-100', 'bg-gray-200', 'bg-gray-300', 'bg-gray-400', 'bg-gray-500', 'bg-gray-600', 'bg-gray-700', 'bg-gray-800', 'bg-gray-900', 'bg-gray-1000'],
  },
]

const bgColors = [
  [['bg-b-primary', 'bg-b-primary-hover', 'bg-b-primary-active', 'bg-b-primary-disabled'], '品牌色'],
  // [['bg-b-info', 'bg-b-info-hover', 'bg-b-info-active', 'bg-b-info-disabled'], '信息色'],
  [['bg-b-success', 'bg-b-success-hover', 'bg-b-success-active', 'bg-b-success-disabled'], '成功色'],
  [['bg-b-warn', 'bg-b-warn-hover', 'bg-b-warn-active', 'bg-b-warn-disabled'], '警告色'],
  [['bg-b-danger', 'bg-b-danger-hover', 'bg-b-danger-active', 'bg-b-danger-disabled'], '危险色'],
  // ['text-b-link', 'text-b-primary-hover', 'text-b-primary-active', 'text-b-primary-disabled', '链接色'],
]
// const primaryTextColors = [
//   ['text-b-primary', '品牌色'],
//   // ['text-b-primary-hover', '品牌色'],
//   // ['text-b-primary-active', '品牌色'],
//   // ['text-b-primary-disabled', '品牌色'],
//   // ['text-b-info', '信息色'],
//   ['text-b-success', '成功色'],
//   // ['text-b-success-hover', '成功色'],
//   // ['text-b-success-active', '成功色'],
//   // ['text-b-success-disabled', '成功色'],
//   ['text-b-warn', '警告色'],
//   // ['text-b-warn-hover', '警告色'],
//   // ['text-b-warn-active', '警告色'],
//   // ['text-b-warn-disabled', '警告色'],
//   ['text-b-danger', '危险色'],
//   // ['text-b-danger-hover', '危险色'],
//   // ['text-b-danger-active', '危险色'],
//   // ['text-b-danger-disabled', '危险色'],
//   // ['text-b-link', '链接色'],
// ];

const borderColors = [
  ['border-light', '浅色'],
  ['border-regular', '常规色'],
  ['border-dark', '深色'],
  ['border-darker', '更深色'],
]

const textSizes = [
  ['text-h1', '标题一'],
  ['text-h2', '标题二'],
  ['text-h3', '标题三'],
  ['text-h4', '标题四'],
  ['text-h5', '标题五'],
  ['text-h6', '标题六'],
  ['text-base', '常规'],
  ['text-msm', '中小'],
  ['text-sm', '小的'],
  ['text-xs', '超小'],
]

const textColors = [
  ['text-primary', '主色'],
  ['text-regular', '常规色'],
  ['text-secondary', '次要色'],
  ['text-disabled', '禁用色'],
]

const shadows = [
  ['shadow-sm', '小阴影'],
  ['shadow-md', '中阴影'],
  ['shadow-lg', '大阴影'],
]

const radius = [
  ['rounded-xs', '超小圆角'],
  ['rounded-sm', '小圆角'],
  ['rounded-md', '中等圆角'],
  ['rounded-full', '圆'],
]
</script>
