"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import {
  Milk,
  DollarSign,
  AlertCircle,
  TrendingUp,
  Calendar,
  MessageCircle,
  Settings,
  LogOut,
  User,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

interface DashboardStats {
  totalMilkDelivered: number;
  totalPayments: number;
  pendingRequests: number;
  recentDeliveries: Array<{
    id: string;
    date: string;
    quantity: number;
    quality: number;
  }>;
}

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalMilkDelivered: 0,
    totalPayments: 0,
    pendingRequests: 0,
    recentDeliveries: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch dashboard data
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Simulate API call - replace with actual API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStats({
        totalMilkDelivered: 1250.5,
        totalPayments: 45000,
        pendingRequests: 3,
        recentDeliveries: [
          { id: "1", date: "2024-01-15", quantity: 45.2, quality: 92 },
          { id: "2", date: "2024-01-14", quantity: 42.8, quality: 89 },
          { id: "3", date: "2024-01-13", quantity: 48.1, quality: 94 },
        ],
      });
    } catch (error) {
      console.error("Failed to fetch dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
                <Milk className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                SmartDairy Connect
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome back,</p>
                <p className="text-sm font-medium text-gray-900">
                  {user?.firstName} {user?.lastName}
                </p>
              </div>
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <Milk className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Milk Delivered
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.totalMilkDelivered} L
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Payments
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  KES {stats.totalPayments.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Pending Requests
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  {stats.pendingRequests}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link
                  href="/milk-delivery"
                  className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <Milk className="w-5 h-5 mr-3 text-green-600" />
                  Record Milk Delivery
                </Link>
                <Link
                  href="/service-request"
                  className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <AlertCircle className="w-5 h-5 mr-3 text-orange-600" />
                  Submit Service Request
                </Link>
                <Link
                  href="/payments"
                  className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <DollarSign className="w-5 h-5 mr-3 text-blue-600" />
                  View Payment History
                </Link>
                <Link
                  href="/chat"
                  className="flex items-center p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <MessageCircle className="w-5 h-5 mr-3 text-purple-600" />
                  Chat with Support
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Deliveries */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">
                  Recent Milk Deliveries
                </h2>
              </div>
              <div className="p-6">
                {stats.recentDeliveries.length > 0 ? (
                  <div className="space-y-4">
                    {stats.recentDeliveries.map((delivery) => (
                      <div
                        key={delivery.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <Milk className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {new Date(delivery.date).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              Quality Score: {delivery.quality}/100
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-gray-900">
                            {delivery.quantity} L
                          </p>
                          <p className="text-sm text-gray-500">
                            {delivery.quality >= 90
                              ? "Excellent"
                              : delivery.quality >= 80
                              ? "Good"
                              : "Fair"}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-8">
                    No recent deliveries
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link
            href="/milk-records"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-lg">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Milk Records
                </h3>
                <p className="text-sm text-gray-600">
                  View detailed delivery history
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/payments"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Payments</h3>
                <p className="text-sm text-gray-600">Track your earnings</p>
              </div>
            </div>
          </Link>

          <Link
            href="/services"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <div className="p-3 bg-orange-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Services</h3>
                <p className="text-sm text-gray-600">
                  Request veterinary or feed services
                </p>
              </div>
            </div>
          </Link>

          <Link
            href="/profile"
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-lg">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-medium text-gray-900">Profile</h3>
                <p className="text-sm text-gray-600">Manage your account</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
