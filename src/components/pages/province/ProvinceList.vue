<template>
  <div>
    <el-card class="box-card" style="width: 1600px; margin: 20px auto">
      <div style="margin-left: 5px; margin-bottom: 5px">
        <el-form :inline="true" class="demo-form-inline" ref="ruleForm">
          <el-form-item label="">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-circle-plus-outline"
              style="margin-left: 5px"
              @click="add"
              >新增</el-button
            >
          </el-form-item>
          <el-form-item label="省份名称">
            <el-input
              v-model="provinceName"
              placeholder="请输入"
              style="width: 200px"
              prefix-icon="el-icon-search"
              clearable
              @keyup.enter.native="post"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="small"
              icon="el-icon-search"
              style="margin-left: 5px"
              @click="post()"
              >查询</el-button
            >
            <el-button
              type="success"
              size="small"
              icon="el-icon-refresh"
              native-type="reset"
              @click="resetRuleForm('ruleForm')"
              >重置</el-button
            >
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="tableData"
        :header-cell-style="{ background: 'rgb(232,244,255)', color: '#555' }"
        border
      >
        <el-table-column
          prop="provinceId"
          label="省份Id"
          width="480"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="provinceName"
          label="省份名称"
          width="480"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="operate" label="管理" align="center">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              icon="el-icon-edit"
              @click="mod(scope.row)"
              >修改</el-button
            >
            <el-button
              type="danger"
              size="small"
              icon="el-icon-delete"
              @click="del(scope.row.provinceId)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[5, 10, 20, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        style="align: right"
      >
      </el-pagination>
      <el-dialog :title="title" :visible.sync="centerDialogVisible" width="35%">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="省份名称" prop="admUsername">
            <el-col :span="10">
              <el-input v-model="form.provinceName"></el-input>
            </el-col>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
  
<script>
export default {
  name: "provinceList",
  data() {
    return {
      pageNum: 1, //页码
      pageSize: 5, //数量
      total: 0,
      provinceName: "", //省份名称
      tableData: [], //列表数据
      centerDialogVisible: false, //控制新增弹框
      title: "", //新增弹框标题
      //新增或者修改的表单
      form: {
        provinceId: "",
        provinceName: "",
      },
    };
  },
  methods: {
    post() {
      this.$axios
        .post(this.$httpUrl + "/province/page", {
          pageSize: this.pageSize,
          pageNum: this.pageNum,
          param: {
            provinceName: this.provinceName,
          },
        })
        .then((res) => {
          if (res.data.code == 200) {
            console.log(res);
            this.tableData = res.data.data;
            this.total = res.data.total;
            // 关闭加载框
            // this.loading = false
          } else {
            this.$message({
              type: "error",
              message: "数据加载失败",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "数据加载失败",
          });
        });
    },
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageNum = 1;
      this.pageSize = val;
      this.post();
    },
    //分页
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pageNum = val;
      this.post();
    },
    // 重置表单
    resetForm() {
      this.$refs.form.resetFields();
    },
    //重置查询的参数
    resetRuleForm(formName) {
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
        this.provinceName = "";
        this.post();
      });
    },
    //新增按钮
    add() {
      this.centerDialogVisible = true;
      this.title = "新增省份字典";
      //重置表单
      this.$nextTick(() => {
        this.resetForm();
        (this.form.provinceId = ""), (this.form.provinceName = "");
      });
    },
    //修改按钮
    mod(row) {
      //表单弹框
      this.centerDialogVisible = true;
      this.title = "修改省份字典";
      this.$nextTick(() => {
        //表单赋值
        this.form.provinceId = row.provinceId;
        this.form.provinceName = row.provinceName;
      });
    },
    // 更新省份字典
    save() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          //id存在则更新，否则新增
          if (this.form.provinceId) {
            this.doMod();
          } else {
            this.doSave();
          }
        } else {
          return false;
        }
      });
    },
    //新增
    doSave() {
      this.$axios
        .post(this.$httpUrl + "/province/save", this.form)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message.success("操作成功！");
            this.centerDialogVisible = false;
            this.post();
          } else {
            this.$message.error("操作失败");
          }
        });
    },
    //根据id删除省份信息
    del(id) {
      this.$confirm(
        "此操作将永久删除id为【" + id + "】的管理员, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true,
        }
      )
        .then(() => {
          this.$axios
            .get(this.$httpUrl + "/province/del?provinceId=" + id)
            .then((res) => {
              if (res.data.code == 200) {
                this.$message.success("删除成功!");
                this.post();
              } else {
                this.$message.error("删除失败!");
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //修改
    doMod() {
      this.$axios
        .post(this.$httpUrl + "/province/update", this.form)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message.success("操作成功！");
            this.centerDialogVisible = false;
            this.post();
          } else {
            this.$message.error("操作失败");
          }
        });
    },
  },
  beforeMount() {
    this.post();
  },
};
</script>

<style scoped></style>