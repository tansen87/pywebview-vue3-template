<script setup>
import { ref, reactive } from 'vue';

const form = reactive({
  sep: ',',
  encoding: 'utf-8',
})
const tableData = ref([])
const columns = ref([])

// open local file
async function openFile() {
  window.pywebview.api.system_open_file(form.encoding, form.sep).then((res) => {
    const jsData = JSON.parse(res)
    tableData.value = jsData
    columns.value = Object.keys(jsData[0])
  })
}
async function generate() {
  window.pywebview.api.system_generate_data();
}
// const sData = ref('');
// const sendData = () => {
//   window.pywebview.api.system_get_data(sData);
// }
</script>

<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="Separator">
      <el-select v-model="form.sep">
        <el-option label="," value="," />
        <el-option label="|" value="|" />
        <el-option label="\t" value="\\t" />
      </el-select>
    </el-form-item>
    <el-form-item label="Encoding">
      <el-select v-model="form.encoding">
        <el-option label="utf-8" value="utf-8" />
        <el-option label="utf_8_sig" value="utf_8_sig" />
        <el-option label="gbk" value="gbk" />
        <el-option label="utf-16le" value="utf-16le" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="openFile">open file</el-button>
      <el-button type="success" @click="generate">generate</el-button>
    </el-form-item>
  </el-form>
  <el-table :data="tableData" height="550" style="width: 100%">
    <el-table-column v-for="column in columns" :key="column" :prop="column" :label="column"></el-table-column>
  </el-table>
</template>
