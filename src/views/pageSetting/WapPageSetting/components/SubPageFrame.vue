<template>
  <el-row :gutter="20">
    <el-col :span="14">
      <slot></slot>
    </el-col>
    <el-col :span="10">
      <el-card class="sample-img" header="实际效果示例图">
        <slot name="right"></slot>
      </el-card>
    </el-col>
  </el-row>
</template>
