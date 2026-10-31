# toolroom

Released editions of two security designs for AI-assisted engineering:

- **Ratchet** proves a weakness, verifies its fix in the running system and keeps a test that catches its return. Authority stays outside the AI agents that propose the tests.
- **Jig** works where code is written. It steers developers and their coding agents toward secure patterns and catches defects between the first edit and the merge.

Each edition is a folder of Markdown, YAML and runnable checks. The folder is generated from the design's sources and carries its own manifest, so you can verify it as is. Change a design by releasing a new edition; never edit one in place.

## Editions

| Design | Edition | Folder | Notes |
|---|---|---|---|
| Ratchet | 5.2.0 | [`editions/ratchet/5.2.0`](editions/ratchet/5.2.0) | Current. Pins Jig 0.3.0 by the SHA-256 of its `edition.yaml` |
| Jig | 0.3.0 | [`editions/jig/0.3.0`](editions/jig/0.3.0) | Current. Pins nothing, so it ships first |
| Ratchet | 5.1.3 | [`editions/ratchet/5.1.3`](editions/ratchet/5.1.3) | Earlier edition, kept as released. Pins Jig 0.2.0 |
| Jig | 0.2.0 | [`editions/jig/0.2.0`](editions/jig/0.2.0) | Earlier edition, kept as released |
| Ratchet | 5.1.2 | [`editions/ratchet/5.1.2`](editions/ratchet/5.1.2) | Earlier edition, kept as released. Pins Jig 0.1.3 |
| Jig | 0.1.3 | [`editions/jig/0.1.3`](editions/jig/0.1.3) | Earlier edition, kept as released |

The current editions carry the same shared layer (0.1.3, `seams.yaml`), which defines what may cross between the two designs.

## Where to start reading

- An executive deciding whether to fund a first phase: [`strategy-brief.md`](editions/ratchet/5.2.0/strategy-brief.md), then [`six-pager.md`](editions/ratchet/5.2.0/six-pager.md).
- Anyone else: [`00-start-here.md`](editions/ratchet/5.2.0/00-start-here.md), which says which file each kind of reader should open first.
- Jig: [`README.md`](editions/jig/0.3.0/README.md) in its folder.

## Adopt a design with your own agent

Each current edition ships an adopter skill for an organization's AI coding agent: [`SKILL.md`](editions/ratchet/5.2.0/SKILL.md) for Ratchet and [`SKILL.md`](editions/jig/0.3.0/SKILL.md) for Jig. Point the agent at the skill and it sets up a workspace, seeds the design from what the organization already has, and keeps the organization's changes in its own files beside the read-only edition. One workspace holds both designs.

## Verify an edition

`edition.yaml` lists every other file in its folder with a SHA-256, and a digest over that list. Ratchet's edition also ships its checking tools, which run on [Bun](https://bun.sh) with no npm packages:

```sh
cd editions/ratchet/5.2.0
bun ratchet-tools-verify.ts
```

The verifier checks the manifest, then runs every bundled tool against the edition's own test cases.

## Use the designs with Plumb

[Plumb](https://github.com/juliedavila/plumb) tracks a system as designed against the system as built. Each edition here ships the files Plumb reads (its `plumb/` folder), so you can add a design to a Plumb workspace directly:

```sh
plumb design add ratchet@5.2.0 --from github:juliedavila/toolroom --with-pins
```

Plumb fetches the edition at the tag `ratchet-v5.2.0`, checks every file against the manifest, and with `--with-pins` adds Jig 0.3.0 from the tag `jig-v0.3.0`.

On a workstation without network access, pass the root of a local clone to `--from`; Plumb finds `editions/<design>/<version>` under it. Without `bun link`, run Plumb through Bun:

```sh
bun <path to plumb>/plumb.ts design add ratchet@5.2.0 --from <path to toolroom clone> --workspace <workspace>/plumb --with-pins
```

When you also use the adopter skills, the Plumb workspace is `plumb/` under the adopter workspace, and the skills' `workflow-with-plumb.md` files give the commands for that layout. Plumb 0.6.1 or later finds a pinned Jig at `upstream/pins/jig` on its own.

## What the hashes prove

The hashes prove that every file matches its edition's own manifest. No signature stands behind that manifest, so an edition is as trustworthy as this repository and the tag it comes from.

## What is not here yet

The design sources, the pipeline that builds and checks each edition, and the public evidence ledgers live elsewhere for now and will follow. Until then, each edition's `CHANGELOG.md` records what changed and why.

## License

MIT. See [LICENSE](LICENSE).
