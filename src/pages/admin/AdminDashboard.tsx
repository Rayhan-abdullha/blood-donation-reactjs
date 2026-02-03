
import { useState } from "react";
import { 
  Menu, X, PieChart, Users, Shield, Activity
} from "lucide-react";
export const MOCK_USERS = [
  { id: 1, name: "Rayhan Hossain", role: "Donor", status: "Verified", email: "rayhan@example.com", joined: "2024-01-10" },
  { id: 2, name: "Sumi Akter", role: "General User", status: "Pending", email: "sumi@example.com", joined: "2024-02-15" },
];

export const MOCK_REQUESTS = [
  { id: 101, patient: "Sabbir Ahmed", group: "O+", hospital: "DMCH", urgency: "Emergency", status: "Accepted", donor: "Abdur Rahman" },
  { id: 102, patient: "Rahima Begum", group: "AB-", hospital: "Apollo", urgency: "Normal", status: "Declined", donor: null },
];

// Components
import AnalyticsView from "./AnalisisView";
import UserManagementView from "./UserManagement";
import RequestManagementView from "./RequestManagement";
import DonorVerificationView from "./DonorVerificationView";
import StatCard from "./StateCard";
import SidebarItem from "./SidebarItems";
import useAnalysisCount from "../../hooks/useAnalysis";
import StatCardSkeleton from "./SkeletonCard";
import DonationConfirmedReviewRequest from "./DonationConfirmedRequest";
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("analytics");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data, isLoading } = useAnalysisCount()
  const state = data?.data
  const totalUsers = state?.total_users
  const totalVerifiedDonors = state?.total_verified_donors
  const totalCurrentRequests = state?.total_live_requests

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="flex max-w-auto mx-auto min-h-screen bg-slate-50 font-sans mt-[70px]">
      
      {/* 1. MOBILE MENU BUTTON */}
      <button 
        onClick={toggleMobileMenu}
        className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-red-600 text-white rounded-full shadow-2xl active:scale-95 transition-transform"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* 2. MOBILE OVERLAY */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside className={`
        /* Position & Size */
        fixed lg:sticky top-0 left-0 h-screen z-50
        w-72 bg-slate-900 text-white p-6 flex flex-col
        
        /* Animation */
        transition-all duration-300 ease-in-out
        
        /* Mobile Toggle Logic */
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        {/* Logo Section */}
        <div className="mb-10">
          <h2 className="text-xl font-black italic flex items-center gap-3">
            <span className="bg-red-600 p-2 rounded-xl not-italic shadow-lg shadow-red-900/20">🩸</span>
            ADMIN PANEL
          </h2>
          <p className="text-[10px] text-slate-500 font-bold tracking-[0.2em] mt-2 ml-12 uppercase">System v2.0.4</p>
        </div>

        {/* Navigation Section */}
        <nav className="space-y-1.5 flex-1">
          <SidebarItem 
            icon={<PieChart size={18}/>} 
            label="Analytics" 
            active={activeTab === 'analytics'} 
            onClick={() => { setActiveTab('analytics'); setIsMobileMenuOpen(false); }} 
          />
          <SidebarItem 
            icon={<Users size={18}/>} 
            label="User Management" 
            active={activeTab === 'users'} 
            onClick={() => { setActiveTab('users'); setIsMobileMenuOpen(false); }} 
          />
          <SidebarItem 
            icon={<Shield size={18}/>} 
            label="Donor Verification" 
            active={activeTab === 'verify'} 
            onClick={() => { setActiveTab('verify'); setIsMobileMenuOpen(false); }} 
          />
          <SidebarItem 
            icon={<Activity size={18}/>} 
            label="Blood Requests" 
            active={activeTab === 'requests'} 
            onClick={() => { setActiveTab('requests'); setIsMobileMenuOpen(false); }} 
          />
            <SidebarItem 
            icon={<PieChart size={18}/>} 
            label="Donation Review" 
            active={activeTab === 'donation review'} 
            onClick={() => { setActiveTab('donation review'); setIsMobileMenuOpen(false); }} 
          />
        </nav>

        {/* Server Health Widget */}
        <div className="p-4 bg-white/5 rounded-2xl border border-white/10 mt-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Server Status</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
          <p className="text-xs font-medium text-slate-300 italic">Optimal Performance</p>
        </div>
      </aside>

      {/* 4. MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-10 transition-all">
        
        {/* Top Quick Stats - Visible on all tabs */}
        {
          isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <StatCardSkeleton/>
            <StatCardSkeleton/>
            <StatCardSkeleton/>
            <StatCardSkeleton/>
          </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            <StatCard label="Total Users" val={totalUsers} trend="+12%" color="blue" />
            <StatCard label="Live Requests" val={totalCurrentRequests} trend="Active" color="red" />
            <StatCard label="Verified Donors" val={totalVerifiedDonors} trend="88%" color="green" />
            <StatCard label="Security" val="High" trend="Safe" color="slate" />
          </div>
          )
        }

        {/* Tab-Based Content */}
        <div className="min-h-[600px]">
          {activeTab === "analytics" && <AnalyticsView />}
          {activeTab === "users" && <UserManagementView />}
          {activeTab === "verify" && <DonorVerificationView />}
          {activeTab === "requests" && <RequestManagementView />}
          {activeTab === "donation review" && <DonationConfirmedReviewRequest />}
        </div>
      </main>
    </div>
  );
}
