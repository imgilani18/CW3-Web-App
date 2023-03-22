<script setup>
defineProps({
  lessons: {
    type: Array,
    required: true
  },
  addItem: {
    type: Function,
    required: true
  },

})
</script>

<script>
export default {
  computed: {
    computedItems() {
      // Ordering based on orderBy
      return this.orderBy === 'ascending' ? this.lessons: this.lessons.slice().reverse()
    },
  }
}
</script>

<template>
  <main>
    <h1>
      Items
    </h1>
    <div class="items">
      <div class="item" v-for="item in computedItems" v-bind:key="item.id">
        <div class="item-top">
          <span>
            Subject: {{ item.subject }}<br />
            Location: {{ item.location }}<br />
            Price: £{{ item.price }}<br />
            Space: {{ item.availability }}<br />
          </span>

          <img :src="'/src/assets/public/images/' + item.subject + '.png'">
        </div>
        <div class="item-bot">
          <button @click="item.availability--" :disabled="item.availability == 0">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  </main>
</template>
