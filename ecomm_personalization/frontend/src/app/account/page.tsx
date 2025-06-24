'use client';

import { useState } from 'react';
import Link from 'next/link';
import ProductRecommendations from '@/components/recommendations/ProductRecommendations';

const mockUser = {
  avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  name: 'John Doe',
  email: 'john@example.com',
  phone: '9876543210',
  ageGroup: '25-34',
  gender: 'male',
  address: '123 Main St, City, Country',
};

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
  const [user, setUser] = useState(mockUser);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(user);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(form);
    setEditing(false);
  };

  return (
    <main className="relative flex min-h-screen flex-col bg-[#fcf8f8] overflow-x-hidden" style={{ fontFamily: 'Plus Jakarta Sans, Noto Sans, sans-serif' }}>
      <div className="flex flex-1 justify-center items-center py-12">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl flex flex-col md:flex-row overflow-hidden">
          {/* Sidebar Navigation */}
          <nav className="flex md:flex-col border-b md:border-b-0 md:border-r border-[#f3e7e8] bg-[#fcf8f8] p-4 md:min-w-[180px] gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`px-4 py-2 rounded-lg text-left text-base font-medium transition-colors ${activeTab === tab.id ? 'bg-[#e92932] text-white' : 'text-[#1b0e0e] hover:bg-[#f3e7e8]'}`}
              >
                {tab.label}
              </button>
            ))}
            <button className="px-4 py-2 rounded-lg text-left text-base font-medium text-[#994d51] hover:bg-[#f3e7e8] mt-2">Sign Out</button>
          </nav>
          {/* Main Content */}
          <div className="flex-1 p-8">
            {activeTab === 'profile' && (
              <div className="flex flex-col items-center gap-6">
                <div className="size-24 rounded-full bg-center bg-cover border-4 border-[#f3e7e8]" style={{ backgroundImage: `url('${mockUser.avatar}')` }}></div>
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
              </div>
            )}
            {activeTab === 'orders' && (
              <div>
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
              </div>
            )}
            {activeTab === 'addresses' && (
              <div>
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
              </div>
            )}
            {activeTab === 'settings' && (
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
            )}
          </div>
        </div>
      </div>
      <ProductRecommendations title="Recommended for You" maxItems={4} context={{ section: 'account' }} className="p-4" />
    </main>
  );
}
