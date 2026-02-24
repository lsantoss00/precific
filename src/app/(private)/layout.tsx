import { AppHeader } from "@/src/components/app-header";
import { AppSidebar } from "@/src/components/app-sidebar";
import { AuthGuard } from "@/src/components/auth-guard";
import CompanyFormDialog from "@/src/components/company-form-dialog";
import { SidebarInset, SidebarProvider } from "@/src/components/core/sidebar";
import { AuthProvider } from "@/src/providers/auth-provider";
import { NuqsProvider } from "@/src/providers/nuqs-provider";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <NuqsProvider>
        <SidebarProvider>
          <CompanyFormDialog />
          <AppSidebar />
          <SidebarInset className="flex flex-col min-h-screen">
            <AppHeader />
            <AuthGuard>
              <div className="flex h-full w-full justify-center pb-30 2xl:pb-0">
                {children}
              </div>
            </AuthGuard>
          </SidebarInset>
        </SidebarProvider>
      </NuqsProvider>
    </AuthProvider>
  );
}
