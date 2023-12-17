'use client'
import React, { useState } from 'react';

export function ModalPricing() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white p-6 rounded-lg max-w-4xl mx-auto text-gray-900 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Choose your plan</h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                <span className="sr-only">Close</span>
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Free Plan */}
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Free</h3>
                <p className="text-gray-500 mb-4">USD $0</p>
                <button className="bg-gray-200 w-full py-2 rounded text-sm mb-4">Choose Plan</button>
                <p className="text-gray-700 mb-4">For people just getting started with Parion</p>
                <ul className="text-sm text-gray-700">
                  <li>✓ Unlimited messages, interactions, and history</li>
                  <li>✓ Access to our Parion model</li>
                  <li>✓ Access on Web, iOS, and Android</li>
                </ul>
              </div>

              {/* Plus Plan */}
              <div className="bg-gray-100 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-green-600 mb-2">Plus</h3>
                <p className="text-gray-500 mb-4">USD $20</p>
                <button className="bg-green-500 w-full py-2 rounded text-white text-sm mb-4">Choose Plan</button>
                <p className="text-gray-700 mb-4">Everything in Free, and:</p>
                <ul className="text-sm text-gray-700">
                  <li>✓ Access to Parion, our most capable model</li>
                  <li>✓ Browse, create, and use Parion</li>
                  <li>✓ Access to additional tools like DALL-E, Browsing, Advanced Data Analysis and more</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* The rest of your page content */}
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Show Plans
        </button>
      </div>
    </>
  );
}
