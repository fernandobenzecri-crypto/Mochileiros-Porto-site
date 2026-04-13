import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export function ProtectedRoute({ 
  children, 
  requireVip = false,
  requireAdmin = false 
}: { 
  children: React.ReactNode, 
  requireVip?: boolean,
  requireAdmin?: boolean
}) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-gray">
        <div className="w-12 h-12 border-4 border-brand-green border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && profile?.role !== 'admin') {
    return <Navigate to="/membro" />;
  }

  if (requireVip && !profile?.is_vip && profile?.role !== 'admin') {
    return <Navigate to="/clube-vip" />;
  }

  return <>{children}</>;
}
