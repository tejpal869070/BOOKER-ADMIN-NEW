import React, { useState } from 'react';
import Swal from 'sweetalert2';

function RefundModal({ user_id, onClose, onRefund }) {
  const [reason, setReason] = useState('');
  const [type, setType] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await Swal.fire({
      title: 'Confirm Refund',
      html: `
        <p><strong>Amount:</strong> ${amount}</p>
        <p><strong>Type:</strong> ${type}</p>
        <p><strong>Reason:</strong> ${reason}</p>
        <p>Are you sure you want to refund this user?</p>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Refund',
      cancelButtonText: 'Cancel',
    });

    if (result.isConfirmed) {
      try {
        await onRefund({ user_id, amount, reason, type });
        Swal.fire('Success', 'Refund processed successfully', 'success');
        onClose();
      } catch (err) {
        Swal.fire('Error', 'Failed to process refund', 'error');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Refund User</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Refund Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Refund Type</label>
            <input
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Reason</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Submit Refund
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RefundModal;
