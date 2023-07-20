import { PreState, NewChangeset } from "@changesets/types";
import { readPreState } from "@changesets/pre";
import readChangesets from "@changesets/read";

export type ChangesetState = {
  preState: PreState | undefined;
  changesets: NewChangeset[];
};

export default async function readChangesetState(
  cwd: string = process.cwd(),
  exitingPrereleaseMode: boolean = false,
): Promise<ChangesetState> {
  let preState = await readPreState(cwd);
  let changesets = await readChangesets(cwd);
  let isInPreMode = preState !== undefined && preState.mode === "pre";
  
  if (isInPreMode && preState && !exitingPrereleaseMode) {
    let changesetsToFilter = new Set(preState.changesets);

    return {
      preState,
      changesets: changesets.filter((x) => !changesetsToFilter.has(x.id)),
    };
  }

  return {
    preState: undefined,
    changesets,
  };
}
