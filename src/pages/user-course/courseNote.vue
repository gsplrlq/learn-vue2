<template>
  <div>
    <div class="list">
      <template v-if="filterList.length">
        <div v-for="(item,index) in filterList" :key="index" class="list-item">
          <div class="info first">
            <h2 class="title">{{ item.courseName }}</h2>
            <div class="plan">内容: {{ item.content }}</div>
          </div>
  
          <div class="info">
            <div class="plan">{{ item.createTime }}</div>
          </div>
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
import { getCourseNote } from 'api'
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
      getCourseNote(params).then(res => {
        let { data } = res
        this.filterList = data.records
        this.total = data.total
      }).catch(() => {
        this.filterList = []
      })
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
  width: 300px;
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