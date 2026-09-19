// Copyright © 2026 Emma Flora Harbison & Luis Rey Sánchez
// SPDX-License-Identifier: Apache-2.0

import { bytesToHex, utf8ToBytes } from "@/lib/crypto/bytes";
import { sha256 } from "@noble/hashes/sha2.js";

const UUID =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function hashPoolContributorKey(key: string): string | null {
  if (!UUID.test(key)) return null;
  return bytesToHex(sha256(utf8ToBytes(key)));
}
