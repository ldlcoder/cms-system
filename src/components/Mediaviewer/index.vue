<template>
  <div class="mediaViewer">
    <div v-if="isDownload">
        <span v-if="isSwitch"><span>（</span><span style="text-decoration: underline;"><span style="cursor: wait;color: #bdc2cb;" v-if="isDownloading">下载中</span><span v-else style="cursor: pointer;color: #0000dd;" @click="imgDownload">确定下载</span><span style="cursor: pointer;color: #0000dd;margin-left: 20px;" @click="cancelSwitch">取消</span></span><span>）</span></span>
        <span v-else><span>（</span><span style="text-decoration: underline;"><span  style="cursor: pointer;color: #0000dd;" @click="switchButton">打包下载</span></span><span>）</span></span>
    </div>
    <el-row>
      <el-col :span="24" v-if="delFlag||this.$route.name == 'detailpage'">
        <el-upload
          class="upload-demo"
          ref="upload"
          :action="aliUploadHost"
          :data="imgDataRequest"
          :accept="thisUploadType"
          :on-success="uploadSuccess"
          :before-upload="beforeUpload"
          :disabled="uploadBool"
          :multiple="true"
          :limit="100"
          :show-file-list="false"
          style="text-align: right">
          <el-button size="small" type="primary" :disabled="uploadBool" :loading="uploadBool">{{uploadBool ? '上传中' : '点击上传' }}</el-button>
        </el-upload>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6" id="selectMenu">
        <div style="overflow-y:scroll;height:616px;">
          <el-menu
            ref="selectMenu"
            class="el-menu-vertical-demo"
            @select="imgChange"
            :index="imgSelectVal"
            default-active="1">
            <template v-for="item in imgTypes">
              <div v-if="item.index == 1" style="padding-left: 4px;font-size: 18px;height: 40px;line-height: 40px;font-weight: bold">
								<el-checkbox :indeterminate="isIndeterminate" v-model="checkAllImgs" @change="handleCheckAllChange" v-if="isSwitch"><span style="display:none;">zz</span></el-checkbox>照片
							</div>
              <div v-if="item.index == 7" style="padding-left: 4px;font-size: 18px;height: 40px;line-height: 40px;font-weight: bold">视频</div>
							<el-checkbox-group v-model="checkedImgs" @change="handleCheckedImgsChange">
								<el-menu-item :index="item.index" style="height: 30px;line-height: 30px" :dataindex="item.index" class="imgmenuitem" :class="{gxfield:item.gxflag}">
									<el-checkbox :label="item.index" v-if="item.index != 7 && item.index != 8 && item.index != 41 && item.index != 40 && isSwitch"><span style="display:none;">zz</span></el-checkbox>
									<span slot="title" v-if="item.index != 7 && item.index != 8 && item.index != 41 ">{{item.title,imgSum[item.index],item.index|imgSumFilter}}</span>
									<span slot="title" v-if="item.index== 7 || item.index== 8 || item.index== 41">{{item.title,imgSum[item.index],item.index|imgSumFilter}}</span>
								</el-menu-item>
							</el-checkbox-group>
            </template>
          </el-menu>
        </div>
      </el-col>
      <el-col :span="18">
        <template v-if="imgCompleted">
          <el-button size="small" type="primary" @click="delImg" style="position: absolute; right: 0; bottom: 60px;z-index: 999;" v-if="delFlag">删除当前图片</el-button>
        </template>
        <div style="width: 100%;height: 616px;background-color: #F6F7FA;">
          <template v-if="imgCompleted">
             <!--<image-viewer 
              :data="imgShow.map(item => (item.file_path))"
            >
            </image-viewer>-->
           <div class="images" v-viewer="{movable: true,inline: true,navbar: true,url: 'data-original',minzoomRatio:0.2}" style="width: 100%;height: 100%;">
              <img v-for="src in imgShow" :src="src.thumb_file" :onerror="'javascript: this.src = \'' + errorImg + '\''" :data-original="src.file_path" :key="src.file_id" style="width: 100px;height: 200px;display: none;">
            </div>
          </template>
          <div v-show="videoCompleted">
            <div style="width:100%;height:555px;">
              <video id="mainVideo" width="100%" :src="videoSrc" height="100%" controls v-if="videoSrc != ''">
                <source :src="videoSrc"  type="video/mp4">
              </video>
            </div>
            <div style=" border-top: 1px solid #ffffff;width: 100%;height: 65px;" v-if="videoCompleted && videoRefresh">
              <div style="position: relative;width: 100%;height: 84px;overflow-x: scroll;overflow-y: hidden">
                <ul style="position: absolute;top: 0;padding: 0;height: 60px;margin: 0;" >
                  <li style="position: relative;width: 60px;height:60px;border: 1px solid lightgray;display: inline-block" v-for="src in imgShow">
                    <div class="videoMeng" @click="videoChange(src.file_path,src.file_id)" :data-id="src.file_id" :data-src=src.file_path style="width: 100%;height: 100%;position: absolute;top: 0;z-index: 1000;">
                    </div>
                    <!--删除视频按钮-->
                    <template v-if="delFlag">
                      <div @click="delvideo(src.file_path,src.file_id,src.id)" style="width: 15px; height: 15px; position: absolute;top: 0;right: 0;background-image: url(data:image/jpeg;base64,/9j/4QPDRXhpZgAATU0AKgAAAAgADAEAAAMAAAABBAAAAAEBAAMAAAABBAAAAAECAAMAAAAEAAAAngEGAAMAAAABAAEAAAESAAMAAAABAAEAAAEVAAMAAAABAAQAAAEaAAUAAAABAAAApgEbAAUAAAABAAAArgEoAAMAAAABAAIAAAExAAIAAAAiAAAAtgEyAAIAAAAUAAAA2IdpAAQAAAABAAAA7AAAASQACAAIAAgACAAtxsAAACcQAC3GwAAAJxBBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cykAMjAxODowMzowMiAxMToyMToxNgAABJAAAAcAAAAEMDIyMaABAAMAAAAB//8AAKACAAQAAAABAAAAFKADAAQAAAABAAAAFAAAAAAAAAAGAQMAAwAAAAEABgAAARoABQAAAAEAAAFyARsABQAAAAEAAAF6ASgAAwAAAAEAAgAAAgEABAAAAAEAAAGCAgIABAAAAAEAAAI5AAAAAAAAAEgAAAABAAAASAAAAAH/2P/tAAxBZG9iZV9DTQAD/+4ADkFkb2JlAGSAAAAAAf/bAIQADAgICAkIDAkJDBELCgsRFQ8MDA8VGBMTFRMTGBEMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAENCwsNDg0QDg4QFA4ODhQUDg4ODhQRDAwMDAwREQwMDAwMDBEMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwM/8AAEQgABQAFAwEiAAIRAQMRAf/dAAQAAf/EAT8AAAEFAQEBAQEBAAAAAAAAAAMAAQIEBQYHCAkKCwEAAQUBAQEBAQEAAAAAAAAAAQACAwQFBgcICQoLEAABBAEDAgQCBQcGCAUDDDMBAAIRAwQhEjEFQVFhEyJxgTIGFJGhsUIjJBVSwWIzNHKC0UMHJZJT8OHxY3M1FqKygyZEk1RkRcKjdDYX0lXiZfKzhMPTdePzRieUpIW0lcTU5PSltcXV5fVWZnaGlqa2xtbm9jdHV2d3h5ent8fX5/cRAAICAQIEBAMEBQYHBwYFNQEAAhEDITESBEFRYXEiEwUygZEUobFCI8FS0fAzJGLhcoKSQ1MVY3M08SUGFqKygwcmNcLSRJNUoxdkRVU2dGXi8rOEw9N14/NGlKSFtJXE1OT0pbXF1eX1VmZ2hpamtsbW5vYnN0dXZ3eHl6e3x//aAAwDAQACEQMRAD8A04r9KAatvpavAr2ej6ftDq932H9k+huazZZ6X7P9R9n6H060l4ukkp//2f/tCsJQaG90b3Nob3AgMy4wADhCSU0EBAAAAAAADxwBWgADGyVHHAIAAAIAAAA4QklNBCUAAAAAABDNz/p9qMe+CQVwdq6vBcNOOEJJTQQ6AAAAAADXAAAAEAAAAAEAAAAAAAtwcmludE91dHB1dAAAAAUAAAAAUHN0U2Jvb2wBAAAAAEludGVlbnVtAAAAAEludGUAAAAASW1nIAAAAA9wcmludFNpeHRlZW5CaXRib29sAAAAAAtwcmludGVyTmFtZVRFWFQAAAABAAAAAAAPcHJpbnRQcm9vZlNldHVwT2JqYwAAAAVoIWg3i75/bgAAAAAACnByb29mU2V0dXAAAAABAAAAAEJsdG5lbnVtAAAADGJ1aWx0aW5Qcm9vZgAAAAlwcm9vZkNNWUsAOEJJTQQ7AAAAAAItAAAAEAAAAAEAAAAAABJwcmludE91dHB1dE9wdGlvbnMAAAAXAAAAAENwdG5ib29sAAAAAABDbGJyYm9vbAAAAAAAUmdzTWJvb2wAAAAAAENybkNib29sAAAAAABDbnRDYm9vbAAAAAAATGJsc2Jvb2wAAAAAAE5ndHZib29sAAAAAABFbWxEYm9vbAAAAAAASW50cmJvb2wAAAAAAEJja2dPYmpjAAAAAQAAAAAAAFJHQkMAAAADAAAAAFJkICBkb3ViQG/gAAAAAAAAAAAAR3JuIGRvdWJAb+AAAAAAAAAAAABCbCAgZG91YkBv4AAAAAAAAAAAAEJyZFRVbnRGI1JsdAAAAAAAAAAAAAAAAEJsZCBVbnRGI1JsdAAAAAAAAAAAAAAAAFJzbHRVbnRGI1B4bEBywAAAAAAAAAAACnZlY3RvckRhdGFib29sAQAAAABQZ1BzZW51bQAAAABQZ1BzAAAAAFBnUEMAAAAATGVmdFVudEYjUmx0AAAAAAAAAAAAAAAAVG9wIFVudEYjUmx0AAAAAAAAAAAAAAAAU2NsIFVudEYjUHJjQFkAAAAAAAAAAAAQY3JvcFdoZW5QcmludGluZ2Jvb2wAAAAADmNyb3BSZWN0Qm90dG9tbG9uZwAAAAAAAAAMY3JvcFJlY3RMZWZ0bG9uZwAAAAAAAAANY3JvcFJlY3RSaWdodGxvbmcAAAAAAAAAC2Nyb3BSZWN0VG9wbG9uZwAAAAAAOEJJTQPtAAAAAAAQASwAAAABAAIBLAAAAAEAAjhCSU0EJgAAAAAADgAAAAAAAAAAAAA/gAAAOEJJTQQNAAAAAAAEAAAAHjhCSU0EGQAAAAAABAAAAB44QklNA/MAAAAAAAkAAAAAAAAAAAEAOEJJTScQAAAAAAAKAAEAAAAAAAAAAjhCSU0D9AAAAAAAEgA1AAAAAQAtAAAABgAAAAAAAThCSU0D9wAAAAAAHAAA/////////////////////////////wPoAAA4QklNBAgAAAAAABAAAAABAAACQAAAAkAAAAAAOEJJTQQeAAAAAAAEAAAAADhCSU0EGgAAAAADRQAAAAYAAAAAAAAAAAAAABQAAAAUAAAACAB0AGkAbQBnACAAKAAyACkAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAABQAAAAUAAAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAAEAAAAAAABudWxsAAAAAgAAAAZib3VuZHNPYmpjAAAAAQAAAAAAAFJjdDEAAAAEAAAAAFRvcCBsb25nAAAAAAAAAABMZWZ0bG9uZwAAAAAAAAAAQnRvbWxvbmcAAAAUAAAAAFJnaHRsb25nAAAAFAAAAAZzbGljZXNWbExzAAAAAU9iamMAAAABAAAAAAAFc2xpY2UAAAASAAAAB3NsaWNlSURsb25nAAAAAAAAAAdncm91cElEbG9uZwAAAAAAAAAGb3JpZ2luZW51bQAAAAxFU2xpY2VPcmlnaW4AAAANYXV0b0dlbmVyYXRlZAAAAABUeXBlZW51bQAAAApFU2xpY2VUeXBlAAAAAEltZyAAAAAGYm91bmRzT2JqYwAAAAEAAAAAAABSY3QxAAAABAAAAABUb3AgbG9uZwAAAAAAAAAATGVmdGxvbmcAAAAAAAAAAEJ0b21sb25nAAAAFAAAAABSZ2h0bG9uZwAAABQAAAADdXJsVEVYVAAAAAEAAAAAAABudWxsVEVYVAAAAAEAAAAAAABNc2dlVEVYVAAAAAEAAAAAAAZhbHRUYWdURVhUAAAAAQAAAAAADmNlbGxUZXh0SXNIVE1MYm9vbAEAAAAIY2VsbFRleHRURVhUAAAAAQAAAAAACWhvcnpBbGlnbmVudW0AAAAPRVNsaWNlSG9yekFsaWduAAAAB2RlZmF1bHQAAAAJdmVydEFsaWduZW51bQAAAA9FU2xpY2VWZXJ0QWxpZ24AAAAHZGVmYXVsdAAAAAtiZ0NvbG9yVHlwZWVudW0AAAARRVNsaWNlQkdDb2xvclR5cGUAAAAATm9uZQAAAAl0b3BPdXRzZXRsb25nAAAAAAAAAApsZWZ0T3V0c2V0bG9uZwAAAAAAAAAMYm90dG9tT3V0c2V0bG9uZwAAAAAAAAALcmlnaHRPdXRzZXRsb25nAAAAAAA4QklNBCgAAAAAAAwAAAACP/AAAAAAAAA4QklNBBEAAAAAAAEBADhCSU0EFAAAAAAABAAAAAE4QklNBAwAAAAAAlUAAAABAAAABQAAAAUAAAAQAAAAUAAAAjkAGAAB/9j/7QAMQWRvYmVfQ00AA//uAA5BZG9iZQBkgAAAAAH/2wCEAAwICAgJCAwJCQwRCwoLERUPDAwPFRgTExUTExgRDAwMDAwMEQwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwBDQsLDQ4NEA4OEBQODg4UFA4ODg4UEQwMDAwMEREMDAwMDAwRDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AABEIAAUABQMBIgACEQEDEQH/3QAEAAH/xAE/AAABBQEBAQEBAQAAAAAAAAADAAECBAUGBwgJCgsBAAEFAQEBAQEBAAAAAAAAAAEAAgMEBQYHCAkKCxAAAQQBAwIEAgUHBggFAwwzAQACEQMEIRIxBUFRYRMicYEyBhSRobFCIyQVUsFiMzRygtFDByWSU/Dh8WNzNRaisoMmRJNUZEXCo3Q2F9JV4mXys4TD03Xj80YnlKSFtJXE1OT0pbXF1eX1VmZ2hpamtsbW5vY3R1dnd4eXp7fH1+f3EQACAgECBAQDBAUGBwcGBTUBAAIRAyExEgRBUWFxIhMFMoGRFKGxQiPBUtHwMyRi4XKCkkNTFWNzNPElBhaisoMHJjXC0kSTVKMXZEVVNnRl4vKzhMPTdePzRpSkhbSVxNTk9KW1xdXl9VZmdoaWprbG1ub2JzdHV2d3h5ent8f/2gAMAwEAAhEDEQA/ANOK/SgGrb6WrwK9no+n7Q6vd9h/ZPobms2Wel+z/UfZ+h9OtJeLpJKf/9kAOEJJTQQhAAAAAABdAAAAAQEAAAAPAEEAZABvAGIAZQAgAFAAaABvAHQAbwBzAGgAbwBwAAAAFwBBAGQAbwBiAGUAIABQAGgAbwB0AG8AcwBoAG8AcAAgAEMAQwAgADIAMAAxADcAAAABADhCSU0EBgAAAAAABwAEAAAAAQEA/+ENw2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8APD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxMzggNzkuMTU5ODI0LCAyMDE2LzA5LzE0LTAxOjA5OjAxICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6ZGM9Imh0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvIiB4bWxuczpwaG90b3Nob3A9Imh0dHA6Ly9ucy5hZG9iZS5jb20vcGhvdG9zaG9wLzEuMC8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmI3MGMyZTM3LTFkYzgtMTFlOC1iMDlkLWExMTRmM2Y5ZDIxMiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo3MjE4YjM0NC05MzU1LWJkNDAtOGRmNC00NGNjOTUwNTAyMGIiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iN0RBNjdBQjQ4M0RDMUQ0NUFBNEJDREU0NzUyN0JFNzgiIGRjOmZvcm1hdD0iaW1hZ2UvanBlZyIgcGhvdG9zaG9wOkNvbG9yTW9kZT0iMSIgcGhvdG9zaG9wOklDQ1Byb2ZpbGU9IiIgeG1wOkNyZWF0ZURhdGU9IjIwMTgtMDMtMDJUMTE6MjA6MTMrMDg6MDAiIHhtcDpNb2RpZnlEYXRlPSIyMDE4LTAzLTAyVDExOjIxOjE2KzA4OjAwIiB4bXA6TWV0YWRhdGFEYXRlPSIyMDE4LTAzLTAyVDExOjIxOjE2KzA4OjAwIj4gPHhtcE1NOkhpc3Rvcnk+IDxyZGY6U2VxPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6YzM5MzQ4YjItZmJjYi1hYjRlLWIyZjktOTY5OTM5MDBjMmUzIiBzdEV2dDp3aGVuPSIyMDE4LTAzLTAyVDExOjIxOjE2KzA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgMjAxNyAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjcyMThiMzQ0LTkzNTUtYmQ0MC04ZGY0LTQ0Y2M5NTA1MDIwYiIgc3RFdnQ6d2hlbj0iMjAxOC0wMy0wMlQxMToyMToxNiswODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8P3hwYWNrZXQgZW5kPSJ3Ij8+/+4ADkFkb2JlAGQAAAAAAP/bAEMABgQEBAUEBgUFBgkGBQYJCwgGBggLDAoKCwoKDBAMDAwMDAwQDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDP/AAAsIABQAFAEBEQD/3QAEAAP/xADSAAAABwEBAQEBAAAAAAAAAAAEBQMCBgEABwgJCgsQAAIBAwMCBAIGBwMEAgYCcwECAxEEAAUhEjFBUQYTYSJxgRQykaEHFbFCI8FS0eEzFmLwJHKC8SVDNFOSorJjc8I1RCeTo7M2F1RkdMPS4ggmgwkKGBmElEVGpLRW01UoGvLj88TU5PRldYWVpbXF1eX1ZnaGlqa2xtbm9jdHV2d3h5ent8fX5/c4SFhoeIiYqLjI2Oj4KTlJWWl5iZmpucnZ6fkqOkpaanqKmqq6ytrq+v/aAAgBAQAAPwDpnmLzDrnmzXLvR9HuxbWVqsggtxIYXvHhNHAYfaYmvpx1VeC82yM6JZ68q3upWNy+mppasbm6kdoQJV/3RQ1DzN9n02X/AFvtZOP+Vqy/4M+t8E/T/q/U/Tp8HPjz9fj/AC+n8XCv958Gf//Qk1noirr9zY6jejS00yR5Lq5LcZQIWqpg7tNICrR0/wBb4sO9e16x82WEoWU6bc6YXuLa1uHAiu4gAC7EAAXgHb4vtf8AARv9EX3+H/056Z+o/Wvq3L34/bp/xk/dV/mz/9Hr35rf4N9ZPrXq/p/gPT+qcefCvw+vz+Dj14V/efyZz7Sf0B9ej/Tf1r6jX4vq3Cvty/b+fpfFndf+dX/wv/x7/wCHPq/t6HoU/wA/8rl/lZ//2Q==);background-size: 100% 100%; z-index: 1001"></div>
                    </template>
                    <video class="list-video" width="60" height="60">
                      <source :src=src.file_path  type="video/mp4">
                    </video>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        </el-col>
    </el-row>
  </div>
