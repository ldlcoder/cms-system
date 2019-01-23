<template>
  <pagination-list
    class="comp-list-page-tpl"
    v-bind="$props"
    v-on="$listeners"
    :refresh.sync="handleRefresh"
    :extraForm="extraForm"
  >
    <template slot-scope="{data: dataList}">
      <common-table
        class="lpt-table"
        v-bind="filterProp(table)"
        :data="dataList"
        :columns="columns"
        ref="commonTable"
        v-on="tableEvents"
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange"
      >
      </common-table>
    </template>
  </pagination-list>
</template>

<script src="./vindex.js"></script>
<style src="./index.scss" lang="scss" scoped ></style>
