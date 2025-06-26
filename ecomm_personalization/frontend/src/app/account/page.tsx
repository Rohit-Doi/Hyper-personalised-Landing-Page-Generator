'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductRecommendations from '@/components/recommendations/ProductRecommendations';
import { motion, AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

const API_URL = '/api/v1/profile/u1';

const mockOrders = [
  {
    id: 'ORD-1001',
    date: '2024-05-01',
    status: 'Delivered',
    total: 129.99,
    items: 2,
  },
  {
    id: 'ORD-1000',
    date: '2024-04-15',
    status: 'Shipped',
    total: 89.99,
    items: 1,
  },
];

const mockAddresses = [
  {
    label: 'Home',
    address: '123 Main St, New York, NY 10001, United States',
  },
  {
    label: 'Work',
    address: '456 Park Ave, New York, NY 10022, United States',
  },
];

const tabs = [
  { id: 'profile', label: 'Profile' },
  { id: 'orders', label: 'Orders' },
  { id: 'addresses', label: 'Addresses' },
  { id: 'settings', label: 'Settings' },
];

type TabType = 'profile' | 'orders' | 'addresses' | 'settings';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [user, setUser] = useState<any>(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch profile');
        return res.json();
      })
      .then(data => {
        setUser(data);
        setForm(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update profile');
        return res.json();
      })
      .then(data => {
        setUser(data);
        setEditing(false);
        setLoading(false);
        toast.success('Profile updated!');
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
        toast.error('Failed to update profile');
      });
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setForm({ ...form, avatar: url });
    }
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;

  return (
    <main className="relative flex min-h-screen flex-col bg-[#fcf8f8] overflow-x-hidden" style={{ fontFamily: 'Plus Jakarta Sans, Noto Sans, sans-serif' }}>
      <Toaster position="top-center" />
      {/* Logout Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <motion.div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="bg-white rounded-xl p-8 shadow-lg flex flex-col items-center" initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }}>
              <h3 className="text-lg font-bold mb-4">Are you sure you want to sign out?</h3>
              <div className="flex gap-4">
                <button className="px-6 py-2 bg-[#e92932] text-white rounded-lg font-bold hover:bg-[#c8232c]" onClick={() => { setShowLogoutModal(false); toast.success('Signed out! (mock)'); }}>Yes, Sign Out</button>
                <button className="px-6 py-2 bg-gray-200 text-[#1b0e0e] rounded-lg font-bold hover:bg-gray-300" onClick={() => setShowLogoutModal(false)}>Cancel</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex flex-1 justify-center items-center py-12">
        <motion.div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl flex flex-col md:flex-row overflow-hidden" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {/* Sidebar Navigation */}
          <nav className="flex md:flex-col border-b md:border-b-0 md:border-r border-[#f3e7e8] bg-[#fcf8f8] p-4 md:min-w-[180px] gap-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-4 py-2 rounded-lg text-left text-base font-medium transition-colors ${activeTab === tab.id ? 'bg-[#e92932] text-white' : 'text-[#1b0e0e] hover:bg-[#f3e7e8]'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                {tab.label}
              </motion.button>
            ))}
            <motion.button className="px-4 py-2 rounded-lg text-left text-base font-medium text-[#994d51] hover:bg-[#f3e7e8] mt-2" whileHover={{ scale: 1.05 }} onClick={() => setShowLogoutModal(true)}>Sign Out</motion.button>
          </nav>
          {/* Main Content */}
          <div className="flex-1 p-8">
            <AnimatePresence mode="wait">
              {activeTab === 'profile' && (
                <motion.div key="profile" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }} className="flex flex-col items-center gap-6">
                  {/* Avatar with upload */}
                  <div className="relative">
                    <div className="size-24 rounded-full bg-center bg-cover border-4 border-[#f3e7e8]" style={{ backgroundImage: `url('${user?.avatar}')` }}></div>
                    {editing && (
                      <label className="absolute bottom-0 right-0 bg-[#e92932] text-white rounded-full p-2 cursor-pointer hover:bg-[#c8232c] shadow-lg">
                        <input type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                        <span className="text-xs">Edit</span>
                      </label>
                    )}
                  </div>
                  <div className="w-full max-w-xs flex flex-col gap-4">
                    <form onSubmit={handleSave} className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-[#994d51] font-medium">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={editing ? form.name : user.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-[#e7d0d1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e92932]"
                          disabled={!editing}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[#994d51] font-medium">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={editing ? form.email : user.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-[#e7d0d1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e92932]"
                          disabled={!editing}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[#994d51] font-medium">Phone</label>
                        <input
                          type="tel"
                          name="phone"
                          value={editing ? form.phone : user.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-[#e7d0d1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e92932]"
                          disabled={!editing}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[#994d51] font-medium">Age Group</label>
                        <select
                          name="ageGroup"
                          value={editing ? form.ageGroup : user.ageGroup}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-[#e7d0d1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e92932]"
                          disabled={!editing}
                        >
                          <option value="18-24">18-24</option>
                          <option value="25-34">25-34</option>
                          <option value="35-44">35-44</option>
                          <option value="45-54">45-54</option>
                          <option value="55+">55+</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[#994d51] font-medium">Gender</label>
                        <select
                          name="gender"
                          value={editing ? form.gender : user.gender}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-[#e7d0d1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e92932]"
                          disabled={!editing}
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                          <option value="prefer-not-to-say">Prefer not to say</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[#994d51] font-medium">Address</label>
                        <input
                          type="text"
                          name="address"
                          value={editing ? form.address : user.address}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-[#e7d0d1] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e92932]"
                          disabled={!editing}
                        />
                      </div>
                      <div className="flex gap-4 mt-4">
                        {editing ? (
                          <>
                            <button type="submit" className="px-6 py-2 bg-[#e92932] text-white rounded-lg font-bold hover:bg-[#c8232c]">Save</button>
                            <button type="button" onClick={() => setEditing(false)} className="px-6 py-2 bg-gray-200 text-[#1b0e0e] rounded-lg font-bold hover:bg-gray-300">Cancel</button>
                          </>
                        ) : (
                          <button type="button" onClick={() => setEditing(true)} className="px-6 py-2 bg-[#e92932] text-white rounded-lg font-bold hover:bg-[#c8232c]">Edit Profile</button>
                        )}
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}
              {activeTab === 'orders' && (
                <motion.div key="orders" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
                  <h2 className="text-xl font-bold mb-6 text-[#1b0e0e]">Order History</h2>
                  {mockOrders.length === 0 ? (
                    <p className="text-[#994d51]">You haven't placed any orders yet.</p>
                  ) : (
                    <table className="w-full text-left border-separate border-spacing-y-2">
                      <thead>
                        <tr className="text-[#994d51] text-base">
                          <th className="py-2">Order #</th>
                          <th>Date</th>
                          <th>Status</th>
                          <th>Total</th>
                          <th>Items</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockOrders.map(order => (
                          <tr key={order.id} className="bg-[#fcf8f8] rounded-lg">
                            <td className="py-2 font-medium">{order.id}</td>
                            <td>{order.date}</td>
                            <td>{order.status}</td>
                            <td>${order.total.toFixed(2)}</td>
                            <td>{order.items}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </motion.div>
              )}
              {activeTab === 'addresses' && (
                <motion.div key="addresses" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
                  <h2 className="text-xl font-bold mb-6 text-[#1b0e0e]">Saved Addresses</h2>
                  <div className="flex flex-col gap-4">
                    {mockAddresses.map(addr => (
                      <div key={addr.label} className="flex flex-col md:flex-row md:items-center gap-2 bg-[#fcf8f8] rounded-lg p-4 border border-[#e7d0d1]">
                        <div className="font-bold text-[#994d51] min-w-[60px]">{addr.label}</div>
                        <div className="flex-1 text-[#1b0e0e]">{addr.address}</div>
                        <button className="text-[#e92932] text-sm font-medium hover:underline">Edit</button>
                      </div>
                    ))}
                    <button className="flex items-center gap-2 border-2 border-dashed border-[#e92932] rounded-lg p-4 text-[#e92932] hover:bg-[#f3e7e8] font-medium mt-2">
                      <span className="text-xl">+</span> Add New Address
                    </button>
                  </div>
                </motion.div>
              )}
              {activeTab === 'settings' && (
                <motion.div key="settings" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>
                  <div className="flex flex-col gap-8">
                    <div>
                      <h2 className="text-xl font-bold mb-4 text-[#1b0e0e]">Change Password</h2>
                      <div className="flex flex-col gap-3 max-w-xs">
                        <input type="password" placeholder="Current Password" className="rounded-lg border border-[#e7d0d1] px-4 py-2 text-base" />
                        <input type="password" placeholder="New Password" className="rounded-lg border border-[#e7d0d1] px-4 py-2 text-base" />
                        <input type="password" placeholder="Confirm New Password" className="rounded-lg border border-[#e7d0d1] px-4 py-2 text-base" />
                        <button className="mt-2 bg-[#e92932] text-white rounded-lg py-2 font-bold">Update Password</button>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-[#f3e7e8]">
                      <h3 className="font-bold text-[#e92932] mb-2">Danger Zone</h3>
                      <p className="text-sm text-[#994d51] mb-2">Once you delete your account, there is no going back. Please be certain.</p>
                      <button className="text-[#e92932] text-sm font-medium hover:underline">Delete My Account</button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            {/* Skeleton Loader */}
            {loading && (
              <div className="animate-pulse flex flex-col items-center gap-4 mt-8">
                <div className="size-24 rounded-full bg-gray-200" />
                <div className="w-48 h-6 bg-gray-200 rounded" />
                <div className="w-32 h-6 bg-gray-200 rounded" />
                <div className="w-40 h-6 bg-gray-200 rounded" />
              </div>
            )}
          </div>
        </motion.div>
      </div>
      <ProductRecommendations title="Recommended for You" maxItems={4} context={{ section: 'account' }} className="p-4" />
    </main>
  );
}
