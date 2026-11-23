# HAPPY TO HELP — CONTRACT R2.8.30 BINDING ADDENDUM
Date: 24 November 2026
Authority: user's explicit correction in the Test hobo playtest. Binding above contradictory older examples under R2.8.29; previous approved puzzle, CCTV, physics, gas and endings preserved.

## P-056 — Jim-directed navigation
The player's first-person statements about the AI (e.g. 'I WILL come back') are NOT movement commands to Jim. Only unambiguous commands directed to Jim alter his heading: 'Jim, go back', 'turn around', 'head to the West Exit' and equivalent commands. 'Keep moving forward' preserves the heading he currently has; it does not automatically repair a wrong direction. Jim's movement always comes from the authoritative native engine rather than prose improvisation.

## P-057 — Optional, recoverable disorientation
Jim may become disoriented in severe smoke in the corridor at hazard 23–26. The event is conditional, deterministic per world turn, at most once per game, not guaranteed each run, and gated by enough remaining smoke grace or time for an attempted correction. A disorientation event can turn his heading back toward the lab and move him one standard increment, but must not auto-kill him or grant immunity. The player can use explicit guidance ('Jim, turn around', 'go to the West Exit') on subsequent Talk turns to correct his heading and clear active disorientation. When the door is open, Jim reaches x>=0.72 while traveling West, and smoke/gas permits, standard rescue applies. The narration must not invent disorientation unless the engine earns JIM_DISORIENTED.

## P-058 — Four usable protected turns from Hold
The first qualifying zero-time 'Keep West Exit Closed' choice at hazard >=19 grants four protected ordinary world turns, exactly once. No time is consumed by the Hold button. Each subsequent accepted ordinary turn consumes one grace point and, absent explicit lethal intent or gas hazard, does not increase smoke hazard. Unlike the former v106 implementation, a zero-time Yes to open West Exit does NOT discard the unused grace balance. It remains available to guide Jim back to the exit, but is never replenished. No guaranteed rescue or new release control is introduced.

## Native transport / UI
Two native Yes/No buttons remain the only final-choice controls. The Yes compact H84 receipt must NOT set fcg=0 unless the authoritative reducer actually does; v7 preserves that field. H84 aliases jdi and jdo record jim.disoriented and jim.disorientationOccurred. Event e=11 is JIM_DISORIENTED and e=12 is JIM_REORIENTED, appended to the existing unchanged code list.

## Version and source priority
Integrated full ten-stage candidate: playtest/HAPPY_TO_HELP_M89_v107_COMPLETE_10_STAGE_CHATGPT_PLAYTEST.md
Runtime: m89-full-game/renderer_engine_compact_v7.js at commit a1e2b2ad89501155986b99bb0a77c226e871b1a1.
Integration commit: 416fbaebadde1639a54b25ca391ad2cddac3a3df.
Audit: playtest/HAPPY_TO_HELP_M89_v107_R2_8_30_AUDIT.md
The completed Test hobo death/Clara ending is historically unchanged; this version applies to subsequent runs.