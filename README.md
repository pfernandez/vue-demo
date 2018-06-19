# Vue JS Up and Running

## Initial setup
```sh
brew install node
npm install -g vue-cli
```

## Install and run the Webpack template
```sh
vue init webpack my-project
cd my-project
npm install
npm run dev

# or, when ready...
npm run build
```

## Include a new component

### Create `components/TodoItem.vue`
```html
<template>
  <li>{{ todo.text }}</li>
</template>

<script>
export default {
  name: 'todo-item',
  props: ['todo']
}
</script>
```

### Add to `components/HelloWorld.vue`
#### HTML
```html
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
```

#### JavaScript
```html
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
```

## Testing
### Unit
```
npm run unit
```
* Unit tests run in JSDOM with Jest, or in PhantomJS with Karma + Mocha + karma-webpack.
#### Set up watching in `package.json`
```
"unit": "jest --watchAll --config test/unit/jest.conf.js --coverage",
```
#### Test our new method
```
// add to describe('HelloWorld.vue' ...

it('can add an item to a list', () => {
  const Constructor = Vue.extend(HelloWorld)
  const vm = new Constructor().$mount()
  let nextID = vm.itemList.length
  vm.nextItem = 'foo'
  vm.addItem()
  expect(vm.itemList.pop()).toEqual({ id: nextID, text: 'foo' })
})
```

### E2E
```
npm run e2e
```
* End-to-end tests with Nightwatch.
  * Run tests in multiple browsers in parallel.
  * Works with one command out of the box:
    * Selenium and chromedriver dependencies automatically handled.
    * Automatically spawns the Selenium server.

## State management with Vuex
```
npm install vuex --save
```
* Inspired by Flux, Redux and The Elm Architecture.
* Passing props can be tedious for deeply nested components, and simply doesn't work for sibling components.
* Allows multiple components to share the same state in a global singleton.
* Works with [vue-devtools](https://github.com/vuejs/vue-devtools) to allow time travel debugging:
  ![alt time-travel debugging](https://raw.githubusercontent.com/vuejs/vue-devtools/master/media/demo.gif)

### Create `src/store.js`
```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  itemList: [
    { id: 0, text: 'chloe' },
    { id: 1, text: 'Cheese' },
    { id: 2, text: 'Whatever else humans are supposed to eat' }
  ]
}

export const mutations = {
  addItem (state, item) {
    state.itemList.push(item)
  }
}

const actions = {} // side-effecting or async functions
const getters = {} // normal functions

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})
```

### Modify `main.js`
```
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
```

### Modify `HelloWorld.vue`
```js
data () {
  return {
    msg: 'Welcome to Your Vue.js App',
    nextItem: ''
  }
},
computed: {
  itemList () {
    return this.$store.state.itemList
  }
},
methods: {
  addItem: function () {
    let item = { id: this.itemList.length, text: this.nextItem }
    this.$store.commit('addItem', item)
  }
}
```

### Testing
Unit testing mutations is easy...
```
import { mutations } from '@/store.js'

describe('addItem', () => {
  it('can add an item to a list', () => {
    const state = { itemList: [] }
    let item = { id: 0, text: 'foo' }
    mutations.addItem(state, item)
    expect(state.itemList.pop()).toEqual(item)
  })
})
```
...but when testing components, the store must be mocked. Mocking the store is
beyond the scope of this guide, but [this article](https://medium.com/@lachlanmiller_52885/mocking-vuex-in-vue-unit-tests-b6eda1c4d301)
covers it nicely.

## Sources
* [Webpack template repo](https://github.com/vuejs-templates/webpack)
* [Registering components](https://vuejs.org/v2/guide/components-registration.html#Local-Registration)
* [Composing with components](https://vuejs.org/v2/guide/#Composing-with-Components)
* Input handling
  * [`v-model`](https://vuejs.org/v2/guide/forms.html#Text)
  * [`v-on`](https://vuejs.org/v2/guide/#Handling-User-Input)
* [What is Vuex?](https://vuex.vuejs.org/)
* [Super-simple Vuex implementation](https://github.com/vuejs/vuex/tree/dev/examples/counter)

## Read more
* [Official guide](https://vuejs.org/v2/guide/)
* [Vue JS intro](https://css-tricks.com/intro-to-vue-1-rendering-directives-events/) on CSS-Tricks.com
