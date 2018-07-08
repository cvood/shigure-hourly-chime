<template>
  <timeline>
  <div id="item" v-for="(item, index) in timeline_items" :key="index">
    <timeline-title> {{ item.date }} </timeline-title>
    <timeline-item font-color="#ffffff">
    <p>{{ item.title }}}</p>
    <p class="explaintion">{{ item.content }}</p>
    </timeline-item>
  </div>
  </timeline>
</template>

<script>
import { Timeline, TimelineItem, TimelineTitle } from 'vue-cute-timeline'

export default {
  components: {
    Timeline,
    TimelineItem,
    TimelineTitle
  },
  data () {
    return{
      timeline_items: ''
    }
  },
  methods: {
    getItem () {
      let _self = this 
      _self.$db.find({},function(err,docs){
        _self.timeline_items = docs
      })
    }
  },
  mounted() {
    this.getItem()
  },
}
</script>
<style>
  .explaintion {
    font-size: 12px;
  }
  .timeline-circle{
    -webkit-app-region: drag
  }
</style>