</template>
<script>

import { userSearch } from '@/api/remoteSearch'
import { getAdminToken } from '@/utils/auth'
import detailApi from '@/api/detailApi'
import Viewer from 'v-viewer'
import ImageViewer from '@/components/ImageViewer'
import {md5} from '@/utils' // 用于md5
import errorImg from '@/assets/imgError.jpg' // 图片地址无效时的替代图片
import $ from 'jquery' // 用于通过dom获取图片index
export default{
  name: 'Mediaviewer',
  components: {Viewer, ImageViewer},
  props: {
    imgTypes: Array,
    checkedOptions: Array,
    reqData: Object,
    memberType: Number,
    delFlag: Boolean,
    memberId: [String, Number],
    //resImages: Array
    a:Array,
    isSubmit:Boolean,
    isDownload:Boolean
  },
  data () {
    return{
      resImages: [].concat(this.a),
      isDownloading: false,
      // 影像资料
      errorImg: errorImg, // 图片地址无效时的替代图片
      uploadBool: false,
      videoRefresh: true,
      videoSrc: '', // 当前播放的视频地址
      aliUploadHost: '', // 图片上传host
      aliUploadHost2: '', // 视频上传host
      imgDir: '', // 图片上传dir备份
      imgDir2: '', // 视频上传dir备份
      imgData: {}, // 上传图片需要的表单
      imgData2: {}, // 上传视频需要的表单
      img_add: {}, // 添加过的图片
      arr: [],
      img_delete: {}, // 删除过的图片
      imgDialog: false, // 图片弹窗是否弹出
      isDownloading: false, // 是否正在下载图片
			isSwitch: false,//是否切换确定下载
      resResult: [], // 借口拿到的图片备份（暂时没用）
      //resImages: [], // 接口拿到的图片
      imgSelectVal: 1, // 当前选择的图片种类
      imgOnUpload: [], // 当前正在上传的图片（防止上传成功前切换导致上传分组错误）
      imgOnUpload1: [], // 当前正在上传的内部资料（防止上传成功前切换导致上传分组错误）
      //选中的照片数组
			checkedImgs: [],
			checkAllImgs: true,//照片是否全部选中
      isIndeterminate: false,
      otherOptions: [1,2,3,4,24,5,6,12,13,14,19,26,15,18,25],
			zhOptions: [21,22,27,23,28,20,29,30,31,32,33,34,35,36,37],
    }
  },
  created () {
    window._hmt.push(['_trackEvent', '客户视频资料-在线查看', '点击', 'lr_web_PageKHSP_ZXCK'])
    this.checkedImgs = this.checkedOptions
    this.imgModal()
    this.getUploadForm()
    this.getUploadForm2()
  },
  filters:{
    imgSumFilter(title, sum, index){
        var word = ''
        if(index == 7 || index == 8 || index == 41){
            word = '段'
        } else {
            word = '张'
        }
        return (title + '(' + sum + word + ')')
    }
  },
  computed:{
    videoCanDel(){
      if(this.$route.name == 'detailinputrequest' || this.$route.name == 'detailsalessupplement' || this.$route.name == 'changetask'|| this.$route.name=='detailCompany' || this.$route.name=='detailOperation'){
				return true
      } else {
        return false
      }
    },
    imgShow(){
      var _this = this
      var putImages = []
      for(var i in _this.resImages){
        if(_this.resImages[i].file_class_id == _this.imgSelectVal){
						let thisImg = JSON.parse(JSON.stringify(_this.resImages[i]));
						if(_this.imgSelectVal == '7' || _this.imgSelectVal == '8' || _this.imgSelectVal == '41'){
							if(thisImg.file_path.indexOf('http') == 0){//接口返回不带协议，自己上传时带http协议
									thisImg.file_path = thisImg.file_path.replace('http','https')
							}else{
								thisImg.file_path = 'https:' + thisImg.file_path
							}
						}
          putImages.push(thisImg)
        }
      }
      return putImages
    },
    imgCompleted(){
      if(this.imgShow.length > 0){
          if(this.imgSelectVal != 7 && this.imgSelectVal != 8 && this.imgSelectVal != 41){
            return true
          } else {
              return false
          }
      } else {
        return false
      }
    },
    videoCompleted(){
        if(this.imgSelectVal == 7 || this.imgSelectVal == 8 || this.imgSelectVal == 41){
            return true
        } else {
            return false
        }
    },
    imgDataRequest(){
      if(this.imgSelectVal == 7 || this.imgSelectVal == 8 || this.imgSelectVal == 41){
        return this.imgData2
      } else {
        return this.imgData
      }
    },
    thisUploadType(){
      if(this.imgSelectVal == '7' || this.imgSelectVal == '8' || this.imgSelectVal == '41'){
        return 'video/*'
      } else {
        return 'image/*'
      }
    },
    imgSum(){
      var _this = this
				var sum = {
					'1': 0,
					'2': 0,
					'3': 0,
					'4': 0,
					'24': 0,
					'5': 0,
					'6': 0,
					'12': 0,
					'13': 0,
					'14': 0,
					'19': 0,
					'26': 0,
					'15': 0,
					'18': 0,
					'25': 0,
					'21': 0,
					'22': 0,
					'27': 0,
					'23': 0,
					'28': 0,
					'20': 0,
					'29': 0,
					'30': 0,
					'31': 0,
					'32': 0,
					'33': 0,
					'34': 0,
					'35': 0,
					'36': 0,
					'37': 0,
          '40':0,
          '44': 0,
          '45': 0,
					'7': 0,
					'8': 0,
          '41':0
				}
      for(var i in _this.resImages){
        var imgType = _this.resImages[i].file_class_id
        if(sum.hasOwnProperty(imgType)){
            sum[imgType]++
        }
      }
      return sum
    }
  },
  methods:{
    // 下载方法
    imgDownload(){

      var _this = this
			let newData = _this.checkedImgs.join(',')
      let commonData = this.reqData
      delete commonData.item_instance_id;
      commonData.member_type = this.memberType
      commonData.member_id = this.memberId
      commonData.file_class_id = newData
      var arg = {
        data: commonData,
        success: res => {
          if(res.error_no == 200){
            _this.isDownloading = false
						_this.isSwitch = false
							if( !res.result.url ){
								_this.$alert('你下载的图片资料为空', '下载失败', {
									confirmButtonText: '确定'
								})
							}else{
								location.href = res.result.url
							}
          } else {
            _this.isDownloading = false
            _this.$alert(res.error_msg, '下载失败', {
              confirmButtonText: '确定'
            })
          }
        },
        error: err => {
        }
      }
      if(!_this.isDownloading){
        detailApi.getImgDownload(arg)
        _this.isDownloading = true
				const loading = _this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        setTimeout(() => {
          loading.close();
        }, 2000);
      }
    },
    getUploadForm(){
      var _this = this
      var arg = {
        data: {
          file_type : 'image',
          project:'anjie'
        },
        success: function (res) {
          var result = res.result
          _this.aliUploadHost = result.host
          // _this.imgData.name = '12345.jpg'
          _this.imgDir = result.dir
          // _this.imgData.key = result.dir
          _this.imgData.policy = result.policy
          _this.imgData.OSSAccessKeyId = result.accessid
          _this.imgData.success_action_status = 200
          _this.imgData.callback = result.callback
          _this.imgData['x-oss-security-token'] = result.token
          _this.imgData['x-oss-object-acl'] = result.acl
          _this.imgData.signature = result.signature
        },
        error: function (err) {
        }
      }
      detailApi.uploadForm(arg)
    },
    getUploadForm2(){
      var _this = this
      var arg = {
        data: {
          file_type : 'video',
          project:'anjie'
        },
        success: function (res) {
          var result = res.result
          _this.aliUploadHost2 = result.host
          // _this.imgData.name = '12345.jpg'
          _this.imgDir2 = result.dir
          // _this.imgData.key = result.dir
          _this.imgData2.policy = result.policy
          _this.imgData2.OSSAccessKeyId = result.accessid
          _this.imgData2.success_action_status = 200
          _this.imgData2.callback = result.callback
          _this.imgData2['x-oss-security-token'] = result.token
          _this.imgData2['x-oss-object-acl'] = result.acl
          _this.imgData2.signature = result.signature
        },
        error: function (err) {
        }
      }
      detailApi.uploadForm(arg)
    },
    // 影像资料弹窗
    delImg(){
      var _this = this
      var imgIndex = $(".viewer-active>img").attr('data-index') // 通过jquery拿到插件当前index
      // 取url中的文件名
      function getFilenameInUrl(url){
        var arr = url.split('/')
        var arr1 = arr[arr.length-1].split('.')
        return (arr1[0])
      }
      var thisImg = {
        org: _this.imgShow[imgIndex].thumb_file, // 缩略图
        src: _this.imgShow[imgIndex].file_path, // 原图
        alt: getFilenameInUrl(_this.imgShow[imgIndex].file_path) // 文件名/fid
      }
      if(parseInt(_this.imgSelectVal) != 40 ){
        if(_this.imgShow[imgIndex].hasOwnProperty('id')){
          thisImg.id = _this.imgShow[imgIndex].id // 如果是刚上传的图片，添加进imgShow里面时没有id属性
          if (!_this.img_delete.hasOwnProperty(_this.imgSelectVal)) {
            _this.img_delete[_this.imgSelectVal] = {
              'source_type': 'image', //_this.imgSelectVal,
              'source_lists': []
            }
          }
          _this.img_delete[_this.imgSelectVal].source_lists.push(thisImg) // 写入图片删除数组
        } else {//如果是新上传的，需删除add中添加过的
          _this.img_add[_this.imgSelectVal].source_lists.forEach((val,index)=>{
            if(val.alt == thisImg.alt){
              _this.img_add[_this.imgSelectVal].source_lists.splice(index, 1)
            }
          })
        }
      }else {
          //  删除内部资料的数组中的新添加的。
          var isThis = true
          for(var i =0 ;i<this.arr.length;i++){
            if(this.arr[i].file_id === thisImg.alt){
              this.arr.splice(i,1)
              isThis = false
            }
          }
          if(isThis){
            var imgdel = {
              file_id: thisImg.alt,
              file_path: thisImg.src,
              file_class_id: this.imgSelectVal,
              id:_this.imgShow[imgIndex].id,
              remove: 1 // 删除 remove true
            }
            this.arr.push(imgdel)
          }
          delete  _this.img_add[_this.imgSelectVal]
          delete  _this.img_delete[_this.imgSelectVal]

        if(!this.isSubmit){
          this.$message({
            message: '该账号无提交内部资料权限！',
            type: 'warning'
          });
        }else{
          this.$emit('change1',this.arr)
        }
        this.arr=[]

      }
      // 从resImages里删除对应图片
      for(var i in _this.resImages){
        if(_this.resImages[i].file_id == thisImg.alt){
          _this.resImages.splice(i, 1)
          break
        }
      }
      this.$emit('change',{add:this.img_add,delete:this.img_delete})

    },
    delvideo(path,fid,id){
      var _this = this
      this.$confirm('是否删除此视频', '删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(() => {
        // 取url中的文件名
        function getFilenameInUrl(url){
          var arr = url.split('/')
          var arr1 = arr[arr.length-1].split('.')
          return (arr1[0])
        }
        var thisImg = {
          org: path, // 缩略图
          src: path, // 原图
          alt: fid // 文件名/fid
        }
        if(id){
          thisImg.id = id // 如果是刚上传的图片，添加进imgShow里面时没有id属性
        }
        if (!_this.img_delete.hasOwnProperty(_this.imgSelectVal)) {
          _this.img_delete[_this.imgSelectVal] = {
            'source_type': 'video', //_this.imgSelectVal,
            'source_lists': []
          }
        }
        _this.img_delete[_this.imgSelectVal].source_lists.push(thisImg) // 写入图片删除数组
        // 从resImages里删除对应图片
        _this.videoRefresh = false
        for(var i in _this.resImages){
          if(_this.resImages[i].file_id == thisImg.alt){
            _this.resImages.splice(i, 1)
            break
          }
        }
        // 删除当前正在播放的视频时切换视频，以及视频数量为0时清空videoSrc
        var videoL = _this.imgShow.length
        if(videoL == 0){
          _this.videoSrc = ''
        } else {
          if(thisImg.src == _this.videoSrc){
            _this.videoSrc = _this.imgShow[0].file_path
          }
        }
        if(_this.imgSelectVal == '41'){
          //  删除内部资料的数组中的新添加的。
          var isThis = true
          for(var i =0 ;i<this.arr.length;i++){
            if(this.arr[i].file_id === thisImg.alt){
              this.arr.splice(i,1)
              isThis = false
            }
          }
          if(isThis){
            var imgdel = {
              file_id: thisImg.alt,
              file_path: thisImg.src,
              file_class_id: this.imgSelectVal,
              id:thisImg.id,
              remove: 1 // 删除 remove true
            }
            this.arr =[]
            this.arr.push(imgdel)
          }
          delete  _this.img_add[_this.imgSelectVal]
          delete  _this.img_delete[_this.imgSelectVal]
          if(!this.isSubmit){
            this.$message({
              message: '该账号无提交内部资料权限！',
              type: 'warning'
            });
          }else{
            this.$emit('change1',this.arr)
          }
          this.arr=[]
        }else{
          this.$emit('change',{add:this.img_add,delete:this.img_delete})
        }
        // 刷新dom之后再显示video列表
        _this.$nextTick(function () {
          _this.videoRefresh = true
        })
      }).catch(() => {
      })
    },
    //全选
		handleCheckAllChange(val) {
			let _this = this
			_this.checkedImgs = val ? this.checkedOptions : [];
      _this.isIndeterminate = false;
    },
    handleCheckedImgsChange (value) {//选中照片对全选照片的影响
			let _this = this
			let checkedCount = value.length;
      _this.checkAllImgs = checkedCount === this.checkedOptions.length
      _this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkedOptions.length
		},
    //切换打包下载与确定下载按钮
		switchButton(){
      window._hmt.push(['_trackEvent', '客户视频资料-下载', '点击', 'lr_web_PageKHSP_XZ'])
			let _this = this;
			_this.isSwitch = true;
		},
		//取消下载按钮
		cancelSwitch(){
			let _this = this;
			_this.isSwitch = false;
    },
    imgChange(index){
      this.imgSelectVal = index
    },
    videoChange(src,id){
      this.videoSrc = src
    },
    imgModal(){
      setTimeout(function () {
        $(".imgmenuitem[dataindex=1]").click()
      }, 200)
    },
    //  上传成功
    uploadSuccess(response, file, fileList){
      var _this = this
      // 按钮变亮
      this.uploadBool = false
      // 确定imgClass并从上传中数组删除对应文件
      var uploadClass = _this.imgSelectVal
        for(var i in fileList){
          var upArrL = _this.imgOnUpload.length-1
          for(var k = upArrL; k >= 0; k--){
            if(_this.imgOnUpload[k].uploadId == fileList[i].response.result.fid){
              uploadClass = _this.imgOnUpload[k].uploadClass // 设置imgclass
              _this.imgOnUpload.splice(k,1) // 删除对应文件
              break
            }
          }
        }

      // 添加文件
      var imgsurl = []
      if (!_this.img_add.hasOwnProperty(uploadClass)) {
        var imgType = 'image'
        if(uploadClass == '7' || uploadClass == '8' || uploadClass == '41'){
         imgType = 'video'
        }
        _this.img_add[uploadClass] = {
          'source_type': imgType,//uploadClass,
          'source_lists': []
        }
      }
      var addObj = { obj : [] , obj1: [], obj2: []}
      for(var i in fileList){
        var obj = {
          org: fileList[i].response.result.url, // 缩略图
          src: fileList[i].response.result.url, // 原图
          alt: fileList[i].response.result.fid // 文件名/fid
        }
        var obj1 = {
          file_class_id: uploadClass, // class_id
          file_id: fileList[i].response.result.fid, // 文件名/fid
          file_path: fileList[i].response.result.url, // 原图
          thumb_file: fileList[i].response.result.url // 缩略图
        }
        var obj2 = {
          work_id: this.$route.query.id,
          member_id: this.memberId,
          member_type: this.memberType,
          file_class_id: uploadClass, // class_id
          file_id: fileList[i].response.result.fid, // 文件名/fid
          file_path: fileList[i].response.result.url, // 原图
        }
        if(_this.imgSelectVal == '40' || _this.imgSelectVal == '41') {
          obj2 = {
            work_id: this.$route.query.id,
            member_id: this.memberId,
            member_type: this.memberType,
            id:null,
            remove: 0,
            file_class_id: uploadClass, // class_id
            file_id: fileList[i].response.result.fid, // 文件名/fid
            file_path: fileList[i].response.result.url, // 原图
          }
        }
        addObj.obj.push(obj)
        addObj.obj1.push(obj1)
        addObj.obj2.push(obj2)
      }
      for(var i in addObj.obj){
        _this.img_add[uploadClass]['source_lists'].push(addObj.obj[i])
      }
      for(var i in addObj.obj1){
        _this.resImages.push(addObj.obj1[i])
      }



      if(_this.imgSelectVal == '40' || _this.imgSelectVal == '41'){
        for(var i in addObj.obj2){
          this.arr.push(addObj.obj2[i])
        }
        for( var i=0;i<this.arr.length;i++) {
          delete this.arr[i].work_id
          delete this.arr[i].member_id
          delete this.arr[i].member_type
        }
        delete  _this.img_add[_this.imgSelectVal]
        delete  _this.img_delete[_this.imgSelectVal]
        if(!this.isSubmit){
          this.$message({
            message: '该账号无提交内部资料权限！',
            type: 'warning'
          });
        }else{
          this.$emit('change1',this.arr)
        }
        this.arr=[]
      }else{
        //订单管理查看上传图片
        for(var i in addObj.obj2){
          imgsurl.push(addObj.obj2[i])
        }
        if(this.$route.name == 'detailpage'){
          var argimg = {
            data: {token: getAdminToken(),content:JSON.stringify(imgsurl)},
            success: res => {
              if(res.error_no == 200){
                this.$message.success('上传成功');
              } else {
                this.$message.error(res.error_msg);
              }
            },
            error: err => {
              _this.$message.error(err);
            }
          }
          detailApi.basicInfoNewImg(argimg)
        }
        this.$emit('change',{add:this.img_add,delete:this.img_delete})
      }
      _this.$refs.upload.clearFiles()
    },
    beforeUpload(file){
      const isPic = (file.type === 'image/bmp' || file.type === 'image/jpeg' || file.type === 'image/png')
      var isVid = /^(video\/)/.test(file.type)
      const thisval = this.imgSelectVal
      const isLt2M = file.size / 1024 / 1024 < 2;

//      if (!isLt2M) {
//        this.$message.error('上传头像图片大小不能超过 2MB!');
//      }
      // 传入md5后的文件名与key（避免key重复导致上传失败）
      var filenameMd5 = file.name.split('.')[0] + file.uid
      var fileEx = file.name.split('.')[1].toLowerCase() // 大写后缀转小写
      const md5Fid = md5(filenameMd5)
      if(this.imgSelectVal == 7 || this.imgSelectVal == 8 || this.imgSelectVal == 41){
        if (!isVid) {
          this.$message.error('上传视频只能是 MP4/MPG/MOV/AVI 格式!');
          return false
        }
        this.imgData2.name = md5Fid + '.' + fileEx
        this.imgData2.key = this.imgDir2 + this.imgData2.name
      } else {
        if (!isPic) {
          this.$message.error('上传图片只能是 JPG/PNG/BMP 格式!');
          return false
        }
        this.imgData.name = md5Fid + '.' + fileEx
        this.imgData.key = this.imgDir + this.imgData.name
      }
      // 按钮变灰
      this.uploadBool = true
      // 写入上传中数组

      var uploadObj = {
        uploadClass: thisval,
        uploadId: md5Fid
      }
      this.imgOnUpload.push(uploadObj)
    },
  },
  watch:{
    resImages: {
      handler () {
        this.$emit("update:a", this.resImages)
      },
      deep: true
    },
    imgSelectVal: function (val) {
      var _this = this
      // 监听图片种类为视频时，播放视频切换为对应种类第一个视频
      if(val == 7 || val == 8 || val == 41){
        _this.videoRefresh = false
        for(var i in this.resImages){
          if(this.resImages[i].file_class_id == val){
            this.videoSrc = this.resImages[i].file_path
						if(this.videoSrc.indexOf('http') == 0){//接口返回不带协议，自己上传时带http协议
							this.videoSrc = this.videoSrc.replace('http','https')
						}else{
							this.videoSrc = 'https:' + this.videoSrc
						}
            break
          }
          // 如果没有视频，src置空
          if(i == this.resImages.length - 1){
            this.videoSrc = ''
          }
        }
        // 刷新dom之后再显示video列表
        _this.$nextTick(function () {
          _this.videoRefresh = true
        })
      } else {
        this.videoSrc = ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.mediaViewer{
 /deep/ .viewer-container{
   width: 100%!important;
   height: 100%!important;
  }
  .field:before{
		    content: "*";
				color: #f56c6c;
				position: absolute;
				font-size: 18px;
				left: 10px;
				top: 3px;
	}
	 .gxfield:before{
		    content: url('../../assets/icon/gx.png');
				color: #f56c6c;
				position: absolute;
				font-size: 18px;
				left: 4px;
				top: 0px;
	}
  /deep/ .viewer-toolbar li{
    float: left!important;
  }
}
</style>
<style>

</style>
