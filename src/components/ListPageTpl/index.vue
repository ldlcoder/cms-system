<template>
  <div class="comp-list-page-tpl">
    <template v-if="columns && getDataList">
      <div class="search-form" :currentTab="currentTabKey">
        <div class="export-btn" v-if="exportUrl">
          <a :href="exportUrl" target="_blank"><el-button type="text" icon="el-icon-download" v-on="exportEvents">数据导出</el-button></a>
        </div>
        <template v-if="searchForms">
          <el-tabs
            v-if="Array.isArray(searchForms)"
            class="lpt-tabs"
            v-model="curTab"
          >
            <el-tab-pane v-for="item of searchForms" :label="item.label" :name="item.name" :key="item.name">
              <search-form
                v-if="handledSearchForms[item.name]"
                v-bind="handledSearchForms[item.name]"
                :formProps="formProps"
                :sending="loading"
                :remember="remember"
                :nskey="$route.name+item.name"
                :key="item.name"
                @search="formSearching"
              >
                <component v-if="item.slotComp" :is="item.slotComp"></component>
              </search-form>
            </el-tab-pane>
          </el-tabs>
          <search-form
            v-else
            v-bind="searchForms"
            :formProps="formProps"
            :sending="loading"
            :remember="remember"
            :nskey="$route.name"
            @search="formSearching"
          >
            <slot name="extraSearchForm"></slot>
          </search-form>
        </template>
      </div>
      <slot></slot>
      <div class="table-operation">
        <div class="operation-btns-pane" v-if="operation">
          <template v-if="operation.show">
            <el-button
              v-for="(item, index) in operation.btns"
              v-on="item.events"
              :loading="operation.lockKeys && operation.lockKeys[item.lockingKey]"
              v-bind="opeBtnProps(item.props)"
              :key="index"
            >
              {{item.text}}
            </el-button>
          </template>
        </div>
        <template v-else>
          <slot name="listOperation"></slot>
        </template>
      </div>
      <list-table
        v-if="columns.length"
        v-bind="listTableProps"
        :table="table"
        :columns="columns"
        :data="data"
        :getDataList="getDataList"
        :loading="loading"
        :refresh.sync="handleRefresh"
        :selectionKeys.sync="handleSelectionKeys"
        :createdAutoSend="createdAutoSend"
        :listExtraForm="handleExtraForm"
        :storeKey="$route.name"
        :remember="remember"
      >
      </list-table>
    </template>
  </div>
</template>
<script src="./vindex"></script>
<style lang="scss" scoped>
.comp-list-page-tpl {
  .search-form {
    position: relative;
    margin: 16px 0;
  }
  .lpt-tabs {
    background-color: #fff;
    /deep/ .el-tabs__nav-wrap {
      padding-left: 40px;
    }
  }
  .export-btn {
    position: absolute;
    right: 0;
    top: -40px;
  }
  .table-operation {
    /deep/ .el-button {
      margin: 0 20px 12px 0;
    }
  }
}
</style>
