import { readPreState, exitPre } from "@changesets/pre";

export default async function exitPreMode(
  cwd: string = process.cwd()
): Promise<void> {
  let preState = await readPreState(cwd);
  let isInPreMode = preState !== undefined && preState.mode === "pre";

  if (isInPreMode) {
    await exitPre(cwd);
  }
}
