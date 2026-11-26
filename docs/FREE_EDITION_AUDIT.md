# HAPPY TO HELP — Free Edition v0.1 — Implementation & test audit

**Status:** Experimental testing candidate, **not** certified for release. 26 November 2026. Baseline: `HAPPY_TO_HELP_ENHANCED_v1.0.6_OPTIMISED_PLAY.md`.

## Why this edition exists

The Enhanced Edition is approximately 176 KB and is too large for reliable use in early Free-tier sessions: testers have repeatedly encountered context-window exhaustion, and Free accounts have limited file uploads. Plain GitHub raw-file retrieval also failed. A smaller upfront *instruction-context footprint* is therefore required, not merely a smaller download.

## Implementation

- One local, self-contained `.html` launcher. No ChatGPT attachments, application keys, accounts, or GitHub web reading are needed for player prompts.
- Launcher holds stage-local content and copies it into ChatGPT as successive short text messages. Every generated composer message is **under 9,000 characters**. The player plays in ChatGPT; the HTML stores progress locally.
- One ChatGPT chat per stage. At the existing `shutdown` boundary, a compact `HTH_SAVE_V1` block is generated, imported into the launcher, and supplied to the next chat. This is an intentional *transport-level deviation* from the original immediate auto-reboot; Jim still initiates the next fictional connection, without a player boot command.
- Optional `[SAVE GAME]` supports intra-stage handoffs with no fictional time cost. Stage 9 requires the exact complete canonical engine panel for a valid mid-stage save. The launcher replaces the native panel's initial value with the saved value on resumption; the physics engine itself is unchanged.
- Stage 7 and Stage 9 canonical viewer/contract source sections are copied verbatim from v1.0.6, including pinned runtime/asset URLs. The late outcomes use the *appropriate earned branch*, not both endings in the same context. Jim's death/Clara branch resumes **after** the already-submitted `shutdown`, avoiding a duplicated fatal turn.
- The complete original v1.0.6 remains unchanged and independently available.

## Local verifications

43/43 local browser/structural assertions passed after final rebuild, including:

1. Browser loads without script errors; responsive mobile layout renders.
2. Stage 1 contains the required `Enter your designated name` and full boot sequence.
3. All ten stages are packaged.
4. All copy-ready messages stay under 9,000 characters at the sampled save points.
5. Sequential save import advances stages and rejects a missing, invalid or unearned ending.
6. Stage 9 rejects an incomplete resume panel and a terminal save with a mismatched outcome.
7. Correct late ending branch opens Stage 10, and the Clara branch does not replay Jim's fatal speech or the original shutdown request.
8. Stage 7 and Stage 9 native source sections match the baseline text byte-for-byte as Python strings.
9. The exact v1.0.6 SHA-256 source digest is embedded in the launcher for provenance.

**Not yet verified in real Free ChatGPT chats:** whether each stage capsule consistently elicits the approved dialogue; preservation of all 10 stage continuity across repeated ChatGPT contexts; whether all Free clients support the DIL/AppBlock native viewers or allow the pinned JavaScript reducer; completion of the Stage 9 puzzle and all three endings; performance across iOS and Android clipboard/browser implementations.

**Contract limitations:** This does not constitute a full clause-by-clause R2.8.29 certification. Stage-local summaries simplify general narrative instructions; the complete high-risk Stage 7 and Stage 9 source sections are preserved. The existing 15-case contract matrix and audible Jim speech still need real test evidence for this edition. User should treat this as an **experimental Free Edition**, not a certified substitute for the v1.0.6 full game. In a runtime-limited client, the game must stop rather than fake Stage 9 physics.

## Test sequence for a Free account

Open the launcher, copy each part of Stage 1 into the same fresh ChatGPT conversation, and play until Jim closes the session. Send `shutdown`, import the complete `HTH_SAVE_V1` block, then use the newly prepared stage prompt in a new conversation. Continue through the stages. For Stage 9, request `[SAVE GAME]` every ~4–6 accepted emergency turns and keep a backup: do not allow a chat to hit its context limit before obtaining a portable state. If a player sees a false start, context-full notification, failed save, wrong Jim chronology, missing CCTV viewer, or invented H84 state, record that as a failed test against this build.