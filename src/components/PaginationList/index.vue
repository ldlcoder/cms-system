<template>
  <div class="comp-pagination-list"
    v-loading="loading"
    :element-loading-text="loadingText"
  >
    <slot :data="dataList"></slot>
    <div class="pagination-container">
      <el-pagination
        v-if="paginationShow"
        background
        @size-change="handleSizeChange"
        :page-size="pageSize"
        :current-page.sync="curPage"
        :total="dataTotal"
        v-bind="handlePagination"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script src="./vindex.js"></script>
<style src="./index.scss" lang="scss" scoped ></style>
