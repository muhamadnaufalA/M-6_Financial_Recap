import React from "react";
import DashboardStatsGrid from "../components/DashboardStatsGrid";
import BuyerProfilePieChart from "../components/BuyerProfilePieChart";
import TransactionChart from "../components/TransactionChart";
import RecentOrders from "../components/RecentOrder";
import PopularProducts from "../components/PopularProducts";

export default function Dashboard() {
    return (
        <div className="flex flex-col gap-4">
            <DashboardStatsGrid />
            <div className="flex flex-row gap-4 w-full">
                <TransactionChart />
                <BuyerProfilePieChart />
            </div>
            <div className="flex flex-row gap-4 w-full">
                <RecentOrders />
                <PopularProducts />
            </div>
        </div>
    )
}