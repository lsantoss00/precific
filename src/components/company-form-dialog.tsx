"use client";

import CompanyForm from "@/src/app/(private)/perfil/components/company-form";
import { logout } from "@/src/app/(public)/entrar/services/logout";
import { Button } from "@/src/components/core/button";

import Column from "@/src/components/core/column";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/core/dialog";
import { queryClient } from "@/src/libs/tanstack-query/query-client";
import { useAuth } from "@/src/providers/auth-provider";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const CompanyFormDialog = () => {
  const { profile, isLoadingAuth } = useAuth();
  const router = useRouter();

  const { mutate: doLogout, isPending: pendingDoLogout } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear();

      router.push("/entrar");
    },
  });

  const handleOpenChange = (open: boolean) => {
    if (!profile?.companyId && !open) return;
  };

  if (isLoadingAuth || !profile || profile.companyId) {
    return null;
  }

  return (
    <Dialog open={true} onOpenChange={handleOpenChange} modal>
      <DialogContent
        showCloseButton={false}
        className="w-full max-w-[90dvw] md:max-w-xl! gap-6 max-h-[96dvh] overflow-y-auto"
      >
        <DialogHeader className="flex flex-row items-center justify-start">
          <DialogTitle>Cadastro de Empresa</DialogTitle>
        </DialogHeader>
        <Column>
          <CompanyForm />
          <Button
            type="button"
            variant="link"
            className="text-red-500 w-fit self-center"
            onClick={() => doLogout()}
            disabled={pendingDoLogout}
          >
            Sair
          </Button>
        </Column>
      </DialogContent>
    </Dialog>
  );
};

export default CompanyFormDialog;
