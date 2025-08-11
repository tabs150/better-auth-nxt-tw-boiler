
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-5 items-center justify-center h-screen px-5 text-center">
        <Image
          src="/better-auth-starter.png"
          alt="Better Auth"
          width={100}
          height={100}
          className="rounded-lg dark:invert"
        />

        <h1 className="text-4xl font-bold">Better Auth Pro</h1>

        <p className="text-lg">
          This is a starter project for Better Auth. It is a simple project that
          uses Better Auth to authenticate users.
        </p>

        <div className="flex gap-2">
          <Link href="/auth/login">
            <Button>Login</Button>
          </Link>
          <Link href="/auth/signup">
            <Button>Signup</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
