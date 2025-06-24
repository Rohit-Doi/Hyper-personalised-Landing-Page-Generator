'use client';

import { FiCheckCircle, FiShoppingBag, FiTruck, FiCalendar, FiCreditCard } from 'react-icons/fi';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const OrderConfirmationPage = () => {
  const orderDetails = {
    orderNumber: '12345',
    date: new Date().toLocaleDateString(),
    estimatedDelivery: 'June 30, 2023',
    paymentMethod: 'Visa ending in 4242',
    shippingAddress: '123 Main St, Anytown, CA 12345',
    items: [
      {
        id: '1',
        name: 'Classic White T-Shirt',
        price: 29.99,
        quantity: 2,
        size: 'M',
        color: 'White',
        image: 'https://lh3.googleusercontent.com/...',
      },
      {
        id: '2',
        name: 'Slim Fit Jeans',
        price: 59.99,
        quantity: 1,
        size: '32',
        color: 'Blue',
        image: 'https://lh3.googleusercontent.com/...',
      },
    ],
    subtotal: 119.97,
    shipping: 5.99,
    tax: 9.60,
    total: 135.56,
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            {/* Success Message */}
            <div className="rounded-lg bg-white p-8 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <FiCheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h1 className="mt-4 text-2xl font-bold text-gray-900">Thank you for your order!</h1>
              <p className="mt-2 text-gray-600">
                Your order #{orderDetails.orderNumber} has been placed and is being processed.
              </p>
              <p className="text-gray-600">We'll send you a confirmation email with your order details.</p>
              
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <FiTruck className="h-5 w-5" />
                    </div>
                    <h3 className="ml-3 font-medium text-gray-900">Delivery Address</h3>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{orderDetails.shippingAddress}</p>
                </div>
                
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                      <FiCalendar className="h-5 w-5" />
                    </div>
                    <h3 className="ml-3 font-medium text-gray-900">Estimated Delivery</h3>
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{orderDetails.estimatedDelivery}</p>
                </div>
              </div>
              
              <div className="mt-6 rounded-lg border border-gray-200 p-4">
                <div className="flex items-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <FiCreditCard className="h-5 w-5" />
                  </div>
                  <h3 className="ml-3 font-medium text-gray-900">Payment Method</h3>
                </div>
                <p className="mt-2 text-sm text-gray-600">{orderDetails.paymentMethod}</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-8 rounded-lg bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">Order Summary</h2>
              
              <div className="mt-6 space-y-6">
                {orderDetails.items.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex justify-between">
                        <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                        <p className="ml-4 font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.color} · Size {item.size}
                      </p>
                      <p className="mt-1 text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 border-t border-gray-200 pt-6">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Subtotal</span>
                    <span className="text-sm font-medium">${orderDetails.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Shipping</span>
                    <span className="text-sm font-medium">${orderDetails.shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Tax</span>
                    <span className="text-sm font-medium">${orderDetails.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-3">
                    <span className="text-base font-bold">Total</span>
                    <span className="text-base font-bold">${orderDetails.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                <FiShoppingBag className="mr-2 h-5 w-5" />
                Continue Shopping
              </Link>
              <Link
                href="/account/orders"
                className="inline-flex items-center justify-center rounded-lg bg-[#e92932] px-6 py-3 text-sm font-medium text-white shadow-sm hover:bg-[#c8232c]"
              >
                View Order Details
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmationPage;
