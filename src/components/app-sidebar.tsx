"use client";

import logoImage from "@/public/images/precific-logo-image.webp";
import shortLogoImage from "@/public/images/precific-short-logo-image.webp";
import ComingSoonBadge from "@/src/components/coming-soon-badge";
import { Separator } from "@/src/components/core/separator";
import Menu from "@/src/components/menu";
import PlanCrownBadge from "@/src/components/plan-crown-badge";
import { useAuth } from "@/src/providers/auth-provider";
import { Clock, Crown, Headset, LayoutDashboard, Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "./core/sidebar";

export function AppSidebar() {
  const { state } = useSidebar();
  const { plan } = useAuth();
  const pathname = usePathname();

  const isCollapsed = state === "collapsed";

  const isFreePlan = plan?.planId === "free";

  const mainItems = [
    {
      title: "Produtos",
      url: "/produtos",
      icon: Package,
      disabled: false,
      soon: false,
      premium: false,
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
      disabled: isFreePlan ? true : false,
      soon: false,
      premium: true,
    },
  ];

  const secondaryItems = [
    {
      title: "Planos",
      url: "/planos",
      icon: Crown,
      disabled: false,
      soon: false,
      premium: false,
    },
    {
      title: "Suporte",
      url: "/suporte",
      icon: Headset,
      disabled: false,
      soon: false,
      premium: false,
    },
  ];

  return (
    <Sidebar collapsible="icon" aria-label="Menu de navegação principal">
      <SidebarContent className="flex overflow-hidden">
        <SidebarGroup className="flex items-center">
          <SidebarHeader className="p-0! h-16 items-center justify-center">
            <SidebarTrigger
              className="w-full h-full hover:bg-transparent!"
              aria-label={isCollapsed ? "Expandir menu" : "Recolher menu"}
            >
              <Image
                src={shortLogoImage}
                alt="Precific | Plataforma de Precificação Inteligente"
                width={40}
                height={40}
                className={`hover:cursor-pointer shrink-0 ${
                  !isCollapsed && "hidden"
                }`}
              />
              <Image
                src={logoImage}
                alt="Precific | Plataforma de Precificação Inteligente"
                priority
                className={`w-full h-auto max-w-50 hover:cursor-pointer shrink-0 ${
                  isCollapsed && "hidden"
                }`}
              />
            </SidebarTrigger>
          </SidebarHeader>
          <SidebarGroupContent className="mt-5">
            <SidebarMenu
              className={`${isCollapsed && "items-center"}`}
              aria-label="Menu principal"
            >
              {mainItems.map((item) => {
                const isActive = pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild={!item.disabled}
                      isActive={isActive}
                      disabled={item.disabled}
                      className="flex relative"
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.disabled ? (
                        <>
                          <item.icon className="w-5! h-5!" aria-hidden="true" />
                          {!isCollapsed && (
                            <span className="font-medium">{item.title}</span>
                          )}
                          {!isCollapsed && item.soon && <ComingSoonBadge />}
                          {isCollapsed && item.soon && (
                            <Clock
                              className="w-4! h-4! absolute bg-black rounded-full text-white right-2 bottom-2"
                              aria-label="Em breve"
                            />
                          )}
                          {!isCollapsed && item.premium && (
                            <div className="h-6 w-6">
                              <PlanCrownBadge />
                            </div>
                          )}
                          {isCollapsed && item.premium && (
                            <div className="h-6 w-6 absolute right-0 top-0">
                              <PlanCrownBadge />
                            </div>
                          )}
                        </>
                      ) : (
                        <Link href={item.url}>
                          <item.icon className="w-5! h-5!" aria-hidden="true" />
                          {!isCollapsed && (
                            <span className="font-medium">{item.title}</span>
                          )}
                          {!isCollapsed && item.soon && <ComingSoonBadge />}
                          {isCollapsed && item.soon && (
                            <Clock
                              className="w-4! h-4! absolute bg-black rounded-full text-white right-2 bottom-2"
                              aria-label="Em breve"
                            />
                          )}
                          {!isCollapsed && item.premium && (
                            <div className="h-6 w-6">
                              <PlanCrownBadge />
                            </div>
                          )}
                          {isCollapsed && item.premium && (
                            <div className="h-6 w-6 absolute right-0 top-0">
                              <PlanCrownBadge />
                            </div>
                          )}
                        </Link>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <Separator aria-hidden="true" />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu
              className={`${isCollapsed && "items-center"}`}
              aria-label="Menu secundário"
            >
              {secondaryItems.map((item) => {
                const isActive = pathname.startsWith(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild={!item.disabled}
                      isActive={isActive}
                      disabled={item.disabled}
                      className="flex relative"
                      aria-current={isActive ? "page" : undefined}
                    >
                      {item.disabled ? (
                        <>
                          <item.icon className="w-5! h-5!" aria-hidden="true" />
                          {!isCollapsed && (
                            <span className="font-medium">{item.title}</span>
                          )}
                          {!isCollapsed && item.soon && <ComingSoonBadge />}
                          {isCollapsed && item.soon && (
                            <Clock
                              className="w-4! h-4! absolute bg-black rounded-full text-white right-2 bottom-2"
                              aria-label="Em breve"
                            />
                          )}
                        </>
                      ) : (
                        <Link href={item.url}>
                          <item.icon className="w-5! h-5!" aria-hidden="true" />
                          {!isCollapsed && (
                            <span className="font-medium">{item.title}</span>
                          )}
                          {!isCollapsed && item.soon && <ComingSoonBadge />}
                          {isCollapsed && item.soon && (
                            <Clock
                              className="w-4! h-4! absolute bg-black rounded-full text-white right-2 bottom-2"
                              aria-label="Em breve"
                            />
                          )}
                        </Link>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <Separator aria-hidden="true" />
      <SidebarFooter className="items-center mb-2 space-y-4">
        <Menu />
        {/* <span
          className="text-neutral-500 text-xs font-medium"
          aria-label="Versão do aplicativo"
        >
          v0.1.0
        </span> */}
      </SidebarFooter>
    </Sidebar>
  );
}
