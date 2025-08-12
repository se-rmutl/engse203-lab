import { createContext, useState, useContext } from 'react';

// โจทย์: สร้าง Context สำหรับจัดการสถานะการ Login
// เฉลย: โค้ดด้านล่างคือเวอร์ชันที่ส่ง value ที่ถูกต้องแล้ว
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (username) => setUser({ name: username });
  const logout = () => setUser(null);

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};