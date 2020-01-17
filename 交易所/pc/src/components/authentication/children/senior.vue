<style type="less" lang="less">
@import "./auth.less";

</style>
<template lang="html">
    <div class="identity">
        <section class="identitymian">
            <h2 class="title"><span>{{$t("identityAu.header[0]")}}</span><span>{{$t("identityAu.header[1]")}}</span></h2>
            <div class="from">
                <el-form :model="form" :rules="rules2" ref="form" label-width="100px" label-position="left">
                    <div v-if='form.type == "1"' class="imgWarp">
                       <div class="efi--roleCard">
                          <div class="flx-it1">{{$t('identityAu.mian[4]')}}</div>
                          <div class="el-input el-input1 ">
                            <div class="picture">
                              <div class="uploader1" ></div>
                              <div v-if="form.cardimg1" class="imgbox">
                                <img :src="uploaderimg.uploader1">
                              </div>
                              <div v-else class="">
                                <i class="uploadicon zhengmian" id='zhengmian'></i>
                              </div>
                              <div :class="$t('identityAu.class[0]')" @click='toIpt(0)'></div>
                            </div>
                          </div>
                          <div class="box">
                            <span class="list">{{$t('identityAu.mian[8]')}}</span>
                          </div>
                        </div>

                        <span class="cutOff"></span>
                        <div class="efi--roleCard">
                          <div class="flx-it1">{{$t('identityAu.mian[5]')}}</div>
                          <div class="el-input el-input1">
                            <div class="picture">
                              <div class="uploader2"></div>
                              <div v-if="form.cardimg2" class="imgbox">
                                <img :src="uploaderimg.uploader2">
                              </div>
                              <div v-else>
                                  <i class="uploadicon beimian"></i>
                              </div>
                              <div :class="$t('identityAu.class[0]')" @click='toIpt(1)'></div>
                            </div>
                          </div>
                        </div>

                        <span class="cutOff"></span>
                            <!-- 手持身份证照 -->

                        <!-- <div class="efi--roleCard">
                          <div class="flx-it1">{{$t('senior.main[5]')}}</div>
                          <div class="el-input el-input1">
                            <div class="picture">
                              <div class="uploader3"></div>
                              <div v-if="form.cardimg3" class="imgbox">
                                <img :src="uploaderimg.uploader3">
                              </div>
                              <div v-else>
                                  <i class="uploadicon shouchi"></i>
                              </div>
                              <div :class="$t('identityAu.class[0]')" @click='toIpt(2)'></div>
                            </div>
                          </div>
                        </div> -->
                    </div>
                    <div v-else>
                        <el-form-item label="证件照片">
                            <div class="el-input el-input1">
                                <div class="picture">
                                    <div class="uploader4"></div>
                                    <div v-if="form.cardimg1" class="imgbox">
                                        <img :src="uploaderimg.uploader4">
                                    </div>
                                    <div v-else>
                                        <i class="uploadicon"></i>
                                        <p>上传护照图片</p>
                                    </div>
                                </div>
                                <ul class="box">
                                    <li class="list">必须能看清证件号和姓名，支持jpg/png/jpeg 大小不要超过2M</li>
                                </ul>
                            </div>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </section>
        <section class="payment">
            <div class="but">
                <el-button @click="onSubmit">{{$t('identityAu.mian[16]')}}</el-button>
            </div>
        </section>
    </div>
