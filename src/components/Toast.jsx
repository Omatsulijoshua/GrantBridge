/* src/components/Toast.jsx */
import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`toast ${toast.type === 'error' ? 'toast-error' : 'toast-success'}`}
        >
          {toast.type === 'error' ? (
            <AlertCircle size={20} style={{ color: 'var(--accent-danger)' }} />
          ) : (
            <CheckCircle size={20} style={{ color: 'var(--accent-success)' }} />
          )}
          <span style={{ fontSize: '0.9rem', fontWeight: 500, flex: 1 }}>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
