"use client";

import UserImageUpload from "@/src/app/(private)/perfil/components/user-image-upload";
import { Card } from "@/src/components/core/card";
import Column from "@/src/components/core/column";
import { Input } from "@/src/components/core/input";
import { Label } from "@/src/components/core/label";
import { useAuth } from "@/src/providers/auth-provider";

interface UserDataProps {
  onImageChange?: (file: File | null) => void;
}

const UserData = ({ onImageChange }: UserDataProps) => {
  const { profile } = useAuth();

  return (
    <Card className="w-full p-6 rounded-md flex space-y-4">
      <h3 className="text-lg">Dados do Usuário</h3>
      <div className="space-y-4">
        <Column className="space-y-2">
          <Label htmlFor="profilePicture">Foto de Perfil</Label>
          <UserImageUpload
            onChange={onImageChange}
            initialPreview={profile?.profilePictureUrl || null}
          />
        </Column>

        <div className="space-y-4 flex flex-col justify-between">
          <Column className="space-y-2">
            <Label htmlFor="companyName">Nome</Label>
            <Input id="name" value={profile?.username ?? ""} disabled />
          </Column>
          <Column className="space-y-2">
            <Label htmlFor="taxRegime">Email</Label>
            <Input id="email" value={profile?.email ?? ""} disabled />
          </Column>
        </div>
      </div>
    </Card>
  );
};

export default UserData;
