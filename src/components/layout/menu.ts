import {
  Bell,
  HelpCircle,
  LayoutDashboard,
  ListTodo,
  LogIn,
  Monitor,
  Palette,
  Settings,
  ShieldCheck,
  UserCog,
  UserPlus,
  Users,
  Wrench,
} from "lucide-react";

import type { SidebarData } from "./types";

export const menuItems: SidebarData = {
  user: {
    name: "Chinthaka Bandara",
    email: "chinthakapb@gmail.com",
    avatar: "/avatars/shadcn.jpg",
  },
  sections: [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      url: "/",
    },
    {
      title: "Tasks",
      icon: ListTodo,
      url: "/tasks",
    },
    {
      title: "Users",
      icon: Users,
      url: "/users",
    },
    {
      title: "Pages",
      icon: ShieldCheck,
      items: [
        {
          title: "Sign In",
          url: "/signIn",
          icon: LogIn,
        },
        {
          title: "Sign Up",
          url: "/signUp",
          icon: UserPlus,
        },
        // {
        //   title: "Forgot Password",
        //   url: "/forgotPassword",
        // },
        // {
        //   title: "OTP",
        //   url: "/otp",
        // },
      ],
    },
    {
      title: "Settings",
      icon: Settings,
      items: [
        {
          title: "Profile",
          url: "/settings",
          icon: UserCog,
        },
        {
          title: "Account",
          url: "/settings/account",
          icon: Wrench,
        },
        {
          title: "Appearance",
          url: "/settings/appearance",
          icon: Palette,
        },
        {
          title: "Notifications",
          url: "/settings/notifications",
          icon: Bell,
        },
        {
          title: "Display",
          url: "/settings/display",
          icon: Monitor,
        },
      ],
    },
    {
      title: "Help",
      icon: HelpCircle,
      url: "/help-center",
    },
  ],
};
