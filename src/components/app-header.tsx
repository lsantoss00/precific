"use client";

import { SidebarTrigger } from "@/src/components/core/sidebar";
import { Skeleton } from "@/src/components/core/skeleton";
import { queryClient } from "@/src/libs/tanstack-query/query-client";
import { useAuth } from "@/src/providers/auth-provider";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon, LogOut, Menu as MenuIcon, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "../app/(public)/entrar/services/logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./core/dropdown-menu";
import Row from "./core/row";
import Show from "./core/show";

export function AppHeader() {
  const { profile, isLoadingAuth } = useAuth();
  const router = useRouter();

  const { mutate: doLogout, isPending: pendingDoLogout } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();

      router.push("/entrar");
    },
  });

  const hasProfilePicture =
    profile?.profilePictureUrl && profile.profilePictureUrl.trim() !== "";

  return (
    <header className="bg-[#fafafa] sticky top-0 z-50 border-b xl:hidden">
      <div className="h-[env(safe-area-inset-top)]" aria-hidden="true" />
      <Row className="w-full h-20 justify-between items-center px-2">
        <SidebarTrigger
          className="p-2! hover:bg-neutral-100 rounded-md transition-colors shrink-0"
          aria-label="Abrir menu de navegação"
        >
          <MenuIcon className="w-6! h-6! text-neutral-700" aria-hidden="true" />
        </SidebarTrigger>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger
            asChild
            className="cursor-pointer hover:bg-neutral-100 p-2 rounded-md transition-colors shrink-0"
          >
            <button aria-label="Menu do usuário" type="button">
              <Show
                when={!isLoadingAuth}
                fallback={<Skeleton className="w-8 h-8 rounded-md" />}
              >
                <Show
                  when={hasProfilePicture}
                  fallback={
                    <User
                      className="text-primary border-2 border-primary rounded-md w-8 h-8 p-1"
                      aria-hidden="true"
                    />
                  }
                >
                  <div className="relative w-8 h-8 shrink-0 border-2 border-primary rounded-md overflow-hidden">
                    <Image
                      src={profile?.profilePictureUrl!}
                      alt="Foto de perfil"
                      fill
                      sizes="64px"
                      className="object-cover"
                      priority
                    />
                  </div>
                </Show>
              </Show>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 p-1" align="end">
            <DropdownMenuLabel className="flex flex-col">
              <span className="text-xs sm:text-sm text-neutral-500">
                {profile?.username}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/perfil">
                Perfil
                <DropdownMenuShortcut>
                  <User aria-hidden="true" />
                </DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600! cursor-pointer"
              onClick={() => doLogout()}
            >
              Sair
              <DropdownMenuShortcut>
                <Show
                  when={!pendingDoLogout}
                  fallback={
                    <Loader2Icon
                      className="animate-spin text-red-600"
                      aria-label="Saindo..."
                    />
                  }
                >
                  <LogOut className="text-red-600" aria-hidden="true" />
                </Show>
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Row>
    </header>
  );
}
