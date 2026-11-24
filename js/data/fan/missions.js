/* Fan Missions: Missions written for this site, with index details for the Fan Missions page (genre, setting, winning condition,
   play details, what to playtest). The Code Three Missions live in code-three-missions.js and get their index details here.
   Fan wording throughout. Not official Tabletop Skirmish Games products.
   Maps are on a 36 by 36 inch Battlefield; x and y are inches from the top-left corner.
   status is worked out on the page: "Playtested" once a Mission has 3 logged playtests, "Needs playtest" until then. */
(function () {
  const W = (id) => 'wpn-core-' + id, G = (id) => 'gear-core-' + id, SP = (id) => 'spec-core-' + id;
  const sl = (name, op, weapon, gear) => ({ name, op: SP(op), weapon: W(weapon), soldierType: 'warrior', powers: [], gear: (gear || []).map(G) });

  const glassCase = {
    id: 'fm-glass-case', code: 'RWFM-1', title: 'Operation Glass Case', date: 'Fan Mission', fan: true,
    teams: [
      { id: 'fm1-freelancers', side: 'The Freelancers (Green Team)', name: 'The Freelancers', setId: 'core', expId: 'core-covert-ops', extraGear: 0,
        slots: [sl('Vince', 'tactician', 'assault-rifle', ['smoke']), sl('Larkin', 'sniper', 'sniper-rifle'),
          sl('Dee', 'cqb', 'shotgun'), sl('Moss', 'scout', 'smg', ['med-kit'])] },
      { id: 'fm1-buyers', side: "Kessler's Buyers (Red Team)", name: "Kessler's Buyers", setId: 'core', expId: 'core-counter-terrorism', extraGear: 0,
        slots: [sl('Kessler', 'fire-support', 'lmg'), sl('Ivo', 'hand-to-hand', 'smg', ['flash-bang']),
          sl('Mara', 'medic', 'assault-rifle', ['smoke']), sl('Brandt', 'comms', 'assault-rifle')] },
    ],
    text: {
      tagline: 'One case. Two buyers. Nobody knows what is inside.',
      briefing: [
        'Nobody on this job knows what is in the case. The client will not say, the dealer never asked, and the price is too high for it to be anything good.',
        'The exchange was set for first light in the square of an old harbour town: one silver case, one buyer, cash on the table. Then the dealer sold the same case to a second crew, packed two dummies to cover himself and disappeared. Now two teams are walking into the same square for the same case, and each one thinks the other is the dealer\'s backup.',
        'Three identical cases are in play. One was left in the café where the meeting was set, one is locked in the boot of the dealer\'s car, and one sits at the drop point by the fountain. Find the real one and get it out before the sirens close the square.',
      ],
      details: [['Location', 'Harbour town square, at dawn'], ['Action', 'Retrieve'], ['Objectives', '3 Cases: 1 real, 2 fakes'], ['Enemy', 'A rival crew of buyers'], ['Rounds', 'Up to 6']],
      winning: { name: 'Retrieval', lines: [
        'A Warrior carrying the real Case who ends a move inside its own deployment zone wins the Mission at once',
        'If the police arrive first, the Team holding the real Case wins a narrow victory: it slipped away in the confusion',
        'If nobody holds the real Case when the police arrive, or it has not been found, the Mission is a draw',
      ] },
      special: [
        'Place Case A in the café, Case B against the car (it is in the locked boot) and Case C at the drop point in the centre',
        'Pick Up a Case with the free Universal Action in base contact. Case B is locked in: a Warrior in base contact with the car first spends a Shoot action to force the boot open',
        'Check the Case: the first time a Case is picked up, roll 1D6. The first Case checked is the real one on a 5+, the second on a 4+, and the third always is. A fake is full of newspaper: remove it',
        'The real Case is heavy and awkward: its carrier has -1" MA and can not Run. If the carrier is Taken Out, place the Case in base contact. Any Warrior can pick it up',
        'Sirens: from the end of Round 4, roll 1D6 at the end of each Round. The police arrive on a 4+ at the end of Round 4, on a 3+ at the end of Round 5, and always at the end of Round 6. When they arrive the Mission ends',
        'Deploy in opposite corners. Roll off to choose corners and to set up first, as normal',
      ],
      sides: 'Player One is the Green Team (The Freelancers). Player Two is the Red Team (Kessler\'s Buyers). Any two Core Teams of 4 Warriors can play it instead.',
      map: {
        code: 'GLASS CASE', note: 'Use any small building for the café and any car or van for the dealer\'s car. Scatter market stalls, crates, low walls and parked scooters so no lane is open for more than about 12".',
        shapes: [
          { k: 'zone-a', x: 0, y: 26, w: 10, h: 10 },
          { k: 'zone-b', x: 26, y: 0, w: 10, h: 10 },
          { k: 'building', cx: 9, cy: 9, w: 10, h: 8, rot: 0 }, { k: 'door', x: 8, y: 12.4, w: 3, h: 1.2 }, { k: 'door', x: 13.4, y: 8, w: 1.2, h: 3 },
          { k: 'vehicle', cx: 27, cy: 27, w: 3.5, h: 7, rot: 45 },
          { k: 'objective', cx: 9, cy: 9, n: 'A' }, { k: 'objective', cx: 24.6, cy: 24.6, n: 'B' }, { k: 'objective', cx: 18, cy: 18, n: 'C' },
          { k: 'terrain', x: 15.5, y: 15.5, w: 5, h: 5 },
          { k: 'terrain', x: 3, y: 16, w: 4, h: 3 }, { k: 'terrain', x: 16, y: 3, w: 3, h: 4 },
          { k: 'terrain', x: 22, y: 12, w: 4, h: 3 }, { k: 'terrain', x: 12, y: 22, w: 3, h: 4 },
          { k: 'terrain', x: 29, y: 16, w: 4, h: 3 }, { k: 'terrain', x: 16, y: 29, w: 3, h: 4 },
          { k: 'wall', x: 6, y: 23, w: 6, h: 1 }, { k: 'wall', x: 23, y: 6, w: 1, h: 6 },
          { k: 'wall', x: 20, y: 31, w: 6, h: 1 }, { k: 'wall', x: 31, y: 20, w: 1, h: 6 },
        ],
        legend: [['zone-a', 'Green Team deploys here, and brings the real Case back here'], ['zone-b', 'Red Team deploys here, and brings the real Case back here'],
          ['building', 'The café (Case A inside)'], ['vehicle', 'The dealer\'s car (Case B in the boot)'], ['objective', 'Cases A, B and C. C is at the drop point by the fountain'],
          ['terrain', 'Fountain, market stalls and crates'], ['wall', 'Low walls'], ['door', 'Café doors']],
      },
      teams: {},
    },
    meta: {
      genre: 'Spy thriller', setting: 'Urban', win: 'Retrieval', inspired: 'Ronin (1998)', players: '2', size: '4 v 4', rounds: 'Up to 6', time: '60-90',
      needs: 'Core Rulebook', version: '1.0',
      premise: 'A dealer sold the same silver case to two crews and left two fakes to cover his tracks. Find the real one in a town square before the police arrive.',
      testNotes: [
        'Which Case turned out to be real, and in which Round was it found?',
        'Check the Case: did the 5+, 4+, then automatic odds feel fair, or did one Team get lucky too early?',
        'Case B: was forcing the boot (a Shoot action) worth the time, or did everyone ignore the car?',
        'The real Case carrier (-1" MA, no Run): did the chase feel tense, or was the carrier caught too easily?',
        'Sirens: in which Round did the police arrive? Did the Mission end too early or drag on?',
        'Corner deployments: did either corner feel stronger with your terrain?',
        'Premade teams: did either side feel stronger? Covert Ops against Counter Terrorism, Sniper against LMG.',
        'Result: who won, and was it a full win, a narrow victory or a draw?',
      ],
      changes: [],
      playtests: [],
    },
  };

  window.RW_ONESHOTS = (window.RW_ONESHOTS || []).concat([glassCase]);

  // Index details for the Code Three Missions.
  const meta = {
    'c3-os1': { genre: 'Heist', setting: 'Urban', win: 'Point Accumulation', inspired: '', players: '2', size: '4 v 4', rounds: '8', time: '60-90', needs: 'Code Three (fan expansion)', version: '1.0',
      premise: 'A bank crew is inside the vault when the silent alarm goes off. Crack it, grab the cash and get out before Metro SWAT closes the street.',
      testNotes: ['Did the Syndicate get the vault open, and in which Round?', 'Did Metro SWAT have enough time to stop them before the Escape Zones?', 'Who won, and by how many points?'], changes: [], playtests: [] },
    'c3-os2': { genre: 'Hostage rescue', setting: 'Industrial', win: 'Point Accumulation', inspired: '', players: '2', size: '4 v 4', rounds: '8', time: '60-90', needs: 'Code Three (fan expansion)', version: '1.0',
      premise: 'A cartel cell holds three hostages in a rail yard stash house. Metro SWAT goes in to bring them out alive.',
      testNotes: ['How many Hostages got out, and in which Rounds?', 'Did the blast risk to Hostages change how either side played?', 'Who won?'], changes: [], playtests: [] },
  };
  for (const m of window.RW_ONESHOTS) if (meta[m.id]) Object.assign(m, { meta: meta[m.id], expansion: 'Code Three' });
})();
