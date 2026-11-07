// Every knob of the datamosh effect lives here. Change a number, see the result.
export type MoshConfig = {
  grid: [number, number]; // block columns, rows (bigger = finer blocks)
  radius: number; // size of the area around the cursor that gets moshed (0-1)
  displacement: number; // how far blocks jump
  blockChance: number; // fraction of blocks that jump (0-1)
  smear: number; // pull toward the cursor (0-1)
  chroma: number; // RGB split strength
  tickRate: number; // how often blocks re-randomise, per second
  decay: number; // how slowly the effect fades after you stop (0-1)
  sensitivity: number; // how much cursor speed feeds the effect
  idle: number; // ambient effect when nothing is moving (0 = static)
};

export const defaultMosh: MoshConfig = {
  grid: [24, 14],
  radius: 0.35,
  displacement: 0.25,
  blockChance: 0.5,
  smear: 0.15,
  chroma: 0.01,
  tickRate: 6,
  decay: 0.94,
  sensitivity: 8,
  idle: 0,
};

// Named looks. Use one with <Mosh config={presets.melt} />, or spread and tweak:
// config={{ ...presets.glitch, chroma: 0.03 }}
export const presets = {
  subtle: {
    ...defaultMosh,
    displacement: 0.08,
    blockChance: 0.3,
    smear: 0.05,
    chroma: 0.004,
  },
  glitch: {
    ...defaultMosh,
    grid: [40, 24],
    displacement: 0.4,
    blockChance: 0.6,
    smear: 0.05,
    chroma: 0.02,
    tickRate: 12,
  },
  melt: {
    ...defaultMosh,
    grid: [8, 6],
    displacement: 0.1,
    blockChance: 0.3,
    smear: 0.5,
    chroma: 0.02,
    tickRate: 2,
    decay: 0.97,
    sensitivity: 6,
    idle: 0.05,
  },
} satisfies Record<string, MoshConfig>;
