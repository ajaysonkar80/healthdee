"use client";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { LogoutButton } from "../auth/LogoutButton";

export default function AdminTopBar() {
  return (
    <header className="flex items-center justify-between border-b bg-white px-6 py-4">
      {/* Page title */}
      <h1 className="text-lg font-semibold">Overview</h1>

      {/* Right section */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <Input
          placeholder="Search records..."
          className="w-64 bg-pink-50"
          label=""
        />

        {/* Notification */}
        <Button variant="ghost" size="icon">
          🔔
        </Button>

        {/* Admin Info */}
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>A</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">Admin</span>
        </div>

        {/* Logout */}
        <LogoutButton variant="destructive" />
      </div>
    </header>
  );
}
