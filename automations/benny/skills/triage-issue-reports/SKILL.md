---
name: triage-issue-reports
description: Read one Help Scout conversation through Chrome DevTools MCP and produce a sanitized handoff for Benny staging reproduction.
disable-model-invocation: true
---

# Triage a Help Scout report

Read the bundled Benny policy and validate the workspace configuration from the setup skill.

1. Ask Chrome DevTools MCP to list open pages. Select the existing Help Scout page matching the configured origin and requested conversation URL. Read the snapshot and confirm the conversation identifier and mailbox before reading messages. When selection is ambiguous, end with `blocked` and explain the mismatch privately.
2. Extract every distinct symptom, reported environment, exact trigger, expected result, actual result, frequency, and prior attempts. Identify the feature and possible existing fix evidence. Attribute reports and hypotheses separately from observations. Avoid collecting customer contact details or secrets.
3. Return `ready` only if a concrete user-visible symptom and a plausible staging journey exist. Otherwise return `needs-evidence` and list the missing inputs. The private handoff includes the sanitized symptoms, expected result, discriminating observation, synthetic fixture shape, affected entry points, relevant existing fix reference, and conversation identity for coordinator use. Triage does not assert reproduction.
4. If explicitly asked to add an internal note, perform the Benny policy checks. Summarize only the triage verdict and evidence gap or staging journey. Never submit a public reply.
