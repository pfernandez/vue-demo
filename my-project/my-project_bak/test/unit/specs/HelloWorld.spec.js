import Vue from 'vue'
import HelloWorld from '@/components/HelloWorld'

describe('HelloWorld.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(HelloWorld)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .toEqual('Welcome to Your Vue.js App')
  })
  it('can add an item to a list', () => {
    const Constructor = Vue.extend(HelloWorld)
    const vm = new Constructor().$mount()
    let nextID = vm.itemList.length
    vm.nextItem = 'foo'
    vm.addItem()
    expect(vm.itemList.pop()).toEqual({ id: nextID, text: 'foo' })
  })
})
