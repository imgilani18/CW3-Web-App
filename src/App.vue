<script setup>
import Lesson from './components/Lesson.vue'
import Checkout from './components/Checkout.vue'
import Options from './components/Options.vue'

</script>

<script>
import { fetchApi } from './util'

export default {
  data() {
    return {
      searchTerm: '',
      state: {
        items: [],
        cart: []
      },
      page: 'lesson'
    }
  },
  methods: {
    search(term) {
      fetchApi(`/api/lesson?search=${term || ''}`)

        .then(res => res.json())
        .then((items) => {
          items.forEach(item => {
            item.availability = item.space
          })

          this.state.items = items
          console.log(this.state)
        })
    },
    addItem: function(item) {
      item.availability--
    },
    removeItem: function(item) {
      item.availability++
    },
  },
  computed: {
    cart() {
      const cart = this.state.items.filter(item => item.availability < item.space)
      console.log(cart)
      return cart || []
    },
  },
  beforeMount() {
    this.search('')
  },
}
</script>

<template>
  <div id="navbar">
    <h2 >
      <a class="link" href="/">Home</a>
    </h2>
    <div>
      <div @click="page='cart'" v-if="cart.length" class="link">
        <img class="icon" src="https://img.icons8.com/ios-glyphs/30/null/shopping-cart--v1.png"/>
      {{ cart.map(i => i.space - i.availability).reduce((a,b) => a+b, 0)}}
      </div>
    </div>
  </div>
  <div class="container">
    <div id="options">
      <h1 class ='boxheading'>
      </h1>
      <input placeholder="Search" @input="search($event.target.value)" />
      <Options :lessons="state.items" />

    </div>
  <Lesson :lessons="state.items" :additem="addItem" v-if="page=='lesson'"/>
  <Checkout :cart="cart" :removeItem="removeItem" v-if="page=='cart'"/>
  </div>
</template>
