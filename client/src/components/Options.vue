<script setup>
defineProps({
  lessons: {
    type: Array,
    required: true
  },
})
</script>


<script>
export default {
  data() {
    return {
      sortBy: 'subject',
      orderBy: 'ascending',
    }
  },
  methods: {
    sort(evt) {
      const by = evt.target.innerText.toLowerCase()
      this.lessons.sort((a, b) => {
        if (a[by] < b[by] && this.orderBy == 'ascending') return 1
        if(a[by] > b[by] && this.orderBy == 'descending') return 1
        return -1
      })
      this.sortBy = by
    },
    order(evt) {
      const by = evt.target.innerText.toLowerCase()
      console.log(by);
      if(by == this.orderBy) return;
      this.lessons.reverse();
      
      this.orderBy = by;
    }
  },
}
</script>

<template>
  <div id="controls">
    <ul id="sorting"><b>Sort By</b>
      <li @click="sort" :class="{ selected: sortBy == 'subject'}">Subject</li>
      <li @click="sort" :class="{ selected: sortBy == 'location'}">Location</li>
      <li @click="sort" :class="{ selected: sortBy == 'price'}">Price</li>
      <li @click="sort" :class="{ selected: sortBy == 'availability'}">Availability</li>
    </ul>
    <ul id="ordering">
      <li @click="order" :class="{ selected: orderBy == 'ascending'}">Ascending</li>
      <li @click="order" :class="{ selected: orderBy == 'descending'}">Descending</li>
    </ul>
  </div>
</template>
