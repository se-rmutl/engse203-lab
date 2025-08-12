import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // { id, title, price, image, quantity }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...newItem, quantity: 1 });
      }
    },
    // TODO 3: สร้าง reducer ชื่อ `removeItem` (เฉลย)
    removeItem(state, action) {
      const idToRemove = action.payload;
      state.items = state.items.filter(item => item.id !== idToRemove);
    },
    // TODO 4: สร้าง reducer ชื่อ `updateQuantity` (เฉลย)
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      if (quantity < 1) {
        state.items = state.items.filter(item => item.id !== id);
      } else {
        const itemToUpdate = state.items.find(item => item.id === id);
        if (itemToUpdate) {
          itemToUpdate.quantity = quantity;
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;