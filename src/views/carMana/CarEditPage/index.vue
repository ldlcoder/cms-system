<template>
  <div class="car-edit-page">
    <el-form class="car-form" ref="car" :model="formData" v-bind="formProps">
      <card-module-pane>
        <el-row class="basic-form form" :gutter="40">
          <el-col :span="16">
            <form-item-fields
              :fieldItems="fieldItems"
              v-model="formData"
            >
            </form-item-fields>
            <array-field-items
              v-model="formData.properties"
            >
            </array-field-items>
          </el-col>
        </el-row>
      </card-module-pane>
      <card-module-pane>
        <el-row class="basic-form images" :gutter="40">
          <el-col :span="18">
            <form-item-field
              :fieldItem="imagesFields"
              v-model="formData.images"
            >
            </form-item-field>
          </el-col>
        </el-row>
      </card-module-pane>
      <card-module-pane>
        <el-row class="basic-form loan" :gutter="40">
          <el-col :span="18">
            <div class="loan-tb-title">选择贷款方案<el-button class="add-loan-btn" @click="formShow = true" type="primary">新增贷款方案</el-button></div>
            <el-form-item prop="choices" :rules="checkTable" class="loan-tb">
              <loans-table
                v-model="formData.choices"
              >
              </loans-table>
            </el-form-item>
          </el-col>
        </el-row>
      </card-module-pane>
    </el-form>
    <form-btns
      :parent-refs="$refs"
      ref-key="car"
      submit-confirm
      is-edit
      :cancel="cancelSkip"
      :submit="carFormSubmit"
      :sending="sending"
    >
    </form-btns>
    <loan-edit-form
      v-if="formShow"
      @on-send="addLoanRecord"
      @on-cancel="formShow = false"
    >
    </loan-edit-form>
  </div>
</template>

<script src="./vindex"></script>
<style lang="scss" scoped>
.car-edit-page{
  .lcomp-card-module-pane{
    margin-bottom: 15px;
  }
  .basic-form{
    padding: 30px 0 10px 60px;
    /deep/ .el-form-item__content{
      width: 340px;
    }
    /deep/ .color-inftb-item .el-form-item__content{
      width: 360px
    }
    /deep/ .color-item .el-form-item__content{
      width: 100px;
    }
  }
  .loan{
    .loan-tb-title {
      padding-bottom: 10px;
    }
    .add-loan-btn {
      margin-left: 30px;
    }
    .loan-tb{
      width: 100%;
      /deep/ .el-form-item__content{
        width: 100%;
      }
    }
  }
  .form{
    /deep/ .lease-common-form-inline {

    }
    
  }
  /deep/ .tab-images {
    width: 90%;
    .el-form-item__content{
      width: 60%;
    }
  } 
}
</style>