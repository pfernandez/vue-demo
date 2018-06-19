<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <input v-model="nextItem" placeholder="edit me">
    <button v-on:click="addItem">Submit</button>
    <p>Item: {{ nextItem }}</p>
    <ol>
      <todo-item
        v-for="item in itemList"
        :key="item.id"
        :todo="item">
      </todo-item>
    </ol>
  </div>
</template>

<script>
import TodoItem from './TodoItem.vue'

export default {
  name: 'HelloWorld',
  components: {
    TodoItem
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      itemList: [
        { id: 0, text: 'Vegetables' },
        { id: 1, text: 'Cheese' },
        { id: 2, text: 'Whatever else humans are supposed to eat' }
      ],
      nextItem: ''
    }
  },
  methods: {
    addItem: function () {
      let item = { id: this.itemList.length, text: this.nextItem }
      this.itemList.push(item)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
