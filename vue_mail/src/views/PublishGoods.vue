<template>

    <el-form ref="form" :model="form" label-width="80px">

        <el-form-item label="商品名称">
            <el-input class="inputmo" v-model="form.name" ></el-input>
        </el-form-item>

        <el-form-item label="商品标题">
            <el-input class="inputmo" v-model="form.title" ></el-input>
        </el-form-item>

        <el-form-item label="商品类别">
            <el-select v-model="form.category_id" placeholder="请选择商品类别">
                <el-option v-for="item in categoryList"
                           :key="item.category_id"
                           :label="item.category_name"
                           :value="item.category_id" />
            </el-select>
        </el-form-item>

        <el-form-item label="发布时间">
            <el-col :span="11">
                <el-date-picker class="inputmo" type="date" placeholder="选择日期" v-model="form.create_at" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
                <el-time-picker class="inputmo" placeholder="选择时间" v-model="form.create_at" style="width: 100%;"></el-time-picker>
            </el-col>
        </el-form-item>

        <el-form-item label="商品价格">
            <el-input class="inputmo" v-model="form.price"></el-input>
        </el-form-item>

        <el-form-item label="商品详情">
            <el-input class="inputdetailmo" type="textarea" v-model="form.info"></el-input>
        </el-form-item>
        <el-form-item label="商品图片">

            <div id="wrapper">
                <h1>请上传图片</h1>
                <div class="upload-btn common mb_10" v-if="!isShow">
                    <label>
                        <input type="file" @change="uploadImg">
                    </label>
                </div>
                <div class="img-list-item common mb_10" v-if="isShow">
                    <img :src="form.img_path" class="common viewPhoto">
                    <i class="del-img" @click="forkImage"></i>
                </div>
            </div>

        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即发布</el-button>
            <el-button>取消</el-button>
        </el-form-item>

    </el-form>
</template>

<script>
    import * as categoryAPI from "../api/categories";
    import * as postproductAPI from "../api/publishGoods";
    export default {
        data() {
            return {
                isShow: false,
                categoryList: '',
                form: {
                    name: '',
                    title:'',
                    category_id: '',
                    price: '',
                    info: '',
                    img_path: '',
                    boss_id:'',
                    boss_name:'',
                    boss_avatar:'',
                }
            }
        },
        created() {
            this.getCategory()
        },
        methods: {
            onSubmit() {
                this.form.boss_id=localStorage.getItem('userId')
                this.form.boss_name=localStorage.getItem('userName')
                this.form.boss_avatar=localStorage.getItem('userAvatar')
                console.log(this.form)
                postproductAPI
                    .postProduct(this.form)
                    .then(res=>{
                        if (res.status===200){
                            console.log("发布成功")
                            console.log(res)
                        }else{
                            console.log("发布失败")
                            console.log(res)
                        }
                    })
            },
            getCategory() {
                categoryAPI
                    .listCategories()
                    .then(res => {
                        if (res.status === 200) {
                            const val = {
                                category_id: 0,
                                category_name: '其他'
                            }
                            const cate = res.data
                            cate.unshift(val)
                            this.categoryList = cate
                        } else {
                            this.notifyError('获取分类失败', res.msg)
                        }
                    })
                    .catch(err => {
                        this.notifyError('获取分类失败', err)
                    })
            },
            // 间接调用文件选择框
            uploadImg(e) {
                let _this = this;
                let files = e.target.files[0];
                if (!e || !window.FileReader) return; // 看支持不支持FileReader
                let reader = new FileReader();
                reader.readAsDataURL(files); // 这里是最关键的一步，转换就在这里
                reader.onloadend = function () {
                    _this.form.img_path = this.result;
                    _this.isShow = true;
                }
            },

            forkImage() {
                this.form.img_path = [];
                this.isShow = false;
            }
        },
    }
</script>
<style scoped>
    .inputmo{
        width: auto;
    }
    .inputdetailmo{
        width: 100rpx;
        height: 100rpx;
    }
    #headImg{
        margin-left: 50px;
    }
    .viewPhoto{
        border: 1px rgba(99, 199, 210, 0.79) dashed;
        width: 200px;
        height: 200px;
    }
    #saveImage{
        display: none;
    }
    .save{
        margin: 30px auto;
    }
    .viewPhoto{
        position: relative;
        float: left;
        margin-right: 10%;
    }
    .el-icon-plus{
        font-size: 50px;
        color: rgba(99, 199, 210, 0.79);
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        max-width: 50%;
        text-align: center;
    }

</style>
