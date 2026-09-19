// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

export const PHRASE_USERNAME = "ciclo";

type PasswordCred = Credential & { password?: string };

function passwordCredentialCtor():
  | (new (data: { id: string; password: string; name?: string }) => Credential)
  | null {
  const ctor = (window as unknown as { PasswordCredential?: new (data: { id: string; password: string; name?: string }) => Credential })
    .PasswordCredential;
  return ctor ?? null;
}

export async function storeBrowserPassword(id: string, password: string, name = "Ciclo") {
  const Ctor = passwordCredentialCtor();
  if (!Ctor || !navigator.credentials?.store) return;
  try {
    await navigator.credentials.store(new Ctor({ id, password, name }));
  } catch {
    // Autocomplete on the form still lets Safari/Firefox save the password.
  }
}

export async function getBrowserPassword(): Promise<{ id: string; password: string } | null> {
  if (!navigator.credentials?.get) return null;
  try {
    const cred = (await navigator.credentials.get({
      password: true,
      mediation: "optional",
    } as CredentialRequestOptions)) as PasswordCred | null;
    if (cred?.id && typeof cred.password === "string" && cred.password.length > 0) {
      return { id: cred.id, password: cred.password };
    }
  } catch {
    return null;
  }
  return null;
}