</template>
<script>
export default {
  data() {
    var _this = this;
    var validatecard_num = (rule, value, callback) => {
      if (!_this.$public.isCardID(value)) {
        callback(new Error(_this.$t("identityAu.mian[18]")));
      } else {
        callback();
      }
    };
    var validaterealname = (rule, value, callback) => {
      if (!value) {
        callback(new Error(_this.$t("identityAu.mian[17]")));
      } else {
        callback();
      }
    };
    return {
      style:['ic-img ic-img-cn', 'ic-img ic-img-en'],
      dialogFormVisible: true,
      rules2: {
        card_num: [
          {
            validator: validatecard_num,
            trigger: "blur"
          }
        ],
        realname: [
          {
            validator: validaterealname,
            trigger: "blur"
          }
        ]
      },
      form: {
        card_num: "", //证件号
        realname: "", //真实姓名
        type: "1", //认证类型 1 身份证 2 护照
        // mobile:'',//手机号
        // email:'',//邮箱号
        cardimg1: "", //身份证正面 /护照
        cardimg2: "", //身份证反面
        cardimg3: "" //手持身份证
      },
      uploaderimg: {
        uploader1: "",
        uploader2: null,
        uploader3: null,
        uploader4: null
      },
      uploader: {
        uploader1: null,
        uploader2: null,
        uploader3: null,
        uploader4: null
      }
    };
  },
  watch: {
    "form.type": function(val, oval) {
      let _this = this;
      if (val != oval) {
        _this.$refs["form"].resetFields();
        for (var variable in _this.form) {
          if (
            variable != "mobile" &&
            variable != "email" &&
            variable != "type"
          ) {
            _this.form[variable] = "";
          }
        }
      }
      switch (val) {
        case "1":
          window.setTimeout(function() {
            _this.Pictureupload(_this.uploader.uploader1, ".uploader1", "1");
            _this.Pictureupload(_this.uploader.uploader2, ".uploader2", "2");
            _this.Pictureupload(_this.uploader.uploader3, ".uploader3", "3");
          }, 800);
          break;
        case "2":
          window.setTimeout(function() {
            _this.Pictureupload(_this.uploader.uploader4, ".uploader4", "4");
          }, 800);
          break;
        default:
          // statements_def
          break;
      }
    }
  },
  methods: {
    // 百度上传组件addButton方法无法正确添加按钮，手写元素使用jq触发ipt点击
    toIpt(i) {
      $('.webuploader-element-invisible').eq(i).click()
    },
    getData() {
      let _this = this;
      _this.$http.post(_this.$http.user_info, {})
        .then(function(response) {
          if (response.data.status == "200") {
            _this.form.mobile = response.data.data.mobile;
            _this.form.email = response.data.data.email;
            if (!_this.isphone) {
              if (!_this.response.data.data.mail) {
                _this
                  .$confirm( _this.$t('senior.tip[3]'),  _this.$t('senior.tip[4]'), {
                    customClass: "purchase",
                    confirmButtonText:  _this.$t('senior.tip[5]'),
                    cancelButtonText:  _this.$t('senior.tip[6]'),
                    showClose: false,
                    type: "warning"
                  })
                  .then(() => {
                    _this.$router.push({ path: "/mailbox" });
                  })
                  .catch(() => {});
                return false;
              }
            }
          }
        })
        .catch(function(error) {});
    },
    onSubmit() {
      let _this = this;
      _this.$refs["form"].validate(valid => {
        if (_this.form.type == "1") {
          if (!_this.form.cardimg1) {
            _this.$message({
              message: _this.$t('senior.tip[0]'),
              type: "warning"
            });
            return false;
          }
          if (!_this.form.cardimg2) {
            _this.$message({
              message:  _this.$t('senior.tip[1]'),
              type: "warning"
            });
            return false;
          }
        } else {
          if (!_this.form.cardimg1) {
            _this.$message({
              message: _this.$t('identityAu.mian[11]'),
              type: "warning"
            });
            return false;
          }
        }
        var sendData = {

          
          cardimg1: _this.form.cardimg1, //身份证正面 /护照
          cardimg2: _this.form.cardimg2, //身份证反面
          // cardimg3: _this.form.cardimg3, //手持身份证
        };
        _this.$http.post(_this.$http.set_img, sendData)
          .then(function(response) {
            if (response.data.status == "200") {
              _this.$message({
                message: response.data.msg,
                type: "success"
              });
              window.setTimeout(function() {
                _this.$router.go(-1);
              }, 800);
            } else {
              _this.$message({
                message: response.data.msg,
                type: "warning"
              });
            }
          })
          .catch(function(error) {});
      });
    },
    // _this.Pictureupload(_this.uploader.uploader1, ".uploader1", "1");

    Pictureupload(name, classname, character) {
      let _this = this;
      let loading, charactertype;
      name = WebUploader.create({
        // 选完文件后，是否自动上传。
        auto: true, // swf文件路径
        swf: "../../../static/upload_img/Uploader.swf", // 文件接收服务端。
        server: _this.$http.upload, 
        pick: {
          id: classname,
        },
        resize: true, // 只允许选择图片文件。
        fileNumLimit: 8, //限制上传个数
        fileSingleSizeLimit: 2048000, //单个文件上传大小
        accept: {
          title: "Images",
          extensions: "gif,jpg,jpeg,bmp,png",
          mimeTypes: "image/*"
        },
        // formData: {
        //   file_pic: ''
        // },
        thumb: {
          type: "image/jpg,jpeg,png",
          // file_pic:,
        }
      });
      name.on("fileQueued", function(file) {
        // 当有文件添加进来的时候
        loading = _this.$loading({
          lock: true,
          text: "Loading",
          spinner: "el-icon-loading",
          background: "rgba(0, 0, 0, 0.7)"
        });
      });
      
      // 文件上传成功，给item添加成功class, 用样式标记上传成功。
      name.on("uploadSuccess", function(file, data) {
        loading.close();
        if (data.status == "200") {
          charactertype = _this.$http.bases + data.data.url;
          // console.log(charactertype)
          // console.log(data)
          switch (character) {
            case "1":
              _this.uploaderimg.uploader1 = charactertype;
              _this.form.cardimg1 =  data.data.url;
              break;
            case "2":
              _this.uploaderimg.uploader2 = charactertype;
              _this.form.cardimg2 =   data.data.url;
              break;
            case "3":
              _this.uploaderimg.uploader3 = charactertype;
              _this.form.cardimg3 =   data.data.url;
              break;
            case "4":
              _this.uploaderimg.uploader4 = charactertype;
              _this.form.cardimg1 =   data.data.url;
              break;
            default:
              // statements_def
              break;
          }
        } else {
          _this.$message({
            message:  _this.$t('senior.tip[2]'),
            type: "warning"
          });
        }
      });
      // 文件上传失败，显示上传出错。
      name.on("uploadError", function(file) {
        console.log(11)
        _this.$message({
          message:  _this.$t('senior.tip[2]'),
          type: "warning"
        });
      });
      name.addButton( {
        id: '#btnUp',
      })
    }
  },
  created() {
    this.getData();
    this.$public.scrollTop();
  },
  mounted() {
    this.Pictureupload(this.uploader.uploader1, ".uploader1", "1");
    this.Pictureupload(this.uploader.uploader2, ".uploader2", "2");
    this.Pictureupload(this.uploader.uploader3, ".uploader3", "3");
  },
  components: {}
};
</script>