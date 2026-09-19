"use client";

import Link from "next/link";

import { useCiclo } from "@/lib/client/ciclo-context";
import { AppShell } from "@/components/app-shell";
import { Card } from "@/components/ui/card";

export default function PrivacyPage() {
  const { t, locale } = useCiclo();
  return (
    <AppShell>
      <h1 className="text-2xl font-semibold">{t.privacyTitle}</h1>
      <Card className="mt-4 flex flex-col gap-3 text-sm leading-6">
        {locale === "es" ? (
          <>
            <p>
              Las fechas se cifran en el navegador con AES-GCM. El servidor guarda solo ciphertext. Puedes usar
              correo y contraseña o el modo super privado con 12 palabras.
            </p>
            <p>
              Ciclo no puede resetear tu contraseña ni tu frase. Si las pierdes, el diario alojado se pierde. Eso
              protege tu privacidad: nadie — ni nosotras — puede leer tu diario en el servidor.
            </p>
            <p>
              Con correo y contraseña, entras en cualquier dispositivo con el mismo par. La contraseña
              desenvuelve tu llave aquí; no hace falta abrir el correo para entrar.
            </p>
            <p>
              Los síntomas, el flujo, el moco cervical y las notas breves del día se quedan dentro del diario
              cifrado. El servidor no añade columnas de salud. El pool anónimo solo recibe duraciones de ciclo
              (números enteros); las notas nunca se envían ni se analizan.
            </p>
            <p>
              El pool de investigación no guarda un mapa de tu cuenta al identificador anónimo.
            </p>
          </>
        ) : (
          <>
            <p>
              Dates are encrypted in the browser with AES-GCM. The server stores ciphertext only. You can use
              email and password or super private mode with 12 words.
            </p>
            <p>
              Ciclo cannot reset your password or phrase. If you lose them, the hosted diary is gone. That protects
              your privacy: nobody — including us — can read your diary on the server.
            </p>
            <p>
              With email and password, you sign in on any device with the same pair. The password unwraps your
              key here; you do not need to open your inbox to sign in.
            </p>
            <p>
              Symptoms, flow, cervical mucus, and short day notes stay inside the encrypted diary. The server
              does not add health columns. The anonymous pool only receives cycle lengths (whole numbers); notes
              are never uploaded or analyzed.
            </p>
            <p>
              The research pool does not store a map from your account to the anonymous id.
            </p>
          </>
        )}
        <p>
          <a className="underline" href="https://physionet.org/content/mcphases/1.0.0/">
            mcPHASES
          </a>
          {" · "}
          <a className="underline" href="https://doi.org/10.7278/S50d-4gxs-s4hj">
            Utah / Creighton
          </a>
        </p>
        <p>
          <Link href="/help" className="underline">
            {t.helpDocs}
          </Link>
          {" · "}
          <Link href="/" className="underline">
            {t.back}
          </Link>
        </p>
      </Card>
    </AppShell>
  );
}
