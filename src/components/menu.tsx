"use client";

import Column from "@/src/components/core/column";
import Row from "@/src/components/core/row";
import { useSidebar } from "@/src/components/core/sidebar";
import { Skeleton } from "@/src/components/core/skeleton";
import { queryClient } from "@/src/libs/tanstack-query/query-client";
import { useAuth } from "@/src/providers/auth-provider";
import { useMutation } from "@tanstack/react-query";
import { Loader2Icon, LogOut, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { logout } from "../app/(public)/entrar/services/logout";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./core/dropdown-menu";
import Show from "./core/show";

const Menu = () => {
  const { profile, isLoadingAuth } = useAuth();
  const { state } = useSidebar();

  const isCollapsed = state === "collapsed";

  const router = useRouter();

  const { mutate: doLogout, isPending: pendingDoLogout } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();

      router.push("/entrar");
    },
  });

  const firstName = profile?.username?.split(" ")[0] || "";
  const hasProfilePicture =
    profile?.profilePictureUrl && profile.profilePictureUrl.trim() !== "";

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger
        asChild
        className={`${
          !isLoadingAuth && "cursor-pointer hover:bg-neutral-100"
        }  p-2 h-12 rounded-md`}
        tabIndex={0}
      >
        <Row className="w-full items-center gap-2">
          <Show
            when={!isLoadingAuth}
            fallback={<Skeleton className="w-8 h-8 rounded-md" />}
          >
            <Show
              when={hasProfilePicture}
              fallback={
                <User className="text-primary border-2 border-primary rounded-md w-8 h-8 p-1 shrink-0" />
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
          <Show when={!isCollapsed}>
            <Column className="min-w-0 flex-1">
              <Show
                when={!isLoadingAuth}
                fallback={
                  <Column className="space-y-1">
                    <Skeleton className="w-1/2 h-4" />
                    <Skeleton className="w-full h-3" />
                  </Column>
                }
              >
                <span className="text-sm font-semibold text-primary truncate">
                  {firstName}
                </span>
                <span className="text-xs text-neutral-500 truncate">
                  {profile?.email}
                </span>
              </Show>
            </Column>
          </Show>
        </Row>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-1" align="start">
        <DropdownMenuItem asChild className="cursor-pointer">
          <Link href="/perfil">
            Perfil
            <DropdownMenuShortcut>
              <User />
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
              fallback={<Loader2Icon className="animate-spin text-red-600" />}
            >
              <LogOut className="text-red-600" />
            </Show>
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Menu;
