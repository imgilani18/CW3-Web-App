<script setup>
defineProps({
  cart: {
    type: Array,
    required: true
  },
  removeItem: {
    type: Function,
    required: true
  }
})
</script>

<script>
import { fetchApi } from '../util'

export default {
  data() {
    return {
      name: '',
      phone: ''
    }
  },
  methods: {
    async checkout() {
      const orderResult = await fetchApi('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: this.name,
          phone: this.phone,
          lessons: this.cart.map(item => ({
            subject: item.subject,
            space: item.space - item.availability,
          })),
        }),
      })
      if (orderResult.status !== 201) {
        alert('Checkout failed')
        window.location = window.location.origin
      }

      const lessonPutResult = await fetchApi('/api/lesson', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lessons: this.cart.map(item => ({
            subject: item.subject,
            space: item.space - item.availability,
          })),
        }),
      })

      if (lessonPutResult.status !== 200) {
        alert('Checkout failed')
      } else {
        alert('Checkout successful')
      }
      window.location = window.location.origin
    },
  },
  computed: {
    amount() {
      return this.cart.map(item => item.price * (item.space - item.availability)).reduce((a, b) => a + b, 0)
    },
    isValidName() {
      // Name must be alhpabets 2-50 characters long
      return /^[a-zA-Z ]{2,50}$/.exec(this.name)
    },
    isValidPhone() {
      // Phone must be a number 10-12 digits long
      return /^[0-9]{10,12}$/.exec(this.phone)
    },
  },
}

</script>

<template>
  <main>
    <div v-if="cart.length">
      <h1 class ='boxheading2'>
        Shopping Cart
      </h1>
      <div class="cart" >

        <div class="item" v-for="item in cart" v-bind:key="item.subject">
          <div class="item-top">
            <span>
              Subject: {{ item.subject }}<br />
              Location: {{ item.location }}<br />
              Price: £{{ item.price }}<br />
              Spaces: {{ item.space - item.availability }}<br />
            </span>

            <img :src="'/src/assets/public/images/' + item.subject + '.png'">
          </div>
          <div class="item-bot">
            <button @click="item.availability++">
              Remove
            </button>
          </div>
        </div> </div>
    </div>

    <div v-if="cart.length" id="checkout">
      <div><b>Total: </b>£{{ amount }}</div>
      <h1 class ='boxheading2'>
        Checkout
      </h1>
      <span>Name: </span> <input :class="{ valid: isValidName }" v-model='name' type="text" />
      <span>Phone: </span> <input :class="{ valid: isValidPhone }" v-model='phone' type="text" />
      <button @click="checkout" :disabled="!isValidName || !isValidPhone">Checkout</button>
    </div>
    </main>
</template>
