<template>
  <div class="loan-index-page">
    <card-module-pane
      :title="`${isEdit ? '编辑' : '新增'}贷款方案`"
    >
      <el-form class="loan-form" ref="loan" :model="formData" v-bind="formProps">
        <form-item-fields
          :fieldItems="fieldItems"
          v-model="formData"
        >
          <el-form-item>
            <form-btns
              :parent-refs="$refs"
              ref-key="loan"
              :is-edit="isEdit"
              :cancel="loanEditCancel"
              :submit="loanFormSubmit"
              :sending="sending"
            >
            </form-btns>
          </el-form-item>
        </form-item-fields>
      </el-form>
    </card-module-pane>
    <card-module-pane
      title="月供计算公式设置（贷款期数D；首付比例S；贷款利率L；车辆价格P）"
    >
      <el-form class="loan-form loan-formula-form" ref="formula" :model="formulaFormData" v-bind="formProps">
        <form-item-field
          :fieldItem="formulaItem"
          v-model="formulaFormData.formula"
        >
        </form-item-field>
        <el-form-item>
          <form-btns
            v-if="formulaEdit"
            class="formula-submit-btn"
            :parent-refs="$refs"
            ref-key="formula"
            is-edit
            submit-confirm
            :cancel="() => (formulaEdit = false)"
            :submit="formulaSend"
            :sending="ffSending"
            :words="{confirmWord: '公式提交后会对所有贷款方案生效，确认提交？'}"
          >
          </form-btns>
          <el-button v-else type="primary" @click="formulaEdit = true">设置</el-button>
        </el-form-item> 
      </el-form>
    </card-module-pane>
    <card-module-pane
      title="已添加贷款方案"
    >
      <loans-list
        ref="loanList"
        :data="data"
        :editRecord="editLoan"
        :deleteRecord="deleteLoan"
      >
      </loans-list>
    </card-module-pane>
    <loan-confirm
      v-if="loanConfirm"
      :data="formData"
      :sending="sending"
      @on-sure="loanSend"
      @on-cancel="loanConfirm = false"
    >
    </loan-confirm>
  </div>
</template>
<script src="./vindex"></script>
<style lang="scss" scoped>
.loan-index-page {
  .lcomp-card-module-pane {
    margin-bottom: 10px;
  }
  /deep/ .loan-form{
    padding: 30px 0 12px;
    .lcomp-form-btns {
      padding: 0
    }
    .el-button {
      min-width: 100px;
      margin: 0 0 0 20px;
    }

  }
}
</style>
