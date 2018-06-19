import { mutations } from '@/store.js'

describe('addItem', () => {
  it('can add an item to a list', () => {
    const state = { itemList: [] }
    let item = { id: 0, text: 'foo' }
    mutations.addItem(state, item)
    expect(state.itemList.pop()).toEqual(item)
  })
})
