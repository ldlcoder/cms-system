<template>
  <div class="lcomp-media-sets">
    <template v-if="FormatData && FormatData.length">
      <el-tabs v-model="activeMember">
        <el-tab-pane 
          v-for="(item, index) in FormatData"
          :label="item.title" 
          :name="(index + '')" 
          :key="(index + '')"
        >
        </el-tab-pane>
      </el-tabs>
      <div class="media-container">
        <div class="media-load">
          <template v-if="authCofg.downloadShow">
            <el-button type="text" v-if="!isPackageLoad && !packageDownload" @click="loadBtn">
              打包下载
            </el-button>
            <span v-if="isPackageLoad && !packageDownload">
              <el-button type="text" @click="confirmLoad">
                确定下载
              </el-button>
              <el-button type="text" @click="cancelLoad">
                取消
              </el-button>
            </span>
          </template>
          <el-button type="text" v-if="packageDownload" :loading="packageDownload">
            下载中...
          </el-button>
          <files-upload 
            class="files-upload-btn"
            v-if="authCofg.uploadShow"
            :attach="{mediaIndex, activeMember}"
            :uploadProps="handleAcceptType"
            :limit="{size: 0}"
            @on-success="success"
          > 
            <load-btn
              slot-scope="{loading}"
              slot="trigger" 
              :options="{type: 'primary'}"
              :loading="loading"
            ></load-btn>
          </files-upload>
        </div>
        <el-row>
          <el-col :span="6" >
            <div class="menu">
            <menu-tree
              :key="activeMember + FormatData[activeMember].title "
              :data="FormatData[activeMember].lists"
              :checkBox="isPackageLoad"
              :isCheckAll="true"
              @current-idChange="getCurrentId"
              @checked-values="getCheckedValues"
            >
            </menu-tree>
            </div>
          </el-col>
          <el-col :span="18" >
            <medias-viewer
              :data="viewerFiles"
              :type="curType"
              :options="{show: authCofg.delBtnShow}"
              :delBtn="delMedias"
            ></medias-viewer>
          </el-col>
        </el-row>
      </div>   
    </template>
  </div>
</template>
<script src="./vindex.js"></script>
<style lang="scss" scoped>
.lcomp-media-sets{
  min-height: 100px;
  .media-load{
    overflow: hidden;
    padding:5px 0;
  }
  .error-msg{
    font-size: 16px;
    text-align: center;
    line-height: 100px;
  }
  .media-load{
    // height: 40px;
    // line-height: 40px;
    position: relative;
    .files-upload-btn{
      float: right;
    }
  }
  .menu{
    min-height: 10px
  }
}
</style>