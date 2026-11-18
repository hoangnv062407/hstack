### Opening a PR

Use when the operator authorizes PR publication. For Benny, apply its policy and require staging verification before publishing.

Work from a git worktree off trunk, and keep unrelated work out of it. Rebase into small, landable commits. Run the bundled [deslop](../../deslop/SKILL.md) over the diff before commit.

Use a technical title without ticket numbers, tracking codes, or customer references. Leave the PR body empty. Return verification evidence privately.

Stack follow-ups by base branch. Use `gh pr create --draft --title "<technical summary>" --body ""` with the verified repository, base, and head, or equivalent explicit draft and empty-body fields. Check for an existing draft before creation and verify the resulting PR state. Opening a draft does not start a babysit.
