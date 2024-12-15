<template>
  <div>
    <div class="list">
      <template v-if="filterList.length">
        <div v-for="(item,index) in filterList" :key="index" class="list-item">
          <div class="info first">
            <h2 class="title">
              {{ item.examName }} 
              <el-tag :type="getType(item)" size="small">{{ item.examType === 'trainingPackage' ? '套餐' : '公开' }}</el-tag>
            </h2>
            <div v-if="item.trainingPackageName" class="plan">所属套餐: {{ item.trainingPackageName }}</div>
          </div>

          <div class="info">
            <h2 class="title">{{ item.scores }}</h2>
            <div class="plan">成绩</div>
          </div>

          <div class="info">
            <h2 class="title" :class="item.examResult === 'qualified' ? 'green' : 'red'">{{ item.examResult === 'qualified' ? '合格' : '不合格' }}</h2>
            <div class="plan">考试结果</div>
          </div>

          <div class="info">
            <div class="plan">{{ item.createTime }}</div>
          </div>

          <a class="view-btn" href="javascript:;" @click="toExam(item)">查看考试</a>
        </div>
      </template>
      <empty v-else></empty>
    </div>

    <!-- 分页 -->
    <pagination
      v-if="filterList.length"
      :page.sync="page"
      :total="total"
      @change="handlePaginationChange"
    ></pagination>
  </div>
</template>
<script>
import Pagination from 'components/pagination/pagination.vue'
import Empty from 'components/empty/empty.vue'
import { getUserExam } from 'api'
export default {
  name: 'XXX', // XXX
  components: {
    Empty,
    Pagination
  },
  props: {
    
  },
  computed: {

  },
  data () {
    return {
      page: 1,
      total: 1,
      filterList: []
    }
  },
  methods: {
    getType (item) {
      return item.examType === 'trainingPackage' ? '' : 'success'
    },
    // 分页值更新
    handlePaginationChange (page) {
      this.page = page
      this.getData()
    },
    getData () {
      const params = {
        page: {
          size: 10,
          current: this.page,
        }
      }
      getUserExam(params).then(res => {
        let { data } = res
        this.filterList = data.records
      }).catch(() => {
        this.filterList = []
      })
    },
    toExam (item) {
      this.$router.push({ path: "/exam/res/" + item.id})
    }
  },
  mounted () {
    this.getData()
  },
}
</script>
<style scoped>
.list {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column nowrap;
}
.list-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0;
  border-bottom: 1px solid #eff1f0;
}
.info {
  /* flex: 1; */
}
.info.first {
  width: 80%;
}
.title {
  font-size: 18px;
  color: #07111b;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 16px;
}
.plan {
  font-size: 14px;
  color: #9199a1;
}
.title.green {
  color: #4caf50;
}
.title.red {
  color: rgba(240,20,20,0.8);
}
.view-btn {
  width: 4em;
  color: #f20d0d;
  line-height: 20px;
  border: 1px solid #f20d0d;
  border-radius: 100px;
  padding: 8px 24px;
  transition: all .2s;
  margin-left: 36px;
}
.view-btn:hover {
  color: #c20a0a;
  border-color: #c20a0a;
}
</style>