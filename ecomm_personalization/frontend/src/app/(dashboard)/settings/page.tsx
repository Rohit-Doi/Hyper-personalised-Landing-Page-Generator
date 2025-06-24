'use client';

import { useState } from 'react';
import { CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

const tabs = [
  { name: 'General', href: '#', current: true },
  { name: 'Payments', href: '#', current: false },
  { name: 'Shipping', href: '#', current: false },
  { name: 'Taxes', href: '#', current: false },
  { name: 'Notifications', href: '#', current: false },
  { name: 'Team', href: '#', current: false },
  { name: 'API', href: '#', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function SettingsPage() {
  const [currentTab, setCurrentTab] = useState('General');
  const [formData, setFormData] = useState({
    storeName: 'Myntra Clone',
    storeDescription: 'Fashion and lifestyle store',
    storeEmail: 'contact@myntraclone.com',
    storePhone: '+1 (555) 123-4567',
    storeAddress: '123 Fashion Street',
    storeCity: 'New York',
    storeCountry: 'United States',
    storePostalCode: '10001',
    timezone: 'America/New_York',
    currency: 'USD',
    maintenanceMode: false,
    enableCustomerAccounts: true,
    enableReviews: true,
    enableWishlist: true,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveStatus({
        type: 'success',
        message: 'Settings saved successfully!',
      });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSaveStatus({ type: null, message: '' });
      }, 3000);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your store settings and preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <a
              key={tab.name}
              href={tab.href}
              onClick={(e) => {
                e.preventDefault();
                setCurrentTab(tab.name);
              }}
              className={classNames(
                currentTab === tab.name
                  ? 'border-pink-500 text-pink-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm'
              )}
              aria-current={currentTab === tab.name ? 'page' : undefined}
            >
              {tab.name}
            </a>
          ))}
        </nav>
      </div>

      {/* Settings Form */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {currentTab} Settings
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Update your {currentTab.toLowerCase()} settings.
            </p>

            {/* General Settings */}
            {currentTab === 'General' && (
              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">
                    Store Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="storeName"
                      id="storeName"
                      value={formData.storeName}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label htmlFor="storeDescription" className="block text-sm font-medium text-gray-700">
                    Store Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="storeDescription"
                      name="storeDescription"
                      rows={3}
                      value={formData.storeDescription}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="storeEmail" className="block text-sm font-medium text-gray-700">
                    Contact Email
                  </label>
                  <div className="mt-1">
                    <input
                      type="email"
                      name="storeEmail"
                      id="storeEmail"
                      value={formData.storeEmail}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label htmlFor="storePhone" className="block text-sm font-medium text-gray-700">
                    Contact Phone
                  </label>
                  <div className="mt-1">
                    <input
                      type="tel"
                      name="storePhone"
                      id="storePhone"
                      value={formData.storePhone}
                      onChange={handleChange}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="sm:col-span-6">
                  <label className="block text-sm font-medium text-gray-700">Store Address</label>
                  <div className="mt-1 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <input
                        type="text"
                        name="storeAddress"
                        placeholder="Street address"
                        value={formData.storeAddress}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        name="storeCity"
                        placeholder="City"
                        value={formData.storeCity}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <select
                        id="storeCountry"
                        name="storeCountry"
                        value={formData.storeCountry}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                        <option>Australia</option>
                        <option>India</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <input
                        type="text"
                        name="storePostalCode"
                        placeholder="Postal code"
                        value={formData.storePostalCode}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">
                    Timezone
                  </label>
                  <select
                    id="timezone"
                    name="timezone"
                    value={formData.timezone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                    Default Currency
                  </label>
                  <select
                    id="currency"
                    name="currency"
                    value={formData.currency}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="CAD">CAD (C$)</option>
                    <option value="INR">INR (₹)</option>
                  </select>
                </div>
              </div>
            )}

            {/* Feature Toggles */}
            {currentTab === 'General' && (
              <div className="mt-8 space-y-6">
                <h4 className="text-md font-medium text-gray-900">Features</h4>
                <div className="space-y-4">
                  <div className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="maintenanceMode"
                        name="maintenanceMode"
                        type="checkbox"
                        checked={formData.maintenanceMode}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="maintenanceMode" className="font-medium text-gray-700">
                        Maintenance Mode
                      </label>
                      <p className="text-gray-500">
                        Enable to put your store in maintenance mode. Only administrators will be able to access the store.
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="enableCustomerAccounts"
                        name="enableCustomerAccounts"
                        type="checkbox"
                        checked={formData.enableCustomerAccounts}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="enableCustomerAccounts" className="font-medium text-gray-700">
                        Customer Accounts
                      </label>
                      <p className="text-gray-500">
                        Allow customers to create accounts on your store.
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="enableReviews"
                        name="enableReviews"
                        type="checkbox"
                        checked={formData.enableReviews}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="enableReviews" className="font-medium text-gray-700">
                        Product Reviews
                      </label>
                      <p className="text-gray-500">
                        Allow customers to leave reviews on products.
                      </p>
                    </div>
                  </div>

                  <div className="relative flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="enableWishlist"
                        name="enableWishlist"
                        type="checkbox"
                        checked={formData.enableWishlist}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-500"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="enableWishlist" className="font-medium text-gray-700">
                        Wishlist
                      </label>
                      <p className="text-gray-500">
                        Allow customers to save products to a wishlist.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Other tabs content would go here */}
            {currentTab !== 'General' && (
              <div className="mt-6 text-center py-12 bg-gray-50 rounded-lg">
                <p className="text-gray-500">
                  {currentTab} settings will be available in a future update.
                </p>
              </div>
            )}
          </div>

          <div className="px-4 py-4 bg-gray-50 text-right sm:px-6">
            <div className="flex items-center justify-between">
              {saveStatus.type && (
                <div
                  className={`inline-flex items-center px-4 py-2 rounded-md text-sm font-medium ${
                    saveStatus.type === 'success'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {saveStatus.type === 'success' ? (
                    <CheckCircleIcon className="mr-2 h-5 w-5" />
                  ) : (
                    <ExclamationCircleIcon className="mr-2 h-5 w-5" />
                  )}
                  {saveStatus.message}
                </div>
              )}
              <div className="flex-1"></div>
              <button
                type="button"
                className="mr-3 inline-flex justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className={`inline-flex justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 ${
                  isSaving
                    ? 'bg-pink-400 cursor-not-allowed'
                    : 'bg-pink-600 hover:bg-pink-700'
                }`}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
