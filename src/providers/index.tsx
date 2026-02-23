import { SidebarProvider } from "@/src/components/core/sidebar";
import { AuthProvider } from "@/src/providers/auth-provider";
import { NuqsProvider } from "@/src/providers/nuqs-provider";
import { TanstackQueryProvider } from "@/src/providers/tanstack-query-provider";
interface ProvidersProps {
  children: React.ReactNode;
}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <TanstackQueryProvider>
      <AuthProvider>
        <NuqsProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </NuqsProvider>
      </AuthProvider>
    </TanstackQueryProvider>
  );
};

export default Providers;
