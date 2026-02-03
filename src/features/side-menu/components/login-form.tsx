import { InputField, PrimaryButton } from "@/components/ui";

export function LoginForm() {
  return (
    <div className="flex flex-col gap-4 pt-10">
      <InputField label="Username" type="text" />
      <InputField label="Password" type="password" />
      <div className="flex flex-col justify-center gap-1">
        <PrimaryButton className="scale-[0.8] py-1 hover:scale-[0.75]">Log in</PrimaryButton>
        <PrimaryButton className="scale-[0.7] py-1 hover:scale-[0.65]" border={false}>Register</PrimaryButton>
      </div>
    </div>
  );
}