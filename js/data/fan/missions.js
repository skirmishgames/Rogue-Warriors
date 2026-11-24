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

  // ---------------------------------------------------------------------------------------------
  const fallenKite = {
    id: 'fm-fallen-kite', code: 'RWFM-2', title: 'Operation Fallen Kite', date: 'Fan Mission', fan: true,
    teams: [
      { id: 'fm2-saber', side: 'Saber Two (Green Team)', name: 'Saber Two', setId: 'core', expId: 'core-reconnaissance', extraGear: 0,
        slots: [sl('Hale', 'tactician', 'assault-rifle', ['smoke']), sl('Doc Reyes', 'medic', 'smg'),
          sl('Tank', 'fire-support', 'lmg', ['frag']), sl('Wick', 'eod', 'shotgun')] },
      { id: 'fm2-militia', side: 'Market District Militia (Red Team)', name: 'Market District Militia', setId: 'core', expId: 'core-raiders', extraGear: 0,
        slots: [sl('Aziz', 'scout', 'assault-rifle', ['smoke']), sl('The Butcher', 'hand-to-hand', 'melee'),
          sl('Farah', 'cqb', 'smg', ['frag']), sl('Old Karim', 'sniper', 'sniper-rifle')] },
    ],
    text: {
      tagline: 'Kite Four is down. Hold the crash site until the convoy breaks through.',
      briefing: [
        'The snatch went wrong at the worst moment. Kite Four took a rocket over the market district and came down hard in the square, tail first. The pilot is alive and pinned in the wreck. The crew chief is not.',
        'Saber Two was overhead in the second helicopter. They roped in ninety seconds later with four rifles, one medic and no plan. A ground convoy is fighting its way through from the north-east, street by street.',
        'Every militiaman in the district heard the crash. They know what a live pilot is worth, and they know the alleys better than anyone. They will keep coming until the convoy arrives, or until the pilot is theirs.',
      ],
      details: [['Location', 'Market district square'], ['Action', 'Rescue and hold'], ['Objectives', 'The Pilot, the convoy pick-up point'], ['Enemy', 'Local militia, with numbers'], ['Rounds', '8']],
      winning: { name: 'Survival', lines: [
        'Saber Two wins at once if a Warrior escorting the Pilot reaches the convoy pick-up point from Round 6 on',
        'Saber Two also wins if, at the end of Round 8, the Pilot is with a Saber Two Warrior or no militia Warrior is in base contact with the Pilot',
        'The militia wins at once if a militia Warrior escorting the Pilot leaves the Battlefield across the left or right edge, or if every Saber Two Warrior is Taken Out',
      ] },
      special: [
        'Saber Two deploys first, within the crash zone. The militia then deploys along the left and right edges. Saber Two activates the first Warrior in Round 1',
        'The Pilot is pinned in the wreck. A Saber Two Warrior in base contact spends a Shoot action to cut the Pilot free. The Pilot can not be targeted',
        'Escorting: a free Pilot moves with a Warrior in base contact, who has -1" MA and can not Run. If the escort is Taken Out, the Pilot stays where it is',
        'Snatching: at the end of a Round, if a militia Warrior is in base contact with a free Pilot and no Saber Two Warrior is, the militia takes the Pilot. It now moves with that Warrior, with the same penalty. Saber Two takes it back the same way',
        'They keep coming: each militia Warrior who is Taken Out comes back once. At the end of the Round, set it up with full Hearts touching the left or right edge, at least 6" from any Saber Two Warrior. Mark it: the second time, it stays down',
        'The convoy reaches the pick-up point at the end of Round 5. From then on, the gunners cover the street: militia Warriors within 6" of the pick-up point get -1 to their Shooting Attacks',
      ],
      sides: 'Player One is the Green Team (Saber Two). Player Two is the Red Team (the militia). Any two Core Teams of 4 Warriors can play it instead.',
      map: {
        code: 'FALLEN KITE', note: 'Use any vehicle or a pile of wreckage for the helicopter. Put a building in each corner and fill the streets with rubble, market stalls and burnt-out cars.',
        shapes: [
          { k: 'zone-b', x: 0, y: 0, w: 4, h: 36 }, { k: 'zone-b', x: 32, y: 0, w: 4, h: 36 },
          { k: 'zone-a', x: 12, y: 12, w: 12, h: 12 },
          { k: 'exit-a', x: 14, y: 34, w: 8, h: 2 },
          { k: 'building', cx: 9, cy: 6, w: 8, h: 6, rot: 0 }, { k: 'building', cx: 27, cy: 6, w: 8, h: 6, rot: 0 },
          { k: 'building', cx: 9, cy: 30, w: 8, h: 6, rot: 0 }, { k: 'building', cx: 27, cy: 30, w: 8, h: 6, rot: 0 },
          { k: 'vehicle', cx: 17, cy: 18, w: 4, h: 8, rot: 35 }, { k: 'hostage', cx: 20.5, cy: 15.5 },
          { k: 'terrain', x: 15, y: 4, w: 4, h: 3 }, { k: 'terrain', x: 6, y: 15, w: 3, h: 5 }, { k: 'terrain', x: 27, y: 16, w: 3, h: 5 }, { k: 'terrain', x: 16, y: 27, w: 4, h: 3 },
          { k: 'wall', x: 12, y: 10, w: 5, h: 1 }, { k: 'wall', x: 19, y: 25, w: 5, h: 1 },
        ],
        legend: [['zone-a', 'Crash zone: Saber Two deploys here'], ['zone-b', 'The militia deploys here, and comes back here'], ['exit-a', 'Convoy pick-up point (from Round 6)'],
          ['vehicle', 'The wreck of Kite Four'], ['hostage', 'The Pilot'], ['building', 'Buildings'], ['terrain', 'Rubble and market stalls'], ['wall', 'Low walls']],
      },
      teams: {},
    },
    meta: {
      genre: 'Rescue', setting: 'Urban', win: 'Survival', inspired: 'Black Hawk Down (2001)', players: '2', size: '4 v 4 (militia returns)', rounds: '8', time: '75-100',
      needs: 'Core Rulebook', version: '1.0',
      premise: 'A helicopter is down in a hostile city. Four soldiers hold the wreck and its pilot while a militia that will not stop dying comes at them from every street.',
      testNotes: [
        'How many militia Warriors came back, and did the returns feel like a flood or a trickle?',
        'Was 6" from Saber Two the right distance for returning militia, or did they come back on top of the fight?',
        'Cutting the Pilot free: did Saber Two free the Pilot early or wait?',
        'Snatching: did the militia ever take the Pilot? Did the end-of-Round snatch feel fair?',
        'The convoy: did Saber Two try the dash to the pick-up point in Round 6, or sit tight until Round 8?',
        'Reconnaissance against Raiders: did either team feel stronger?',
        'Result: who won, in which Round, and how?',
      ],
      changes: [], playtests: [],
    },
  };

  // ---------------------------------------------------------------------------------------------
  const highGround = {
    id: 'fm-high-ground', code: 'RWFM-3', title: 'Operation High Ground', date: 'Fan Mission', fan: true,
    teams: [
      { id: 'fm3-ravens', side: 'Raven Section (Green Team)', name: 'Raven Section', setId: 'core', expId: 'core-covert-ops', extraGear: 0,
        slots: [sl('Harker', 'tactician', 'smg', ['suppressor']), sl('Quinn', 'sniper', 'sniper-rifle', ['suppressor']),
          sl('Lund', 'hand-to-hand', 'melee', ['rope']), sl('Pryce', 'demolitions', 'assault-rifle')] },
      { id: 'fm3-garrison', side: 'The Schloss Garrison (Red Team)', name: 'The Schloss Garrison', setId: 'core', expId: 'core-counter-terrorism', extraGear: 0,
        slots: [sl('Kramer', 'comms', 'assault-rifle', ['smoke']), sl('Weissner', 'fire-support', 'lmg'),
          sl('Brandt', 'scout', 'assault-rifle'), sl('Vogel', 'cqb', 'shotgun', ['frag'])] },
    ],
    text: {
      tagline: 'Get in quietly. Bring the colonel out. The mountain only has one way down.',
      briefing: [
        'Colonel Rourke crashed in the pass two days ago with the full plan for the spring offensive in his head. He is being held in the old fortress at the top of the ridge, waiting for the interrogators to fly in at dawn.',
        'Raven Section came up the north face in the dark. Snow, wind, four hours of rope work and a cable car they could not risk using. The garrison is small and bored and not expecting anyone. That is the only advantage Raven has.',
        'Reach the keep, free the colonel and get him back down the cliff before the alarm brings the whole garrison and the reinforcements in the barracks. If the shooting starts early, nobody leaves the mountain.',
      ],
      details: [['Location', 'Mountain fortress, before dawn'], ['Action', 'Infiltrate and rescue'], ['Objectives', 'Colonel Rourke, held in the keep'], ['Enemy', 'A sleepy garrison'], ['Rounds', '8']],
      winning: { name: 'Exit Point', lines: [
        'Raven Section wins at once when a Warrior escorting the Colonel leaves the Battlefield across the bottom edge',
        'The garrison wins if the Colonel is still on the Battlefield at the end of Round 8, or if every Raven Section Warrior is Taken Out',
      ] },
      special: [
        'The garrison sets up first, one Warrior on each Sentry post. Raven Section then deploys along the bottom edge and activates the first Warrior in Round 1',
        'Before the Alarm, a garrison Warrior can only Patrol: move up to 3" and do nothing else. At the end of its Patrol, roll 1D6 if a Raven Warrior is in its LOS and within 10". On a 4+ the Raven Warrior is spotted and the Alarm is raised (5+ if the Raven Warrior is in Light Cover, 6 if in Heavy Cover)',
        'The Alarm is also raised when a Raven Warrior makes a Shooting Attack that is not Silent (a Suppressor makes it Silent), throws a Grenade, or attacks a Sentry in melee and does not Take it Out',
        'After the Alarm, the garrison plays normally. At the start of each Round after the Alarm, one garrison Warrior who has been Taken Out comes back through the barracks door with full Hearts, up to 2 in total',
        'The Colonel is locked in the keep. A Raven Warrior in base contact spends a Shoot action to open the cell. The Colonel can not be targeted',
        'Escorting: the Colonel moves with a Raven Warrior in base contact, who has -1" MA and can not Run. If the escort is Taken Out, the Colonel stays where he is',
      ],
      sides: 'Player One is the Green Team (Raven Section). Player Two is the Red Team (the garrison). Any two Core Teams of 4 Warriors can play it instead.',
      map: {
        code: 'HIGH GROUND', note: 'Any walled compound, ruin or farmstead works as the fortress. The keep needs a door; the barracks needs a door facing the courtyard. Rocks and snow drifts on the slope give Raven Section cover on the way up.',
        shapes: [
          { k: 'zone-a', x: 0, y: 31, w: 36, h: 5 },
          { k: 'outline', x: 5, y: 2, w: 26, h: 18 },
          { k: 'building', cx: 11, cy: 8, w: 8, h: 8, rot: 0 }, { k: 'hostage', cx: 11, cy: 8 }, { k: 'door', x: 9.75, y: 11.4, w: 2.5, h: 1.2 },
          { k: 'building', cx: 25, cy: 7, w: 8, h: 6, rot: 0 }, { k: 'door', x: 23.75, y: 9.4, w: 2.5, h: 1.2 },
          { k: 'building', cx: 27.5, cy: 17, w: 3, h: 3, rot: 0 },
          { k: 'door', x: 16.5, y: 19.4, w: 3, h: 1.2 },
          { k: 'objective', cx: 18, cy: 23, n: 'S1' }, { k: 'objective', cx: 8, cy: 16, n: 'S2' }, { k: 'objective', cx: 18, cy: 9, n: 'S3' }, { k: 'objective', cx: 30, cy: 22, n: 'S4' },
          { k: 'terrain', x: 3, y: 24, w: 5, h: 3 }, { k: 'terrain', x: 12, y: 27, w: 4, h: 3 }, { k: 'terrain', x: 21, y: 26, w: 4, h: 3 }, { k: 'terrain', x: 28, y: 26, w: 5, h: 3 },
          { k: 'wall', x: 13, y: 14, w: 1, h: 4 }, { k: 'wall', x: 21, y: 13, w: 4, h: 1 },
        ],
        legend: [['zone-a', 'Raven Section deploys here, and leaves with the Colonel across this edge'], ['outline', 'Fortress wall'], ['building', 'The keep (left), barracks (right) and watchtower'],
          ['hostage', 'Colonel Rourke, in the keep'], ['door', 'Doors and the fortress gate'], ['objective', 'Sentry posts S1 to S4'], ['terrain', 'Rocks and snow drifts'], ['wall', 'Crates and low walls']],
      },
      teams: {},
    },
    meta: {
      genre: 'Infiltration', setting: 'Mountain', win: 'Exit Point', inspired: 'Where Eagles Dare (1968)', players: '2', size: '4 v 4 (garrison returns)', rounds: '8', time: '60-90',
      needs: 'Core Rulebook', version: '1.0',
      premise: 'A commando team climbs to a mountain fortress to free a captured colonel. Stay unseen as long as you can, because once the alarm goes, the whole garrison wakes up.',
      testNotes: [
        'In which Round was the Alarm raised, and what raised it?',
        'Spotting: was 4+ within 10" (worse in cover) too harsh or too easy? Did Raven Section use cover to sneak?',
        'Suppressors: did the two Silent Warriors change how Raven Section played?',
        'Before the Alarm, did the garrison player have anything interesting to do with Patrol moves?',
        'Barracks returns: were 2 returning Warriors after the Alarm the right pressure?',
        'Did Raven Section reach the keep before the Alarm? How long did the escort down the slope take?',
        'Result: who won, and in which Round?',
      ],
      changes: [], playtests: [],
    },
  };

  // ---------------------------------------------------------------------------------------------
  const greenHell = {
    id: 'fm-green-hell', code: 'RWFM-4', title: 'Operation Green Hell', date: 'Fan Mission', fan: true,
    teams: [
      { id: 'fm4-hunters', side: 'Hunter Six (Green Team)', name: 'Hunter Six', setId: 'core', expId: 'core-raiders', extraGear: 0,
        slots: [sl('Rook', 'tactician', 'assault-rifle', ['smoke']), sl('Delgado', 'fire-support', 'lmg'),
          sl('Banks', 'scout', 'smg'), sl('Teague', 'demolitions', 'assault-rifle', ['frag'])] },
      { id: 'fm4-camp', side: 'Rio Negro Column (Red Team)', name: 'Rio Negro Column', setId: 'core', expId: 'core-counter-insurgency', extraGear: 0,
        slots: [sl('El Capitán', 'tactician', 'assault-rifle', ['frag']), sl('Rosa', 'sniper', 'sniper-rifle'),
          sl('Tomás', 'cqb', 'shotgun', ['smoke']), sl('Lalo', 'medic', 'assault-rifle')] },
    ],
    text: {
      tagline: 'Three targets. One jungle camp. Something else is out there with you.',
      briefing: [
        'The Rio Negro column is about to move on the border towns, and everything it needs is sitting in one clearing: the radio that coordinates the attack, the fuel for the trucks and the ammunition for the guns. Take out any two and the offensive stalls for a month.',
        'Hunter Six was inserted at dusk and has been walking the river for six hours. They found the first patrol hanging from a tree, skinned. They have not found who did it.',
        'The camp is jumpy. The sentries swear they hear clicking in the canopy at night, and two of them walked into the trees this week and never came back. Get in, set the charges and get out. Stay away from the treeline.',
      ],
      details: [['Location', 'Guerrilla camp, deep jungle'], ['Action', 'Sabotage'], ['Objectives', 'Radio, fuel dump, ammunition cache'], ['Enemy', 'Guerrillas, and something in the trees'], ['Rounds', '7']],
      winning: { name: 'Point Accumulation', lines: [
        'Hunter Six scores 1 point for each target destroyed. With 2 or more points at the end of Round 7, Hunter Six wins',
        'The camp wins if Hunter Six has 0 or 1 points at the end of Round 7',
        'If every Warrior on one side is Taken Out, the other side wins at once',
      ] },
      special: [
        'The camp deploys first, within the camp. Hunter Six deploys along the bottom edge',
        'Setting a charge: a Hunter Six Warrior in base contact with a target spends a Shoot action. Place a charge marker. A Demolitions Warrior sets a charge as a free action instead',
        'At the end of the next Round, roll 1D6 for each charge: on a 2+ the target is destroyed. On a FUBAR the charge is a dud: remove it',
        'Pulling a charge: a camp Warrior in base contact with a charge spends a Shoot action to remove it',
        'The fuel dump goes up in a fireball: when it is destroyed, every Warrior within 3" takes 1 Hit and makes an Armour Save',
        'Something in the trees: from the end of Round 3, roll 1D6 at the end of each Round. On a 5+ (4+ from Round 5) it strikes. The Warrior, from either side, nearest to any table edge and not in base contact with another Warrior loses 1 Heart, with no save. Roll off if two are equally close',
      ],
      sides: 'Player One is the Green Team (Hunter Six). Player Two is the Red Team (the camp). Any two Core Teams of 4 Warriors can play it instead.',
      map: {
        code: 'GREEN HELL', note: 'Fill the table with jungle: trees, bushes, rocks and a few huts. Keep the camp clearing open. Count all jungle as Tricky Terrain that blocks LOS beyond 3" into it.',
        shapes: [
          { k: 'zone-a', x: 0, y: 31, w: 36, h: 5 },
          { k: 'zone-b', x: 9, y: 3, w: 18, h: 14 },
          { k: 'building', cx: 13, cy: 7, w: 5, h: 4, rot: 0 }, { k: 'building', cx: 23, cy: 7, w: 5, h: 4, rot: 0 },
          { k: 'objective', cx: 23, cy: 7, n: 'R' }, { k: 'objective', cx: 12, cy: 14, n: 'F' }, { k: 'objective', cx: 24, cy: 14, n: 'A' },
          { k: 'terrain', x: 1, y: 2, w: 6, h: 7 }, { k: 'terrain', x: 29, y: 2, w: 6, h: 7 }, { k: 'terrain', x: 2, y: 15, w: 6, h: 7 }, { k: 'terrain', x: 28, y: 16, w: 6, h: 6 },
          { k: 'terrain', x: 11, y: 20, w: 6, h: 5 }, { k: 'terrain', x: 20, y: 22, w: 6, h: 4 }, { k: 'terrain', x: 5, y: 25, w: 5, h: 4 }, { k: 'terrain', x: 27, y: 25, w: 5, h: 4 },
          { k: 'wall', x: 16, y: 16, w: 4, h: 1 },
        ],
        legend: [['zone-a', 'Hunter Six deploys here'], ['zone-b', 'The camp: guerrillas deploy here'], ['building', 'Huts (the radio is in the right one)'],
          ['objective', 'Targets: R radio, F fuel dump, A ammunition'], ['terrain', 'Jungle (Tricky Terrain)'], ['wall', 'Sandbags']],
      },
      teams: {},
    },
    meta: {
      genre: 'Sabotage', setting: 'Jungle', win: 'Point Accumulation', inspired: 'Predator (1987)', players: '2', size: '4 v 4', rounds: '7', time: '60-90',
      needs: 'Core Rulebook', version: '1.0',
      premise: 'A raid team must blow up a guerrilla camp\'s radio, fuel and ammunition. Both sides soon learn they are not alone in the jungle.',
      testNotes: [
        'How many targets were destroyed, and in which Rounds?',
        'Charges: is a 2+ roll at the end of the next Round right, or are charges too easy to pull?',
        'Demolitions setting charges for free: too strong?',
        'The fuel dump fireball: did it catch anyone?',
        'Something in the trees: how many times did it strike, and whom? Did it push Warriors away from the edges?',
        'Jungle LOS (blocked beyond 3" in): did it make the game too close-range?',
        'Result: who won?',
      ],
      changes: [], playtests: [],
    },
  };

  // ---------------------------------------------------------------------------------------------
  const lastBridge = {
    id: 'fm-last-bridge', code: 'RWFM-5', title: 'Operation Last Bridge', date: 'Fan Mission', fan: true,
    teams: [
      { id: 'fm5-holdouts', side: 'The Holdouts (Green Team)', name: 'The Holdouts', setId: 'core', expId: 'core-hostage-rescue', extraGear: 0,
        slots: [sl('Cole', 'tactician', 'assault-rifle', ['smoke']), sl('Ransom', 'sniper', 'sniper-rifle'),
          sl('Kovac', 'fire-support', 'lmg', ['frag']), sl('Fenn', 'demolitions', 'smg')] },
      { id: 'fm5-vanguard', side: 'Column Vanguard (Red Team)', name: 'Column Vanguard', setId: 'core', expId: 'core-counter-terrorism', extraGear: 0,
        slots: [sl('Ostrow', 'tactician', 'assault-rifle', ['frag']), sl('Lenz', 'cqb', 'smg', ['smoke']),
          sl('Falk', 'scout', 'smg'), sl('Brenner', 'eod', 'shotgun')] },
    ],
    text: {
      tagline: 'Hold the bridge. If you can\'t hold it, blow it. If you blow it, you are cut off.',
      briefing: [
        'The river is wide, deep and cold, and there is one road bridge left standing for thirty kilometres. Whoever holds it decides where the war goes next.',
        'The Holdouts are what is left of three units: four tired soldiers, one rifle with a scope and a set of demolition charges wired under the near span. Their orders are to hold it intact for the counter-attack. Their fallback is to drop it into the river.',
        'The enemy vanguard wants it intact too. Their armour is an hour behind them, and an armoured column with no bridge goes nowhere. They will try to cut the wires before the Holdouts think to use them.',
      ],
      details: [['Location', 'River crossing, farmland'], ['Action', 'Defend or seize'], ['Objectives', 'The bridge, the detonator, the charges'], ['Enemy', 'An enemy vanguard'], ['Rounds', '7']],
      winning: { name: 'King of the Hill', lines: [
        'At the end of Rounds 3 to 7, the Team with more Warriors on the bridge, not counting Warriors in base contact with an enemy, scores 1 point. A tie scores nothing',
        'At the end of Round 7, the Team with more points wins. A tie goes to the Holdouts',
        'If the bridge is blown: the Mission ends at the end of that Round. The Holdouts win only if they already have more points. Otherwise it is a draw: nobody crosses',
      ] },
      special: [
        'The Holdouts deploy first. The vanguard deploys along the bottom edge and activates the first Warrior in Round 1',
        'The river is deep water (Core Swim rules). The ford is Tricky Terrain instead',
        'Blowing the bridge: a Holdout Warrior in base contact with the detonator spends a Shoot action and rolls 1D6. On a 3+ the bridge goes. On a 1 or 2 nothing happens: try again later',
        'When the bridge goes, every Warrior on it loses 2 Hearts and falls into the river. Remove the bridge',
        'Cutting the wires: a vanguard Warrior in base contact with the charges spends a Shoot action. The bridge can no longer be blown',
        'The Holdouts can not set up on the bridge. They must win it like everyone else',
      ],
      sides: 'Player One is the Green Team (the Holdouts). Player Two is the Red Team (the vanguard). Any two Core Teams of 4 Warriors can play it instead.',
      map: {
        code: 'LAST BRIDGE', note: 'Use a strip of blue cloth or paper for the river and any bridge model, or a 6" wide strip of card. Farm buildings, hedges and walls give cover on both banks.',
        shapes: [
          { k: 'zone-a', x: 0, y: 0, w: 36, h: 12 },
          { k: 'zone-b', x: 0, y: 31, w: 36, h: 5 },
          { k: 'water', x: 0, y: 15, w: 36, h: 6 },
          { k: 'terrain', x: 3, y: 15, w: 5, h: 6 },
          { k: 'outline', x: 15, y: 13, w: 6, h: 10 }, { k: 'wall', x: 15, y: 13, w: .6, h: 10 }, { k: 'wall', x: 20.4, y: 13, w: .6, h: 10 },
          { k: 'objective', cx: 18, cy: 5, n: 'D' }, { k: 'objective', cx: 18, cy: 24.5, n: 'C' },
          { k: 'building', cx: 7, cy: 6, w: 7, h: 5, rot: 0 }, { k: 'building', cx: 29, cy: 7, w: 6, h: 6, rot: 0 },
          { k: 'building', cx: 8, cy: 28, w: 6, h: 4, rot: 0 }, { k: 'building', cx: 28, cy: 28, w: 6, h: 4, rot: 0 },
          { k: 'wall', x: 11, y: 25.5, w: 5, h: 1 }, { k: 'wall', x: 21, y: 25.5, w: 5, h: 1 }, { k: 'wall', x: 23, y: 10, w: 6, h: 1 }, { k: 'wall', x: 8, y: 10.5, w: 5, h: 1 },
          { k: 'terrain', x: 31, y: 21.5, w: 4, h: 3 }, { k: 'terrain', x: 1, y: 22, w: 4, h: 3 },
        ],
        legend: [['zone-a', 'The Holdouts deploy here'], ['zone-b', 'The vanguard deploys here'], ['water', 'The river (deep water)'], ['terrain', 'The ford, bushes and woodpiles (Tricky Terrain)'],
          ['outline', 'The bridge'], ['wall', 'Bridge railings, hedges and walls'], ['objective', 'D detonator, C charges under the near end'], ['building', 'Farm buildings']],
      },
      teams: {},
    },
    meta: {
      genre: 'Last stand', setting: 'Rural', win: 'King of the Hill', inspired: 'Saving Private Ryan (1998)', players: '2', size: '4 v 4', rounds: '7', time: '60-90',
      needs: 'Core Rulebook', version: '1.0',
      premise: 'Four worn-out soldiers hold the last bridge over a river against an enemy vanguard. They can blow it, but then nobody wins it.',
      testNotes: [
        'Points by Round: who held the bridge, and when?',
        'Did the Holdouts blow the bridge? In which Round, and was it the right call?',
        'Did the vanguard go for the charges early? Was C too easy or too hard to reach?',
        'Did anyone use the ford, or did everything happen on the bridge?',
        'Holdouts deploying first with a 12" deep zone: too big an advantage?',
        'Ties going to the Holdouts: fair?',
        'Result: who won, on points or by blowing the bridge?',
      ],
      changes: [], playtests: [],
    },
  };

  window.RW_ONESHOTS = window.RW_ONESHOTS.concat([fallenKite, highGround, greenHell, lastBridge]);

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
