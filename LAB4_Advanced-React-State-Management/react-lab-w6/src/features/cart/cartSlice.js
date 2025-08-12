import { createSlice } from '@reduxjs/toolkit';

// โจทย์: สร้าง Redux slice สำหรับจัดการตะกร้าสินค้า
// เฉลย: โค้ดด้านล่างคือเวอร์ชันที่เพิ่ม reducer `removeItem` แล้ว
const initialState = { items: [], totalQuantity: 0 };

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({ ...newItem, quantity: 1, price: newItem.price || 999 });
      } else {
        existingItem.quantity++;
      }
    },
    removeItem(state, action) {
        const idToRemove = action.payload;
        const existingItem = state.items.find(item => item.id === idToRemove);
        if (existingItem) {
            state.totalQuantity--;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== idToRemove);
            } else {
                existingItem.quantity--;
            }
        }
    }
  }
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;