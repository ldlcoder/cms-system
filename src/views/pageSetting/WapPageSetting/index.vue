<template>
  <div class="wap-page-setting">
    <el-tabs v-model="curTab">
      <el-tab-pane v-if="RouteRights.includes('homepage')" label="首页配置" name="homepage">
        <sub-page-frame class="tab-page-pane">
          <div class="form-panel">
            <module-card
              class="form-module-card banner-module"
              title="BANNER区"
              :formBtnProps="{ parentRefs: $refs, refKey: 'homeBanner', submit: homeSettingSubmit }"
              :sending="sendings.homeBanner"
            >
              <el-form ref="homeBanner" :model="homeFormData">
                <el-form-item prop="banner">
                  <banner-field v-model="homeFormData.banner"></banner-field>
                </el-form-item>
              </el-form>
            </module-card>
            <module-card
              class="form-module-card hot-cars-module"
              title="热销车型"
              :formBtnProps="{ parentRefs: $refs, refKey: 'homeHotCars', submit: homeSettingSubmit }"
              :sending="sendings.homeHotCars"
            >
              <el-form ref="homeHotCars" v-bind="formProps" :model="homeFormData.hot_cars">
                <form-item-field :fieldItem="hotCarsField" v-model="homeFormData.hot_cars.num" ></form-item-field>
              </el-form>
            </module-card>
            <module-card
              class="form-module-card question-module"
              title="常见问题"
              :formBtnProps="{ parentRefs: $refs, refKey: 'homeQuestions', submit: homeSettingSubmit }"
              :sending="sendings.homeQuestions"
            >
              <el-form ref="homeQuestions" v-bind="formProps" :model="homeFormData.questions">
                <question-form v-model="homeFormData.questions"></question-form>
              </el-form>
            </module-card>
          </div>
          <div class="img-pane" slot="right"><img :src="require('./images/homepage-sample.png')"></div>
        </sub-page-frame>
      </el-tab-pane>
      <el-tab-pane v-if="RouteRights.includes('detailpage')" label="详情页配置" name="detailpage">
        <sub-page-frame class="tab-page-pane">
          <div class="form-panel">
            <module-card
              class="form-module-card question-module"
              title="常见问题"
              :formBtnProps="{ parentRefs: $refs, refKey: 'detailQuestions', submit: detailSettingSubmit }"
              :sending="sendings.detailQuestions"
            >
              <el-form ref="detailQuestions" v-bind="formProps" :model="detailFormData.questions">
                <question-form v-model="detailFormData.questions"></question-form>
              </el-form>
            </module-card>
            <module-card
              class="form-module-card question-module"
              title="购车流程"
              :formBtnProps="{ parentRefs: $refs, refKey: 'detailProcess', submit: detailSettingSubmit }"
              :sending="sendings.detailProcess"
            >
              <el-form ref="detailProcess" v-bind="formProps" :model="detailFormData.process">
                <process-form v-model="detailFormData.process"></process-form>
              </el-form>
            </module-card>
          </div>
          <div class="img-pane" slot="right"><img :src="require('./images/detailpage-sample.png')"></div>
        </sub-page-frame>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script src="./vindex"></script>
<style lang="scss" scoped>
.wap-page-setting {
  @include page-module-pane;
  /deep/ .tab-page-pane {
    .form-module-card {
      margin-bottom: 20px;
    }
    .el-form, .comp-form-item-fields {
      position: relative;
    }
    .show-form-field {
      border-bottom: 1px solid $borderColor;
    }
    .comp-form-item-fields {
      padding-right: 10%;
    }
    .hot-cars-module {
      .comp-form-item-field {
        width: 300px;
      }
    }
    .question-module {
      .item-add-btn, .item-delete-btn {
        position: absolute;
        right: 0;
        top: 0;
        font-size: 12px;
      }
      .item-add-btn i {
        font-size: 12px;
      }
      .item-delete-btn {
        padding: 6px 12px;
      }
    }
    .sample-img {
      .img-pane {
        text-align: center;
        img {
          border: 1px solid $borderColor;
        }
      }
    }
  }
}
</style>
